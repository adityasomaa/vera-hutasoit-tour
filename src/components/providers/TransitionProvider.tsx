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
import { usePathname, useRouter } from "next/navigation";

export type Phase = "idle" | "closing" | "covered" | "opening";

type Ctx = {
  phase: Phase;
  /** true from the moment a link is clicked until the new page is revealed */
  busy: boolean;
  /** where we're heading (null when idle) */
  target: string | null;
  /** true when the overlay should mount already covering the screen (back/forward) */
  startCovered: boolean;
  navigate: (href: string) => void;
  onCoverComplete: () => void;
  onRevealComplete: () => void;
};

const TransitionContext = createContext<Ctx | null>(null);

/** How long we deliberately sit behind the curtain before revealing. */
const HOLD_MS = 480;

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const [target, setTarget] = useState<string | null>(null);
  const [startCovered, setStartCovered] = useState(false);

  const phaseRef = useRef<Phase>("idle");
  const targetRef = useRef<string | null>(null);
  const prevPath = useRef(pathname);
  const firstRender = useRef(true);

  phaseRef.current = phase;
  targetRef.current = target;

  /* ---------- public API ---------- */

  const navigate = useCallback(
    (href: string) => {
      if (phaseRef.current !== "idle") return;
      const [path] = href.split("#");
      if (path === pathname || (path === "" && href.startsWith("#"))) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setStartCovered(false);
      setTarget(href);
      setPhase("closing");
    },
    [pathname]
  );

  /** The curtain has fully covered the viewport → swap the page underneath. */
  const onCoverComplete = useCallback(() => {
    if (phaseRef.current !== "closing") return;
    setPhase("covered");
    const href = targetRef.current;
    if (href) router.push(href);
  }, [router]);

  const onRevealComplete = useCallback(() => {
    if (phaseRef.current !== "opening") return;
    setPhase("idle");
    setTarget(null);
    setStartCovered(false);
  }, []);

  /* ---------- react to the route actually committing ---------- */

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      prevPath.current = pathname;
      return;
    }
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    // Everything below happens while the viewport is fully covered, so the
    // content swap and the scroll reset are never visible.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    if (phaseRef.current === "covered") {
      const t = setTimeout(() => {
        // A second rAF makes sure the new page has painted before we lift.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setPhase("opening"))
        );
      }, HOLD_MS);
      return () => clearTimeout(t);
    }

    // Browser back / forward: the route already changed without our curtain.
    // Drop the curtain in place, then reveal — content is already correct.
    if (phaseRef.current === "idle") {
      setStartCovered(true);
      setTarget(pathname);
      setPhase("opening");
    }
  }, [pathname]);

  /* Safety net: never let the curtain get stuck if a route stalls. */
  useEffect(() => {
    if (phase !== "covered") return;
    const bail = setTimeout(() => {
      if (phaseRef.current === "covered") setPhase("opening");
    }, 6000);
    return () => clearTimeout(bail);
  }, [phase]);

  /**
   * Animation callbacks drive the machine, but browsers pause rAF in hidden
   * tabs — so a transition started just before a tab switch would freeze.
   * These timers re-arm on visibilitychange and only run while visible.
   */
  useEffect(() => {
    if (phase !== "closing" && phase !== "opening") return;
    let timer: ReturnType<typeof setTimeout>;

    const arm = () => {
      clearTimeout(timer);
      if (document.visibilityState !== "visible") return;
      timer = setTimeout(() => {
        if (phaseRef.current === "closing") onCoverComplete();
        else if (phaseRef.current === "opening") onRevealComplete();
      }, 1800);
    };

    arm();
    document.addEventListener("visibilitychange", arm);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", arm);
    };
  }, [phase, onCoverComplete, onRevealComplete]);

  /* Lock scrolling while the curtain owns the screen. */
  useEffect(() => {
    const busy = phase !== "idle";
    document.body.dataset.lock = busy ? "true" : "false";
    return () => {
      document.body.dataset.lock = "false";
    };
  }, [phase]);

  const value = useMemo<Ctx>(
    () => ({
      phase,
      busy: phase !== "idle",
      target,
      startCovered,
      navigate,
      onCoverComplete,
      onRevealComplete,
    }),
    [phase, target, startCovered, navigate, onCoverComplete, onRevealComplete]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used inside <TransitionProvider>");
  return ctx;
}
