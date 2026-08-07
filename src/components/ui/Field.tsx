"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

/* ================================================================
   Shared field chrome
   ================================================================ */

const controlBase =
  "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-left text-[0.92rem] text-ink outline-none transition-colors duration-200 placeholder:text-faint";
const controlTone = (error?: string) =>
  error ? "border-coral focus:border-coral" : "border-line focus:border-lagoon";

export function Field({
  label,
  hint,
  error,
  required,
  optional,
  htmlFor,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { d } = useLang();
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-[0.8rem] font-medium text-ink-2">
        {label}
        {required && <span className="ml-1 text-coral">*</span>}
        {optional && (
          <span className="ml-1.5 font-normal text-faint">({d.common.optional})</span>
        )}
      </label>
      {hint && <p className="-mt-1 text-[0.78rem] text-faint">{hint}</p>}
      {children}
      {error && <p className="text-[0.78rem] text-coral-deep">{error}</p>}
    </div>
  );
}

/* ================================================================
   Text input / textarea
   ================================================================ */

export function TextInput({
  error,
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return <input className={cn(controlBase, controlTone(error), className)} {...rest} />;
}

export function TextArea({
  error,
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return (
    <textarea
      className={cn(controlBase, controlTone(error), "resize-none leading-relaxed", className)}
      {...rest}
    />
  );
}

/* ================================================================
   Date input — the whole field opens the picker, not just the icon
   ================================================================ */

export function DateInput({
  value,
  onChange,
  error,
  min,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  min?: string;
  id?: string;
}) {
  const { d } = useLang();
  const ref = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    const el = ref.current;
    if (!el) return;
    try {
      // Supported in Chromium, Firefox 101+ and Safari 16+.
      el.showPicker?.();
    } catch {
      // Already open, or the browser refused. Focusing is the fallback.
      el.focus();
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center rounded-lg border bg-surface transition-colors duration-200",
        error ? "border-coral" : "border-line focus-within:border-lagoon"
      )}
      onClick={openPicker}
    >
      <input
        id={id}
        ref={ref}
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        aria-label={d.common.pickDate}
        className={cn(
          "w-full cursor-pointer appearance-none bg-transparent px-3.5 py-2.5 text-[0.92rem] text-ink outline-none",
          // stretch the native indicator across the field so a click anywhere
          // opens the calendar, then hide it behind our own icon
          "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0",
          "[&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
          !value && "text-faint"
        )}
      />
      <svg
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-3.5 h-4 w-4 text-faint"
        fill="none"
        aria-hidden="true"
      >
        <rect x="1.75" y="3.25" width="12.5" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1.75 6.75h12.5M5.25 1.75v2.5M10.75 1.75v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ================================================================
   Select — custom listbox, never the browser default
   ================================================================ */

export function Select({
  options,
  value,
  onChange,
  placeholder,
  error,
  id,
}: {
  options: readonly string[];
  /** index into `options`, or null when nothing is chosen yet */
  value: number | null;
  onChange: (index: number) => void;
  placeholder?: string;
  error?: string;
  id?: string;
}) {
  const { d } = useLang();
  const uid = useId();
  const listId = `${uid}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(value ?? 0);
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);

  /* close on outside click */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  /* move focus into the list when it opens */
  useEffect(() => {
    if (open) {
      setActive(value ?? 0);
      requestAnimationFrame(() => list.current?.focus());
    }
  }, [open, value]);

  const pick = (i: number) => {
    onChange(i);
    setOpen(false);
    btn.current?.focus();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(options.length - 1, a + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick(active);
        break;
      case "Escape":
      case "Tab":
        setOpen(false);
        btn.current?.focus();
        break;
    }
  };

  return (
    <div ref={wrap} className="relative">
      <button
        id={id}
        ref={btn}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-label={placeholder ?? d.common.choose}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          controlBase,
          controlTone(error),
          "flex items-center justify-between gap-3",
          open && !error && "border-lagoon"
        )}
      >
        <span className={cn("truncate", value === null && "text-faint")}>
          {value === null ? (placeholder ?? d.common.choose) : options[value]}
        </span>
        <svg
          viewBox="0 0 10 6"
          className={cn(
            "h-1.5 w-2.5 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            ref={list}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={`${uid}-opt-${active}`}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-30 max-h-60 overflow-y-auto rounded-lg border border-line bg-surface py-1 shadow-[0_14px_36px_-20px_rgba(20,40,45,0.4)] outline-none"
          >
            {options.map((opt, i) => {
              const selected = value === i;
              return (
                <li
                  key={opt}
                  id={`${uid}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => pick(i)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2 text-[0.9rem] transition-colors duration-150",
                    i === active ? "bg-lagoon-faint text-ink" : "text-muted",
                    selected && "text-ink"
                  )}
                >
                  {opt}
                  {selected && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-lagoon" fill="none" aria-hidden="true">
                      <path d="M1.5 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
