"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import {
  useConsent,
  type Consent,
  type ConsentCategory,
} from "@/components/providers/ConsentProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ORDER: ConsentCategory[] = ["necessary", "preferences", "analytics", "marketing"];

export function CookieConsent() {
  const { d } = useLang();
  const {
    consent,
    decided,
    bannerOpen,
    prefsOpen,
    openPrefs,
    closePrefs,
    acceptAll,
    rejectAll,
    saveCustom,
  } = useConsent();

  const [draft, setDraft] = useState<Consent>(consent);
  const [toast, setToast] = useState(false);

  useEffect(() => setDraft(consent), [consent, prefsOpen]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const fire = (fn: () => void) => {
    fn();
    setToast(true);
  };

  const showBanner = decided === false && bannerOpen && !prefsOpen;

  return (
    <>
      {/* ---------------- banner ---------------- */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            key="cookie-banner"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.25, 1, 0.5, 1] }}
            role="dialog"
            aria-live="polite"
            aria-label={d.cookie.title}
            className="fixed inset-x-3 bottom-20 z-[140] mx-auto max-w-2xl sm:inset-x-6 sm:bottom-6 lg:left-1/2 lg:right-auto lg:w-[40rem] lg:-translate-x-1/2"
          >
            <div className="rounded-xl border border-line bg-surface p-5 shadow-[0_16px_44px_-24px_rgba(20,40,45,0.4)]">
              <p className="text-[0.88rem] leading-relaxed text-ink-2">
                <span className="font-medium text-ink">{d.cookie.title}.</span>{" "}
                {d.cookie.body}{" "}
                <TransitionLink
                  href="/privacy-policy"
                  className="link-underline text-lagoon-deep"
                >
                  {d.cookie.policyLink}
                </TransitionLink>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button size="sm" variant="primary" onClick={() => fire(acceptAll)}>
                  {d.cookie.accept}
                </Button>
                <Button size="sm" variant="outline" onClick={() => fire(rejectAll)}>
                  {d.cookie.reject}
                </Button>
                <Button size="sm" variant="ghost" onClick={openPrefs}>
                  {d.cookie.customize}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- preferences ---------------- */}
      <AnimatePresence>
        {prefsOpen && (
          <motion.div
            key="cookie-prefs"
            className="fixed inset-0 z-[160] flex items-end justify-center sm:items-center sm:p-6"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.24 }}
              onClick={closePrefs}
              className="absolute inset-0 bg-ink/35"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={d.cookie.manage}
              variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
              className="relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-line bg-surface sm:rounded-2xl"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-6 pb-4 pt-6">
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {d.cookie.manage}
                  </h2>
                  <p className="mt-1 text-[0.86rem] text-muted">{d.cookie.body}</p>
                </div>
                <button
                  type="button"
                  onClick={closePrefs}
                  aria-label={d.nav.close}
                  className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-line-2 hover:text-ink"
                >
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="min-h-0 flex-1 divide-y divide-line overflow-y-auto px-6">
                {ORDER.map((cat) => {
                  const meta = d.cookie.categories[cat];
                  const locked = cat === "necessary";
                  const on = locked ? true : draft[cat];
                  return (
                    <div key={cat} className="flex items-start justify-between gap-5 py-4">
                      <div className="min-w-0">
                        <h3 className="text-[0.94rem] font-medium text-ink">
                          {meta.title}
                          {locked && (
                            <span className="ml-2 text-[0.72rem] font-normal text-faint">
                              {d.cookie.categories.necessary.always}
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 text-[0.84rem] leading-relaxed text-muted">
                          {meta.desc}
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        aria-label={meta.title}
                        disabled={locked}
                        onClick={() => setDraft((s) => ({ ...s, [cat]: !s[cat] }))}
                        className={cn(
                          "relative mt-1 h-6 w-10 shrink-0 rounded-full transition-colors duration-200",
                          on ? "bg-lagoon" : "bg-line",
                          locked && "cursor-not-allowed opacity-50"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-1 h-4 w-4 rounded-full bg-surface transition-all duration-200",
                            on ? "left-5" : "left-1"
                          )}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-line px-6 py-4">
                <Button size="sm" variant="ghost" onClick={() => fire(rejectAll)}>
                  {d.cookie.reject}
                </Button>
                <Button size="sm" variant="outline" onClick={() => fire(acceptAll)}>
                  {d.cookie.accept}
                </Button>
                <Button size="sm" variant="primary" onClick={() => fire(() => saveCustom(draft))}>
                  {d.cookie.save}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- toast ---------------- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-6 left-1/2 z-[170] -translate-x-1/2 rounded-full bg-ink px-4 py-2.5 text-[0.82rem] text-paper"
          >
            {d.cookie.savedToast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
