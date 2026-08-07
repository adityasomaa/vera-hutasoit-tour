"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries, type Dictionary, type Lang } from "@/lib/i18n/dictionary";
import { COOKIE_KEYS, getCookie, setCookie } from "@/lib/cookies";

type Ctx = {
  lang: Lang;
  d: Dictionary;
  setLang: (l: Lang) => void;
  toggle: () => void;
  ready: boolean;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // English is the default; the stored choice is applied after mount so that
  // server and client markup match on the first paint.
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getCookie(COOKIE_KEYS.lang);
    if (stored === "id" || stored === "en") setLangState(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    // Language is a strictly-necessary cookie: it stores a choice the user made
    // explicitly and the site cannot render correctly without it.
    setCookie(COOKIE_KEYS.lang, l, 365);
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "en" ? "id" : "en"),
    [lang, setLang]
  );

  const value = useMemo(
    () => ({ lang, d: dictionaries[lang], setLang, toggle, ready }),
    [lang, setLang, toggle, ready]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
