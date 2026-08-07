"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { useTransition } from "@/components/providers/TransitionProvider";
import { useHeaderTone } from "@/components/providers/HeaderToneProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { LogoLockup } from "@/components/graphics/Brand";
import { buttonClass } from "@/components/ui/Button";
import { ROUTES, TOUR_KEYS, TOUR_ACCENT, TOUR_ROUTE, waLink, WA_GENERAL } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { d, lang } = useLang();
  const pathname = usePathname();
  const { openModal } = useTourModal();
  const { busy } = useTransition();
  const { tone } = useHeaderTone();

  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
    setDropdown(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDropdown(false);
      setMobile(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (mobile) document.body.dataset.lock = "true";
    else if (!busy) document.body.dataset.lock = "false";
  }, [mobile, busy]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Once scrolled the header owns its own background, so the hero's tone
     stops applying. Before that it sits on the photograph and follows it. */
  const overlay = !scrolled && tone !== null;
  const onDark = overlay && tone === "light";

  const linkIdle = onDark ? "text-paper/75 hover:text-paper" : "text-muted hover:text-ink";
  const linkOn = onDark ? "text-paper" : "text-ink";

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(false), 140);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[120] border-b transition-colors duration-300",
          scrolled ? "border-line bg-paper/92 backdrop-blur-md" : "border-transparent bg-transparent"
        )}
      >
        <div className="container-vbt">
          <nav className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
            <TransitionLink href="/" aria-label={d.brand.name} className="shrink-0">
              <LogoLockup dark={onDark} />
            </TransitionLink>

            {/* ---------- desktop ---------- */}
            <ul className="hidden items-center gap-7 lg:flex">
              {ROUTES.map((r) => {
                if (r.key === "tour") {
                  return (
                    <li
                      key={r.href}
                      className="relative"
                      onMouseEnter={openDropdown}
                      onMouseLeave={scheduleClose}
                    >
                      <TransitionLink
                        href="/tour"
                        data-active={isActive("/tour")}
                        aria-expanded={dropdown}
                        className={cn(
                          "link-underline inline-flex items-center gap-1.5 py-2 text-[0.92rem] transition-colors duration-200",
                          isActive("/tour") ? linkOn : linkIdle
                        )}
                      >
                        {d.nav.tour}
                        <svg
                          viewBox="0 0 10 6"
                          className={cn(
                            "h-1.5 w-2.5 transition-transform duration-300",
                            dropdown && "rotate-180"
                          )}
                          fill="none"
                          aria-hidden="true"
                        >
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      </TransitionLink>

                      <AnimatePresence>
                        {dropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                            className="absolute left-1/2 top-full z-50 w-[21rem] -translate-x-1/2 pt-3"
                          >
                            <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_16px_40px_-24px_rgba(20,40,45,0.35)]">
                              {TOUR_KEYS.map((key) => {
                                const t = d.tourTypes[key];
                                const a = TOUR_ACCENT[key];
                                const href = TOUR_ROUTE[key];
                                const inner = (
                                  <>
                                    <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", a.dot)} />
                                    <span className="min-w-0">
                                      <span className="block font-display text-[0.94rem] font-medium text-ink">
                                        {t.name}
                                      </span>
                                      <span className="mt-0.5 block text-[0.82rem] leading-snug text-muted">
                                        {t.short}
                                      </span>
                                    </span>
                                  </>
                                );
                                return href ? (
                                  <TransitionLink
                                    key={key}
                                    href={href}
                                    className="flex w-full items-start gap-3 border-b border-line-2 px-4 py-3.5 text-left transition-colors duration-200 last:border-0 hover:bg-lagoon-faint"
                                  >
                                    {inner}
                                  </TransitionLink>
                                ) : (
                                  <button
                                    key={key}
                                    type="button"
                                    onClick={() => {
                                      setDropdown(false);
                                      openModal();
                                    }}
                                    className="flex w-full items-start gap-3 border-b border-line-2 px-4 py-3.5 text-left transition-colors duration-200 last:border-0 hover:bg-lagoon-faint"
                                  >
                                    {inner}
                                  </button>
                                );
                              })}
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
                        "link-underline block py-2 text-[0.92rem] transition-colors duration-200",
                        isActive(r.href) ? linkOn : linkIdle
                      )}
                    >
                      {d.nav[r.key]}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={waLink(WA_GENERAL[lang])}
                target="_blank"
                rel="noreferrer noopener"
                className={buttonClass("book", "sm", "hidden sm:inline-flex")}
              >
                {d.nav.cta}
              </a>

              <button
                type="button"
                onClick={() => setMobile((v) => !v)}
                aria-expanded={mobile}
                aria-label={mobile ? d.nav.closeMenu : d.nav.openMenu}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full border transition-colors duration-200 lg:hidden",
                  onDark && !mobile
                    ? "border-paper/40 text-paper hover:border-paper"
                    : "border-line text-ink hover:border-ink"
                )}
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={cn(
                      "absolute left-0 block h-px w-full bg-current transition-all duration-300",
                      mobile ? "top-1.5 rotate-45" : "top-0"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200",
                      mobile && "opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 block h-px w-full bg-current transition-all duration-300",
                      mobile ? "top-1.5 -rotate-45" : "top-3"
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ---------- mobile sheet ---------- */}
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
              className="absolute inset-0 bg-ink/25"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobile(false)}
            />
            <motion.div
              className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto overscroll-contain border-b border-line bg-paper pb-8 pt-20"
              variants={{ hidden: { y: "-100%" }, show: { y: "0%" } }}
              transition={{ duration: 0.42, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="container-vbt">
                <ul className="divide-y divide-line border-y border-line">
                  {ROUTES.map((r) => (
                    <li key={r.href}>
                      <TransitionLink
                        href={r.href}
                        onNavigate={() => setMobile(false)}
                        className={cn(
                          "block py-4 font-display text-xl font-medium transition-colors",
                          isActive(r.href) ? "text-lagoon-deep" : "text-ink"
                        )}
                      >
                        {d.nav[r.key]}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  {d.nav.allTours}
                </p>
                <div className="mt-3 divide-y divide-line border-y border-line">
                  {TOUR_KEYS.map((key) => {
                    const t = d.tourTypes[key];
                    const a = TOUR_ACCENT[key];
                    const href = TOUR_ROUTE[key];
                    const inner = (
                      <>
                        <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", a.dot)} />
                        <span>
                          <span className="block font-display text-[0.98rem] font-medium text-ink">
                            {t.name}
                          </span>
                          <span className="mt-0.5 block text-[0.82rem] text-muted">{t.short}</span>
                        </span>
                      </>
                    );
                    return href ? (
                      <TransitionLink
                        key={key}
                        href={href}
                        onNavigate={() => setMobile(false)}
                        className="flex items-start gap-3 py-3.5"
                      >
                        {inner}
                      </TransitionLink>
                    ) : (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setMobile(false);
                          openModal();
                        }}
                        className="flex w-full items-start gap-3 py-3.5 text-left"
                      >
                        {inner}
                      </button>
                    );
                  })}
                </div>

                <a
                  href={waLink(WA_GENERAL[lang])}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonClass("book", "lg", "mt-7 w-full")}
                >
                  {d.nav.cta}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
