"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroNavbar } from "@/components/hero-navbar";
import { TypewriterHero } from "@/components/typewriter-hero";
import { LIVE_STREAM, embedUrl } from "@/lib/social-links";
import { useTranslations } from "@/lib/language-context";

/**
 * Состояние трансляции.
 *
 * "unknown" отделено от "offline" намеренно: если `/api/live` недоступен
 * (локальная сборка без Cloudflare Functions, сбой YouTube), мы показываем
 * запасной эфир, но НЕ рисуем красную точку — утверждать, что эфир идёт, мы
 * в этот момент не можем.
 */
type StreamState =
  | { status: "checking" }
  | { status: "live"; videoId: string }
  | { status: "offline" }
  | { status: "unknown"; videoId: string };

export function HeroSection() {
  const t = useTranslations();
  const [stream, setStream] = useState<StreamState>({ status: "checking" });

  useEffect(() => {
    let cancelled = false;
    const fallback: StreamState = {
      status: "unknown",
      videoId: LIVE_STREAM.fallbackVideoId,
    };

    // Путь абсолютный и без basePath: это Pages Function, а не маршрут Next.
    fetch("/api/live", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { status?: string; videoId?: string }) => {
        if (cancelled) return;
        if (data?.status === "live" && data.videoId) {
          setStream({ status: "live", videoId: data.videoId });
        } else if (data?.status === "offline") {
          setStream({ status: "offline" });
        } else {
          // Эфир не подтверждён, но ID мог прийти из RSS-фида: показываем
          // свежий ролик и НЕ рисуем красную точку.
          setStream({
            status: "unknown",
            videoId: data?.videoId || LIVE_STREAM.fallbackVideoId,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setStream(fallback);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const playingId =
    stream.status === "live" || stream.status === "unknown"
      ? stream.videoId
      : null;

  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroNavbar />

      <div className="section-shell flex min-h-screen flex-col py-24 sm:py-28 lg:py-32">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center sm:gap-10">
              <TypewriterHero />

              <p className="max-w-3xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg sm:leading-8">
                {t.hero.description}
              </p>

              <span className="section-kicker">{t.hero.kicker}</span>

              <div
                id="hero-video"
                className="hero-video-frame glass-panel w-full overflow-hidden rounded-[2rem] p-3 sm:p-4 lg:p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-3 px-2 py-1 text-left text-xs uppercase tracking-[0.24em] text-white/58 sm:px-3">
                  <span>{t.hero.liveLabel}</span>

                  {/* Красная точка появляется, только когда эфир подтверждён */}
                  {stream.status === "live" ? (
                    <span className="inline-flex items-center gap-2 text-white/70">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.7)]" />
                      {t.hero.liveBadge}
                    </span>
                  ) : stream.status === "checking" ? (
                    <span className="text-white/40">{t.hero.streamChecking}</span>
                  ) : null}
                </div>

                <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/65">
                  {playingId ? (
                    <iframe
                      key={playingId}
                      title="AUREUM LINK live reserve stream"
                      src={embedUrl(playingId)}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : stream.status === "offline" ? (
                    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                      <span className="rounded-full border border-white/14 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                        {t.hero.offlineTitle}
                      </span>
                      <p className="mx-auto max-w-2xl text-sm leading-7 text-white/64 sm:text-base">
                        {t.hero.offlineBody}
                      </p>
                      <Link
                        href="/treasury"
                        className="rounded-full border border-[var(--gold-soft)]/45 bg-[var(--gold-soft)]/[0.1] px-5 py-2.5 text-sm font-semibold text-[var(--gold-bright)] transition hover:bg-[var(--gold-soft)]/[0.18]"
                      >
                        {t.hero.ctaTreasury}
                      </Link>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-white/30">
                      {t.hero.streamChecking}
                    </div>
                  )}
                </div>

                <div className="px-2 pt-3 text-left sm:px-3">
                  <a
                    href={LIVE_STREAM.watch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/45 transition hover:text-[var(--gold-bright)]"
                  >
                    {t.hero.watchOnYoutube} ↗
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Link
                  href="/treasury"
                  className="rounded-full border border-[var(--gold-soft)]/50 bg-[linear-gradient(135deg,var(--gold-bright),var(--gold-soft))] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_28px_rgba(212,177,106,0.28)] transition hover:shadow-[0_0_40px_rgba(212,177,106,0.45)]"
                >
                  {t.hero.ctaTreasury}
                </Link>
                <Link
                  href="/manifesto"
                  className="rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {t.hero.ctaManifesto}
                </Link>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
