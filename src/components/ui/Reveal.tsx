"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Dir = "up" | "down" | "left" | "right" | "scale" | "blur";

const offset: Record<Dir, { x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { y: 34 },
  down: { y: -34 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.92 },
  blur: { y: 18, filter: "blur(10px)" },
};

export function Reveal({
  children,
  className,
  delay = 0,
  dir = "up",
  once = true,
  amount = 0.25,
  duration = 0.72,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dir?: Dir;
  once?: boolean;
  amount?: number;
  duration?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <M
      className={className}
      initial={{ opacity: 0, filter: "blur(0px)", ...offset[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}

/** Staggered container — children should be <RevealItem>. */
const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] } },
};

export function RevealGroup({
  children,
  className,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={itemV}>
      {children}
    </motion.div>
  );
}

/** Word-by-word headline reveal. */
export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "110%", opacity: 0, rotate: 4 },
              show: {
                y: "0%",
                opacity: 1,
                rotate: 0,
                transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
