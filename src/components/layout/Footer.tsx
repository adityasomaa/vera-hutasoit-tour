"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { LogoLockup } from "@/components/graphics/Brand";
import {
  ROUTES,
  SITE,
  SOCIALS,
  TOUR_KEYS,
  TOUR_ROUTE,
  waLink,
  WA_GENERAL,
} from "@/lib/site";

export function Footer() {
  const { d, lang } = useLang();
  const { openPrefs } = useConsent();
  const { openModal } = useTourModal();

  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="container-vbt py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <LogoLockup />
            <p className="mt-4 max-w-[38ch] text-[0.9rem] leading-relaxed text-muted">
              {d.footer.blurb}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline text-[0.85rem] text-muted transition-colors hover:text-ink"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <Col title={d.footer.explore}>
            {ROUTES.map((r) => (
              <li key={r.href}>
                <TransitionLink
                  href={r.href}
                  className="link-underline text-[0.88rem] text-muted transition-colors hover:text-ink"
                >
                  {d.nav[r.key]}
                </TransitionLink>
              </li>
            ))}
          </Col>

          <Col title={d.footer.tours}>
            {TOUR_KEYS.map((k) => {
              const href = TOUR_ROUTE[k];
              return (
                <li key={k}>
                  {href ? (
                    <TransitionLink
                      href={href}
                      className="link-underline text-[0.88rem] text-muted transition-colors hover:text-ink"
                    >
                      {d.tourTypes[k].name}
                    </TransitionLink>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openModal()}
                      className="link-underline text-left text-[0.88rem] text-muted transition-colors hover:text-ink"
                    >
                      {d.tourTypes[k].name}
                    </button>
                  )}
                </li>
              );
            })}
          </Col>

          <div>
            <h2 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-faint">
              {d.footer.contact}
            </h2>
            <ul className="space-y-2.5 text-[0.88rem] text-muted">
              <li>
                <a
                  href={waLink(WA_GENERAL[lang])}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline transition-colors hover:text-ink"
                >
                  {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="link-underline transition-colors hover:text-ink"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="max-w-[26ch] leading-relaxed">{SITE.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[0.78rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {SITE.name}. {d.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <TransitionLink href="/privacy-policy" className="transition-colors hover:text-ink">
              {d.nav.privacy}
            </TransitionLink>
            <TransitionLink href="/terms-of-use" className="transition-colors hover:text-ink">
              {d.nav.terms}
            </TransitionLink>
            <button
              type="button"
              onClick={openPrefs}
              className="transition-colors hover:text-ink"
            >
              {d.cookie.manage}
            </button>
          </div>
        </div>
        <p className="mt-4 text-[0.72rem] leading-relaxed text-faint/80">
          {d.footer.disclaimer}{" "}
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline"
          >
            {d.common.photoCredit}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-faint">
        {title}
      </h2>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}
