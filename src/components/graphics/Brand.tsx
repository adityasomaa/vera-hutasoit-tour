"use client";

import { useId } from "react";
import { cn, hashPair, initials, seeded } from "@/lib/utils";

/* ---------------------------------------------------------------- */
/*  Logo mark: a split temple gate that also reads as a "V" and a    */
/*  pair of waves — drawn across all three brand palettes.           */
/* ---------------------------------------------------------------- */

export function LogoMark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 48 48" className={cn("h-9 w-9", className)} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0FB5AE" />
          <stop offset="100%" stopColor="#077473" />
        </linearGradient>
        <linearGradient id={`${uid}b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFC53D" />
          <stop offset="100%" stopColor="#FF6B57" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill={`url(#${uid}a)`} />
      {/* sun */}
      <circle cx="24" cy="19" r="7" fill={`url(#${uid}b)`}>
        {animated && (
          <animate attributeName="r" values="7;8;7" dur="3s" repeatCount="indefinite" />
        )}
      </circle>
      {/* split gate silhouettes forming a V-shaped gap */}
      <path d="M7 40 L11 15 L18 15 L20 40 Z" fill="#FFF8EE" opacity="0.95" />
      <path d="M41 40 L37 15 L30 15 L28 40 Z" fill="#FFF8EE" opacity="0.95" />
      {/* wave base */}
      <path
        d="M4 40 q5 -3.5 10 0 t10 0 t10 0 t10 0 V46 H4 Z"
        fill="#FFF8EE"
        opacity="0.55"
      />
    </svg>
  );
}

export function LogoLockup({
  className,
  compact = false,
  animated = false,
  dark = false,
}: {
  className?: string;
  compact?: boolean;
  animated?: boolean;
  dark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark animated={animated} className={compact ? "h-8 w-8" : "h-9 w-9"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-extrabold tracking-tight",
            dark ? "text-sand" : "text-ink"
          )}
        >
          Vera
          <span className={dark ? "text-lagoon-300" : "text-lagoon-600"}>Bali</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em]",
            dark ? "text-sand/45" : "text-ink/45"
          )}
        >
          Tour
        </span>
      </span>
    </span>
  );
}

/* ---------------------------------------------------------------- */
/*  Generated avatar — deterministic from the person's name.         */
/* ---------------------------------------------------------------- */

export function Avatar({
  name,
  size = 48,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const [a, b] = hashPair(name);
  const n = name.length;
  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-hidden rounded-2xl", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <defs>
          <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={a} />
            <stop offset="100%" stopColor={b} />
          </linearGradient>
        </defs>
        <rect width="64" height="64" fill={`url(#${uid}g)`} />
        <circle cx={12 + seeded(n) * 40} cy={12 + seeded(n + 3) * 20} r={18} fill="#FFF8EE" opacity="0.22" />
        <circle cx={50 - seeded(n + 7) * 30} cy={54 - seeded(n + 11) * 22} r={14} fill="#06171D" opacity="0.14" />
        <text
          x="32"
          y="41"
          textAnchor="middle"
          fontSize="24"
          fontWeight="800"
          fill="#FFF8EE"
          fontFamily="var(--font-display), sans-serif"
        >
          {initials(name)}
        </text>
      </svg>
    </span>
  );
}

/* ---------------------------------------------------------------- */
/*  Decorative background blobs                                      */
/* ---------------------------------------------------------------- */

export function Blobs({
  className,
  variant = "tri",
}: {
  className?: string;
  variant?: "tri" | "lagoon" | "warm";
}) {
  const sets = {
    tri: ["bg-lagoon-300/45", "bg-coral-300/40", "bg-sunbeam-300/45"],
    lagoon: ["bg-lagoon-300/50", "bg-lagoon-200/45", "bg-lagoon-400/35"],
    warm: ["bg-sunbeam-300/50", "bg-coral-300/45", "bg-sunbeam-200/45"],
  }[variant];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "animate-blob absolute -left-24 -top-24 h-[26rem] w-[26rem] blur-3xl",
          sets[0]
        )}
      />
      <div
        className={cn(
          "animate-blob absolute -right-32 top-1/4 h-[30rem] w-[30rem] blur-3xl",
          sets[1]
        )}
        style={{ animationDelay: "-6s" }}
      />
      <div
        className={cn(
          "animate-blob absolute left-1/3 h-[22rem] w-[22rem] blur-3xl",
          sets[2]
        )}
        style={{ animationDelay: "-12s", bottom: "-5rem" }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Small decorative flourishes                                      */
/* ---------------------------------------------------------------- */

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" className={cn("h-4 w-28", className)} aria-hidden="true" fill="none">
      <path
        d="M2 10 q10 -10 20 0 t20 0 t20 0 t20 0 t20 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StarBurst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path
        d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Balinese-inspired repeating border pattern. */
export function PatternStrip({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-3 w-full", className)}
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="vbt-strip" width="24" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 12 L6 0 L12 12 L18 0 L24 12" stroke="currentColor" strokeWidth="2" fill="none" />
        </pattern>
      </defs>
      <rect width="120" height="12" fill="url(#vbt-strip)" />
    </svg>
  );
}
