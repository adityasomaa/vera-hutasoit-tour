"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  Minus,
  Plus,
  Send,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/graphics/Scene";
import {
  DESTINATION_OPTIONS,
  TOUR_KEYS,
  TOUR_THEME,
  waLink,
  type TourKey,
} from "@/lib/site";
import { EMAIL_RE, cn } from "@/lib/utils";

type Form = {
  tourType: TourKey;
  destinations: string[];
  date: string;
  days: number;
  adults: number;
  kids: number;
  budget: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
  consent: boolean;
};

const EMPTY: Form = {
  tourType: "private",
  destinations: [],
  date: "",
  days: 1,
  adults: 2,
  kids: 0,
  budget: 0,
  name: "",
  email: "",
  phone: "",
  country: "",
  notes: "",
  consent: false,
};

export function TourRequestModal() {
  const { d, lang } = useLang();
  const { open, preset, presetNote, closeModal } = useTourModal();
  const { track } = useConsent();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  /* reset & apply presets each time the modal opens */
  useEffect(() => {
    if (!open) return;
    setStep(0);
    setErrors({});
    setSent(false);
    setSending(false);
    setForm({
      ...EMPTY,
      tourType: preset ?? "private",
      notes: presetNote ? `${presetNote}\n` : "",
    });
    track("tour_modal_open", { preset: preset ?? "none" });
  }, [open, preset, presetNote, track]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      if (!e[k as string]) return e;
      const next = { ...e };
      delete next[k as string];
      return next;
    });
  };

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (form.adults + form.kids < 1) e.pax = d.modal.errors.pax;
    }
    if (s === 2) {
      if (!form.name.trim()) e.name = d.modal.errors.required;
      if (!form.email.trim()) e.email = d.modal.errors.required;
      else if (!EMAIL_RE.test(form.email.trim())) e.email = d.modal.errors.email;
      if (!form.consent) e.consent = d.modal.errors.consent;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setStep((s) => Math.min(2, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(2)) return;
    setSending(true);
    // Front-end prototype: nothing leaves the browser.
    setTimeout(() => {
      setSending(false);
      setSent(true);
      track("tour_request_submit", { tour: form.tourType, pax: form.adults + form.kids });
    }, 1100);
  };

  const waMessage = useMemo(() => {
    const t = d.tourTypes[form.tourType].name;
    return lang === "id"
      ? `Halo Vera Bali Tour! Saya baru mengirim pengajuan ${t} untuk ${form.adults + form.kids} orang. Boleh dibantu lanjut di sini?`
      : `Hi Vera Bali Tour! I've just sent a ${t} request for ${form.adults + form.kids} people. Can we continue here?`;
  }, [d, form.tourType, form.adults, form.kids, lang]);

  if (!open) return null;

  const theme = TOUR_THEME[form.tourType];

  return (
    <AnimatePresence>
      <motion.div
        key="tour-modal"
        className="fixed inset-0 z-[165] flex items-end justify-center sm:items-center sm:p-6"
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
          className="absolute inset-0 bg-ink/60 backdrop-blur-md"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={d.modal.title}
          variants={{
            hidden: { y: 70, opacity: 0, scale: 0.97 },
            show: { y: 0, opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] bg-sand shadow-2xl sm:max-h-[90dvh] sm:rounded-[2rem]"
        >
          {/* ---------- header ---------- */}
          <div className="relative shrink-0 overflow-hidden bg-ink px-5 pb-5 pt-6 text-sand sm:px-8 sm:pb-6 sm:pt-7">
            <div className="pointer-events-none absolute inset-0 opacity-45">
              <Scene variant={theme.scene} animated={false} />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-sand/80 ring-1 ring-inset ring-white/15">
                  <Sparkles className="h-3 w-3" />
                  {sent ? d.modal.success.title : d.modal.title}
                </span>
                <h2 className="mt-3 font-display text-xl font-extrabold leading-tight sm:text-2xl">
                  {sent ? d.modal.success.title : d.modal.subtitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label={d.modal.close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/12 text-sand/80 transition-colors hover:bg-white/22 hover:text-sand"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!sent && (
              <div className="relative mt-5 flex items-center gap-2">
                {d.modal.steps.map((label, i) => (
                  <div key={label} className="flex flex-1 items-center gap-2">
                    <div className="flex-1">
                      <div className="h-1 overflow-hidden rounded-full bg-white/15">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-lagoon-400 to-sunbeam-400"
                          initial={false}
                          animate={{ width: i <= step ? "100%" : "0%" }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      <span
                        className={cn(
                          "mt-2 block text-[0.66rem] font-bold uppercase tracking-wider transition-colors",
                          i <= step ? "text-sand/85" : "text-sand/35"
                        )}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ---------- body ---------- */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
            {sent ? (
              <SuccessPanel waHref={waLink(waMessage)} onDone={closeModal} />
            ) : (
              <form onSubmit={submit} noValidate id="tour-request-form">
                <AnimatePresence mode="wait" initial={false}>
                  {step === 0 && (
                    <StepShell key="s0">
                      <Field label={d.modal.fields.tourType}>
                        <div className="grid gap-2.5 sm:grid-cols-3">
                          {TOUR_KEYS.map((k) => {
                            const t = d.tourTypes[k];
                            const th = TOUR_THEME[k];
                            const active = form.tourType === k;
                            return (
                              <button
                                key={k}
                                type="button"
                                onClick={() => set("tourType", k)}
                                className={cn(
                                  "group relative overflow-hidden rounded-2xl border-2 p-3.5 text-left transition-all duration-300",
                                  active
                                    ? "border-lagoon-500 bg-white shadow-[0_14px_36px_-18px_rgba(5,146,143,0.7)]"
                                    : "border-ink/10 bg-white/60 hover:border-ink/25 hover:bg-white"
                                )}
                              >
                                <span
                                  className={cn(
                                    "mb-2.5 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br text-white transition-transform duration-400 group-hover:scale-110",
                                    th.grad
                                  )}
                                >
                                  <Sparkles className="h-4 w-4" />
                                </span>
                                <span className="block font-display text-[0.92rem] font-bold text-ink">
                                  {t.name}
                                </span>
                                <span className="mt-0.5 block text-[0.76rem] leading-snug text-ink/55">
                                  {t.short}
                                </span>
                                <span className="mt-2 block text-[0.72rem] font-bold text-lagoon-700">
                                  {t.price}
                                </span>
                                {active && (
                                  <motion.span
                                    layoutId="tourpick"
                                    className="absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full bg-lagoon-500 text-white"
                                  >
                                    <Check className="h-3 w-3" strokeWidth={3} />
                                  </motion.span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </Field>

                      <Field
                        label={d.modal.fields.destinations}
                        hint={d.modal.fields.destinationsHint}
                        icon={MapPin}
                      >
                        <div className="flex flex-wrap gap-2">
                          {DESTINATION_OPTIONS.map((o) => {
                            const active = form.destinations.includes(o.id);
                            return (
                              <button
                                key={o.id}
                                type="button"
                                onClick={() =>
                                  set(
                                    "destinations",
                                    active
                                      ? form.destinations.filter((x) => x !== o.id)
                                      : [...form.destinations, o.id]
                                  )
                                }
                                className={cn(
                                  "rounded-full border px-3.5 py-2 text-[0.82rem] font-semibold transition-all duration-300 active:scale-95",
                                  active
                                    ? "border-coral-500 bg-coral-500 text-white shadow-[0_8px_22px_-10px_rgba(239,69,41,0.8)]"
                                    : "border-ink/12 bg-white/70 text-ink/65 hover:border-coral-300 hover:text-ink"
                                )}
                              >
                                {o.label[lang]}
                              </button>
                            );
                          })}
                        </div>
                      </Field>
                    </StepShell>
                  )}

                  {step === 1 && (
                    <StepShell key="s1">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label={d.modal.fields.date} icon={CalendarDays}>
                          <input
                            type="date"
                            value={form.date}
                            onChange={(e) => set("date", e.target.value)}
                            className={inputCls}
                          />
                        </Field>

                        <Field label={d.modal.fields.days} icon={Clock3}>
                          <Stepper
                            value={form.days}
                            min={1}
                            max={21}
                            onChange={(v) => set("days", v)}
                            suffix={d.common.days}
                          />
                        </Field>
                      </div>

                      <Field label={d.modal.fields.pax} icon={Users} error={errors.pax}>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <LabeledStepper
                            label={d.modal.fields.paxAdults}
                            value={form.adults}
                            min={0}
                            max={30}
                            onChange={(v) => set("adults", v)}
                          />
                          <LabeledStepper
                            label={d.modal.fields.paxKids}
                            value={form.kids}
                            min={0}
                            max={20}
                            onChange={(v) => set("kids", v)}
                          />
                        </div>
                      </Field>

                      <Field label={d.modal.fields.budget} icon={Wallet}>
                        <div className="flex flex-wrap gap-2">
                          {d.modal.fields.budgetOpts.map((opt, i) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => set("budget", i)}
                              className={cn(
                                "rounded-full border px-3.5 py-2 text-[0.82rem] font-semibold transition-all duration-300 active:scale-95",
                                form.budget === i
                                  ? "border-lagoon-500 bg-lagoon-500 text-white shadow-[0_8px_22px_-10px_rgba(5,146,143,0.8)]"
                                  : "border-ink/12 bg-white/70 text-ink/65 hover:border-lagoon-300 hover:text-ink"
                              )}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </StepShell>
                  )}

                  {step === 2 && (
                    <StepShell key="s2">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label={d.modal.fields.name} error={errors.name} required>
                          <input
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            placeholder={d.modal.fields.namePh}
                            className={cn(inputCls, errors.name && errorCls)}
                          />
                        </Field>
                        <Field label={d.modal.fields.email} error={errors.email} required>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            placeholder={d.modal.fields.emailPh}
                            className={cn(inputCls, errors.email && errorCls)}
                          />
                        </Field>
                        <Field label={d.modal.fields.phone}>
                          <input
                            value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            placeholder={d.modal.fields.phonePh}
                            className={inputCls}
                          />
                        </Field>
                        <Field label={d.modal.fields.country}>
                          <input
                            value={form.country}
                            onChange={(e) => set("country", e.target.value)}
                            placeholder={d.modal.fields.countryPh}
                            className={inputCls}
                          />
                        </Field>
                      </div>

                      <Field label={d.modal.fields.notes}>
                        <textarea
                          rows={4}
                          value={form.notes}
                          onChange={(e) => set("notes", e.target.value)}
                          placeholder={d.modal.fields.notesPh}
                          className={cn(inputCls, "resize-none leading-relaxed")}
                        />
                      </Field>

                      <label
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-colors duration-300",
                          errors.consent
                            ? "border-coral-400 bg-coral-50/60"
                            : form.consent
                              ? "border-lagoon-300 bg-lagoon-50/70"
                              : "border-ink/12 bg-white/60 hover:bg-white"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-all duration-300",
                            form.consent
                              ? "border-lagoon-500 bg-lagoon-500 text-white"
                              : "border-ink/25 bg-white"
                          )}
                        >
                          {form.consent && <Check className="h-3 w-3" strokeWidth={3.5} />}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={form.consent}
                          onChange={(e) => set("consent", e.target.checked)}
                        />
                        <span className="text-[0.85rem] leading-snug text-ink/70">
                          {d.modal.fields.consent}
                          {errors.consent && (
                            <span className="mt-1 block text-[0.78rem] font-semibold text-coral-600">
                              {errors.consent}
                            </span>
                          )}
                        </span>
                      </label>
                    </StepShell>
                  )}
                </AnimatePresence>
              </form>
            )}
          </div>

          {/* ---------- footer ---------- */}
          {!sent && (
            <div className="shrink-0 border-t border-ink/8 bg-white/60 px-5 py-4 backdrop-blur sm:px-8">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.72rem] font-semibold uppercase tracking-wider text-ink/40">
                  {d.modal.step} {step + 1} {d.modal.of} {d.modal.steps.length}
                </span>
                <div className="flex items-center gap-2.5">
                  {step > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      magnetic={false}
                      shine={false}
                      onClick={back}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {d.modal.back}
                    </Button>
                  )}
                  {step < 2 ? (
                    <Button type="button" variant="primary" size="sm" magnetic={false} onClick={next}>
                      {d.modal.next}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      form="tour-request-form"
                      variant="secondary"
                      size="sm"
                      magnetic={false}
                      disabled={sending}
                    >
                      {sending ? d.modal.sending : d.modal.submit}
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */

const inputCls =
  "w-full rounded-2xl border border-ink/12 bg-white/80 px-4 py-3 text-[0.92rem] text-ink outline-none transition-all duration-300 placeholder:text-ink/30 focus:border-lagoon-500 focus:bg-white focus:ring-4 focus:ring-lagoon-500/12";
const errorCls = "border-coral-400 focus:border-coral-500 focus:ring-coral-500/12";

function StepShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 26 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -26 }}
      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-5"
    >
      {children}
    </motion.div>
  );
}

function Field({
  label,
  hint,
  error,
  icon: Icon,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  icon?: React.ElementType;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-wider text-ink/50">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
        {required && <span className="text-coral-500">*</span>}
      </label>
      {hint && <p className="-mt-1 text-[0.78rem] text-ink/40">{hint}</p>}
      {children}
      {error && (
        <p className="text-[0.78rem] font-semibold text-coral-600">{error}</p>
      )}
    </div>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-ink/12 bg-white/80 p-1.5">
      <StepBtn onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>
        <Minus className="h-4 w-4" />
      </StepBtn>
      <span className="flex-1 text-center font-display text-base font-bold text-ink tabular-nums">
        {value}
        {suffix && <span className="ml-1 text-xs font-semibold text-ink/45">{suffix}</span>}
      </span>
      <StepBtn onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>
        <Plus className="h-4 w-4" />
      </StepBtn>
    </div>
  );
}

function LabeledStepper({
  label,
  ...rest
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[0.76rem] font-semibold text-ink/45">{label}</span>
      <Stepper {...rest} />
    </div>
  );
}

function StepBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="grid h-9 w-9 place-items-center rounded-xl bg-ink/6 text-ink/70 transition-all duration-200 hover:bg-lagoon-500 hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function SuccessPanel({ waHref, onDone }: { waHref: string; onDone: () => void }) {
  const { d } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center py-6 text-center"
    >
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
        className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-lagoon-400 to-lagoon-600 text-white shadow-[0_20px_50px_-20px_rgba(5,146,143,0.9)]"
      >
        <CheckCircle2 className="h-10 w-10" />
      </motion.span>

      <h3 className="mt-6 font-display text-2xl font-extrabold text-ink">
        {d.modal.success.title}
      </h3>
      <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-ink/65">
        {d.modal.success.body}
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <a href={waHref} target="_blank" rel="noreferrer noopener">
          <Button variant="primary" size="md" magnetic={false} type="button">
            {d.modal.success.whatsapp}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
        <Button variant="outline" size="md" magnetic={false} onClick={onDone} type="button">
          {d.modal.success.cta}
        </Button>
      </div>

      <p className="mt-6 max-w-sm text-[0.74rem] leading-relaxed text-ink/35">
        {d.modal.success.note}
      </p>
    </motion.div>
  );
}
