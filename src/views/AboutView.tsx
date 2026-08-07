"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { CtaBand, PageHero, StatsRow } from "@/components/sections/Common";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Photo } from "@/components/graphics/Photo";
import { Avatar } from "@/components/graphics/Brand";

export function AboutView() {
  const { d } = useLang();

  return (
    <>
      <PageHero
        eyebrow={d.about.hero.eyebrow}
        title={d.about.hero.title}
        subtitle={d.about.hero.subtitle}
        photo="locSidemen"
      />

      {/* ---------------- story ---------------- */}
      <section className="section-y">
        <div className="container-vbt">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-line">
                <Photo
                  name="travellerViewpoint"
                  alt={d.about.story.title}
                  sizes="(max-width: 1024px) 100vw, 32vw"
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading eyebrow={d.about.story.eyebrow} title={d.about.story.title} />
              <div className="mt-6 flex max-w-[64ch] flex-col gap-4">
                {d.about.story.body.map((p, i) => (
                  <Reveal key={i} delay={0.04 + i * 0.05}>
                    <p className="text-[0.96rem] leading-relaxed text-muted">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- values ---------------- */}
      <section className="border-y border-line bg-paper-2 section-y">
        <div className="container-vbt">
          <SectionHeading eyebrow={d.about.values.eyebrow} title={d.about.values.title} />

          <RevealGroup className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {d.about.values.items.map((v, i) => (
              <RevealItem key={v.title}>
                <div className="border-t border-ink pt-5">
                  <span className="font-display text-[0.82rem] font-medium tabular-nums text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[1.12rem] font-medium tracking-tight text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted">{v.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- timeline ---------------- */}
      <section className="section-y">
        <div className="container-vbt">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <SectionHeading eyebrow={d.about.timeline.eyebrow} title={d.about.timeline.title} />

            <ol className="divide-y divide-line border-y border-line">
              {d.about.timeline.items.map((m) => (
                <Reveal key={m.year} amount={0.1}>
                  <li className="flex flex-col gap-1.5 py-5 sm:flex-row sm:gap-8">
                    <span className="w-16 shrink-0 font-display text-[0.9rem] font-medium tabular-nums text-lagoon-deep">
                      {m.year}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.02rem] font-medium text-ink">
                        {m.title}
                      </h3>
                      <p className="mt-1 max-w-[58ch] text-[0.92rem] leading-relaxed text-muted">
                        {m.desc}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- team ---------------- */}
      <section className="border-y border-line bg-paper-2 section-y">
        <div className="container-vbt">
          <SectionHeading eyebrow={d.about.team.eyebrow} title={d.about.team.title} />

          <RevealGroup className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {d.about.team.items.map((p) => (
              <RevealItem key={p.name}>
                <Avatar name={p.name} size={52} />
                <h3 className="mt-4 font-display text-[1.02rem] font-medium text-ink">
                  {p.name}
                </h3>
                <p className="mt-0.5 text-[0.8rem] text-lagoon-deep">{p.role}</p>
                <p className="mt-2.5 text-[0.89rem] leading-relaxed text-muted">{p.bio}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- credentials + numbers ---------------- */}
      <section className="section-y">
        <div className="container-vbt">
          <Reveal>
            <h2 className="font-display text-[1.3rem] font-medium tracking-tight text-ink">
              {d.about.certs.title}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
              {d.about.certs.items.map((c) => (
                <li key={c} className="text-[0.9rem] text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12">
            <StatsRow items={d.testimonial.stats} />
          </div>
        </div>
      </section>

      <CtaBand title={d.about.cta.title} subtitle={d.about.cta.subtitle} photo="travellersPalms" />
    </>
  );
}
