"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

/**
 * The header sits on top of the hero, whose background changes with every
 * slide. The hero publishes which colour scheme keeps the header readable;
 * `null` means there is nothing behind it and the default applies.
 *
 *   "light" → light text, for a dark photograph
 *   "dark"  → dark text, for a light photograph
 */
export type HeaderTone = "light" | "dark" | null;

type Ctx = {
  tone: HeaderTone;
  setTone: (t: HeaderTone) => void;
};

const HeaderToneContext = createContext<Ctx | null>(null);

export function HeaderToneProvider({ children }: { children: React.ReactNode }) {
  const [tone, setToneState] = useState<HeaderTone>(null);
  const setTone = useCallback((t: HeaderTone) => setToneState(t), []);
  const value = useMemo(() => ({ tone, setTone }), [tone, setTone]);

  return (
    <HeaderToneContext.Provider value={value}>
      {children}
    </HeaderToneContext.Provider>
  );
}

export function useHeaderTone() {
  const ctx = useContext(HeaderToneContext);
  if (!ctx)
    throw new Error("useHeaderTone must be used inside <HeaderToneProvider>");
  return ctx;
}
