"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Cookie,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { LogoLockup, PatternStrip } from "@/components/graphics/Brand";
import { Button } from "@/components/ui/Button";
import { ROUTES, SITE, SOCIALS, TOUR_KEYS, waLink, WA_PREFILL } from "@/lib/site";
import { EMAIL_RE, cn } from "@/lib/utils";

export function Footer() {
  const { d, lang } = useLang();
  const { openPrefs, track } = useConsent();
  const { openModal } = useTourModal();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "bad">("idle");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("bad");
      return;
    }
    setState("ok");
    track("newsletter_subscribe");
    setEmail("");
  };

  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-ink text-sand">
      <PatternStrip className="text-lagoon-500/40" />

      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -left-32 top-0 h-96 w-96 rounded-full bg-lagoon-600/25 blur-3xl" />
        <div
          className="animate-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-coral-600/15 blur-3xl"
          style={{ animationDelay: "-9s" }}
        />
      </div>
      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

      <div className="container-vbt relative py-16 sm:py-20">
        {/* newsletter */}
        <div className="mb-14 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
              {d.footer.newsletter.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-sand/60">
              {d.footer.newsletter.desc}
            </p>
          </div>
          <form onSubmit={subscribe} noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setState("idle");
                  }}
                  placeholder={d.footer.newsletter.placeholder}
                  aria-label={d.footer.newsletter.placeholder}
                  className={cn(
                    "w-full rounded-full border bg-white/5 py-3.5 pl-11 pr-4 text-sm text-sand outline-none transition-all duration-300 placeholder:text-sand/35",
                    state === "bad"
                      ? "border-coral-400 focus:border-coral-300"
                      : "border-white/12 focus:border-lagoon-400 focus:bg-white/10"
                  )}
                />
              </div>
              <Button type="submit" variant="sun" size="md" magnetic={false} className="sm:px-7">
                {d.footer.newsletter.button}
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p
              className={cn(
                "mt-3 text-xs",
                state === "ok" && "text-lagoon-300",
                state === "bad" && "text-coral-300",
                state === "idle" && "text-sand/35"
              )}
            >
              {state === "ok"
                ? d.footer.newsletter.success
                : state === "bad"
                  ? d.footer.newsletter.invalid
                  : d.footer.newsletter.note}
            </p>
          </form>
        </div>

        {/* link columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <LogoLockup dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand/55">
              {d.footer.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-semibold text-sand/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-sunbeam-400 hover:text-sunbeam-300"
                >
                  {s.name}
                  <ArrowUpRight className="ml-1 inline h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title={d.footer.explore}>
            {ROUTES.map((r) => (
              <FooterLink key={r.href} href={r.href}>
                {d.nav[r.key]}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={d.footer.tours}>
            {TOUR_KEYS.map((k) => (
              <li key={k}>
                <button
                  type="button"
                  onClick={() => openModal(k)}
                  className="link-underline text-left text-sm text-sand/60 transition-colors duration-300 hover:text-sand"
                >
                  {d.tourTypes[k].name}
                </button>
              </li>
            ))}
            <FooterLink href="/privacy-policy">{d.nav.privacy}</FooterLink>
            <FooterLink href="/terms-of-use">{d.nav.terms}</FooterLink>
            <li>
              <button
                type="button"
                onClick={openPrefs}
                className="inline-flex items-center gap-1.5 text-sm text-sand/60 transition-colors duration-300 hover:text-sunbeam-300"
              >
                <Cookie className="h-3.5 w-3.5" />
                {d.cookie.manage}
              </button>
            </li>
          </FooterCol>

          <div>
            <h4 className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-sand/35">
              {d.footer.contact}
            </h4>
            <ul className="space-y-3.5 text-sm text-sand/60">
              <li>
                <a
                  href={waLink(WA_PREFILL[lang])}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start gap-2.5 transition-colors hover:text-sand"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-300" />
                  <span className="group-hover:underline">{SITE.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-2.5 transition-colors hover:text-sand"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sunbeam-300" />
                  <span className="group-hover:underline">{SITE.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-300" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-sand/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. {d.footer.rights}
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lagoon-400" />
            {d.footer.madeIn}
          </p>
        </div>
        <p className="mt-3 text-[0.68rem] leading-relaxed text-sand/25">
          {d.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-sand/35">
        {title}
      </h4>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <TransitionLink
        href={href}
        className="link-underline inline-block text-sm text-sand/60 transition-colors duration-300 hover:text-sand"
      >
        {children}
      </TransitionLink>
    </li>
  );
}
