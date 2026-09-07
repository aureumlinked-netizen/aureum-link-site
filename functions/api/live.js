/**
 * Cloudflare Pages Function: какой эфир идёт на канале прямо сейчас.
 *
 * Зачем: ID трансляции меняется при каждом перезапуске эфира. Если зашивать его
 * в сборку, сайт рано или поздно показывает мёртвый плеер, и заметить это можно
 * только случайно. Здесь он определяется на лету.
 *
 * Отдаёт одно из трёх:
 *   { status: "live",    videoId }  — эфир идёт
 *   { status: "offline" }           — канал не в эфире
 *   { status: "unknown" }           — YouTube не ответил, увёл на страницу
 *                                     согласия или сменил разметку; клиент в
 *                                     этом случае берёт запасной ID, а не
 *                                     объявляет эфир выключенным
 *
 * Намеренно на JS, а не на TS: tsconfig включает "**\/*.ts", и файл отсюда попал
 * бы в проверку типов `next build`, где нет типов Cloudflare Workers.
 *
 * Разбор HTML YouTube хрупок по своей природе — поэтому статус "unknown"
 * существует отдельно от "offline", и на клиенте есть запасной вариант.
 * `/api/live?debug=1` показывает, что именно вернул YouTube, — без этого
 * поломка разметки выглядит просто как "unknown" без причины.
 */

const CHANNEL_ID = "UCXl8kXGL17Ax7ziQLgP8rvQ"; // Aureum Link
// hl/gl фиксируют язык и регион: иначе ответ зависит от того, в какой стране
// оказался конкретный edge-узел Cloudflare.
const LIVE_URL = `https://www.youtube.com/channel/${CHANNEL_ID}/live?hl=en&gl=US`;
const CACHE_SECONDS = 300;

// Запрос из дата-центра приходит без куки согласия, и YouTube отдаёт
// страницу-заглушку вместо канала. Эти два значения означают "согласие уже
// дано" и возвращают обычную выдачу.
const CONSENT_COOKIE = "SOCS=CAI; CONSENT=YES+cb";

const BROWSER_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/125.0 Safari/537.36",
  "accept-language": "en-US,en;q=0.9",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  cookie: CONSENT_COOKIE,
};

function json(body, seconds) {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control":
        seconds > 0 ? `public, max-age=${seconds}` : "no-store",
    },
  });
}

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

function inspect(html) {
  const match = html.match(/<title>([^<]{0,120})/i);
  const title = match ? match[1] : null;
  return {
    canonical: canonicalVideoId(html),
    details: detailsVideoId(html),
    isLiveTrue: /"isLive"\s*:\s*true/.test(html),
    isLiveNow: /"isLiveNow"\s*:\s*true/.test(html),
    isLiveFalse: /"isLive"\s*:\s*false/.test(html),
    // по заголовку, а не по всему телу: строки "consent.youtube.com" и
    // "recaptcha" встречаются в скриптах и на совершенно нормальной странице,
    // так что поиск по body давал бы ложную тревогу при разборе поломки
    wall: title
      ? /before you continue|unusual traffic|sorry/i.test(title)
      : false,
    title,
  };
}

export async function onRequestGet({ request }) {
  const debug = new URL(request.url).searchParams.get("debug") === "1";

  let resp;
  let html;
  try {
    resp = await fetch(LIVE_URL, {
      headers: BROWSER_HEADERS,
      // при отладке кэш только мешает: он вернёт тот же плохой ответ
      cf: debug
        ? { cacheTtl: 0 }
        : { cacheTtl: CACHE_SECONDS, cacheEverything: true },
    });
    html = await resp.text();
  } catch (err) {
    return json(
      debug ? { status: "unknown", error: String(err) } : { status: "unknown" },
      0,
    );
  }

  const seen = inspect(html);
  const videoId = seen.canonical || seen.details;
  const live = seen.isLiveTrue || seen.isLiveNow;

  let body;
  if (resp.ok && videoId && live) {
    body = { status: "live", videoId };
  } else if (resp.ok && (videoId || seen.isLiveFalse)) {
    body = { status: "offline" };
  } else {
    body = { status: "unknown" };
  }

  if (debug) {
    return json(
      { ...body, http: resp.status, finalUrl: resp.url, bytes: html.length, seen },
      0,
    );
  }
  // "live" кэшируем на 5 минут, всё остальное — на минуту: если эфир только что
  // начался, сайт не должен минутами утверждать обратное.
  return json(body, body.status === "live" ? CACHE_SECONDS : 60);
}
