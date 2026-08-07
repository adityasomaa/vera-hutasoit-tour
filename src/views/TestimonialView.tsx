"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { CtaBand, PageHero, StatsRow } from "@/components/sections/Common";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { Avatar } from "@/components/graphics/Brand";
import { TESTIMONIALS, TOUR_KEYS, type TourKey } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

export function TestimonialView() {
  const { d, lang } = useLang();
  const [filter, setFilter] = useState<TourKey | "all">("all");

  const list = TESTIMONIALS.filter((t) => filter === "all" || t.tour === filter);

  return (
    <>
      <PageHero
        eyebrow={d.testimonial.hero.eyebrow}
        title={d.testimonial.hero.title}
        subtitle={d.testimonial.hero.subtitle}
        photo="beachBoats"
      />

      <section className="pt-12 sm:pt-16">
        <div className="container-vbt">
          <StatsRow items={d.testimonial.stats} />
        </div>
      </section>

      <section className="section-y">
        <div className="container-vbt">
          <SectionHeading
            eyebrow={d.testimonial.grid.eyebrow}
            title={d.testimonial.grid.title}
          />

          {/* filters */}
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap gap-2">
              {(["all", ...TOUR_KEYS] as const).map((k) => {
                const active = filter === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setFilter(k)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-[0.84rem] transition-colors duration-200",
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-muted hover:border-ink hover:text-ink"
                    )}
                  >
                    {k === "all" ? d.testimonial.grid.filterAll : d.tourTypes[k].name}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {list.length === 0 ? (
            <p className="mt-10 text-muted">{d.testimonial.grid.empty}</p>
          ) : (
            <div className="mt-10 columns-1 gap-8 md:columns-2 lg:columns-3">
              {list.map((t, i) => (
                <motion.figure
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(i * 0.03, 0.24),
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="mb-8 break-inside-avoid border-t border-line pt-5"
                >
                  <Stars n={t.rating} />
                  <blockquote className="mt-3 text-[0.92rem] leading-relaxed text-ink-2">
                    {t.quote[lang]}
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <Avatar name={t.name} size={34} />
                    <span className="min-w-0">
                      <span className="block text-[0.88rem] font-medium text-ink">
                        {t.name}
                      </span>
                      <span className="block text-[0.78rem] text-faint">
                        {t.country} &middot; {d.tourTypes[t.tour].name} &middot;{" "}
                        {formatDate(t.date, lang)}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title={d.testimonial.cta.title}
        subtitle={d.testimonial.cta.subtitle}
        photo="jukung"
      />
    </>
  );
}
