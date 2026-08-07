"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/** Tri-colour reading progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[150] h-[3px] origin-left bg-gradient-to-r from-lagoon-500 via-sunbeam-400 to-coral-500"
      aria-hidden
    />
  );
}

/** Soft light that trails the cursor. Pointer-fine devices only. */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -300, y: -300 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches || reduce.matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[5] h-[26rem] w-[26rem] rounded-full opacity-[0.55] mix-blend-multiply blur-[90px]"
      style={{
        background:
          "radial-gradient(circle, rgba(95,230,219,0.55), rgba(255,197,61,0.28) 45%, transparent 70%)",
      }}
      animate={{ x: pos.x - 208, y: pos.y - 208 }}
      transition={{ type: "spring", stiffness: 40, damping: 18, mass: 0.9 }}
    />
  );
}

/** Full-page paper grain. */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="grain-layer pointer-events-none fixed inset-0 z-[6] opacity-[0.045] mix-blend-multiply"
    />
  );
}
