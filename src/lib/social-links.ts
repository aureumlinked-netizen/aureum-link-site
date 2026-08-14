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
  twitter: "", // TODO: X / Twitter profile URL
  telegram: "", // TODO: Telegram channel URL
  youtube: "", // TODO: YouTube channel or live-stream URL
  reddit: "", // TODO: subreddit URL
  email: "", // TODO: mailto:...
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
