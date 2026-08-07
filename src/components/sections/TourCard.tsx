"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Scene } from "@/components/graphics/Scene";
import type { Tour } from "@/lib/tours";

/** One tour in a catalogue listing. Image, name, two facts, price. */
export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  const { d, lang } = useLang();

  return (
    <TransitionLink
      href={`/tour/${tour.format}/${tour.slug}`}
      className="group flex flex-col"
    >
      <div className="aspect-4/3 overflow-hidden rounded-xl border border-line">
        <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]">
          <Scene variant={tour.scene} seed={index + 1} />
        </div>
      </div>

      <p className="mt-4 text-[0.76rem] uppercase tracking-[0.14em] text-faint">
        {tour.area[lang]}
      </p>
      <h3 className="mt-1.5 font-display text-[1.15rem] font-medium leading-snug tracking-tight text-ink">
        <span className="link-underline">{tour.name[lang]}</span>
      </h3>
      <p className="mt-2 max-w-[42ch] text-[0.89rem] leading-relaxed text-muted">
        {tour.tagline[lang]}
      </p>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-3.5 text-[0.82rem] text-muted">
        <span>{tour.duration[lang]}</span>
        <span aria-hidden="true" className="text-line">·</span>
        <span>{tour.group[lang]}</span>
        <span className="ml-auto text-ink">
          <span className="text-faint">{d.tourList.from} </span>
          <span className="font-display font-medium">{tour.price[lang]}</span>
        </span>
      </div>
    </TransitionLink>
  );
}
