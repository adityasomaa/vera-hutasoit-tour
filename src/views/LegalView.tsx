"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Cookie, FileText, ShieldCheck } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { Reveal, SplitText } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Blobs, PatternStrip, Squiggle } from "@/components/graphics/Brand";
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
  const [activeId, setActiveId] = useState<string>("");

  /* highlight the section currently in view */
  useEffect(() => {
    const ids = doc.sections.map((s) => slug(s.title));
    const onScroll = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [doc.sections]);

  const Icon = kind === "privacy" ? ShieldCheck : FileText;

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Blobs variant={kind === "privacy" ? "lagoon" : "warm"} className="opacity-60" />
        <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-[0.16]" />

        <div className="container-vbt relative">
          <Reveal dir="down">
            <Eyebrow tone={kind === "privacy" ? "lagoon" : "coral"}>
              {d.legal.updated}: {d.legal.updatedDate}
            </Eyebrow>
          </Reveal>

          <div className="mt-6 flex items-start gap-5">
            <span
              className={cn(
                "hidden h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg sm:grid",
                kind === "privacy"
                  ? "from-lagoon-400 to-lagoon-600"
                  : "from-coral-400 to-coral-600"
              )}
            >
              <Icon className="h-8 w-8" />
            </span>
            <div>
              <h1 className="font-display text-[clamp(2.1rem,6vw,3.6rem)] font-extrabold leading-[1.03] text-ink">
                <SplitText text={doc.title} />
              </h1>
              <Squiggle className="mt-4 text-sunbeam-400" />
            </div>
          </div>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-ink/65">{doc.intro}</p>
          </Reveal>
        </div>
        <PatternStrip className="mt-12 text-lagoon-300/50" />
      </section>

      <section className="relative pb-24">
        <div className="container-vbt">
          <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
            {/* --- table of contents --- */}
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink/35">
                {d.legal.toc}
              </p>
              <nav>
                <ul className="flex flex-col gap-1 border-l border-ink/10 pl-1">
                  {doc.sections.map((s) => {
                    const id = slug(s.title);
                    const active = activeId === id;
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={cn(
                            "-ml-px block border-l-2 py-1.5 pl-4 text-[0.83rem] leading-snug transition-all duration-300",
                            active
                              ? "border-lagoon-500 font-bold text-lagoon-700"
                              : "border-transparent text-ink/50 hover:border-ink/20 hover:text-ink"
                          )}
                        >
                          {s.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={openPrefs}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white/70 px-4 py-2.5 text-[0.82rem] font-bold text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-sunbeam-400 hover:text-ink"
                >
                  <Cookie className="h-4 w-4" />
                  {d.cookie.manage}
                </button>
                <TransitionLink
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.82rem] font-bold text-ink/50 transition-colors hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {d.legal.backHome}
                </TransitionLink>
              </div>
            </aside>

            {/* --- body --- */}
            <div className="min-w-0">
              <div className="flex flex-col gap-10">
                {doc.sections.map((s, i) => (
                  <Reveal key={s.title} delay={0.04} amount={0.05}>
                    <article
                      id={slug(s.title)}
                      className="scroll-mt-28 rounded-3xl border border-ink/8 bg-white/60 p-6 backdrop-blur transition-shadow duration-500 hover:shadow-[0_24px_60px_-34px_rgba(6,23,29,0.35)] sm:p-8"
                    >
                      <h2 className="flex items-start gap-3 font-display text-xl font-extrabold leading-snug text-ink sm:text-2xl">
                        <span
                          className={cn(
                            "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                            i % 3 === 0
                              ? "bg-lagoon-500"
                              : i % 3 === 1
                                ? "bg-sunbeam-400"
                                : "bg-coral-500"
                          )}
                        />
                        {s.title}
                      </h2>
                      <div className="mt-4 flex flex-col gap-3.5 pl-[1.4rem]">
                        {s.body.map((p, pi) => (
                          <p key={pi} className="text-[0.94rem] leading-relaxed text-ink/70">
                            {p}
                          </p>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <p className="mt-10 rounded-2xl border border-dashed border-ink/15 bg-sand-2/60 p-5 text-[0.82rem] leading-relaxed text-ink/45">
                  {d.footer.disclaimer}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
