"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { TourKey } from "@/lib/site";

type Ctx = {
  open: boolean;
  preset: TourKey | null;
  /** Optional package/route name pre-filled into the notes field. */
  presetNote: string | null;
  openModal: (tour?: TourKey, note?: string) => void;
  closeModal: () => void;
};

const TourModalContext = createContext<Ctx | null>(null);

export function TourModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<TourKey | null>(null);
  const [presetNote, setPresetNote] = useState<string | null>(null);

  const openModal = useCallback((tour?: TourKey, note?: string) => {
    setPreset(tour ?? null);
    setPresetNote(note ?? null);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Lock the page behind the modal */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.dataset.lock = "true";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.dataset.lock = "false";
      document.body.style.paddingRight = prev;
    };
  }, [open]);

  const value = useMemo(
    () => ({ open, preset, presetNote, openModal, closeModal }),
    [open, preset, presetNote, openModal, closeModal]
  );

  return (
    <TourModalContext.Provider value={value}>
      {children}
    </TourModalContext.Provider>
  );
}

export function useTourModal() {
  const ctx = useContext(TourModalContext);
  if (!ctx)
    throw new Error("useTourModal must be used inside <TourModalProvider>");
  return ctx;
}
