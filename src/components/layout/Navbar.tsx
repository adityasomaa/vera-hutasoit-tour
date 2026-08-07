"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { useTransition } from "@/components/providers/TransitionProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { LogoLockup } from "@/components/graphics/Brand";
import { Button } from "@/components/ui/Button";
import { ROUTES, TOUR_KEYS, TOUR_THEME } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { d } = useLang();
  const pathname = usePathname();
  const { openModal } = useTourModal();
  const { busy } = useTransition();

  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobileTours, setMobileTours] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close every menu whenever the route changes */
  useEffect(() => {
    setMobile(false);
    setDropdown(false);
    setMobileTours(false);
  }, [pathname]);

  /* Escape closes menus */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDropdown(false);
      setMobile(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Lock the page while the mobile sheet is open */
  useEffect(() => {
    if (mobile) document.body.dataset.lock = "true";
    else if (!busy) document.body.dataset.lock = "false";
  }, [mobile, busy]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(false), 160);
  };

  const requestTour = (key: (typeof TOUR_KEYS)[number]) => {
    setDropdown(false);
    setMobile(false);
    openModal(key);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-all duration-500",
          scrolled ? "py-2" : "py-3 sm:py-4"
        )}
      >
        <div className="container-vbt">
          <nav
            className={cn(
              "flex items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4",
              scrolled
                ? "border-ink/10 bg-sand/85 shadow-[0_10px_40px_-22px_rgba(6,23,29,0.5)] backdrop-blur-xl"
                : "border-transparent bg-sand/45 backdrop-blur-md"
            )}
          >
            <TransitionLink
              href="/"
              className="shrink-0 rounded-full pl-1 pr-2 transition-transform duration-300 hover:scale-[1.03]"
              aria-label={d.brand.name}
            >
              <LogoLockup compact />
            </TransitionLink>

            {/* ---------- desktop nav ---------- */}
            <ul className="hidden items-center gap-1 lg:flex">
              {ROUTES.map((r) => {
                if (r.key === "tour") {
                  return (
                    <li
                      key={r.href}
                      className="relative"
                      onMouseEnter={openDropdown}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="flex items-center">
                        <TransitionLink
                          href="/tour"
                          data-active={isActive("/tour")}
                          className={cn(
                            "link-underline rounded-full px-3.5 py-2 text-[0.94rem] font-semibold transition-colors duration-300",
                            isActive("/tour") ? "text-lagoon-700" : "text-ink/70 hover:text-ink"
                          )}
                        >
                          {d.nav.tour}
                        </TransitionLink>
                        <button
                          type="button"
                          onClick={() => setDropdown((v) => !v)}
                          aria-expanded={dropdown}
                          aria-haspopup="true"
                          aria-label={d.nav.tour}
                          className="-ml-1.5 grid h-7 w-7 place-items-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-400",
                              dropdown && "rotate-180"
                            )}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {dropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 14, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-1/2 top-full z-50 w-[26rem] -translate-x-1/2 pt-4"
                          >
                            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-sand/95 p-2 shadow-[0_30px_80px_-30px_rgba(6,23,29,0.55)] backdrop-blur-2xl">
                              {TOUR_KEYS.map((key, i) => {
                                const t = d.tourTypes[key];
                                const th = TOUR_THEME[key];
                                return (
                                  <motion.button
                                    key={key}
                                    type="button"
                                    onClick={() => requestTour(key)}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                                    className="group flex w-full items-start gap-3.5 rounded-2xl p-3.5 text-left transition-colors duration-300 hover:bg-white"
                                  >
                                    <span
                                      className={cn(
                                        "mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-6 bg-gradient-to-br",
                                        th.grad
                                      )}
                                    >
                                      <Sparkles className="h-5 w-5" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="flex items-center gap-1.5 font-display text-[0.98rem] font-bold text-ink">
                                        {t.name}
                                        <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                                      </span>
                                      <span className="mt-0.5 block text-[0.82rem] leading-snug text-ink/55">
                                        {t.short}
                                      </span>
                                    </span>
                                    <span
                                      className={cn(
                                        "mt-1 shrink-0 rounded-full px-2 py-0.5 text-[0.66rem] font-bold",
                                        th.chip
                                      )}
                                    >
                                      {t.price}
                                    </span>
                                  </motion.button>
                                );
                              })}
                              <p className="px-4 pb-2 pt-2 text-[0.72rem] font-medium text-ink/40">
                                {d.nav.dropdownHint}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={r.href}>
                    <TransitionLink
                      href={r.href}
                      data-active={isActive(r.href)}
                      className={cn(
                        "link-underline block rounded-full px-3.5 py-2 text-[0.94rem] font-semibold transition-colors duration-300",
                        isActive(r.href) ? "text-lagoon-700" : "text-ink/70 hover:text-ink"
                      )}
                    >
                      {d.nav[r.key]}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="primary"
                className="hidden sm:inline-flex"
                onClick={() => openModal()}
              >
                {d.nav.cta}
                <ArrowUpRight className="h-4 w-4" />
              </Button>

              <button
                type="button"
                onClick={() => setMobile((v) => !v)}
                aria-expanded={mobile}
                aria-label={mobile ? d.nav.closeMenu : d.nav.openMenu}
                className="relative grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink transition-all duration-300 hover:border-lagoon-400 hover:bg-white active:scale-95 lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobile ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <X className="h-5 w-5" strokeWidth={2.4} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="m"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <Menu className="h-5 w-5" strokeWidth={2.4} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ---------- mobile / tablet sheet ---------- */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 z-[110] lg:hidden"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <motion.div
              className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobile(false)}
            />

            <motion.div
              className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto overscroll-contain rounded-b-[2.25rem] bg-sand pb-8 pt-24 shadow-2xl"
              variants={{
                hidden: { y: "-100%" },
                show: { y: "0%" },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-[2.25rem]">
                <div className="animate-blob absolute -right-16 -top-10 h-64 w-64 rounded-full bg-sunbeam-300/40 blur-3xl" />
                <div className="animate-blob absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-lagoon-300/40 blur-3xl" style={{ animationDelay: "-8s" }} />
              </div>

              <div className="container-vbt relative">
                <ul className="flex flex-col">
                  {ROUTES.map((r, i) => (
                    <motion.li
                      key={r.href}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.14 + i * 0.06, duration: 0.45 }}
                      className="border-b border-ink/8"
                    >
                      {r.key === "tour" ? (
                        <div>
                          <div className="flex items-center justify-between">
                            <TransitionLink
                              href="/tour"
                              onNavigate={() => setMobile(false)}
                              className={cn(
                                "flex-1 py-4 font-display text-2xl font-extrabold transition-colors",
                                isActive("/tour") ? "text-lagoon-600" : "text-ink"
                              )}
                            >
                              {d.nav.tour}
                            </TransitionLink>
                            <button
                              type="button"
                              onClick={() => setMobileTours((v) => !v)}
                              aria-expanded={mobileTours}
                              aria-label={d.nav.tour}
                              className="grid h-10 w-10 place-items-center rounded-full bg-ink/5 text-ink/60 active:scale-95"
                            >
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 transition-transform duration-400",
                                  mobileTours && "rotate-180"
                                )}
                              />
                            </button>
                          </div>

                          <AnimatePresence initial={false}>
                            {mobileTours && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-2 pb-4">
                                  {TOUR_KEYS.map((key) => {
                                    const t = d.tourTypes[key];
                                    const th = TOUR_THEME[key];
                                    return (
                                      <button
                                        key={key}
                                        type="button"
                                        onClick={() => requestTour(key)}
                                        className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/80 p-3 text-left active:scale-[0.98]"
                                      >
                                        <span
                                          className={cn(
                                            "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white",
                                            th.grad
                                          )}
                                        >
                                          <Sparkles className="h-4 w-4" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                          <span className="block font-display text-[0.95rem] font-bold text-ink">
                                            {t.name}
                                          </span>
                                          <span className="block text-[0.78rem] text-ink/55">
                                            {t.short}
                                          </span>
                                        </span>
                                        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/35" />
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <TransitionLink
                          href={r.href}
                          onNavigate={() => setMobile(false)}
                          className={cn(
                            "block py-4 font-display text-2xl font-extrabold transition-colors",
                            isActive(r.href) ? "text-lagoon-600" : "text-ink"
                          )}
                        >
                          {d.nav[r.key]}
                        </TransitionLink>
                      )}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-7"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    magnetic={false}
                    className="w-full"
                    onClick={() => {
                      setMobile(false);
                      openModal();
                    }}
                  >
                    {d.nav.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <p className="mt-4 text-center text-xs text-ink/45">
                    {d.brand.tagline}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
