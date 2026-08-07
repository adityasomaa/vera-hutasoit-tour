"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function LegalView({ kind }: { kind: "privacy" | "terms" }) {
  const { d } = useLang();
  const { openPrefs } = useConsent();
  const doc = kind === "privacy" ? d.legal.privacy : d.legal.terms;
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const ids = doc.sections.map((s) => slug(s.title));
    const onScroll = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [doc.sections]);

  return (
    <>
      <section className="border-b border-line pb-10 pt-28 sm:pb-14 sm:pt-36">
        <div className="container-vbt">
          <Reveal className="max-w-2xl">
            <Eyebrow>
              {d.legal.updated}: {d.legal.updatedDate}
            </Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
              {doc.title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-[0.98rem] leading-relaxed text-muted">
              {doc.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-vbt">
          <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-faint">
                {d.legal.toc}
              </p>
              <nav>
                <ul className="flex flex-col border-l border-line">
                  {doc.sections.map((s) => {
                    const id = slug(s.title);
                    const active = activeId === id;
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={cn(
                            "-ml-px block border-l py-1.5 pl-4 text-[0.83rem] leading-snug transition-colors duration-200",
                            active
                              ? "border-ink text-ink"
                              : "border-transparent text-muted hover:text-ink"
                          )}
                        >
                          {s.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 flex flex-col items-start gap-2.5">
                <button
                  type="button"
                  onClick={openPrefs}
                  className="link-underline text-[0.85rem] text-muted transition-colors hover:text-ink"
                >
                  {d.cookie.manage}
                </button>
                <TransitionLink
                  href="/"
                  className="link-underline text-[0.85rem] text-muted transition-colors hover:text-ink"
                >
                  {d.legal.backHome}
                </TransitionLink>
              </div>
            </aside>

            <div className="min-w-0 divide-y divide-line border-t border-line">
              {doc.sections.map((s) => (
                <Reveal key={s.title} amount={0.05}>
                  <article id={slug(s.title)} className="scroll-mt-28 py-8">
                    <h2 className="font-display text-[1.15rem] font-medium leading-snug tracking-tight text-ink">
                      {s.title}
                    </h2>
                    <div className="mt-3 flex flex-col gap-3">
                      {s.body.map((p, pi) => (
                        <p key={pi} className="max-w-[70ch] text-[0.94rem] leading-relaxed text-muted">
                          {p}
                        </p>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
              <p className="py-8 text-[0.82rem] leading-relaxed text-faint">
                {d.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
