"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Check, Globe, X } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { LANGS, type Lang } from "@/lib/i18n/dictionary";
import { waLink, WA_PREFILL } from "@/lib/site";
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
  const [bubble, setBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const show = setTimeout(() => setBubble(true), 6500);
    const hide = setTimeout(() => setBubble(false), 16000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [dismissed]);

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[130] flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="pointer-events-auto relative max-w-[15rem] rounded-2xl rounded-br-md border border-ink/10 bg-white px-4 py-3 pr-8 text-[0.82rem] font-medium leading-snug text-ink shadow-[0_18px_45px_-18px_rgba(6,23,29,0.45)]"
          >
            {d.floating.whatsappBubble}
            <button
              type="button"
              onClick={() => {
                setBubble(false);
                setDismissed(true);
              }}
              aria-label={d.nav.close}
              className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full text-ink/35 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={waLink(WA_PREFILL[lang])}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() => track("whatsapp_click")}
        aria-label={d.floating.whatsapp}
        className="group pointer-events-auto relative flex items-center"
      >
        {/* expanding label */}
        <span className="pointer-events-none absolute right-0 flex h-14 items-center overflow-hidden whitespace-nowrap rounded-full bg-[#25D366] pl-6 pr-16 text-sm font-bold text-white opacity-0 shadow-[0_14px_34px_-12px_rgba(37,211,102,0.8)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 max-w-0 group-hover:max-w-[16rem]">
          {d.floating.whatsapp}
        </span>

        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-12px_rgba(37,211,102,0.9)] transition-transform duration-400 group-hover:scale-105 group-active:scale-95">
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 [animation:vbt-pulse-ring_2.6s_ease-out_infinite]" />
          <span
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 [animation:vbt-pulse-ring_2.6s_ease-out_infinite]"
            style={{ animationDelay: "1.3s" }}
          />
          <WhatsAppGlyph className="relative h-7 w-7" />
        </span>
      </a>
    </div>
  );
}

/* ================================================================
   BOTTOM LEFT — language switch
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
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="w-56 origin-bottom-left overflow-hidden rounded-2xl border border-ink/10 bg-sand/95 p-1.5 shadow-[0_26px_60px_-26px_rgba(6,23,29,0.5)] backdrop-blur-2xl"
          >
            <p className="px-3 pb-1.5 pt-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink/35">
              {d.floating.languageLabel}
            </p>
            {LANGS.map((l, i) => {
              const active = l.code === lang;
              return (
                <motion.button
                  key={l.code}
                  type="button"
                  onClick={() => pick(l.code)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.05 }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-300",
                    active ? "bg-lagoon-100 text-lagoon-800" : "text-ink/70 hover:bg-white"
                  )}
                >
                  <span className="text-lg leading-none">{l.flag}</span>
                  <span className="flex-1 text-sm font-semibold">{l.label}</span>
                  {active && <Check className="h-4 w-4 text-lagoon-600" />}
                </motion.button>
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
        className="group relative flex h-14 items-center gap-2.5 rounded-full border border-ink/10 bg-sand/90 pl-4 pr-4 text-ink shadow-[0_14px_34px_-16px_rgba(6,23,29,0.55)] backdrop-blur-xl transition-all duration-400 hover:border-lagoon-400 hover:bg-white active:scale-95"
      >
        <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-lagoon-500 to-lagoon-700 text-white">
          <Globe className="h-4 w-4 transition-transform duration-700 group-hover:rotate-180" />
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-base leading-none">{current.flag}</span>
          <span className="font-display text-sm font-extrabold tracking-wide">
            {current.short}
          </span>
        </span>
        <span className="pointer-events-none absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-sunbeam-400 ring-2 ring-sand" />
      </button>
    </div>
  );
}

/* ================================================================
   Back to top — stacks above the WhatsApp button
   ================================================================ */

export function BackToTop() {
  const { d } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.6, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 14 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={d.floating.top}
          className="group fixed bottom-[5.75rem] right-4 z-[128] grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-sand/90 text-ink shadow-[0_12px_30px_-14px_rgba(6,23,29,0.55)] backdrop-blur-xl transition-colors duration-300 hover:border-lagoon-400 hover:bg-white sm:bottom-[6.5rem] sm:right-6"
        >
          <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
