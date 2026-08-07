"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { LogoMark } from "@/components/graphics/Brand";

/**
 * LOADER 1 — the arrival loader.
 * Runs on a fresh load of the site, so also when someone lands straight on
 * the home page. Flat ink panel, one hairline of progress, then it lifts.
 */
export function IntroLoader() {
  const { d } = useLang();
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const TOTAL = reduce ? 400 : 1900;

  useEffect(() => {
    document.body.dataset.lock = "true";
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / TOTAL);
      setProgress((1 - Math.pow(1 - p, 2.2)) * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);

    // rAF is paused in hidden tabs; never let the loader trap the page.
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
    }, 650);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: reduce ? 0.2 : 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex w-[min(78vw,20rem)] flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <LogoMark className="h-12 w-12" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="mt-6 font-display text-lg font-medium tracking-tight text-paper"
            >
              {d.brand.name}
            </motion.p>

            <div className="mt-8 h-px w-full overflow-hidden bg-paper/15">
              <div
                className="h-full bg-paper/70"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-paper/40">
              {d.loader.tagline}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
