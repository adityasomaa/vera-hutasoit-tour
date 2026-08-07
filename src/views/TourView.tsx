"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Clock3, MapPinned, Users } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { CtaBand, PageHero } from "@/components/sections/Common";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/graphics/Scene";
import { Blobs, StarBurst } from "@/components/graphics/Brand";
import { TOUR_KEYS, TOUR_THEME, DESTINATION_SCENES } from "@/lib/site";
import { cn } from "@/lib/utils";

export function TourView() {
  const { d } = useLang();
  const { openModal } = useTourModal();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <PageHero
        eyebrow={d.tour.hero.eyebrow}
        title={d.tour.hero.title}
        subtitle={d.tour.hero.subtitle}
        scene="boat"
        tone="sun"
      >
        <div className="mt-8 flex flex-wrap gap-2.5">
          {TOUR_KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => openModal(k)}
              className={cn(
                "rounded-full border-2 px-4 py-2.5 text-[0.85rem] font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95",
                "border-ink/12 bg-white/70 text-ink/70 backdrop-blur hover:border-lagoon-500 hover:text-lagoon-700"
              )}
            >
              {d.tourTypes[k].name}
            </button>
          ))}
        </div>
      </PageHero>

      {/* ---------------- the three formats ---------------- */}
      <section id="formats" className="relative overflow-hidden py-8 sm:py-14">
        <div className="container-vbt relative">
          <div className="flex flex-col gap-8">
            {TOUR_KEYS.map((key, i) => {
              const t = d.tourTypes[key];
              const th = TOUR_THEME[key];
              const flip = i % 2 === 1;
              return (
                <Reveal key={key} delay={0.05}>
                  <article
                    className={cn(
                      "group relative grid overflow-hidden rounded-[2.25rem] border border-ink/10 bg-sand shadow-[0_26px_66px_-34px_rgba(6,23,29,0.4)] transition-shadow duration-500 hover:shadow-[0_46px_100px_-44px_rgba(6,23,29,0.55)] lg:grid-cols-2"
                    )}
                  >
                    {/* visual */}
                    <div
                      className={cn(
                        "relative min-h-[16rem] overflow-hidden lg:min-h-[24rem]",
                        flip && "lg:order-2"
                      )}
                    >
                      <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                        <Scene variant={th.scene} seed={i + 2} />
                      </div>
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-t from-sand/95 via-sand/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent",
                          flip ? "lg:to-sand" : "lg:bg-gradient-to-l lg:to-sand"
                        )}
                      />
                      <span
                        className={cn(
                          "absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-wider shadow-sm backdrop-blur",
                          th.chip
                        )}
                      >
                        {[d.tour.labels.popular, d.tour.labels.best, d.tour.labels.flexible][i]}
                      </span>
                    </div>

                    {/* content */}
                    <div className="relative flex flex-col p-6 sm:p-9">
                      <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.3rem)] font-extrabold leading-tight text-ink">
                        {t.name}
                      </h2>
                      <p className="mt-1 text-[0.9rem] font-semibold text-lagoon-700">{t.short}</p>
                      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/65">{t.desc}</p>

                      <dl className="mt-6 grid grid-cols-3 gap-3">
                        {[
                          { icon: Clock3, label: d.tour.labels.duration, value: t.duration },
                          { icon: Users, label: d.tour.labels.group, value: t.group },
                          { icon: MapPinned, label: d.tour.labels.price, value: t.price },
                        ].map(({ icon: Icon, label, value }) => (
                          <div
                            key={label}
                            className="rounded-2xl border border-ink/10 bg-white/60 p-3 text-center"
                          >
                            <Icon className="mx-auto h-4 w-4 text-lagoon-500" />
                            <dt className="mt-1.5 text-[0.6rem] font-bold uppercase tracking-wider text-ink/40">
                              {label}
                            </dt>
                            <dd className="mt-0.5 text-[0.8rem] font-bold text-ink">{value}</dd>
                          </div>
                        ))}
                      </dl>

                      <p className="mt-7 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink/40">
                        {d.tour.cardIncludes}
                      </p>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {t.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-[0.86rem] text-ink/65">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lagoon-500" strokeWidth={3} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Button
                          variant={i === 0 ? "primary" : i === 1 ? "sun" : "secondary"}
                          size="md"
                          onClick={() => openModal(key)}
                        >
                          {d.tour.cardCta}
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                        <span className="flex items-baseline gap-1.5">
                          <span className="font-display text-xl font-extrabold text-ink">
                            {t.price}
                          </span>
                          <span className="text-[0.76rem] font-semibold text-ink/40">{t.unit}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- comparison ---------------- */}
      <section className="relative overflow-hidden bg-sand-2/60 py-20 sm:py-28">
        <Blobs variant="lagoon" className="opacity-40" />
        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.tour.compare.eyebrow}
            title={d.tour.compare.title}
            subtitle={d.tour.compare.subtitle}
          />

          <Reveal delay={0.15}>
            <div className="mt-12 overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[42rem] border-separate border-spacing-0 overflow-hidden rounded-3xl border border-ink/10 bg-white/75 backdrop-blur">
                <thead>
                  <tr>
                    {d.tour.compare.headers.map((h, i) => (
                      <th
                        key={i}
                        className={cn(
                          "sticky top-0 px-5 py-4 text-left font-display text-[0.95rem] font-extrabold",
                          i === 0 ? "text-ink/40" : "text-ink",
                          i > 0 && "border-l border-ink/8"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {i > 0 && (
                            <span
                              className={cn(
                                "h-2.5 w-2.5 rounded-full",
                                i === 1 ? "bg-lagoon-500" : i === 2 ? "bg-sunbeam-400" : "bg-coral-500"
                              )}
                            />
                          )}
                          {h}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.tour.compare.rows.map((row, ri) => (
                    <tr
                      key={row.label}
                      className={cn(
                        "transition-colors duration-300 hover:bg-lagoon-50/70",
                        ri % 2 === 1 && "bg-sand/40"
                      )}
                    >
                      <th className="border-t border-ink/8 px-5 py-4 text-left text-[0.85rem] font-bold text-ink/55">
                        {row.label}
                      </th>
                      {row.values.map((v, vi) => (
                        <td
                          key={vi}
                          className="border-l border-t border-ink/8 px-5 py-4 text-[0.87rem] text-ink/75"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="border-t border-ink/8 px-5 py-4" />
                    {TOUR_KEYS.map((k, i) => (
                      <td key={k} className="border-l border-t border-ink/8 px-5 py-4">
                        <Button
                          size="sm"
                          magnetic={false}
                          variant={i === 0 ? "primary" : i === 1 ? "sun" : "secondary"}
                          onClick={() => openModal(k)}
                        >
                          {d.tour.packages.cta}
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- ready-made packages ---------------- */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-20" />
        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.tour.packages.eyebrow}
            title={d.tour.packages.title}
            subtitle={d.tour.packages.subtitle}
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.tour.packages.items.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <TiltCard className="h-full" intensity={6}>
                  <article
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-sand shadow-[0_20px_50px_-28px_rgba(6,23,29,0.4)]"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <div
                        className={cn(
                          "absolute inset-0 transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                          hovered === i && "scale-110"
                        )}
                      >
                        <Scene variant={DESTINATION_SCENES[i % DESTINATION_SCENES.length]} seed={i + 5} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-sand via-sand/5 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-ink/70 backdrop-blur">
                        {p.tag}
                      </span>
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-[0.62rem] font-bold text-sand backdrop-blur">
                        <Clock3 className="h-3 w-3" />
                        {p.duration}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5 pt-1">
                      <h3 className="font-display text-lg font-extrabold text-ink">{p.name}</h3>
                      <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-ink/60">
                        {p.desc}
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/8 pt-4">
                        <span className="flex items-baseline gap-1">
                          <StarBurst className="h-3 w-3 text-sunbeam-400" />
                          <span className="font-display text-base font-extrabold text-ink">
                            {p.price}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => openModal("private", p.name)}
                          className="group/btn inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.78rem] font-bold text-sand transition-all duration-300 hover:bg-lagoon-600 active:scale-95"
                        >
                          {d.tour.packages.cta}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="relative overflow-hidden bg-sand-2/50 py-20 sm:py-28">
        <div className="container-vbt relative">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow={d.tour.faq.eyebrow}
                title={d.tour.faq.title}
                align="left"
              />
              <Reveal delay={0.2}>
                <div className="mt-8 overflow-hidden rounded-3xl border-4 border-sand shadow-xl">
                  <div className="aspect-4/3">
                    <Scene variant="waterfall" seed={7} />
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <Accordion items={d.tour.faq.items} />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title={d.tour.cta.title}
        subtitle={d.tour.cta.subtitle}
        primary={d.tour.cta.primary}
        scene="boat"
      />

      {/* subtle motion accent so the section joins feel alive */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lagoon-400/40 to-transparent"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
