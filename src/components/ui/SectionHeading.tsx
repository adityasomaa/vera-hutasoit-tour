"use client";

import { cn } from "@/lib/utils";
import { Reveal, SplitText } from "@/components/ui/Reveal";
import { Squiggle } from "@/components/graphics/Brand";

export function Eyebrow({
  children,
  className,
  tone = "lagoon",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "lagoon" | "coral" | "sun" | "light";
}) {
  const tones = {
    lagoon: "bg-lagoon-100 text-lagoon-800 ring-lagoon-200",
    coral: "bg-coral-100 text-coral-800 ring-coral-200",
    sun: "bg-sunbeam-100 text-sunbeam-800 ring-sunbeam-200",
    light: "bg-white/15 text-sand ring-white/25",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] ring-1 ring-inset",
        tones,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-70 [animation:vbt-pulse-ring_2.4s_ease-out_infinite]" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "lagoon",
  className,
  light = false,
  squiggle = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "lagoon" | "coral" | "sun" | "light";
  className?: string;
  light?: boolean;
  squiggle?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal dir="down">
          <Eyebrow tone={light ? "light" : tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <h2
        className={cn(
          "max-w-3xl font-display text-[clamp(1.85rem,4.6vw,3.15rem)] font-extrabold leading-[1.06]",
          light ? "text-sand" : "text-ink"
        )}
      >
        <SplitText text={title} />
      </h2>

      {squiggle && (
        <Reveal dir="scale" delay={0.12}>
          <Squiggle
            className={cn(
              align === "center" ? "mx-auto" : "",
              light ? "text-sunbeam-300" : "text-coral-400"
            )}
          />
        </Reveal>
      )}

      {subtitle && (
        <Reveal delay={0.18}>
          <p
            className={cn(
              "max-w-2xl text-[0.98rem] leading-relaxed sm:text-lg",
              light ? "text-sand/75" : "text-ink/65"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
