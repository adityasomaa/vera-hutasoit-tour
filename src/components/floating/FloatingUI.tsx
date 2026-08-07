"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { LANGS, type Lang } from "@/lib/i18n/dictionary";
import { waLink, WA_GENERAL } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ================================================================
   BOTTOM RIGHT — WhatsApp
   ================================================================ */

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.53 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.21-8.25 8.21Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const { d, lang } = useLang();
  const { track } = useConsent();

  return (
    <a
      href={waLink(WA_GENERAL[lang])}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => track("whatsapp_click")}
      aria-label={d.floating.whatsapp}
      className="fixed bottom-5 right-4 z-[130] grid h-12 w-12 place-items-center rounded-full bg-[#1FA855] text-white shadow-[0_6px_20px_-8px_rgba(20,40,45,0.5)] transition-colors duration-200 hover:bg-[#188742] active:translate-y-px sm:bottom-7 sm:right-6"
    >
      <WhatsAppGlyph className="h-6 w-6" />
    </a>
  );
}

/* ================================================================
   BOTTOM LEFT — language
   ================================================================ */

export function LanguageSwitch() {
  const { d, lang, setLang } = useLang();
  const { track } = useConsent();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (code: Lang) => {
    setLang(code);
    setOpen(false);
    track("language_switch", { to: code });
  };

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div
      ref={wrap}
      className="fixed bottom-5 left-4 z-[130] flex flex-col items-start gap-2 sm:bottom-7 sm:left-6"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-52 overflow-hidden rounded-xl border border-line bg-surface shadow-[0_16px_40px_-24px_rgba(20,40,45,0.35)]"
          >
            <p className="px-4 pb-1 pt-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-faint">
              {d.floating.languageLabel}
            </p>
            {LANGS.map((l) => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => pick(l.code)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[0.9rem] transition-colors duration-200",
                    active ? "text-ink" : "text-muted hover:bg-lagoon-faint hover:text-ink"
                  )}
                >
                  {l.label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-lagoon" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={d.floating.language}
        className="flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-4 font-display text-[0.82rem] font-medium tracking-wide text-ink shadow-[0_6px_20px_-12px_rgba(20,40,45,0.4)] transition-colors duration-200 hover:border-ink active:translate-y-px"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-muted" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M2.5 10h15M10 2.5c1.9 2 3 4.7 3 7.5s-1.1 5.5-3 7.5c-1.9-2-3-4.7-3-7.5s1.1-5.5 3-7.5Z" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        {current.short}
      </button>
    </div>
  );
}

/* ================================================================
   Back to top — sits above the WhatsApp button
   ================================================================ */

export function BackToTop() {
  const { d } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={d.floating.top}
          className="fixed bottom-[4.75rem] right-4 z-[128] grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-200 hover:border-ink hover:text-ink sm:bottom-[5.75rem] sm:right-6"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
