"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite ticker. The track holds the items twice and slides exactly -50%,
 * so the loop is seamless regardless of content width.
 */
export function Marquee({
  items,
  className,
  speed = 34,
  reverse = false,
  separator = "✦",
  pauseOnHover = true,
}: {
  items: string[];
  className?: string;
  speed?: number;
  reverse?: boolean;
  separator?: string;
  pauseOnHover?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("group relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="px-6 text-[clamp(1.1rem,2.4vw,1.9rem)] font-display font-extrabold tracking-tight">
              {item}
            </span>
            <span className="text-sunbeam-400 text-lg" aria-hidden>
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Logo/label strip with small pills instead of large type. */
export function PillMarquee({
  items,
  className,
  speed = 28,
  reverse,
}: {
  items: string[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className="flex w-max shrink-0 items-center gap-3 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="shrink-0 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm font-semibold text-ink/70 backdrop-blur"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
