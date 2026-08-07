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
   Date input — our own calendar, never the browser's
   ================================================================ */

const iso = (y: number, m: number, day: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const parseIso = (v: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  return { y: +m[1], m: +m[2] - 1, d: +m[3] };
};

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
  /** earliest selectable day, as YYYY-MM-DD */
  min?: string;
  id?: string;
}) {
  const { d, lang } = useLang();
  const locale = lang === "id" ? "id-ID" : "en-GB";
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const selected = parseIso(value);
  const today = new Date();
  const minParts = min ? parseIso(min) : null;

  const [view, setView] = useState(() => ({
    y: selected?.y ?? today.getFullYear(),
    m: selected?.m ?? today.getMonth(),
  }));

  /* jump the calendar to the chosen month whenever it opens */
  useEffect(() => {
    if (!open) return;
    const s = parseIso(value);
    setView({ y: s?.y ?? today.getFullYear(), m: s?.m ?? today.getMonth() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Monday-first weekday abbreviations from the active locale. Kept at the
     locale's own "short" length: truncating to two letters would make Senin
     and Selasa both read "Se". */
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
      new Date(Date.UTC(2024, 0, 1 + i)) // 2024-01-01 was a Monday
    )
  );

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(view.y, view.m, 1));

  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  // getDay() is Sunday-first; shift so Monday is column 0
  const leading = (new Date(view.y, view.m, 1).getDay() + 6) % 7;

  const beforeMin = (day: number) => {
    if (!minParts) return false;
    const a = view.y * 10000 + view.m * 100 + day;
    const b = minParts.y * 10000 + minParts.m * 100 + minParts.d;
    return a < b;
  };

  const isToday = (day: number) =>
    view.y === today.getFullYear() &&
    view.m === today.getMonth() &&
    day === today.getDate();

  const isSelected = (day: number) =>
    !!selected && selected.y === view.y && selected.m === view.m && selected.d === day;

  const shiftMonth = (delta: number) => {
    setView((v) => {
      const next = new Date(v.y, v.m + delta, 1);
      return { y: next.getFullYear(), m: next.getMonth() };
    });
  };

  const label = selected
    ? new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(selected.y, selected.m, selected.d))
    : d.common.pickDate;

  return (
    <div ref={wrap} className="relative">
      <button
        id={id}
        ref={btn}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          controlBase,
          controlTone(error),
          "flex items-center justify-between gap-3",
          open && !error && "border-lagoon"
        )}
      >
        <span className={cn(!selected && "text-faint")}>{label}</span>
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4 shrink-0 text-faint"
          fill="none"
          aria-hidden="true"
        >
          <rect x="1.75" y="3.25" width="12.5" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M1.75 6.75h12.5M5.25 1.75v2.5M10.75 1.75v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={d.common.pickDate}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
            className="absolute left-0 z-30 mt-1.5 w-[17.5rem] rounded-lg border border-line bg-surface p-3 shadow-[0_14px_36px_-20px_rgba(20,40,45,0.4)]"
          >
            {/* month header */}
            <div className="flex items-center justify-between gap-2">
              <MonthBtn onClick={() => shiftMonth(-1)} label={d.common.prevMonth} back />
              <span className="font-display text-[0.9rem] font-medium capitalize text-ink">
                {monthLabel}
              </span>
              <MonthBtn onClick={() => shiftMonth(1)} label={d.common.nextMonth} />
            </div>

            {/* weekday header */}
            <div className="mt-3 grid grid-cols-7 gap-0.5">
              {weekdays.map((w, i) => (
                <span
                  key={i}
                  className="grid h-7 place-items-center text-[0.68rem] font-medium uppercase text-faint"
                >
                  {w}
                </span>
              ))}
            </div>

            {/* day grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: leading }).map((_, i) => (
                <span key={`pad-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const disabled = beforeMin(day);
                const chosen = isSelected(day);
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={disabled}
                    aria-pressed={chosen}
                    aria-current={isToday(day) ? "date" : undefined}
                    onClick={() => {
                      onChange(iso(view.y, view.m, day));
                      setOpen(false);
                      btn.current?.focus();
                    }}
                    className={cn(
                      "grid h-8 place-items-center rounded-md text-[0.84rem] tabular-nums transition-colors duration-150",
                      disabled && "cursor-not-allowed text-line",
                      !disabled && !chosen && "text-ink-2 hover:bg-lagoon-faint hover:text-ink",
                      chosen && "bg-ink text-paper",
                      !chosen && !disabled && isToday(day) && "font-semibold text-lagoon-deep"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* footer */}
            <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
              <button
                type="button"
                onClick={() => {
                  const t = new Date();
                  setView({ y: t.getFullYear(), m: t.getMonth() });
                }}
                className="text-[0.78rem] text-muted transition-colors hover:text-ink"
              >
                {d.common.today}
              </button>
              {selected && (
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setOpen(false);
                    btn.current?.focus();
                  }}
                  className="text-[0.78rem] text-muted transition-colors hover:text-ink"
                >
                  {d.common.clearDate}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MonthBtn({
  onClick,
  label,
  back,
}: {
  onClick: () => void;
  label: string;
  back?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors duration-150 hover:bg-line-2 hover:text-ink"
    >
      <svg
        viewBox="0 0 12 12"
        className={cn("h-3 w-3", back && "rotate-180")}
        fill="none"
        aria-hidden="true"
      >
        <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
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
