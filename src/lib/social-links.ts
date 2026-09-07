/**
 * Central place for social/contact links.
 *
 * A link that is still empty is not rendered at all — `LIVE_SOCIALS` is what the
 * UI iterates over. A dead button that goes nowhere is worse than a missing one
 * on a project whose whole claim is that everything shown can be checked.
 * Fill a value in and the button appears; leave it empty and it stays hidden.
 */
export type SocialKey = "twitter" | "telegram" | "youtube" | "reddit" | "email";

export const SOCIAL_HREFS: Record<SocialKey, string> = {
  twitter: "https://x.com/aureumlink",
  telegram: "https://t.me/aureum_link",
  youtube: "https://www.youtube.com/@AureumLink",
  reddit: "", // не заведён
  email: "", // не заведён: личную почту сюда не ставим
};

const SOCIAL_ORDER: SocialKey[] = [
  "twitter",
  "telegram",
  "youtube",
  "reddit",
  "email",
];

function isLive(href: string): boolean {
  const value = href.trim();
  return value.length > 0 && value !== "#";
}

/** Only the channels that actually exist, in display order. */
export const LIVE_SOCIALS: SocialKey[] = SOCIAL_ORDER.filter((key) =>
  isLive(SOCIAL_HREFS[key]),
);

/**
 * Прямой эфир на YouTube.
 *
 * `watch` — постоянная ссылка: YouTube сам перенаправляет её на текущую
 * трансляцию, поэтому при перезапуске эфира она не протухает.
 *
 * `fallbackVideoId` берётся, только если `/api/live` недоступен — локальная
 * сборка без Cloudflare Functions или сбой функции. В обычной работе ID
 * приходит с сервера, и правки в коде для смены эфира не нужны.
 */
export const LIVE_STREAM = {
  channelId: "UCXl8kXGL17Ax7ziQLgP8rvQ",
  watch: "https://www.youtube.com/@AureumLink/live",
  fallbackVideoId:
    process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID?.trim() || "FVgBS0d6bM0",
} as const;

/**
 * Единственная форма, которую принимает iframe. Ссылку вида
 * `youtube.com/live/<id>` или `watch?v=<id>` YouTube во фрейме блокирует.
 */
export function embedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}
