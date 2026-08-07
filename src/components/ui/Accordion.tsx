"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: { q: string; a: string }[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/10 bg-white/70 backdrop-blur", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="group">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors duration-300 hover:bg-lagoon-50/70 sm:px-7 sm:py-6"
            >
              <span
                className={cn(
                  "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-500",
                  isOpen
                    ? "rotate-[135deg] bg-coral-500 text-white"
                    : "bg-ink/8 text-ink/60 group-hover:bg-lagoon-500 group-hover:text-white"
                )}
              >
                <Plus className="h-4 w-4" strokeWidth={2.6} />
              </span>
              <span
                className={cn(
                  "font-display text-base font-bold leading-snug transition-colors duration-300 sm:text-lg",
                  isOpen ? "text-lagoon-700" : "text-ink"
                )}
              >
                {item.q}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 pl-16 text-[0.95rem] leading-relaxed text-ink/70 sm:px-7 sm:pl-[4.4rem]">
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
