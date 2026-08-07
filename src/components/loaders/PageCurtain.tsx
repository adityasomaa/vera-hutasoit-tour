"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useTransition } from "@/components/providers/TransitionProvider";
import { useLang } from "@/components/providers/LanguageProvider";
import { LogoMark } from "@/components/graphics/Brand";
import { isTourFormat } from "@/lib/tours";

/**
 * LOADER 2 — the page-to-page curtain.
 *
 * Strict order, all of it invisible to the visitor:
 *   1. close   — the panel rises and fully covers the viewport
 *   2. swap    — router.push() runs only once the panel is opaque
 *   3. scroll  — the new page is jumped to the top, still hidden
 *   4. open    — the panel lifts away, revealing a page already at the top
 *
 * Landing on home shows the mark, echoing the arrival loader. Every other
 * route shows its name.
 */

const PANEL: Variants = {
  idle: { y: "101%" },
  closing: { y: "0%", transition: { duration: 0.62, ease: [0.76, 0, 0.24, 1] } },
  covered: { y: "0%", transition: { duration: 0 } },
  opening: { y: "-101%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
};

const INNER: Variants = {
  idle: { opacity: 0 },
  closing: { opacity: 1, transition: { delay: 0.34, duration: 0.3 } },
  covered: { opacity: 1 },
  opening: { opacity: 0, transition: { duration: 0.2 } },
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

  let label = labels[path];
  if (!label) {
    // /tour/private, /tour/sharing and their detail pages
    const seg = path.split("/").filter(Boolean);
    if (seg[0] === "tour" && seg[1] && isTourFormat(seg[1])) {
      label = d.tourTypes[seg[1]].name;
    } else {
      label = d.brand.name;
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[190] flex items-center justify-center bg-ink"
      variants={PANEL}
      initial={startCovered ? "covered" : "idle"}
      animate={phase}
      transition={reduce ? { duration: 0.12 } : undefined}
      onAnimationComplete={(def) => {
        if (def === "closing") onCoverComplete();
        if (def === "opening") onRevealComplete();
      }}
      aria-hidden="true"
    >
      <motion.div variants={INNER} className="flex flex-col items-center px-8 text-center">
        {isHome ? (
          <>
            <LogoMark className="h-11 w-11" />
            <span className="mt-5 font-display text-lg font-medium tracking-tight text-paper">
              {d.brand.name}
            </span>
          </>
        ) : (
          <>
            <span className="text-[0.68rem] uppercase tracking-[0.2em] text-paper/40">
              {d.loader.loading}
            </span>
            <span className="mt-3 font-display text-[clamp(1.7rem,6vw,2.6rem)] font-medium tracking-tight text-paper">
              {label}
            </span>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
