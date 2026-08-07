"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useHeaderTone } from "@/components/providers/HeaderToneProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { buttonClass } from "@/components/ui/Button";
import { Photo } from "@/components/graphics/Photo";
import { PHOTOS } from "@/lib/photos";
import { HERO_SLIDES, waLink, WA_GENERAL } from "@/lib/site";
import { cn } from "@/lib/utils";

const INTERVAL = 6200;

/**
 * Home hero. Iconic Bali frames crossfading behind the headline.
 *
 * Each photograph declares whether it reads dark or light; the slider passes
 * that up so the header can switch between its two colour schemes and stay
 * legible, and picks its own text colour and scrim to match.
 */
export function HeroSlider() {
  const { d, lang } = useLang();
  const { setTone } = useHeaderTone();
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const hovering = useRef(false);

  const slide = PHOTOS[HERO_SLIDES[index]];
  // a dark photograph needs light type, and vice versa
  const scheme = slide.tone === "dark" ? "light" : "dark";

  /* tell the header which scheme keeps it readable */
  useEffect(() => {
    setTone(scheme);
    return () => setTone(null);
  }, [scheme, setTone]);

  /* autoplay */
  useEffect(() => {
    if (reduce || !playing) return;
    const t = setInterval(() => {
      if (!hovering.current) setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [reduce, playing]);

  const light = scheme === "light";

  return (
    <section
      className="relative isolate flex min-h-[min(90dvh,48rem)] items-end overflow-hidden"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      aria-roledescription="carousel"
      aria-label={d.home.hero.title}
    >
      {/* frames */}
      {HERO_SLIDES.map((key, i) => (
        <motion.div
          key={key}
          className="absolute inset-0 -z-10"
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut" }}
          aria-hidden={i !== index}
        >
          <Photo name={key} alt="" sizes="100vw" priority={i === 0} />
        </motion.div>
      ))}

      {/* flat scrim, sized to the scheme — no gradient */}
      <div
        className={cn(
          "absolute inset-0 -z-10 transition-colors duration-700",
          light ? "bg-ink/45" : "bg-paper/55"
        )}
        aria-hidden="true"
      />

      <div className="container-vbt relative w-full pb-14 pt-36 sm:pb-20 sm:pt-44">
        <div className="max-w-2xl">
          <motion.p
            key={`eyebrow-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className={cn(
              "text-[0.72rem] font-semibold uppercase tracking-[0.18em]",
              light ? "text-paper/75" : "text-ink/65"
            )}
          >
            {d.home.hero.eyebrow}
          </motion.p>

          <h1
            className={cn(
              "mt-5 font-display text-[clamp(2.3rem,6vw,4rem)] font-semibold leading-[1.03] tracking-[-0.035em]",
              light ? "text-paper" : "text-ink"
            )}
          >
            {d.home.hero.title}
          </h1>

          <p
            className={cn(
              "mt-5 max-w-[50ch] text-[1rem] leading-relaxed",
              light ? "text-paper/80" : "text-ink-2"
            )}
          >
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
            <TransitionLink
              href="/tour"
              className={cn(
                buttonClass("outline", "lg"),
                light
                  ? "border-paper/40 text-paper hover:border-paper hover:bg-paper/10"
                  : "border-ink/25 text-ink hover:border-ink hover:bg-ink/5"
              )}
            >
              {d.home.hero.ctaSecondary}
            </TransitionLink>
          </div>
        </div>

        {/* controls */}
        <div className="mt-12 flex items-center gap-4">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((key, i) => (
              <button
                key={key}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${d.home.hero.slideLabel} ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === index ? "w-8" : "w-4 opacity-45 hover:opacity-80",
                  light ? "bg-paper" : "bg-ink"
                )}
              />
            ))}
          </div>

          {!reduce && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? d.home.hero.pause : d.home.hero.play}
              className={cn(
                "grid h-7 w-7 place-items-center rounded-full border transition-colors duration-200",
                light
                  ? "border-paper/35 text-paper/80 hover:border-paper hover:text-paper"
                  : "border-ink/25 text-ink/70 hover:border-ink hover:text-ink"
              )}
            >
              {playing ? (
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
                  <rect x="1" y="1" width="2.6" height="8" rx="0.6" />
                  <rect x="6.4" y="1" width="2.6" height="8" rx="0.6" />
                </svg>
              ) : (
                <svg viewBox="0 0 10 10" className="ml-0.5 h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
                  <path d="M1.5 1l7 4-7 4z" />
                </svg>
              )}
            </button>
          )}

          <span
            className={cn(
              "ml-auto hidden text-[0.78rem] tabular-nums sm:block",
              light ? "text-paper/60" : "text-ink/55"
            )}
          >
            {String(index + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
