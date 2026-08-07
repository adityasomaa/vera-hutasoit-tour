"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { buttonClass } from "@/components/ui/Button";
import { TourCard } from "@/components/sections/TourCard";
import { Scene } from "@/components/graphics/Scene";
import { waBookTour, waLink, WA_GENERAL } from "@/lib/site";
import { toursByFormat, type Tour } from "@/lib/tours";

export function TourDetailView({ tour }: { tour: Tour }) {
  const { d, lang } = useLang();
  const others = toursByFormat(tour.format).filter((t) => t.slug !== tour.slug);
  const formatName = d.tourTypes[tour.format].name;
  const bookHref = waLink(waBookTour(lang, tour.name[lang], tour.price[lang]));

  const facts = [
    { label: d.tourDetail.facts.duration, value: tour.duration[lang] },
    { label: d.tourDetail.facts.group, value: tour.group[lang] },
    { label: d.tourDetail.facts.area, value: tour.area[lang] },
    { label: d.tourDetail.facts.pickup, value: tour.pickup[lang] },
    { label: d.tourDetail.facts.difficulty, value: tour.difficulty[lang] },
  ];

  return (
    <>
      {/* ---------------- header ---------------- */}
      <section className="pt-28 sm:pt-36">
        <div className="container-vbt">
          <Reveal>
            <TransitionLink
              href={`/tour/${tour.format}`}
              className="link-underline text-[0.84rem] text-muted"
            >
              ← {d.tourDetail.back} {formatName}
            </TransitionLink>

            <p className="mt-8 text-[0.76rem] uppercase tracking-[0.14em] text-faint">
              {tour.area[lang]}
            </p>
            <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
              {tour.name[lang]}
            </h1>
            <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-relaxed text-muted">
              {tour.tagline[lang]}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 aspect-16/9 overflow-hidden rounded-xl border border-line">
              <Scene variant={tour.scene} seed={2} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- body ---------------- */}
      <section className="section-y">
        <div className="container-vbt">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
            {/* main column */}
            <div className="min-w-0">
              <Reveal>
                <h2 className="text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                  {d.tourDetail.overview}
                </h2>
                <p className="mt-4 max-w-[66ch] text-[1rem] leading-relaxed text-ink-2">
                  {tour.summary[lang]}
                </p>
              </Reveal>

              {/* highlights */}
              <Reveal delay={0.05}>
                <h2 className="mt-12 text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                  {d.tourDetail.highlights}
                </h2>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {tour.highlights[lang].map((h) => (
                    <li key={h} className="py-3 text-[0.95rem] leading-relaxed text-ink-2">
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* itinerary */}
              <Reveal delay={0.05}>
                <h2 className="mt-12 text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                  {d.tourDetail.itinerary}
                </h2>
              </Reveal>
              <ol className="mt-4 border-l border-line">
                {tour.itinerary.map((stop, i) => (
                  <Reveal key={i} delay={0.02} amount={0.1}>
                    <li className="relative pb-7 pl-7 last:pb-0">
                      <span className="absolute -left-[3.5px] top-[0.55rem] h-[7px] w-[7px] rounded-full bg-lagoon" />
                      <span className="block font-display text-[0.86rem] font-medium tabular-nums text-lagoon-deep">
                        {stop.time}
                      </span>
                      <h3 className="mt-1 font-display text-[1.02rem] font-medium text-ink">
                        {stop.title[lang]}
                      </h3>
                      <p className="mt-1 max-w-[60ch] text-[0.92rem] leading-relaxed text-muted">
                        {stop.desc[lang]}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>

              {/* includes / excludes */}
              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                <Reveal>
                  <h2 className="text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                    {d.tourDetail.includes}
                  </h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {tour.includes[lang].map((x) => (
                      <li key={x} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-ink-2">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lagoon" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                    {d.tourDetail.excludes}
                  </h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {tour.excludes[lang].map((x) => (
                      <li key={x} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-muted">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {/* what to bring */}
              <Reveal delay={0.05}>
                <h2 className="mt-12 text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                  {d.tourDetail.bring}
                </h2>
                <p className="mt-3 max-w-[60ch] text-[0.94rem] leading-relaxed text-ink-2">
                  {tour.bring[lang].join(" · ")}
                </p>
              </Reveal>

              {/* gallery */}
              <Reveal delay={0.05}>
                <div className="mt-12 grid grid-cols-3 gap-3">
                  {tour.gallery.map((g, i) => (
                    <div
                      key={`${g}-${i}`}
                      className="aspect-square overflow-hidden rounded-lg border border-line"
                    >
                      <Scene variant={g} seed={i + 4} />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* booking rail */}
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <Reveal>
                <div className="rounded-xl border border-line bg-surface p-6">
                  <p className="text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                    {d.tourDetail.facts.price}
                  </p>
                  <p className="mt-2 font-display text-[1.7rem] font-semibold tracking-tight text-ink">
                    {tour.price[lang]}
                  </p>
                  <p className="mt-1 text-[0.86rem] text-muted">{tour.priceUnit[lang]}</p>

                  <dl className="mt-6 divide-y divide-line border-y border-line">
                    {facts.map((f) => (
                      <div key={f.label} className="flex gap-4 py-2.5">
                        <dt className="w-[6.5rem] shrink-0 text-[0.8rem] text-faint">{f.label}</dt>
                        <dd className="text-[0.86rem] leading-snug text-ink-2">{f.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href={bookHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonClass("book", "md", "mt-6 w-full")}
                  >
                    {d.tourDetail.book}
                  </a>
                  <p className="mt-3 text-[0.76rem] leading-relaxed text-faint">
                    {d.tourDetail.bookNote}
                  </p>

                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-[0.82rem] text-muted">{d.tourDetail.ask}</p>
                    <a
                      href={waLink(WA_GENERAL[lang])}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline mt-1 inline-block text-[0.88rem] font-medium text-lagoon-deep"
                    >
                      {d.tourDetail.askCta}
                    </a>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- other tours ---------------- */}
      {others.length > 0 && (
        <section className="border-t border-line bg-paper-2 section-y">
          <div className="container-vbt">
            <Reveal>
              <h2 className="font-display text-[1.35rem] font-medium tracking-tight text-ink">
                {d.tourDetail.otherTours}
              </h2>
            </Reveal>
            <RevealGroup className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {others.map((t, i) => (
                <RevealItem key={t.slug}>
                  <TourCard tour={t} index={i} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
