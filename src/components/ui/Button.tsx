"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "sun" | "ink" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-[transform,box-shadow,background-color,color] duration-300 will-change-transform disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-lagoon-600 text-sand shadow-[0_10px_30px_-10px_rgba(5,146,143,0.85)] hover:bg-lagoon-700 hover:shadow-[0_18px_44px_-12px_rgba(5,146,143,0.9)]",
  secondary:
    "bg-coral-500 text-white shadow-[0_10px_30px_-10px_rgba(239,69,41,0.8)] hover:bg-coral-600 hover:shadow-[0_18px_44px_-12px_rgba(239,69,41,0.85)]",
  sun: "bg-sunbeam-400 text-ink shadow-[0_10px_30px_-10px_rgba(249,169,11,0.85)] hover:bg-sunbeam-500 hover:shadow-[0_18px_44px_-12px_rgba(249,169,11,0.9)]",
  ink: "bg-ink text-sand hover:bg-ink-2",
  outline:
    "border-2 border-ink/15 bg-white/70 text-ink backdrop-blur hover:border-lagoon-500 hover:text-lagoon-700",
  ghost: "text-ink/75 hover:bg-ink/5 hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  shine?: boolean;
};

/**
 * Magnetic button: the label leans toward the cursor while a soft light
 * follows underneath it.
 */
export function Button({
  variant = "primary",
  size = "md",
  magnetic = true,
  shine = true,
  className,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [light, setLight] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    setLight({ x: (px / r.width) * 100, y: (py / r.height) * 100, on: true });
    if (magnetic && !reduce) {
      setPos({
        x: (px - r.width / 2) * 0.22,
        y: (py - r.height / 2) * 0.3,
      });
    }
  };

  const reset = () => {
    setPos({ x: 0, y: 0 });
    setLight((l) => ({ ...l, on: false }));
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
      whileTap={{ scale: 0.96 }}
      className={cn(base, variants[variant], sizes[size], shine && "shine", className)}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {/* cursor light */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120px circle at ${light.x}% ${light.y}%, rgba(255,255,255,0.35), transparent 60%)`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

/** Same visual language, but renders as an anchor-like wrapper. */
export function ButtonShell({
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn(base, variants[variant], sizes[size], "shine", className)}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </span>
  );
}
