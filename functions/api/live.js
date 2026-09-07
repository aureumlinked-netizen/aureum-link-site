/**
 * Cloudflare Pages Function: какой эфир идёт на канале прямо сейчас.
 *
 * Зачем: ID трансляции меняется при каждом перезапуске эфира. Если зашивать его
 * в сборку, сайт рано или поздно показывает мёртвый плеер, и заметить это можно
 * только случайно. Здесь он определяется на лету.
 *
 * Главное ограничение, выясненное на живом деплое: обычную страницу YouTube с
 * IP дата-центра Cloudflare получить нельзя — Google отвечает 429 и уводит на
 * `google.com/sorry/index`. Куки согласия и десктопный user-agent это не
 * обходят. Поэтому источников три, от точного к живучему:
 *
 *   1. YouTube Data API — если в переменных окружения задан YOUTUBE_API_KEY.
 *      Единственный источник, который прямо отвечает "эфир идёт". Без ключа
 *      слой просто пропускается.
 *   2. Страница канала — работает не с каждого узла, но если ответила, даёт и
 *      ID, и признак эфира.
 *   3. RSS-фид канала — обычный XML, его отдают и дата-центрам. Про эфир он не
 *      знает, но всегда возвращает ID последнего ролика. Этого хватает, чтобы
 *      плеер на сайте не протух.
 *
 * Отдаёт:
 *   { status: "live",    videoId }  — эфир подтверждён
 *   { status: "offline" }           — канал точно не в эфире
 *   { status: "unknown", videoId }  — ID есть, но подтвердить эфир нечем:
 *                                     сайт покажет плеер и НЕ покажет красную
 *                                     точку. Догадка не выдаётся за факт.
 *   { status: "unknown" }           — не удалось вообще ничего
 *
 * Намеренно на JS, а не на TS: tsconfig включает "**\/*.ts", и файл отсюда попал
 * бы в проверку типов `next build`, где нет типов Cloudflare Workers.
 *
 * `/api/live?debug=1` показывает, что вернул каждый слой.
 */

const CHANNEL_ID = "UCXl8kXGL17Ax7ziQLgP8rvQ"; // Aureum Link
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
// hl/gl фиксируют язык и регион: иначе ответ зависит от того, в какой стране
// оказался конкретный edge-узел Cloudflare.
const PAGE_URL = `https://www.youtube.com/channel/${CHANNEL_ID}/live?hl=en&gl=US`;

const LIVE_TTL = 300; // подтверждённый эфир меняется редко
const SHORT_TTL = 60; // всё остальное: эфир мог начаться только что

const BROWSER_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/125.0 Safari/537.36",
  "accept-language": "en-US,en;q=0.9",
  // означает "согласие уже дано": без этого часть узлов получает заглушку
  cookie: "SOCS=CAI; CONSENT=YES+cb",
};

function json(body, seconds) {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": seconds > 0 ? `public, max-age=${seconds}` : "no-store",
    },
  });
}

/* ---------- слой 1: официальный API, только если задан ключ ---------- */

async function fromApi(apiKey) {
  if (!apiKey) return { ok: false, why: "нет ключа" };
  const url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video" +
    `&eventType=live&channelId=${CHANNEL_ID}&maxResults=1&key=${apiKey}`;
  try {
    const resp = await fetch(url, { cf: { cacheTtl: SHORT_TTL, cacheEverything: true } });
    if (!resp.ok) return { ok: false, why: `http ${resp.status}` };
    const data = await resp.json();
    const id = data?.items?.[0]?.id?.videoId;
    // пустой items — законный ответ: значит, эфира сейчас нет
    return id ? { ok: true, live: true, videoId: id } : { ok: true, live: false };
  } catch (err) {
    return { ok: false, why: String(err) };
  }
}

/* ---------- слой 2: страница канала ---------- */

/**
 * canonical надёжнее прочих вхождений videoId: на странице их десятки
 * (рекомендации, превью), а canonical указывает на саму трансляцию.
 * Порядок атрибутов у YouTube менялся, поэтому тег ищем целиком.
 */
function canonicalVideoId(html) {
  const tags = html.match(/<link[^>]*rel="canonical"[^>]*>/gi) || [];
  for (const tag of tags) {
    const m = tag.match(/href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/);
    if (m) return m[1];
  }
  return null;
}

/** Запасной разбор: блок videoDetails есть на странице самой трансляции. */
function detailsVideoId(html) {
  const m = html.match(/"videoDetails"\s*:\s*\{\s*"videoId"\s*:\s*"([\w-]{11})"/);
  return m ? m[1] : null;
}

async function fromPage() {
  let resp;
  let html;
  try {
    resp = await fetch(PAGE_URL, {
      headers: BROWSER_HEADERS,
      cf: { cacheTtl: SHORT_TTL, cacheEverything: true },
    });
    html = await resp.text();
  } catch (err) {
    return { ok: false, why: String(err) };
  }
  if (!resp.ok) return { ok: false, why: `http ${resp.status}`, finalUrl: resp.url };

  const videoId = canonicalVideoId(html) || detailsVideoId(html);
  const live = /"isLive"\s*:\s*true/.test(html) || /"isLiveNow"\s*:\s*true/.test(html);
  const notLive = /"isLive"\s*:\s*false/.test(html);

  if (videoId && live) return { ok: true, live: true, videoId };
  if (videoId || notLive) return { ok: true, live: false };
  return { ok: false, why: "разметка не распознана", bytes: html.length };
}

/* ---------- слой 3: RSS-фид ---------- */

/**
 * ID самого свежего ролика канала. Трансляция появляется в фиде сразу после
 * запуска, поэтому у канала, который в основном стримит, это она и есть.
 * Никогда не помечается как "live": фид про эфир ничего не знает.
 */
async function fromFeed() {
  try {
    const resp = await fetch(FEED_URL, {
      cf: { cacheTtl: SHORT_TTL, cacheEverything: true },
    });
    if (!resp.ok) return { ok: false, why: `http ${resp.status}` };
    const xml = await resp.text();
    const m = xml.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/);
    return m ? { ok: true, videoId: m[1] } : { ok: false, why: "в фиде нет videoId" };
  } catch (err) {
    return { ok: false, why: String(err) };
  }
}

/* ---------- сборка ответа ---------- */

export async function onRequestGet({ request, env }) {
  const debug = new URL(request.url).searchParams.get("debug") === "1";

  const api = await fromApi(env?.YOUTUBE_API_KEY);
  if (api.ok && api.live) {
    return json(
      debug ? { status: "live", videoId: api.videoId, via: "api", api } : { status: "live", videoId: api.videoId },
      debug ? 0 : LIVE_TTL,
    );
  }

  const page = await fromPage();
  if (page.ok && page.live) {
    return json(
      debug ? { status: "live", videoId: page.videoId, via: "page", api, page } : { status: "live", videoId: page.videoId },
      debug ? 0 : LIVE_TTL,
    );
  }

  // Точное "эфира нет" принимаем только от источников, которые это знают.
  if ((api.ok && api.live === false) || (page.ok && page.live === false)) {
    const via = api.ok ? "api" : "page";
    return json(
      debug ? { status: "offline", via, api, page } : { status: "offline" },
      debug ? 0 : SHORT_TTL,
    );
  }

  const feed = await fromFeed();
  const body = feed.ok
    ? { status: "unknown", videoId: feed.videoId }
    : { status: "unknown" };
  return json(
    debug ? { ...body, via: "feed", api, page, feed } : body,
    debug ? 0 : SHORT_TTL,
  );
}
