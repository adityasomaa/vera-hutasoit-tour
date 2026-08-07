"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { PageHero } from "@/components/sections/Common";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE, SOCIALS, waLink, WA_GENERAL } from "@/lib/site";

export function ContactView() {
  const { d, lang } = useLang();

  const hrefs = [
    waLink(WA_GENERAL[lang]),
    `mailto:${SITE.email}`,
    `https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}`,
  ];

  return (
    <>
      <PageHero
        eyebrow={d.contact.hero.eyebrow}
        title={d.contact.hero.title}
        subtitle={d.contact.hero.subtitle}
      />

      {/* ---------------- direct channels ---------------- */}
      <section className="section-y-tight">
        <div className="container-vbt">
          <div className="grid divide-line border-y border-line md:grid-cols-3 md:divide-x">
            {d.contact.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <a
                  href={hrefs[i]}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex h-full flex-col px-0 py-6 md:px-7"
                >
                  <span className="text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                    {c.title}
                  </span>
                  <span className="mt-2 font-display text-[1.02rem] font-medium leading-snug text-ink">
                    <span className="link-underline">{c.value}</span>
                  </span>
                  <span className="mt-1.5 text-[0.84rem] text-muted">{c.note}</span>
                  <span className="mt-4 text-[0.84rem] font-medium text-lagoon-deep">
                    {c.action}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- form + details ---------------- */}
      <section className="section-y">
        <div className="container-vbt">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <SectionHeading title={d.contact.form.title} subtitle={d.contact.form.subtitle} />
              <Reveal delay={0.06}>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-10">
              <Reveal delay={0.08}>
                <h2 className="text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                  {d.contact.hours.title}
                </h2>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {d.contact.hours.items.map((h) => (
                    <div key={h.day} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-[0.9rem] text-muted">{h.day}</dt>
                      <dd className="text-[0.9rem] tabular-nums text-ink">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 max-w-[44ch] text-[0.82rem] leading-relaxed text-faint">
                  {d.contact.hours.note}
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <h2 className="text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                  {d.contact.map.title}
                </h2>
                <div className="mt-4 overflow-hidden rounded-xl border border-line">
                  <StylisedMap />
                </div>
                <p className="mt-3 text-[0.86rem] text-muted">{d.contact.map.note}</p>
                <a
                  href={hrefs[2]}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline mt-2 inline-block text-[0.86rem] font-medium text-lagoon-deep"
                >
                  {d.contact.map.cta}
                </a>
              </Reveal>

              <Reveal delay={0.16}>
                <h2 className="text-[0.76rem] uppercase tracking-[0.14em] text-faint">
                  {d.contact.social.title}
                </h2>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {SOCIALS.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-baseline justify-between gap-4 py-3 text-[0.9rem] text-ink transition-colors hover:text-lagoon-deep"
                      >
                        {s.name}
                        <span className="text-[0.82rem] text-faint">{s.handle}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** A drawn map. No third-party embed, no tracking. */
function StylisedMap() {
  return (
    <svg viewBox="0 0 400 200" className="h-40 w-full" role="img" aria-hidden="true">
      <rect width="400" height="200" fill="#F4EDE2" />
      <path d="M0 150 C 70 138, 150 172, 230 154 C 300 138, 350 166, 400 150 L400 200 L0 200 Z" fill="#DCECE9" />
      <g stroke="#FFFFFF" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M-10 86 C 90 74, 150 110, 250 90 C 320 76, 360 98, 410 88" />
        <path d="M118 -10 C 126 54, 106 120, 128 210" />
        <path d="M290 -10 C 284 46, 300 104, 286 210" />
      </g>
      {[
        [26, 22, 62, 40],
        [148, 16, 96, 46],
        [316, 26, 58, 38],
        [30, 112, 54, 30],
        [164, 112, 84, 32],
        [318, 116, 54, 28],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#E7DFD2" />
      ))}
      <circle cx="80" cy="60" r="13" fill="#AFD5CF" />
      <circle cx="268" cy="140" r="15" fill="#AFD5CF" />
      <g transform="translate(200 84)">
        <path d="M0 12 C -10 0, -12 -5, -12 -10 A12 12 0 1 1 12 -10 C 12 -5, 10 0, 0 12 Z" fill="#CF6A50" />
        <circle cy="-10" r="4" fill="#F4EDE2" />
      </g>
      <text x="200" y="116" textAnchor="middle" fontSize="10" fill="#22343B" opacity="0.6">
        Vera Bali Tour
      </text>
    </svg>
  );
}
