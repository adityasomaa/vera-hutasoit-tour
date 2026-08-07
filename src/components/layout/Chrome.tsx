"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A single hairline of reading progress. Flat colour, nothing else. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[150] h-0.5 origin-left bg-lagoon"
      aria-hidden="true"
    />
  );
}
