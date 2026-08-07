"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { LogoMark } from "@/components/graphics/Brand";

/**
 * LOADER 1 — the arrival loader.
 * Runs on a fresh load of the site (and therefore whenever someone lands
 * straight on the home page). Deliberately unhurried: brand mark draws in,
 * a counter runs to 100, then the whole panel lifts away as a curved wave.
 */
export function IntroLoader() {
  const { d } = useLang();
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const TOTAL = reduce ? 500 : 2500;

  useEffect(() => {
    document.body.dataset.lock = "true";
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / TOTAL);
      // ease-out so the last stretch feels like it's settling, not stalling
      const eased = 1 - Math.pow(1 - p, 2.4);
      setProgress(eased * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);

    // rAF is paused in hidden tabs; make sure the loader can never trap the page.
    const bail = setTimeout(() => {
      setProgress(100);
      setDone(true);
    }, TOTAL + 2500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(bail);
    };
  }, [TOTAL]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      document.body.dataset.lock = "false";
    }, 700);
    return () => clearTimeout(t);
  }, [done]);

  const phaseIndex = Math.min(
    d.loader.phases.length - 1,
    Math.floor((progress / 100) * d.loader.phases.length)
  );

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
          }}
          transition={{ duration: reduce ? 0.2 : 0.95, ease: [0.83, 0, 0.17, 1] }}
        >
          {/* ambient colour wash */}
          <div className="pointer-events-none absolute inset-0">
            <div className="animate-blob absolute -left-32 top-0 h-[32rem] w-[32rem] rounded-full bg-lagoon-500/25 blur-3xl" />
            <div
              className="animate-blob absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-coral-500/20 blur-3xl"
              style={{ animationDelay: "-7s" }}
            />
            <div
              className="animate-blob absolute left-1/2 top-1/3 h-[24rem] w-[24rem] rounded-full bg-sunbeam-400/15 blur-3xl"
              style={{ animationDelay: "-13s" }}
            />
          </div>
          <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" />

          {/* rotating dashed ring */}
          <svg
            className="animate-spin-slow pointer-events-none absolute h-[min(78vw,30rem)] w-[min(78vw,30rem)] opacity-25"
            viewBox="0 0 200 200"
            aria-hidden
          >
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="#FFC53D"
              strokeWidth="1"
              strokeDasharray="3 12"
            />
            <circle
              cx="100"
              cy="100"
              r="76"
              fill="none"
              stroke="#0FB5AE"
              strokeWidth="1"
              strokeDasharray="18 26"
            />
          </svg>

          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -18 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="absolute inset-0 rounded-[1.4rem] bg-lagoon-400/40 blur-2xl" />
              <LogoMark animated className="relative h-20 w-20 sm:h-24 sm:w-24" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-7 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-sand/50"
            >
              {d.loader.welcome}
            </motion.p>

            <h1 className="mt-3 overflow-hidden font-display text-[clamp(2rem,8vw,3.4rem)] font-extrabold leading-none">
              {"Vera Bali Tour".split(" ").map((word, wi) => (
                <span key={wi} className="mr-3 inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block bg-gradient-to-r from-lagoon-300 via-sunbeam-300 to-coral-400 bg-clip-text text-transparent"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      delay: 0.45 + wi * 0.11,
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* progress */}
            <div className="mt-10 w-[min(78vw,22rem)]">
              <div className="mb-3 flex items-baseline justify-between text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-sand/45">
                <motion.span
                  key={phaseIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {d.loader.phases[phaseIndex]}
                </motion.span>
                <span className="font-display text-base tabular-nums text-sand/80">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-sand/12">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-lagoon-400 via-sunbeam-400 to-coral-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 text-sm text-sand/40"
            >
              {d.loader.tagline}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
