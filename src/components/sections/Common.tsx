"use client";

import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { Button } from "@/components/ui/Button";
import { Reveal, SplitText } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/ui/CountUp";
import { Scene } from "@/components/graphics/Scene";
import { Blobs, PatternStrip, Squiggle } from "@/components/graphics/Brand";
import { waLink, WA_PREFILL, type SceneVariant } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ================================================================
   Inner-page hero
   ================================================================ */

export function PageHero({
  eyebrow,
  title,
  subtitle,
  scene = "terrace",
  tone = "lagoon",
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  scene?: SceneVariant;
  tone?: "lagoon" | "coral" | "sun";
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40">
      <Blobs variant={tone === "coral" ? "warm" : tone === "sun" ? "warm" : "lagoon"} />
      <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-[0.18]" />

      <div className="container-vbt relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal dir="down">
              <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
            </Reveal>

            <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.1rem,6vw,3.8rem)] font-extrabold leading-[1.03] text-ink">
              <SplitText text={title} />
            </h1>

            <Reveal dir="scale" delay={0.14}>
              <Squiggle className="mt-5 text-coral-400" />
            </Reveal>

            {subtitle && (
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-ink/65 sm:text-lg">
                  {subtitle}
                </p>
              </Reveal>
            )}

            {children && <Reveal delay={0.3}>{children}</Reveal>}
          </div>

          <Reveal dir="left" delay={0.15} className="hidden lg:block">
            <div className="relative">
              <div className="animate-float-slow overflow-hidden rounded-[2.5rem] border border-ink/10 shadow-[0_40px_90px_-40px_rgba(6,23,29,0.5)]">
                <div className="aspect-4/3">
                  <Scene variant={scene} seed={3} />
                </div>
              </div>
              <div className="absolute -bottom-5 -left-6 rotate-[-6deg] rounded-2xl border border-ink/10 bg-sand px-4 py-3 shadow-xl">
                <p className="font-display text-sm font-extrabold text-ink">Bali · GMT+8</p>
                <p className="text-[0.7rem] text-ink/50">8°S 115°E</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <PatternStrip className="mt-14 text-lagoon-300/60" />
    </section>
  );
}

/* ================================================================
   Stats band
   ================================================================ */

export function StatsBand({
  eyebrow,
  title,
  items,
  className,
}: {
  eyebrow?: string;
  title?: string;
  items: { value: number; suffix: string; label: string; decimals: number }[];
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-ink py-16 text-sand sm:py-20", className)}>
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -left-24 top-0 h-80 w-80 rounded-full bg-lagoon-500/25 blur-3xl" />
        <div
          className="animate-blob absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-coral-500/20 blur-3xl"
          style={{ animationDelay: "-9s" }}
        />
      </div>
      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

      <div className="container-vbt relative">
        {(eyebrow || title) && (
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            {eyebrow && (
              <Reveal dir="down">
                <Eyebrow tone="light">{eyebrow}</Eyebrow>
              </Reveal>
            )}
            {title && (
              <h2 className="max-w-2xl font-display text-[clamp(1.7rem,4vw,2.7rem)] font-extrabold leading-tight text-sand">
                <SplitText text={title} />
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="group relative">
                <span className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-3xl bg-white/0 transition-colors duration-500 group-hover:bg-white/5" />
                <p className="relative font-display text-[clamp(2rem,6vw,3.2rem)] font-extrabold leading-none">
                  <span className="bg-gradient-to-br from-lagoon-300 via-sunbeam-300 to-coral-400 bg-clip-text text-transparent">
                    <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </span>
                </p>
                <p className="relative mt-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-sand/45">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Closing CTA
   ================================================================ */

export function CtaBand({
  title,
  subtitle,
  primary,
  secondary,
  note,
  scene = "cliff",
}: {
  title: string;
  subtitle: string;
  primary: string;
  secondary?: string;
  note?: string;
  scene?: SceneVariant;
}) {
  const { lang } = useLang();
  const { openModal } = useTourModal();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Blobs variant="tri" />
      <div className="container-vbt relative">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-ink/10 bg-ink shadow-[0_50px_110px_-50px_rgba(6,23,29,0.7)]">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <Scene variant={scene} seed={2} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-ink/55" />
          <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

          <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-12 sm:py-20">
            <motion.span
              initial={{ scale: 0, rotate: -40 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sunbeam-400 to-coral-500 text-white shadow-[0_18px_44px_-18px_rgba(249,169,11,0.9)]"
            >
              <Sparkles className="h-7 w-7" />
            </motion.span>

            <h2 className="max-w-2xl font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.06] text-sand">
              <SplitText text={title} />
            </h2>

            <Reveal delay={0.15}>
              <p className="max-w-xl text-[0.98rem] leading-relaxed text-sand/65 sm:text-lg">
                {subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Button variant="sun" size="lg" onClick={() => openModal()}>
                  {primary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {secondary && (
                  <a
                    href={waLink(WA_PREFILL[lang])}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-7 py-4 text-base font-semibold text-sand transition-all duration-400 hover:border-white/45 hover:bg-white/8"
                  >
                    <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
                    {secondary}
                  </a>
                )}
              </div>
            </Reveal>

            {note && (
              <Reveal delay={0.34}>
                <p className="text-[0.78rem] text-sand/35">{note}</p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
