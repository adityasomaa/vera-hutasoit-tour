"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BarChart3, Cookie, Lock, Megaphone, Settings2, Sliders, X } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import {
  useConsent,
  type Consent,
  type ConsentCategory,
} from "@/components/providers/ConsentProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ICONS: Record<ConsentCategory, React.ElementType> = {
  necessary: Lock,
  preferences: Sliders,
  analytics: BarChart3,
  marketing: Megaphone,
};

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
    const t = setTimeout(() => setToast(false), 2600);
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
            initial={{ y: "130%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "130%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-live="polite"
            aria-label={d.cookie.title}
            className="fixed inset-x-3 bottom-24 z-[140] mx-auto max-w-3xl sm:inset-x-6 sm:bottom-6 lg:left-1/2 lg:right-auto lg:w-[46rem] lg:-translate-x-1/2"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-sand/95 p-5 shadow-[0_30px_80px_-30px_rgba(6,23,29,0.55)] backdrop-blur-2xl sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sunbeam-300/35 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-lagoon-300/30 blur-3xl" />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-sunbeam-400 to-coral-500 text-white shadow-lg">
                  <Cookie className="h-6 w-6" />
                </span>

                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg font-extrabold text-ink">
                    {d.cookie.title}
                  </h2>
                  <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink/65">
                    {d.cookie.body}{" "}
                    <TransitionLink
                      href="/privacy-policy"
                      className="link-underline font-semibold text-lagoon-700"
                    >
                      {d.cookie.policyLink}
                    </TransitionLink>
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2.5">
                    <Button size="sm" variant="primary" magnetic={false} onClick={() => fire(acceptAll)}>
                      {d.cookie.accept}
                    </Button>
                    <Button size="sm" variant="outline" magnetic={false} onClick={() => fire(rejectAll)}>
                      {d.cookie.reject}
                    </Button>
                    <button
                      type="button"
                      onClick={openPrefs}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
                    >
                      <Settings2 className="h-4 w-4" />
                      {d.cookie.customize}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- preferences modal ---------------- */}
      <AnimatePresence>
        {prefsOpen && (
          <motion.div
            key="cookie-prefs"
            className="fixed inset-0 z-[160] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.3 }}
              onClick={closePrefs}
              className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={d.cookie.manage}
              variants={{
                hidden: { y: 60, opacity: 0, scale: 0.97 },
                show: { y: 0, opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] border border-ink/10 bg-sand shadow-2xl sm:rounded-[2rem]"
            >
              <div className="relative shrink-0 overflow-hidden border-b border-ink/8 px-6 py-5 sm:px-8">
                <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-sunbeam-300/40 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">
                      {d.cookie.manage}
                    </h2>
                    <p className="mt-1 text-[0.84rem] text-ink/55">{d.cookie.body}</p>
                  </div>
                  <button
                    type="button"
                    onClick={closePrefs}
                    aria-label={d.nav.close}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink/60 transition-colors hover:bg-white hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8">
                <div className="flex flex-col gap-3">
                  {ORDER.map((cat, i) => {
                    const meta = d.cookie.categories[cat];
                    const Icon = ICONS[cat];
                    const locked = cat === "necessary";
                    const on = locked ? true : draft[cat];
                    return (
                      <motion.div
                        key={cat}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 + i * 0.06, duration: 0.4 }}
                        className={cn(
                          "flex items-start gap-4 rounded-2xl border p-4 transition-colors duration-300",
                          on
                            ? "border-lagoon-200 bg-lagoon-50/70"
                            : "border-ink/10 bg-white/60"
                        )}
                      >
                        <span
                          className={cn(
                            "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                            on ? "bg-lagoon-500 text-white" : "bg-ink/8 text-ink/45"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-[0.98rem] font-bold text-ink">
                              {meta.title}
                            </h3>
                            {locked && (
                              <span className="rounded-full bg-ink/8 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-ink/50">
                                {d.cookie.categories.necessary.always}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-[0.83rem] leading-relaxed text-ink/60">
                            {meta.desc}
                          </p>
                        </div>

                        <button
                          type="button"
                          role="switch"
                          aria-checked={on}
                          aria-label={meta.title}
                          disabled={locked}
                          onClick={() =>
                            setDraft((s) => ({ ...s, [cat]: !s[cat] }))
                          }
                          className={cn(
                            "relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors duration-300",
                            on ? "bg-lagoon-500" : "bg-ink/15",
                            locked && "cursor-not-allowed opacity-60"
                          )}
                        >
                          <motion.span
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 32 }}
                            className={cn(
                              "absolute top-1 h-5 w-5 rounded-full bg-white shadow",
                              on ? "left-6" : "left-1"
                            )}
                          />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="shrink-0 border-t border-ink/8 bg-white/50 px-6 py-4 sm:px-8">
                <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    magnetic={false}
                    shine={false}
                    onClick={() => fire(rejectAll)}
                  >
                    {d.cookie.reject}
                  </Button>
                  <Button size="sm" variant="outline" magnetic={false} onClick={() => fire(acceptAll)}>
                    {d.cookie.accept}
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    magnetic={false}
                    onClick={() => fire(() => saveCustom(draft))}
                  >
                    {d.cookie.save}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- toast ---------------- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="fixed bottom-6 left-1/2 z-[170] -translate-x-1/2 rounded-full border border-ink/10 bg-ink px-5 py-3 text-sm font-semibold text-sand shadow-2xl"
          >
            {d.cookie.savedToast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
