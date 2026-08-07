"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Hairline-separated list. No card, no border box, no icon chrome. */
export function Accordion({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-6 py-5 text-left"
            >
              <span
                className={cn(
                  "font-display text-[1.02rem] font-medium leading-snug transition-colors duration-200",
                  isOpen ? "text-ink" : "text-ink-2 group-hover:text-ink"
                )}
              >
                {item.q}
              </span>
              <span
                aria-hidden="true"
                className="relative mt-2 h-2.5 w-2.5 shrink-0"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-faint transition-colors duration-200 group-hover:bg-ink" />
                <span
                  className={cn(
                    "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-faint transition-all duration-300 group-hover:bg-ink",
                    isOpen && "scale-y-0"
                  )}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[68ch] pb-6 pr-10 text-[0.94rem] leading-relaxed text-muted">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
