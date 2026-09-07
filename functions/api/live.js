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
 * обходят. Поэтому источников три:
 *
 *   1. RSS-фид канала — обычный XML, его отдают и дата-центрам, поэтому он
 *      идёт первым. Про эфир он не знает, но всегда даёт ID последнего ролика:
 *      этого хватает, чтобы плеер не протух, и это бесплатный кандидат для
 *      следующего слоя.
 *   2. YouTube Data API — если задан YOUTUBE_API_KEY. Единственный источник,
 *      который прямо отвечает "эфир идёт". Проверяет кандидата из фида
 *      (1 единица квоты), а не ищет по каналу (100). Без ключа пропускается.
 *   3. Страница канала — с edge-узлов обычно 429, но если ответила, это
 *      бесплатный способ узнать про эфир.
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

/** Подтверждённый эфир держим дольше: он не меняется каждую минуту. */
function ttl(body) {
  return body.status === "live" ? LIVE_TTL : SHORT_TTL;
}

/* ---------- проверка эфира через официальный API ---------- */

/**
 * Проверяет конкретный ролик, а не ищет эфир по каналу. Это принципиально
 * дешевле: `search` стоит 100 единиц квоты из 10 000 в сутки — при опросе раз
 * в минуту дневной лимит кончился бы за пару часов. `videos.list` стоит 1, а
 * кандидата бесплатно даёт RSS-фид.
 *
 * Без ключа слой просто пропускается, и сайт работает по фиду.
 */
async function checkWithApi(apiKey, videoId) {
  if (!apiKey) return { ok: false, why: "ключ не задан" };
  if (!videoId) return { ok: false, why: "нет кандидата для проверки" };
  const url =
    "https://www.googleapis.com/youtube/v3/videos" +
    `?part=snippet,liveStreamingDetails&id=${videoId}&key=${apiKey}`;
  try {
    const resp = await fetch(url, {
      cf: { cacheTtl: SHORT_TTL, cacheEverything: true },
    });
    if (!resp.ok) return { ok: false, why: `http ${resp.status}` };
    const data = await resp.json();
    const item = data?.items?.[0];
    if (!item) return { ok: false, why: "видео не найдено" };
    // liveBroadcastContent: "live" | "upcoming" | "none"
    const state = item.snippet?.liveBroadcastContent;
    // actualEndTime появляется у завершённой трансляции: запись — не эфир
    const ended = Boolean(item.liveStreamingDetails?.actualEndTime);
    return { ok: true, live: state === "live" && !ended, state };
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
  const reply = (body, extra) =>
    json(debug ? { ...body, ...extra } : body, debug ? 0 : ttl(body));

  // Фид идёт первым: он единственный, кто отвечает с IP дата-центра, и он же
  // бесплатно даёт кандидата для дешёвой проверки через API.
  const feed = await fromFeed();
  const candidate = feed.ok ? feed.videoId : null;

  const api = await checkWithApi(env?.YOUTUBE_API_KEY, candidate);
  if (api.ok) {
    return api.live
      ? reply({ status: "live", videoId: candidate }, { via: "api", feed, api })
      : reply({ status: "offline" }, { via: "api", feed, api });
  }

  // Без ключа остаётся страница канала. С edge-узлов Google обычно отвечает
  // 429, но если ответил — это единственный бесплатный способ узнать про эфир.
  const page = await fromPage();
  if (page.ok && page.live) {
    return reply({ status: "live", videoId: page.videoId }, { via: "page", feed, api, page });
  }
  if (page.ok) {
    return reply({ status: "offline" }, { via: "page", feed, api, page });
  }

  // Подтвердить эфир нечем. Отдаём свежий ID из фида: сайт покажет актуальный
  // ролик и не станет рисовать красную точку.
  return reply(
    candidate ? { status: "unknown", videoId: candidate } : { status: "unknown" },
    { via: "feed", feed, api, page },
  );
}
