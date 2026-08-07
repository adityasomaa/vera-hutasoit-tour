"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/ui/CountUp";
import { Photo } from "@/components/graphics/Photo";
import { buttonClass } from "@/components/ui/Button";
import { waLink, WA_GENERAL } from "@/lib/site";
import type { PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

/* ================================================================
   Inner-page hero — left aligned, one quiet image
   ================================================================ */

export function PageHero({
  eyebrow,
  title,
  subtitle,
  photo,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  photo?: PhotoKey;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line pb-12 pt-28 sm:pb-16 sm:pt-36">
      <div className="container-vbt">
        <div className={cn("grid items-end gap-10", photo && "lg:grid-cols-[1.3fr_1fr]")}>
          <Reveal className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.1rem,5.2vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-[60ch] text-[1rem] leading-relaxed text-muted">
                {subtitle}
              </p>
            )}
            {children}
          </Reveal>

          {photo && (
            <Reveal delay={0.08} className="hidden lg:block">
              <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-line">
                <Photo name={photo} alt="" sizes="34vw" priority />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Stats — hairline row
   ================================================================ */

export function StatsRow({
  items,
  className,
}: {
  items: { value: number; suffix: string; label: string; decimals: number }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 divide-line border-y border-line sm:grid-cols-4 sm:divide-x",
        className
      )}
    >
      {items.map((s) => (
        <div key={s.label} className="px-2 py-7 sm:px-6">
          <p className="font-display text-[clamp(1.6rem,3.6vw,2.2rem)] font-semibold tabular-nums text-ink">
            <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
          </p>
          <p className="mt-1.5 text-[0.82rem] text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   Closing CTA — one action, one photograph
   ================================================================ */

export function CtaBand({
  title,
  subtitle,
  photo = "uluwatuCliffs",
}: {
  title: string;
  subtitle: string;
  photo?: PhotoKey;
}) {
  const { d, lang } = useLang();

  return (
    <section className="section-y">
      <div className="container-vbt">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl bg-ink sm:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col justify-center px-7 py-12 sm:px-11 sm:py-16">
              <h2 className="max-w-[22ch] font-display text-[clamp(1.6rem,3.4vw,2.3rem)] font-semibold leading-[1.14] tracking-[-0.025em] text-paper">
                {title}
              </h2>
              <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-paper/60">
                {subtitle}
              </p>
              <div className="mt-8">
                <a
                  href={waLink(WA_GENERAL[lang])}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonClass("book", "lg", "w-fit")}
                >
                  {d.nav.cta}
                </a>
              </div>
            </div>
            <div className="relative min-h-[14rem] sm:min-h-[18rem]">
              <Photo name={photo} alt="" sizes="(max-width: 640px) 100vw, 40vw" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
