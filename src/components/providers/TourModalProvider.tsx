"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/** Only the customized tour uses a form. Private and sharing have their own pages. */
type Ctx = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const TourModalContext = createContext<Ctx | null>(null);

export function TourModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal]
  );

  return (
    <TourModalContext.Provider value={value}>{children}</TourModalContext.Provider>
  );
}

export function useTourModal() {
  const ctx = useContext(TourModalContext);
  if (!ctx)
    throw new Error("useTourModal must be used inside <TourModalProvider>");
  return ctx;
}
