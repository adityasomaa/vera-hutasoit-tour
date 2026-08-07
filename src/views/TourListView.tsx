"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { PageHero } from "@/components/sections/Common";
import { TourCard } from "@/components/sections/TourCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/Button";
import { TOUR_ACCENT } from "@/lib/site";
import { toursByFormat, type TourFormat } from "@/lib/tours";

export function TourListView({ format }: { format: TourFormat }) {
  const { d } = useLang();
  const { openModal } = useTourModal();
  const tours = toursByFormat(format);
  const copy = d.tourList[format];

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
        photo={TOUR_ACCENT[format].photo}
      />

      <section className="section-y">
        <div className="container-vbt">
          <Reveal>
            <p className="text-[0.82rem] uppercase tracking-[0.14em] text-faint">
              {tours.length} {d.tourList.count}
            </p>
          </Reveal>

          {tours.length === 0 ? (
            <p className="mt-8 text-muted">{d.tourList.empty}</p>
          ) : (
            <RevealGroup className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((t) => (
                <RevealItem key={t.slug}>
                  <TourCard tour={t} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      {/* nudge toward the custom form for anything not listed */}
      <section className="border-t border-line bg-paper-2 section-y-tight">
        <div className="container-vbt">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-[1.35rem] font-medium tracking-tight text-ink">
                  {d.tourList.customPrompt.title}
                </h2>
                <p className="mt-2 max-w-[52ch] text-[0.92rem] leading-relaxed text-muted">
                  {d.tourList.customPrompt.body}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openModal()}
                className={buttonClass("primary", "md", "shrink-0")}
              >
                {d.tourList.customPrompt.cta}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
