"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Send,
} from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { CtaBand, PageHero } from "@/components/sections/Common";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/Button";
import { Blobs, PatternStrip } from "@/components/graphics/Brand";
import { SITE, SOCIALS, waLink, WA_PREFILL } from "@/lib/site";
import { EMAIL_RE, cn } from "@/lib/utils";

const CARD_ICONS = [MessageCircle, Mail, MapPin];

export function ContactView() {
  const { d, lang } = useLang();
  const { track } = useConsent();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      if (!e[k]) return e;
      const next = { ...e };
      delete next[k];
      return next;
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = d.contact.form.required;
    if (!form.email.trim()) err.email = d.contact.form.required;
    else if (!EMAIL_RE.test(form.email.trim())) err.email = d.contact.form.invalidEmail;
    if (!form.message.trim()) err.message = d.contact.form.required;
    setErrors(err);
    if (Object.keys(err).length) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      track("contact_form_submit");
    }, 1000);
  };

  const cardHrefs = [
    waLink(WA_PREFILL[lang]),
    `mailto:${SITE.email}`,
    `https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}`,
  ];

  return (
    <>
      <PageHero
        eyebrow={d.contact.hero.eyebrow}
        title={d.contact.hero.title}
        subtitle={d.contact.hero.subtitle}
        scene="cliff"
        tone="lagoon"
      />

      {/* ---------------- contact cards ---------------- */}
      <section className="relative overflow-hidden py-8 sm:py-14">
        <div className="container-vbt relative">
          <div className="grid gap-5 md:grid-cols-3">
            {d.contact.cards.map((c, i) => {
              const Icon = CARD_ICONS[i];
              const tones = [
                "from-lagoon-400 to-lagoon-600",
                "from-sunbeam-400 to-sunbeam-600",
                "from-coral-400 to-coral-600",
              ];
              return (
                <Reveal key={c.title} delay={i * 0.1}>
                  <TiltCard className="h-full" intensity={7}>
                    <a
                      href={cardHrefs[i]}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group surface-card relative flex h-full flex-col rounded-3xl p-6 transition-shadow duration-500 hover:shadow-[0_34px_74px_-34px_rgba(6,23,29,0.42)]"
                    >
                      <span
                        className={cn(
                          "mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                          tones[i]
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ink/40">
                        {c.title}
                      </h3>
                      <p className="mt-2 font-display text-base font-extrabold leading-snug text-ink">
                        {c.value}
                      </p>
                      <p className="mt-1.5 text-[0.8rem] text-ink/50">{c.note}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-lagoon-700">
                        {c.action}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- form + hours ---------------- */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <Blobs variant="lagoon" className="opacity-45" />
        <div className="container-vbt relative">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            {/* form */}
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-sand p-6 shadow-[0_28px_70px_-36px_rgba(6,23,29,0.4)] sm:p-9">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lagoon-300/30 blur-3xl" />

                <div className="relative">
                  <SectionHeading
                    title={d.contact.form.title}
                    subtitle={d.contact.form.subtitle}
                    align="left"
                    squiggle={false}
                  />

                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="ok"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-9 flex flex-col items-center rounded-3xl border border-lagoon-200 bg-lagoon-50/70 p-9 text-center"
                      >
                        <motion.span
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 220, damping: 14 }}
                          className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-lagoon-400 to-lagoon-600 text-white shadow-lg"
                        >
                          <CheckCircle2 className="h-8 w-8" />
                        </motion.span>
                        <p className="mt-5 font-display text-lg font-extrabold text-ink">
                          {d.contact.form.success}
                        </p>
                        <p className="mt-2 text-[0.82rem] text-ink/45">
                          {d.contact.form.successNote}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          magnetic={false}
                          className="mt-6"
                          onClick={() => {
                            setSent(false);
                            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                          }}
                        >
                          {d.contact.form.another}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={submit}
                        noValidate
                        className="mt-9 flex flex-col gap-5"
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <TextField
                            label={d.contact.form.name}
                            placeholder={d.contact.form.namePh}
                            value={form.name}
                            onChange={(v) => set("name", v)}
                            error={errors.name}
                            required
                          />
                          <TextField
                            label={d.contact.form.email}
                            placeholder={d.contact.form.emailPh}
                            type="email"
                            value={form.email}
                            onChange={(v) => set("email", v)}
                            error={errors.email}
                            required
                          />
                          <TextField
                            label={d.contact.form.phone}
                            placeholder={d.contact.form.phonePh}
                            value={form.phone}
                            onChange={(v) => set("phone", v)}
                          />
                          <TextField
                            label={d.contact.form.subject}
                            placeholder={d.contact.form.subjectPh}
                            value={form.subject}
                            onChange={(v) => set("subject", v)}
                          />
                        </div>

                        <TextField
                          label={d.contact.form.message}
                          placeholder={d.contact.form.messagePh}
                          value={form.message}
                          onChange={(v) => set("message", v)}
                          error={errors.message}
                          textarea
                          required
                        />

                        <div className="flex flex-wrap items-center gap-4">
                          <Button type="submit" variant="primary" size="md" disabled={sending}>
                            {sending ? d.contact.form.sending : d.contact.form.submit}
                            <Send className="h-4 w-4" />
                          </Button>
                          <p className="text-[0.74rem] text-ink/35">
                            {d.contact.form.successNote}
                          </p>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>

            {/* side column */}
            <div className="flex flex-col gap-5">
              <Reveal dir="left" delay={0.1}>
                <div className="surface-card rounded-3xl p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
                    <Clock className="h-5 w-5 text-lagoon-500" />
                    {d.contact.hours.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {d.contact.hours.items.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-center justify-between gap-3 border-b border-dashed border-ink/10 pb-3 text-[0.86rem] last:border-0 last:pb-0"
                      >
                        <span className="text-ink/60">{h.day}</span>
                        <span className="font-bold text-ink">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[0.76rem] leading-relaxed text-ink/40">
                    {d.contact.hours.note}
                  </p>
                </div>
              </Reveal>

              {/* stylised map */}
              <Reveal dir="left" delay={0.18}>
                <div className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-lagoon-50 shadow-[0_20px_50px_-28px_rgba(6,23,29,0.35)]">
                  <StylisedMap />
                  <div className="relative border-t border-ink/8 bg-sand/90 p-5 backdrop-blur">
                    <h3 className="font-display text-base font-extrabold text-ink">
                      {d.contact.map.title}
                    </h3>
                    <p className="mt-1 text-[0.8rem] text-ink/50">{d.contact.map.note}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3.5 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-lagoon-700 transition-colors hover:text-lagoon-800"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      {d.contact.map.cta}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal dir="left" delay={0.26}>
                <div className="surface-card rounded-3xl p-6">
                  <h3 className="font-display text-base font-extrabold text-ink">
                    {d.contact.social.title}
                  </h3>
                  <div className="mt-4 flex flex-col gap-2">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center justify-between gap-3 rounded-xl border border-ink/8 bg-white/60 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral-300 hover:bg-white"
                      >
                        <span className="text-[0.86rem] font-bold text-ink/75">{s.name}</span>
                        <span className="flex items-center gap-1.5 text-[0.76rem] text-ink/40">
                          {s.handle}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <PatternStrip className="mt-16 text-lagoon-300/50" />
      </section>

      <CtaBand
        title={d.about.cta.title}
        subtitle={d.about.cta.subtitle}
        primary={d.about.cta.primary}
        secondary={d.home.cta.secondary}
        scene="temple"
      />
    </>
  );
}

/* ---------------------------------------------------------------- */

function TextField({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base =
    "w-full rounded-2xl border bg-white/80 px-4 py-3 text-[0.92rem] text-ink outline-none transition-all duration-300 placeholder:text-ink/30 focus:bg-white focus:ring-4";
  const tone = error
    ? "border-coral-400 focus:border-coral-500 focus:ring-coral-500/12"
    : "border-ink/12 focus:border-lagoon-500 focus:ring-lagoon-500/12";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[0.76rem] font-bold uppercase tracking-wider text-ink/50">
        {label}
        {required && <span className="ml-1 text-coral-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(base, tone, "resize-none leading-relaxed")}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(base, tone)}
        />
      )}
      {error && <p className="text-[0.76rem] font-semibold text-coral-600">{error}</p>}
    </div>
  );
}

/** A drawn map card — no third-party embed, no tracking. */
function StylisedMap() {
  return (
    <svg viewBox="0 0 400 220" className="h-44 w-full" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="vbt-map-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECFEFB" />
          <stop offset="100%" stopColor="#CDFAF3" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#vbt-map-bg)" />

      {/* water */}
      <path d="M0 168 C 70 154, 150 190, 230 172 C 300 156, 350 186, 400 170 L400 220 L0 220 Z" fill="#9BF3E9" />
      <path d="M0 182 C 80 170, 160 202, 240 186 C 310 172, 356 198, 400 184 L400 220 L0 220 Z" fill="#5FE6DB" />

      {/* roads */}
      <g stroke="#FFF8EE" strokeWidth="7" fill="none" strokeLinecap="round">
        <path d="M-10 96 C 90 84, 150 120, 250 100 C 320 86, 360 108, 410 98" />
        <path d="M120 -10 C 128 60, 108 130, 130 230" />
        <path d="M290 -10 C 284 50, 300 110, 286 230" />
      </g>
      <g stroke="#ECD8BE" strokeWidth="2.5" fill="none" strokeDasharray="7 8" strokeLinecap="round">
        <path d="M-10 96 C 90 84, 150 120, 250 100 C 320 86, 360 108, 410 98" />
        <path d="M120 -10 C 128 60, 108 130, 130 230" />
      </g>

      {/* blocks */}
      {[
        [24, 24, 66, 44],
        [150, 18, 100, 50],
        [318, 30, 60, 40],
        [30, 122, 58, 34],
        [166, 122, 88, 36],
        [320, 128, 56, 30],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#FFF8EE" opacity={0.75} />
      ))}

      {/* green patches */}
      <circle cx="82" cy="66" r="15" fill="#29CFC5" opacity="0.5" />
      <circle cx="272" cy="152" r="18" fill="#29CFC5" opacity="0.45" />

      {/* pin */}
      <g transform="translate(200 92)">
        <circle r="26" fill="#FF6B57" opacity="0.18">
          <animate attributeName="r" values="20;34;20" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <path
          d="M0 14 C -12 0, -14 -6, -14 -12 A14 14 0 1 1 14 -12 C 14 -6, 12 0, 0 14 Z"
          fill="#EF4529"
        />
        <circle cy="-12" r="5" fill="#FFF8EE" />
      </g>
      <text x="200" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#06171D" opacity="0.6">
        Vera Bali Tour
      </text>
    </svg>
  );
}
