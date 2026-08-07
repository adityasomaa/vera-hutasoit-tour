"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  COOKIE_KEYS,
  getCookie,
  purgeCookiesByPrefix,
  setCookie,
} from "@/lib/cookies";

export type ConsentCategory =
  | "necessary"
  | "preferences"
  | "analytics"
  | "marketing";

export type Consent = Record<ConsentCategory, boolean>;

export const DEFAULT_CONSENT: Consent = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

const ALL_ON: Consent = {
  necessary: true,
  preferences: true,
  analytics: true,
  marketing: true,
};

type StoredConsent = { v: 1; ts: number; c: Consent };

type Ctx = {
  consent: Consent;
  /** null until we've read the cookie — used to avoid flashing the banner. */
  decided: boolean | null;
  bannerOpen: boolean;
  prefsOpen: boolean;
  openPrefs: () => void;
  closePrefs: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustom: (c: Consent) => void;
  reopenBanner: () => void;
  /** Gate any optional side effect behind a category. */
  can: (c: ConsentCategory) => boolean;
  /** No-op unless analytics consent was granted. */
  track: (event: string, payload?: Record<string, unknown>) => void;
  /** Writes a preference cookie only when the preferences category is allowed. */
  remember: (key: string, value: string) => void;
  recall: (key: string) => string | null;
};

const ConsentContext = createContext<Ctx | null>(null);

declare global {
  interface Window {
    __vbtAnalytics?: { event: string; ts: number; payload?: unknown }[];
    __vbtMarketing?: boolean;
    vbtOpenCookiePrefs?: () => void;
  }
}

/* ---------------- real, gated side effects ---------------- */

const ANALYTICS_ID = "vbt-analytics-script";
const MARKETING_ID = "vbt-marketing-script";

function mountAnalytics() {
  if (document.getElementById(ANALYTICS_ID)) return;
  window.__vbtAnalytics = window.__vbtAnalytics ?? [];
  const s = document.createElement("script");
  s.id = ANALYTICS_ID;
  s.type = "text/javascript";
  // A stand-in for a real analytics snippet (Plausible/GA/Umami would go here).
  // It is only ever inserted into the DOM after explicit consent.
  s.text = `window.__vbtAnalytics=window.__vbtAnalytics||[];
window.__vbtAnalytics.push({event:"analytics_enabled",ts:Date.now()});`;
  document.head.appendChild(s);
}

function unmountAnalytics() {
  document.getElementById(ANALYTICS_ID)?.remove();
  delete window.__vbtAnalytics;
  purgeCookiesByPrefix(["_ga", "_gid", "vbt_a_", "_pk_"]);
}

function mountMarketing() {
  if (document.getElementById(MARKETING_ID)) return;
  const s = document.createElement("script");
  s.id = MARKETING_ID;
  s.type = "text/javascript";
  s.text = `window.__vbtMarketing=true;`;
  document.head.appendChild(s);
}

function unmountMarketing() {
  document.getElementById(MARKETING_ID)?.remove();
  delete window.__vbtMarketing;
  purgeCookiesByPrefix(["_fbp", "_fbc", "vbt_m_", "fr"]);
}

/* ---------------- provider ---------------- */

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent>(DEFAULT_CONSENT);
  const [decided, setDecided] = useState<boolean | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const applied = useRef<Consent>(DEFAULT_CONSENT);

  /* read stored decision once */
  useEffect(() => {
    const raw = getCookie(COOKIE_KEYS.consent);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as StoredConsent;
        if (parsed?.v === 1 && parsed.c) {
          setConsent({ ...DEFAULT_CONSENT, ...parsed.c, necessary: true });
          setDecided(true);
          return;
        }
      } catch {
        /* corrupt cookie → treat as undecided */
      }
    }
    setDecided(false);
    // Give the intro loader room to finish before the banner slides in.
    const t = setTimeout(() => setBannerOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  /* apply / revoke the actual scripts whenever consent changes */
  useEffect(() => {
    if (decided === null) return;
    const prev = applied.current;

    if (consent.analytics && !prev.analytics) mountAnalytics();
    if (!consent.analytics && prev.analytics) unmountAnalytics();
    if (consent.marketing && !prev.marketing) mountMarketing();
    if (!consent.marketing && prev.marketing) unmountMarketing();
    if (!consent.preferences && prev.preferences)
      purgeCookiesByPrefix(["vbt_pref_", COOKIE_KEYS.lastTour]);

    // First application after a stored decision is read.
    if (decided && prev === DEFAULT_CONSENT) {
      if (consent.analytics) mountAnalytics();
      if (consent.marketing) mountMarketing();
    }
    applied.current = consent;
  }, [consent, decided]);

  const persist = useCallback((c: Consent) => {
    const payload: StoredConsent = { v: 1, ts: Date.now(), c };
    setCookie(COOKIE_KEYS.consent, JSON.stringify(payload), 180);
    setConsent(c);
    setDecided(true);
    setBannerOpen(false);
    setPrefsOpen(false);
  }, []);

  const acceptAll = useCallback(() => persist(ALL_ON), [persist]);
  const rejectAll = useCallback(() => persist({ ...DEFAULT_CONSENT }), [persist]);
  const saveCustom = useCallback(
    (c: Consent) => persist({ ...c, necessary: true }),
    [persist]
  );

  const reopenBanner = useCallback(() => setPrefsOpen(true), []);

  const can = useCallback((c: ConsentCategory) => consent[c], [consent]);

  const track = useCallback(
    (event: string, payload?: Record<string, unknown>) => {
      if (!consent.analytics) return;
      window.__vbtAnalytics = window.__vbtAnalytics ?? [];
      window.__vbtAnalytics.push({ event, ts: Date.now(), payload });
    },
    [consent.analytics]
  );

  const remember = useCallback(
    (key: string, value: string) => {
      if (!consent.preferences) return;
      setCookie(`vbt_pref_${key}`, value, 90);
    },
    [consent.preferences]
  );

  const recall = useCallback(
    (key: string) => (consent.preferences ? getCookie(`vbt_pref_${key}`) : null),
    [consent.preferences]
  );

  /* expose a global hook so the footer link works from anywhere */
  useEffect(() => {
    window.vbtOpenCookiePrefs = () => setPrefsOpen(true);
    return () => {
      delete window.vbtOpenCookiePrefs;
    };
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      consent,
      decided,
      bannerOpen,
      prefsOpen,
      openPrefs: () => setPrefsOpen(true),
      closePrefs: () => setPrefsOpen(false),
      acceptAll,
      rejectAll,
      saveCustom,
      reopenBanner,
      can,
      track,
      remember,
      recall,
    }),
    [
      consent,
      decided,
      bannerOpen,
      acceptAll,
      rejectAll,
      saveCustom,
      reopenBanner,
      can,
      track,
      remember,
      recall,
      prefsOpen,
    ]
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
