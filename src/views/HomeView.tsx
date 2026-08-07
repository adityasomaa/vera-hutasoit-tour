"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { buttonClass } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
import { Scene } from "@/components/graphics/Scene";
import { Avatar } from "@/components/graphics/Brand";
import {
  FEATURED_TESTIMONIALS,
  SITE,
  TOUR_ACCENT,
  TOUR_KEYS,
  TOUR_ROUTE,
  waLink,
  WA_GENERAL,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomeView() {
  const { d, lang } = useLang();
  const { openModal } = useTourModal();

  return (
    <>
      {/* ============================ 1 · HERO ============================ */}
      <section className="pt-28 sm:pt-36">
        <div className="container-vbt">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <Eyebrow>{d.home.hero.eyebrow}</Eyebrow>
              <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.4rem,6.4vw,4.1rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
                {d.home.hero.title}
              </h1>
              <p className="mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-muted">
                {d.home.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={waLink(WA_GENERAL[lang])}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonClass("book", "lg")}
                >
                  {d.home.hero.ctaPrimary}
                </a>
                <TransitionLink href="/tour" className={buttonClass("outline", "lg")}>
                  {d.home.hero.ctaSecondary}
                </TransitionLink>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="aspect-4/5 overflow-hidden rounded-xl border border-line sm:aspect-16/10 lg:aspect-4/5">
                <Scene variant="terrace" seed={1} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <ul className="mt-14 grid gap-y-4 border-t border-line pt-6 sm:grid-cols-3 sm:gap-8">
              {[d.home.hero.stat1, d.home.hero.stat2, d.home.hero.stat3].map((s) => (
                <li key={s} className="text-[0.88rem] text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============================ 2 · ABOUT ============================ */}
      <section className="section-y">
        <div className="container-vbt">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="aspect-square overflow-hidden rounded-xl border border-line">
                <Scene variant="village" seed={6} />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow={d.home.about.eyebrow}
                title={d.home.about.title}
              />
              <div className="mt-6 flex max-w-[62ch] flex-col gap-4">
                {d.home.about.body.map((p, i) => (
                  <Reveal key={i} delay={0.05 + i * 0.06}>
                    <p className="text-[0.96rem] leading-relaxed text-muted">{p}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.15}>
                <dl className="mt-9 divide-y divide-line border-y border-line">
                  {d.home.about.points.map((p) => (
                    <div
                      key={p.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                    >
                      <dt className="text-[0.82rem] uppercase tracking-[0.12em] text-faint">
                        {p.label}
                      </dt>
                      <dd className="text-[0.94rem] text-ink">{p.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.2}>
                <TransitionLink
                  href="/about"
                  className="link-underline mt-7 inline-block text-[0.92rem] font-medium text-lagoon-deep"
                >
                  {d.home.about.cta}
                </TransitionLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 3 · TOUR PACKAGES ============================ */}
      <section className="border-y border-line bg-paper-2 section-y">
        <div className="container-vbt">
          <SectionHeading
            eyebrow={d.home.packages.eyebrow}
            title={d.home.packages.title}
            subtitle={d.home.packages.subtitle}
          />

          <RevealGroup className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {TOUR_KEYS.map((key, i) => {
              const t = d.tourTypes[key];
              const a = TOUR_ACCENT[key];
              const href = TOUR_ROUTE[key];

              const body = (
                <>
                  <div className="aspect-16/10 overflow-hidden rounded-xl border border-line">
                    <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]">
                      <Scene variant={a.scene} seed={i + 2} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full", a.dot)} />
                    <h3 className="font-display text-[1.18rem] font-medium tracking-tight text-ink">
                      <span className="link-underline">{t.name}</span>
                    </h3>
                  </div>

                  <p className="mt-3 max-w-[40ch] text-[0.9rem] leading-relaxed text-muted">
                    {t.desc}
                  </p>

                  <p className="mt-5 border-t border-line pt-3.5 text-[0.86rem] text-ink">
                    <span className="font-display font-medium">{t.price}</span>
                    <span className="text-faint"> · {t.unit}</span>
                  </p>
                  <p className="mt-2 text-[0.86rem] font-medium text-lagoon-deep">
                    {t.action}
                  </p>
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

      {/* ============================ 4 · TESTIMONIAL ============================ */}
      <section className="section-y">
        <div className="container-vbt">
          <SectionHeading
            eyebrow={d.home.testimonial.eyebrow}
            title={d.home.testimonial.title}
          />

          <RevealGroup className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {FEATURED_TESTIMONIALS.map((t) => (
              <RevealItem key={t.id}>
                <figure className="flex h-full flex-col">
                  <Stars n={t.rating} />
                  <blockquote className="mt-4 flex-1 text-[0.94rem] leading-relaxed text-ink-2">
                    {t.quote[lang].length > 230
                      ? `${t.quote[lang].slice(0, 228).trimEnd()}…`
                      : t.quote[lang]}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                    <Avatar name={t.name} size={36} />
                    <span className="min-w-0">
                      <span className="block text-[0.9rem] font-medium text-ink">
                        {t.name}
                      </span>
                      <span className="block text-[0.8rem] text-faint">
                        {t.country} · {d.tourTypes[t.tour].name}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <TransitionLink
              href="/testimonial"
              className="link-underline mt-10 inline-block text-[0.92rem] font-medium text-lagoon-deep"
            >
              {d.home.testimonial.cta}
            </TransitionLink>
          </Reveal>
        </div>
      </section>

      {/* ============================ 5 · CONTACT ============================ */}
      <section className="border-t border-line bg-paper-2 section-y">
        <div className="container-vbt">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow={d.home.contact.eyebrow}
                title={d.home.contact.title}
                subtitle={d.home.contact.subtitle}
              />
              <Reveal delay={0.12}>
                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-[0.8rem] uppercase tracking-[0.12em] text-faint">
                    {d.home.contact.direct}
                  </p>
                  <a
                    href={waLink(WA_GENERAL[lang])}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline mt-2 inline-block font-display text-[1.15rem] font-medium text-ink"
                  >
                    {SITE.whatsappDisplay}
                  </a>
                  <p className="mt-4 text-[0.86rem] text-muted">{SITE.email}</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className={cn("h-3 w-3", i < n ? "text-sunbeam" : "text-line")}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6 0.5 7.6 4.2 11.5 4.6 8.6 7.2 9.4 11 6 9.1 2.6 11 3.4 7.2 0.5 4.6 4.4 4.2Z" />
        </svg>
      ))}
    </span>
  );
}
