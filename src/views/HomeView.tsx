"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { ContactForm } from "@/components/sections/ContactForm";
import { Photo } from "@/components/graphics/Photo";
import { Avatar } from "@/components/graphics/Brand";
import { Stars } from "@/components/ui/Stars";
import {
  FEATURED_TESTIMONIALS,
  LOCATIONS,
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
      <HeroSlider />

      {/* ============================ 2 · ABOUT ============================ */}
      <section className="section-y">
        <div className="container-vbt">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="relative aspect-square overflow-hidden rounded-xl border border-line">
                <Photo
                  name="travellersTerrace"
                  alt={d.home.about.title}
                  sizes="(max-width: 1024px) 100vw, 36vw"
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading eyebrow={d.home.about.eyebrow} title={d.home.about.title} />
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
            {TOUR_KEYS.map((key) => {
              const t = d.tourTypes[key];
              const a = TOUR_ACCENT[key];
              const href = TOUR_ROUTE[key];

              const body = (
                <>
                  <div className="relative aspect-16/10 overflow-hidden rounded-xl border border-line">
                    <Photo
                      name={a.photo}
                      alt={t.name}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                      className="transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
                    />
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
                  <p className="mt-2 text-[0.86rem] font-medium text-lagoon-deep">{t.action}</p>
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

      {/* ============================ 4 · LOCATIONS ============================ */}
      <section className="section-y">
        <div className="container-vbt">
          <SectionHeading
            eyebrow={d.home.locations.eyebrow}
            title={d.home.locations.title}
            subtitle={d.home.locations.subtitle}
          />

          <RevealGroup className="mt-12 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((loc, i) => {
              const copy = d.home.locations.items[i];
              return (
                <RevealItem key={loc.id}>
                  <article className="group">
                    <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-line">
                      <Photo
                        name={loc.photo}
                        alt={copy.name}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                        className="transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[1.05rem] font-medium tracking-tight text-ink">
                        {copy.name}
                      </h3>
                      <span className="shrink-0 text-[0.76rem] text-faint">{copy.area}</span>
                    </div>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{copy.desc}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ============================ 5 · TESTIMONIAL ============================ */}
      <section className="border-y border-line bg-paper-2 section-y">
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
                      <span className="block text-[0.9rem] font-medium text-ink">{t.name}</span>
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

      {/* ============================ 6 · CONTACT ============================ */}
      <section className="section-y">
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
