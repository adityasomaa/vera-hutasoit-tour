"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useTransition } from "@/components/providers/TransitionProvider";
import { useLang } from "@/components/providers/LanguageProvider";
import { LogoMark } from "@/components/graphics/Brand";

/**
 * LOADER 2 — the page-to-page curtain.
 *
 * Strict order, and every step is invisible to the visitor:
 *   1. close   — the panel rises and fully covers the viewport
 *   2. swap    — router.push() happens only once the panel is opaque
 *   3. scroll  — the new page is jumped to the top, still hidden
 *   4. open    — the panel lifts away, revealing a page already at the top
 *
 * Landing on the home page reuses the brand mark so it echoes the arrival
 * loader; every other route gets the destination's name instead.
 */

const PANEL: Variants = {
  idle: {
    y: "101%",
    borderTopLeftRadius: "55%",
    borderTopRightRadius: "55%",
    borderBottomLeftRadius: "0%",
    borderBottomRightRadius: "0%",
  },
  closing: {
    y: "0%",
    borderTopLeftRadius: "0%",
    borderTopRightRadius: "0%",
    borderBottomLeftRadius: "0%",
    borderBottomRightRadius: "0%",
    transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] },
  },
  covered: {
    y: "0%",
    borderTopLeftRadius: "0%",
    borderTopRightRadius: "0%",
    borderBottomLeftRadius: "0%",
    borderBottomRightRadius: "0%",
    transition: { duration: 0 },
  },
  opening: {
    y: "-101%",
    borderTopLeftRadius: "0%",
    borderTopRightRadius: "0%",
    borderBottomLeftRadius: "55%",
    borderBottomRightRadius: "55%",
    transition: { duration: 0.9, ease: [0.83, 0, 0.17, 1] },
  },
};

const INNER: Variants = {
  idle: { opacity: 0, y: 26, scale: 0.96 },
  closing: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.42, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  covered: { opacity: 1, y: 0, scale: 1 },
  opening: { opacity: 0, y: -18, scale: 0.98, transition: { duration: 0.3 } },
};

const SLAT: Variants = {
  idle: { scaleY: 0 },
  closing: { scaleY: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  covered: { scaleY: 1 },
  opening: { scaleY: 0, transition: { duration: 0.35 } },
};

export function PageCurtain() {
  const { phase, target, startCovered, onCoverComplete, onRevealComplete } =
    useTransition();
  const { d } = useLang();
  const reduce = useReducedMotion();

  if (phase === "idle") return null;

  const path = (target ?? "/").split("#")[0];
  const isHome = path === "/";

  const labels: Record<string, string> = {
    "/": d.nav.home,
    "/about": d.nav.about,
    "/tour": d.nav.tour,
    "/testimonial": d.nav.testimonial,
    "/contact": d.nav.contact,
    "/privacy-policy": d.nav.privacy,
    "/terms-of-use": d.nav.terms,
  };
  const label = labels[path] ?? d.brand.name;

  return (
    <motion.div
      className="fixed inset-0 z-[190] flex items-center justify-center overflow-hidden bg-ink"
      variants={PANEL}
      initial={startCovered ? "covered" : "idle"}
      animate={phase}
      transition={reduce ? { duration: 0.15 } : undefined}
      onAnimationComplete={(def) => {
        if (def === "closing") onCoverComplete();
        if (def === "opening") onRevealComplete();
      }}
      aria-hidden="true"
    >
      {/* vertical slats give the flat panel some depth as it rises */}
      <div className="pointer-events-none absolute inset-0 flex">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.span
            key={i}
            variants={SLAT}
            custom={i}
            transition={{ delay: i * 0.035 }}
            className="h-full flex-1 origin-bottom bg-gradient-to-b from-white/[0.05] to-transparent"
            style={{ borderRight: "1px solid rgba(255,255,255,0.035)" }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-lagoon-500/20 blur-3xl" />
        <div
          className="animate-blob absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-coral-500/15 blur-3xl"
          style={{ animationDelay: "-8s" }}
        />
      </div>
      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" />

      <motion.div
        variants={INNER}
        className="relative flex flex-col items-center px-8 text-center"
      >
        {isHome ? (
          <>
            <span className="relative">
              <span className="absolute inset-0 rounded-[1.2rem] bg-lagoon-400/40 blur-2xl" />
              <LogoMark animated className="relative h-16 w-16" />
            </span>
            <span className="mt-6 font-display text-[clamp(1.8rem,7vw,3rem)] font-extrabold leading-none">
              <span className="bg-gradient-to-r from-lagoon-300 via-sunbeam-300 to-coral-400 bg-clip-text text-transparent">
                {d.brand.name}
              </span>
            </span>
            <span className="mt-4 max-w-xs text-sm leading-relaxed text-sand/45">
              {d.brand.tagline}
            </span>
          </>
        ) : (
          <>
            <span className="text-[0.66rem] font-bold uppercase tracking-[0.42em] text-sand/40">
              {d.loader.loading}
            </span>
            <span className="mt-4 font-display text-[clamp(2.2rem,9vw,4.5rem)] font-extrabold leading-none text-sand">
              {label}
            </span>
            <span className="mt-6 flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-sunbeam-400"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.25, 0.8] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: i * 0.16,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
          </>
        )}

        {/* thin sweeping line, shared by both variants */}
        <span className="mt-9 block h-px w-40 overflow-hidden bg-sand/10">
          <motion.span
            className="block h-full w-1/3 bg-gradient-to-r from-transparent via-sunbeam-400 to-transparent"
            animate={{ x: ["-120%", "320%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </motion.div>
  );
}
