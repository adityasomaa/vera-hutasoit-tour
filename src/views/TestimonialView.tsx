"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { CtaBand, PageHero, StatsBand } from "@/components/sections/Common";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Avatar, Blobs, PatternStrip } from "@/components/graphics/Brand";
import { Scene } from "@/components/graphics/Scene";
import {
  FEATURED_TESTIMONIALS,
  TESTIMONIALS,
  TOUR_KEYS,
  TOUR_THEME,
  type TourKey,
} from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

export function TestimonialView() {
  const { d, lang } = useLang();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [filter, setFilter] = useState<TourKey | "all">("all");

  const featured = FEATURED_TESTIMONIALS;
  const active = featured[index];

  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => (i + delta + featured.length) % featured.length);
  };

  const list = TESTIMONIALS.filter((t) => filter === "all" || t.tour === filter);

  return (
    <>
      <PageHero
        eyebrow={d.testimonial.hero.eyebrow}
        title={d.testimonial.hero.title}
        subtitle={d.testimonial.hero.subtitle}
        scene="beach"
        tone="coral"
      >
        <div className="mt-8 flex items-center gap-4">
          <div className="flex -space-x-3">
            {TESTIMONIALS.slice(0, 5).map((t) => (
              <Avatar key={t.id} name={t.name} size={40} className="rounded-full ring-4 ring-sand" />
            ))}
          </div>
          <div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-sunbeam-400 text-sunbeam-400" />
              ))}
            </div>
            <p className="mt-1 text-[0.8rem] font-semibold text-ink/55">
              4.9 · 2,870+ {lang === "id" ? "ulasan" : "reviews"}
            </p>
          </div>
        </div>
      </PageHero>

      <StatsBand items={d.testimonial.stats} />

      {/* ---------------- featured carousel ---------------- */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <Blobs variant="warm" className="opacity-50" />
        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.testimonial.featured.eyebrow}
            title={d.testimonial.featured.title}
            subtitle={d.testimonial.featured.subtitle}
          />

          <div className="relative mt-14">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-ink/10 bg-sand shadow-[0_34px_84px_-40px_rgba(6,23,29,0.45)]">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                {/* art panel */}
                <div className="relative hidden min-h-[22rem] overflow-hidden lg:block">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Scene variant={TOUR_THEME[active.tour].scene} seed={index + 3} />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-sand" />
                  <div className="absolute bottom-6 left-6 rounded-2xl bg-sand/90 px-4 py-3 backdrop-blur">
                    <p className="font-display text-sm font-extrabold text-ink">
                      {d.tourTypes[active.tour].name}
                    </p>
                    <p className="text-[0.7rem] text-ink/45">
                      {formatDate(active.date, lang)}
                    </p>
                  </div>
                </div>

                {/* quote panel */}
                <div className="relative flex min-h-[22rem] flex-col justify-center p-7 sm:p-11">
                  <Quote className="h-10 w-10 shrink-0 text-sunbeam-400/70" />

                  <div className="relative mt-6 min-h-[13rem] sm:min-h-[11rem]">
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={active.id}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -40 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.14}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -70) go(1);
                          else if (info.offset.x > 70) go(-1);
                        }}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <blockquote className="text-[0.98rem] leading-relaxed text-ink/75 sm:text-lg">
                          {active.quote[lang]}
                        </blockquote>

                        <figcaption className="mt-7 flex items-center gap-3.5">
                          <Avatar name={active.name} size={50} />
                          <div>
                            <p className="flex items-center gap-1.5 font-display text-base font-extrabold text-ink">
                              {active.name}
                              <BadgeCheck className="h-4 w-4 text-lagoon-500" />
                            </p>
                            <p className="text-[0.78rem] text-ink/45">
                              {active.flag} {active.country} · {d.testimonial.verified}
                            </p>
                          </div>
                          <span className="ml-auto flex gap-0.5">
                            {Array.from({ length: active.rating }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-sunbeam-400 text-sunbeam-400" />
                            ))}
                          </span>
                        </figcaption>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* controls */}
                  <div className="mt-8 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label={d.testimonial.featured.prev}
                      className="grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-white/70 text-ink/70 transition-all duration-300 hover:-translate-x-0.5 hover:border-lagoon-500 hover:text-lagoon-700 active:scale-95"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label={d.testimonial.featured.next}
                      className="grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-white/70 text-ink/70 transition-all duration-300 hover:translate-x-0.5 hover:border-lagoon-500 hover:text-lagoon-700 active:scale-95"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    <div className="ml-3 flex gap-1.5">
                      {featured.map((t, i) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setDir(i > index ? 1 : -1);
                            setIndex(i);
                          }}
                          aria-label={t.name}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-400",
                            i === index ? "w-8 bg-lagoon-500" : "w-1.5 bg-ink/15 hover:bg-ink/30"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- filtered grid ---------------- */}
      <section className="relative overflow-hidden bg-sand-2/60 py-20 sm:py-28">
        <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-20" />
        <div className="container-vbt relative">
          <SectionHeading eyebrow={d.testimonial.grid.eyebrow} title={d.testimonial.grid.title} />

          {/* filters */}
          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-wrap justify-center gap-2.5">
              {(["all", ...TOUR_KEYS] as const).map((k) => {
                const activeF = filter === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setFilter(k)}
                    className={cn(
                      "relative rounded-full px-4 py-2.5 text-[0.85rem] font-bold transition-colors duration-300",
                      activeF ? "text-white" : "text-ink/60 hover:text-ink"
                    )}
                  >
                    {activeF && (
                      <motion.span
                        layoutId="tfilter"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-ink"
                      />
                    )}
                    <span className="relative">
                      {k === "all" ? d.testimonial.grid.filterAll : d.tourTypes[k].name}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <motion.div layout className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {list.map((t, i) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.42, delay: Math.min(i * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
                  className="mb-5 break-inside-avoid"
                >
                  <TiltCard intensity={4} lift={5}>
                    <figure className="surface-card group relative rounded-2xl p-5">
                      <span
                        className={cn(
                          "absolute right-4 top-4 h-2 w-2 rounded-full",
                          TOUR_THEME[t.tour].accent
                        )}
                      />
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, s) => (
                          <Star key={s} className="h-3.5 w-3.5 fill-sunbeam-400 text-sunbeam-400" />
                        ))}
                      </div>
                      <blockquote className="mt-3.5 text-[0.88rem] leading-relaxed text-ink/70">
                        {t.quote[lang]}
                      </blockquote>
                      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/8 pt-4">
                        <Avatar name={t.name} size={36} />
                        <div className="min-w-0">
                          <p className="truncate font-display text-[0.9rem] font-bold text-ink">
                            {t.name}
                          </p>
                          <p className="truncate text-[0.72rem] text-ink/45">
                            {t.flag} {t.country} · {formatDate(t.date, lang)}
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {list.length === 0 && (
            <p className="mt-12 text-center text-ink/50">{d.testimonial.grid.empty}</p>
          )}
        </div>
        <PatternStrip className="mt-16 text-coral-300/60" />
      </section>

      <CtaBand
        title={d.testimonial.cta.title}
        subtitle={d.testimonial.cta.subtitle}
        primary={d.testimonial.cta.primary}
        scene="beach"
      />
    </>
  );
}
