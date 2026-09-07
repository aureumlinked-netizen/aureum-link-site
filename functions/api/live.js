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
 *   { status: "unknown" }           — YouTube не ответил или сменил разметку;
 *                                     клиент в этом случае берёт запасной ID,
 *                                     а не объявляет эфир выключенным
 *
 * Намеренно на JS, а не на TS: tsconfig включает "**\/*.ts", и файл отсюда попал
 * бы в проверку типов `next build`, где нет типов Cloudflare Workers.
 *
 * Разбор HTML YouTube хрупок по своей природе — поэтому статус "unknown"
 * существует отдельно от "offline", и на клиенте есть запасной вариант.
 */

const CHANNEL_ID = "UCXl8kXGL17Ax7ziQLgP8rvQ"; // Aureum Link
const LIVE_URL = `https://www.youtube.com/channel/${CHANNEL_ID}/live`;
const CACHE_SECONDS = 300;

function json(body, seconds) {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${seconds}`,
    },
  });
}

export async function onRequestGet() {
  let html;
  try {
    const resp = await fetch(LIVE_URL, {
      headers: {
        // без десктопного UA и языка YouTube уводит на страницу согласия
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/125.0 Safari/537.36",
        "accept-language": "en-US,en;q=0.9",
      },
      cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
    });
    if (!resp.ok) return json({ status: "unknown" }, 60);
    html = await resp.text();
  } catch {
    return json({ status: "unknown" }, 60);
  }

  // canonical надёжнее прочих вхождений videoId: на странице их десятки
  // (рекомендации, превью), а canonical указывает на саму трансляцию.
  const canonical = html.match(
    /<link\s+rel="canonical"\s+href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/,
  );
  const videoId = canonical ? canonical[1] : null;
  const isLive = /"isLive"\s*:\s*true/.test(html);

  if (videoId && isLive) return json({ status: "live", videoId }, CACHE_SECONDS);
  if (videoId || /"isLive"\s*:\s*false/.test(html)) {
    return json({ status: "offline" }, 60);
  }
  return json({ status: "unknown" }, 60);
}
