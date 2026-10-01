"use client";

import Link from "next/link";
import { HeroNavbar } from "@/components/hero-navbar";
import { TypewriterHero } from "@/components/typewriter-hero";
import { SOCIAL_HREFS } from "@/lib/social-links";
import { useTranslations } from "@/lib/language-context";

/**
 * Первый экран на стадии идеи: вместо трансляции — честная карточка статуса.
 * Слиток не куплен, поэтому показывать «эфир» нечего.
 */
export function HeroSection() {
  const t = useTranslations();

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

            <div className="glass-panel w-full max-w-3xl rounded-[2rem] p-5 text-left sm:p-7">
              <div className="mb-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-white/58">
                <span>{t.hero.liveLabel}</span>
                <span className="inline-flex items-center gap-2 text-white/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  {t.hero.liveBadge}
                </span>
              </div>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {t.hero.statusItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-[var(--gold-bright)]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={SOCIAL_HREFS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--gold-soft)]/50 bg-[linear-gradient(135deg,var(--gold-bright),var(--gold-soft))] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_28px_rgba(212,177,106,0.28)] transition hover:shadow-[0_0_40px_rgba(212,177,106,0.45)]"
              >
                {t.hero.discussCta}
              </a>
              <Link
                href="/treasury"
                className="rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
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
