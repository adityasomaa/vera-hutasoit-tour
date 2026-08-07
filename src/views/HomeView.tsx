"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  Clock3,
  Compass,
  HandCoins,
  MessageSquareHeart,
  Quote,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem, SplitText } from "@/components/ui/Reveal";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { Marquee } from "@/components/ui/Marquee";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { CtaBand, StatsBand } from "@/components/sections/Common";
import { Scene } from "@/components/graphics/Scene";
import { Avatar, Blobs, PatternStrip, StarBurst } from "@/components/graphics/Brand";
import {
  DESTINATION_SCENES,
  FEATURED_TESTIMONIALS,
  TOUR_KEYS,
  TOUR_THEME,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const WHY_ICONS = [Compass, HandCoins, CalendarClock, MessageSquareHeart];

export function HomeView() {
  const { d, lang } = useLang();
  const { openModal } = useTourModal();

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pt-40">
        <Blobs variant="tri" />
        <div className="bg-linegrid pointer-events-none absolute inset-0 opacity-40" />

        <div className="container-vbt relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            {/* --- copy --- */}
            <div className="relative z-10">
              <Reveal dir="down">
                <Eyebrow tone="sun">{d.home.hero.eyebrow}</Eyebrow>
              </Reveal>

              <h1 className="mt-6 font-display text-[clamp(2.4rem,8.4vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
                <span className="block">
                  <SplitText text={d.home.hero.title1} />
                </span>
                <span className="block text-gradient-tri">
                  <SplitText text={d.home.hero.title2} delay={0.14} />
                </span>
                <span className="block text-ink/35">
                  <SplitText text={d.home.hero.title3} delay={0.28} />
                </span>
              </h1>

              <Reveal delay={0.3}>
                <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-ink/65 sm:text-lg">
                  {d.home.hero.subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="lg" onClick={() => openModal()}>
                    {d.home.hero.ctaPrimary}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <TransitionLink href="/tour">
                    <span className="group inline-flex items-center gap-2 rounded-full border-2 border-ink/12 bg-white/60 px-7 py-4 text-base font-semibold text-ink backdrop-blur transition-all duration-400 hover:border-lagoon-500 hover:bg-white hover:text-lagoon-700">
                      {d.home.hero.ctaSecondary}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </TransitionLink>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                  {[d.home.hero.badge1, d.home.hero.badge2, d.home.hero.badge3].map(
                    (b, i) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-[0.83rem] font-semibold text-ink/55"
                      >
                        <BadgeCheck
                          className={cn(
                            "h-4 w-4",
                            i === 0 ? "text-lagoon-500" : i === 1 ? "text-sunbeam-500" : "text-coral-500"
                          )}
                        />
                        {b}
                      </li>
                    )
                  )}
                </ul>
              </Reveal>
            </div>

            {/* --- scene collage --- */}
            <Reveal dir="left" delay={0.2}>
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative overflow-hidden rounded-[2.5rem] border-4 border-sand shadow-[0_50px_110px_-45px_rgba(6,23,29,0.6)]"
                >
                  <div className="aspect-4/5 sm:aspect-4/3 lg:aspect-4/5">
                    <Scene variant="terrace" seed={1} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-white/25" />
                </motion.div>

                {/* floating card: rating */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 180, damping: 16 }}
                  className="absolute -left-3 top-8 rotate-[-5deg] rounded-2xl border border-ink/10 bg-sand/95 px-4 py-3 shadow-[0_22px_50px_-24px_rgba(6,23,29,0.6)] backdrop-blur-xl sm:-left-8"
                >
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-sunbeam-400 text-sunbeam-400" />
                    ))}
                  </div>
                  <p className="mt-1.5 font-display text-lg font-extrabold leading-none text-ink">
                    4.9<span className="text-sm text-ink/40">/5</span>
                  </p>
                  <p className="mt-1 text-[0.68rem] font-semibold text-ink/45">
                    {d.testimonial.stats[1].label}
                  </p>
                </motion.div>

                {/* floating card: small scene */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1, type: "spring", stiffness: 180, damping: 16 }}
                  className="absolute -bottom-6 -right-2 w-40 rotate-[6deg] overflow-hidden rounded-2xl border-4 border-sand shadow-[0_26px_56px_-26px_rgba(6,23,29,0.6)] sm:-right-6 sm:w-52"
                >
                  <div className="aspect-4/3">
                    <Scene variant="volcano" seed={4} />
                  </div>
                </motion.div>

                {/* floating pill: guests */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.15, type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute -right-1 top-1/3 flex items-center gap-2 rounded-full border border-ink/10 bg-sand/95 py-2 pl-2 pr-4 shadow-xl backdrop-blur-xl sm:-right-10"
                >
                  <span className="flex -space-x-2.5">
                    {["Sarah Lim", "Tom Bracken", "Yuki Tanaka"].map((n) => (
                      <Avatar key={n} name={n} size={26} className="rounded-full ring-2 ring-sand" />
                    ))}
                  </span>
                  <span className="text-[0.72rem] font-bold text-ink">12,400+</span>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* scroll cue */}
          <Reveal delay={0.7}>
            <div className="mt-16 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-ink/35">
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="grid h-8 w-8 place-items-center rounded-full border border-ink/12"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </motion.span>
              {d.home.hero.scroll}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ TICKER ============================ */}
      <section className="relative overflow-hidden border-y border-ink/8 bg-ink py-5 text-sand">
        <Marquee items={d.home.ticker} speed={38} />
      </section>

      {/* ============================ WHY US ============================ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-25" />
        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.home.why.eyebrow}
            title={d.home.why.title}
            subtitle={d.home.why.subtitle}
          />

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.home.why.items.map((item, i) => {
              const Icon = WHY_ICONS[i];
              const tones = [
                "from-lagoon-400 to-lagoon-600",
                "from-sunbeam-400 to-sunbeam-600",
                "from-coral-400 to-coral-600",
                "from-lagoon-500 to-coral-500",
              ];
              return (
                <RevealItem key={item.title}>
                  <TiltCard className="h-full" intensity={7}>
                    <div className="group surface-card relative h-full overflow-hidden rounded-3xl p-6 transition-shadow duration-500 hover:shadow-[0_34px_70px_-32px_rgba(6,23,29,0.4)]">
                      <span
                        className={cn(
                          "mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                          tones[i]
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="font-display text-lg font-extrabold leading-snug text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink/60">
                        {item.desc}
                      </p>
                      <span className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-gradient-to-br from-lagoon-200/0 to-lagoon-300/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute right-5 top-5 font-display text-3xl font-extrabold text-ink/6">
                        0{i + 1}
                      </span>
                    </div>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ============================ THREE FORMATS ============================ */}
      <section className="relative overflow-hidden bg-sand-2/60 py-20 sm:py-28">
        <Blobs variant="warm" className="opacity-60" />
        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.home.experiences.eyebrow}
            title={d.home.experiences.title}
            subtitle={d.home.experiences.subtitle}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {TOUR_KEYS.map((key, i) => {
              const t = d.tourTypes[key];
              const th = TOUR_THEME[key];
              const badge = [d.tour.labels.popular, d.tour.labels.best, d.tour.labels.flexible][i];
              return (
                <Reveal key={key} delay={i * 0.12}>
                  <TiltCard className="h-full" intensity={6} lift={10}>
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-sand shadow-[0_24px_60px_-32px_rgba(6,23,29,0.35)] transition-shadow duration-500 hover:shadow-[0_44px_90px_-40px_rgba(6,23,29,0.5)]">
                      <div className="relative h-44 overflow-hidden">
                        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                          <Scene variant={th.scene} seed={i + 1} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-sand via-sand/10 to-transparent" />
                        <span
                          className={cn(
                            "absolute left-4 top-4 rounded-full px-3 py-1 text-[0.64rem] font-bold uppercase tracking-wider shadow-sm",
                            th.chip
                          )}
                        >
                          {badge}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6 pt-2">
                        <h3 className="font-display text-2xl font-extrabold text-ink">
                          {t.name}
                        </h3>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/60">
                          {t.desc}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.8rem] font-semibold text-ink/55">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5 text-lagoon-500" />
                            {t.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-coral-500" />
                            {t.group}
                          </span>
                        </div>

                        <ul className="mt-5 space-y-2">
                          {t.features.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-start gap-2 text-[0.85rem] text-ink/65">
                              <StarBurst className="mt-1 h-3 w-3 shrink-0 text-sunbeam-400" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-7">
                          <div className="mb-4 flex items-baseline gap-1.5">
                            <span className="font-display text-2xl font-extrabold text-ink">
                              {t.price}
                            </span>
                            <span className="text-[0.78rem] font-semibold text-ink/40">
                              {t.unit}
                            </span>
                          </div>
                          <Button
                            variant={i === 0 ? "primary" : i === 1 ? "sun" : "secondary"}
                            size="md"
                            magnetic={false}
                            className="w-full"
                            onClick={() => openModal(key)}
                          >
                            {d.home.experiences.cta}
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <TransitionLink
                href="/tour"
                className="link-underline inline-flex items-center gap-2 font-display text-base font-bold text-lagoon-700"
              >
                {d.home.experiences.compare}
                <ArrowRight className="h-4 w-4" />
              </TransitionLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ DESTINATIONS BENTO ============================ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.home.destinations.eyebrow}
            title={d.home.destinations.title}
            subtitle={d.home.destinations.subtitle}
            align="left"
          />

          <div className="mt-14 grid auto-rows-[13rem] grid-cols-2 gap-4 lg:grid-cols-4">
            {d.home.destinations.items.map((item, i) => {
              // bento: first and fourth tiles span extra space on desktop
              const span =
                i === 0
                  ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2"
                  : i === 3
                    ? "col-span-2 lg:col-span-2"
                    : "col-span-1";
              return (
                <Reveal key={item.name} delay={i * 0.07} className={span}>
                  <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-ink/10 shadow-[0_18px_44px_-26px_rgba(6,23,29,0.4)]">
                    <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]">
                      <Scene variant={DESTINATION_SCENES[i]} seed={i} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />

                    <div className="relative flex h-full flex-col justify-end p-5">
                      <span className="mb-2 w-fit rounded-full bg-white/15 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-sand ring-1 ring-inset ring-white/20 backdrop-blur">
                        {item.tag}
                      </span>
                      <h3
                        className={cn(
                          "font-display font-extrabold leading-tight text-sand",
                          i === 0 ? "text-2xl sm:text-3xl" : "text-lg"
                        )}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={cn(
                          "mt-1.5 max-w-sm text-[0.83rem] leading-snug text-sand/0 transition-all duration-500 group-hover:text-sand/75",
                          i === 0 ? "text-sand/70" : "translate-y-2 group-hover:translate-y-0"
                        )}
                      >
                        {item.desc}
                      </p>
                    </div>

                    <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-sand opacity-0 ring-1 ring-inset ring-white/25 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ STEPS ============================ */}
      <section className="relative overflow-hidden bg-ink py-20 text-sand sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-blob absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-lagoon-500/20 blur-3xl" />
          <div
            className="animate-blob absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-sunbeam-500/12 blur-3xl"
            style={{ animationDelay: "-10s" }}
          />
        </div>
        <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.home.steps.eyebrow}
            title={d.home.steps.title}
            subtitle={d.home.steps.subtitle}
            light
          />

          <div className="relative mt-16">
            {/* connecting line */}
            <div className="absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-lagoon-400/60 via-sunbeam-400/40 to-coral-400/0 lg:left-0 lg:top-9 lg:h-px lg:w-full lg:bg-gradient-to-r" />

            <div className="grid gap-8 lg:grid-cols-4">
              {d.home.steps.items.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.12} className="relative pl-16 lg:pl-0">
                  <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-lagoon-400 to-lagoon-600 font-display text-lg font-extrabold text-white shadow-[0_14px_34px_-14px_rgba(15,181,174,0.9)] lg:relative lg:mb-6">
                    {i + 1}
                    <span className="absolute inset-0 rounded-2xl bg-lagoon-400/40 [animation:vbt-pulse-ring_3s_ease-out_infinite]" />
                  </span>
                  <h3 className="font-display text-lg font-extrabold text-sand">{s.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-sand/55">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <StatsBand
        eyebrow={d.home.stats.eyebrow}
        title={d.home.stats.title}
        items={d.home.stats.items}
      />

      {/* ============================ TESTIMONIAL TEASER ============================ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <Blobs variant="lagoon" className="opacity-50" />
        <div className="container-vbt relative">
          <SectionHeading
            eyebrow={d.home.testimonialTeaser.eyebrow}
            title={d.home.testimonialTeaser.title}
            subtitle={d.home.testimonialTeaser.subtitle}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {FEATURED_TESTIMONIALS.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.11}>
                <TiltCard className="h-full" intensity={5}>
                  <figure className="surface-card group relative flex h-full flex-col rounded-3xl p-6">
                    <Quote className="h-8 w-8 text-sunbeam-400/60" />
                    <blockquote className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-ink/70">
                      {t.quote[lang].length > 260
                        ? `${t.quote[lang].slice(0, 258).trimEnd()}…`
                        : t.quote[lang]}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/8 pt-5">
                      <Avatar name={t.name} size={42} />
                      <div className="min-w-0">
                        <p className="font-display text-[0.95rem] font-bold text-ink">
                          {t.name}
                        </p>
                        <p className="text-[0.76rem] text-ink/45">
                          {t.flag} {t.country} · {d.tourTypes[t.tour].name}
                        </p>
                      </div>
                      <span className="ml-auto flex shrink-0 gap-0.5">
                        {Array.from({ length: t.rating }).map((_, s) => (
                          <Star key={s} className="h-3 w-3 fill-sunbeam-400 text-sunbeam-400" />
                        ))}
                      </span>
                    </figcaption>
                  </figure>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <TransitionLink href="/testimonial">
                <span className="group inline-flex items-center gap-2 rounded-full border-2 border-ink/12 bg-white/60 px-6 py-3.5 text-[0.95rem] font-semibold text-ink backdrop-blur transition-all duration-400 hover:border-coral-500 hover:bg-white hover:text-coral-600">
                  {d.home.testimonialTeaser.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </TransitionLink>
            </div>
          </Reveal>
        </div>
        <PatternStrip className="mt-16 text-lagoon-300/50" />
      </section>

      {/* ============================ CTA ============================ */}
      <CtaBand
        title={d.home.cta.title}
        subtitle={d.home.cta.subtitle}
        primary={d.home.cta.primary}
        secondary={d.home.cta.secondary}
        note={d.home.cta.note}
        scene="cliff"
      />
    </>
  );
}
