"use client";

import { useLang } from "@/components/providers/LanguageProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { buttonClass } from "@/components/ui/Button";
import { Scene } from "@/components/graphics/Scene";

export default function NotFound() {
  const { d } = useLang();

  return (
    <section className="flex min-h-dvh items-center py-32">
      <div className="container-vbt">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-[0.8rem] uppercase tracking-[0.16em] text-faint">
              {d.notFound.code}
            </p>
            <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
              {d.notFound.title}
            </h1>
            <p className="mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed text-muted">
              {d.notFound.subtitle}
            </p>
            <TransitionLink href="/" className={buttonClass("primary", "lg", "mt-8")}>
              {d.notFound.cta}
            </TransitionLink>
          </div>

          <div className="aspect-4/3 overflow-hidden rounded-xl border border-line">
            <Scene variant="village" seed={9} />
          </div>
        </div>
      </div>
    </section>
  );
}
