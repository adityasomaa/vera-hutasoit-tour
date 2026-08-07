"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { CtaBand, PageHero } from "@/components/sections/Common";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Scene } from "@/components/graphics/Scene";
import { TOUR_ACCENT, TOUR_KEYS, TOUR_ROUTE } from "@/lib/site";
import { toursByFormat } from "@/lib/tours";
import { cn } from "@/lib/utils";

export function TourView() {
  const { d } = useLang();
  const { openModal } = useTourModal();

  return (
    <>
      <PageHero
        eyebrow={d.tour.hero.eyebrow}
        title={d.tour.hero.title}
        subtitle={d.tour.hero.subtitle}
      />

      {/* ---------------- the three formats ---------------- */}
      <section className="section-y">
        <div className="container-vbt">
          <RevealGroup className="grid gap-x-8 gap-y-12 lg:grid-cols-3">
            {TOUR_KEYS.map((key, i) => {
              const t = d.tourTypes[key];
              const a = TOUR_ACCENT[key];
              const href = TOUR_ROUTE[key];
              const count = href ? toursByFormat(key as "private" | "sharing").length : 0;

              const body = (
                <>
                  <div className="aspect-16/10 overflow-hidden rounded-xl border border-line">
                    <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]">
                      <Scene variant={a.scene} seed={i + 2} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full", a.dot)} />
                    <h2 className="font-display text-[1.25rem] font-medium tracking-tight text-ink">
                      <span className="link-underline">{t.name}</span>
                    </h2>
                  </div>

                  <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{t.desc}</p>

                  <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-3.5 text-[0.86rem]">
                    <span className="text-ink">
                      <span className="font-display font-medium">{t.price}</span>
                      <span className="text-faint"> · {t.unit}</span>
                    </span>
                    {count > 0 && (
                      <span className="text-faint">
                        {count} {d.tourList.count}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[0.88rem] font-medium text-lagoon-deep">{t.action}</p>
                </>
              );

              return (
                <RevealItem key={key}>
                  {href ? (
                    <TransitionLink href={href} className="group flex flex-col">
                      {body}
                    </TransitionLink>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openModal()}
                      className="group flex flex-col text-left"
                    >
                      {body}
                    </button>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- comparison ---------------- */}
      <section className="border-y border-line bg-paper-2 section-y">
        <div className="container-vbt">
          <SectionHeading eyebrow={d.tour.compare.eyebrow} title={d.tour.compare.title} />

          <Reveal delay={0.1}>
            <div className="mt-10 overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[38rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink">
                    {d.tour.compare.headers.map((h, i) => (
                      <th
                        key={i}
                        className={cn(
                          "py-3 pr-6 font-display text-[0.94rem] font-medium",
                          i === 0 ? "text-faint" : "text-ink"
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.tour.compare.rows.map((row) => (
                    <tr key={row.label} className="border-b border-line">
                      <th className="py-3.5 pr-6 text-left text-[0.85rem] font-normal text-faint">
                        {row.label}
                      </th>
                      {row.values.map((v, vi) => (
                        <td key={vi} className="py-3.5 pr-6 text-[0.88rem] text-ink-2">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="section-y">
        <div className="container-vbt">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <SectionHeading eyebrow={d.tour.faq.eyebrow} title={d.tour.faq.title} />
            <Reveal delay={0.06}>
              <Accordion items={d.tour.faq.items} />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand title={d.tour.cta.title} subtitle={d.tour.cta.subtitle} scene="boat" />
    </>
  );
}
