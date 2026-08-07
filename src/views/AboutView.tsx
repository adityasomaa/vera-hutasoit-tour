"use client";

import { motion } from "motion/react";
import {
  Award,
  Heart,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  Sprout,
  Timer,
  Wallet,
} from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { CtaBand, PageHero, StatsBand } from "@/components/sections/Common";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Scene } from "@/components/graphics/Scene";
import { Avatar, Blobs, StarBurst } from "@/components/graphics/Brand";
import { PillMarquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

const VALUE_ICONS = [Timer, Wallet, HeartHandshake];
const CERT_ICONS = [Landmark, ShieldCheck, Award, Sprout];

export function AboutView() {
  const { d } = useLang();

  return (
    <>
      <PageHero
        eyebrow={d.about.hero.eyebrow}
        title={d.about.hero.title}
        subtitle={d.about.hero.subtitle}
        scene="village"
        tone="coral"
      />

      {/* ---------------- story ---------------- */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <Blobs variant="lagoon" className="opacity-45" />
        <div className="container-vbt relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal dir="right">
              <div className="relative">
                <div className="overflow-hidden rounded-[2.25rem] border-4 border-sand shadow-[0_40px_90px_-42px_rgba(6,23,29,0.55)]">
                  <div className="aspect-4/5">
                    <Scene variant="terrace" seed={6} />
                  </div>
                </div>
                <div className="animate-float absolute -bottom-8 -right-4 w-40 overflow-hidden rounded-2xl border-4 border-sand shadow-2xl sm:-right-8 sm:w-52">
                  <div className="aspect-square">
                    <Scene variant="waterfall" seed={2} />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                  className="absolute -left-4 top-10 rounded-2xl bg-gradient-to-br from-sunbeam-400 to-coral-500 px-4 py-3 text-white shadow-xl"
                >
                  <p className="font-display text-2xl font-extrabold leading-none">2014</p>
                  <p className="mt-1 text-[0.66rem] font-bold uppercase tracking-widest opacity-80">
                    Est.
                  </p>
                </motion.div>
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow={d.about.story.eyebrow}
                title={d.about.story.title}
                align="left"
              />
              <div className="mt-7 space-y-5">
                {d.about.story.body.map((p, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.08}>
                    <p
                      className={cn(
                        "leading-relaxed text-ink/65",
                        i === 0 ? "text-lg font-medium text-ink/75" : "text-[0.98rem]"
                      )}
                    >
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- values ---------------- */}
      <section className="relative overflow-hidden bg-sand-2/60 py-20 sm:py-28">
        <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-25" />
        <div className="container-vbt relative">
          <SectionHeading eyebrow={d.about.values.eyebrow} title={d.about.values.title} />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {d.about.values.items.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              const tones = [
                "from-lagoon-400 to-lagoon-600",
                "from-sunbeam-400 to-sunbeam-600",
                "from-coral-400 to-coral-600",
              ];
              return (
                <RevealItem key={v.title}>
                  <TiltCard className="h-full" intensity={7}>
                    <div className="group surface-card relative h-full overflow-hidden rounded-3xl p-7">
                      <span
                        className={cn(
                          "mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                          tones[i]
                        )}
                      >
                        <Icon className="h-7 w-7" />
                      </span>
                      <h3 className="font-display text-xl font-extrabold text-ink">{v.title}</h3>
                      <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/60">{v.desc}</p>
                      <StarBurst className="absolute right-6 top-6 h-4 w-4 text-sunbeam-300 opacity-0 transition-all duration-500 group-hover:rotate-90 group-hover:opacity-100" />
                    </div>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- timeline ---------------- */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.about.timeline.eyebrow}
            title={d.about.timeline.title}
            align="left"
          />

          <div className="relative mt-14">
            <div className="absolute left-[1.15rem] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-lagoon-400 via-sunbeam-400 to-coral-400 sm:left-1/2 sm:-translate-x-1/2" />

            <ol className="space-y-8 sm:space-y-0">
              {d.about.timeline.items.map((m, i) => {
                const right = i % 2 === 1;
                return (
                  <li key={m.year} className="relative sm:grid sm:grid-cols-2 sm:gap-10">
                    <Reveal
                      dir={right ? "left" : "right"}
                      delay={0.05}
                      className={cn(
                        "pl-14 sm:pl-0",
                        right ? "sm:col-start-2 sm:pl-12 sm:pt-10" : "sm:col-start-1 sm:pr-12 sm:text-right"
                      )}
                    >
                      <div className="group surface-card rounded-2xl p-5 transition-transform duration-400 hover:-translate-y-1">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 font-display text-[0.72rem] font-extrabold tracking-wider text-sand">
                          {m.year}
                        </span>
                        <h3 className="mt-3 font-display text-lg font-extrabold text-ink">
                          {m.title}
                        </h3>
                        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink/60">
                          {m.desc}
                        </p>
                      </div>
                    </Reveal>

                    {/* node */}
                    <span
                      className={cn(
                        "absolute left-[0.6rem] top-6 grid h-5 w-5 place-items-center rounded-full border-4 border-sand bg-lagoon-500 shadow sm:left-1/2 sm:-translate-x-1/2",
                        right && "sm:top-16"
                      )}
                    >
                      <span className="absolute inset-0 rounded-full bg-lagoon-400/60 [animation:vbt-pulse-ring_3s_ease-out_infinite]" />
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- team ---------------- */}
      <section className="relative overflow-hidden bg-ink py-20 text-sand sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-blob absolute -left-24 top-0 h-96 w-96 rounded-full bg-lagoon-500/20 blur-3xl" />
          <div
            className="animate-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-coral-500/15 blur-3xl"
            style={{ animationDelay: "-8s" }}
          />
        </div>
        <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.about.team.eyebrow}
            title={d.about.team.title}
            subtitle={d.about.team.subtitle}
            light
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.about.team.items.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.09}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.08]">
                  <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lagoon-400/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <Avatar
                    name={p.name}
                    size={68}
                    className="rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
                  />
                  <h3 className="mt-5 font-display text-lg font-extrabold text-sand">{p.name}</h3>
                  <p className="mt-1 text-[0.76rem] font-bold uppercase tracking-wider text-sunbeam-300">
                    {p.role}
                  </p>
                  <p className="mt-3 text-[0.87rem] leading-relaxed text-sand/55">{p.bio}</p>
                  <Heart className="absolute bottom-5 right-5 h-4 w-4 text-coral-400/0 transition-colors duration-500 group-hover:text-coral-400/70" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- certifications ---------------- */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="container-vbt relative">
          <Reveal>
            <h2 className="text-center font-display text-xl font-extrabold text-ink sm:text-2xl">
              {d.about.certs.title}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.about.certs.items.map((c, i) => {
              const Icon = CERT_ICONS[i];
              return (
                <Reveal key={c} delay={i * 0.08}>
                  <div className="group flex items-center gap-3.5 rounded-2xl border border-ink/10 bg-white/60 p-4 backdrop-blur transition-all duration-400 hover:-translate-y-1 hover:border-lagoon-300 hover:bg-white">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lagoon-50 text-lagoon-600 transition-colors duration-400 group-hover:bg-lagoon-500 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[0.88rem] font-bold leading-snug text-ink/75">{c}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12">
            <PillMarquee
              items={[
                "Ubud",
                "Nusa Penida",
                "Mount Batur",
                "Uluwatu",
                "Sidemen",
                "Munduk",
                "Amed",
                "Lovina",
                "Gili Trawangan",
                "Sekumpul",
              ]}
              speed={30}
            />
          </div>
        </div>
      </section>

      <StatsBand items={d.home.stats.items} />

      <CtaBand
        title={d.about.cta.title}
        subtitle={d.about.cta.subtitle}
        primary={d.about.cta.primary}
        scene="village"
      />
    </>
  );
}
