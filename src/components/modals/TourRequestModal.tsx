"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useTourModal } from "@/components/providers/TourModalProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { DESTINATION_OPTIONS, waLink } from "@/lib/site";
import { EMAIL_RE, cn } from "@/lib/utils";

type Form = {
  destinations: string[];
  date: string;
  days: number;
  adults: number;
  kids: number;
  budget: number;
  name: string;
  email: string;
  country: string;
  notes: string;
};

const EMPTY: Form = {
  destinations: [],
  date: "",
  days: 3,
  adults: 2,
  kids: 0,
  budget: 0,
  name: "",
  email: "",
  country: "",
  notes: "",
};

/**
 * The customized tour request. It does not post anywhere: on submit it
 * composes a readable message and hands off to WhatsApp, which is where
 * every booking on this site ends up.
 */
export function TourRequestModal() {
  const { d, lang } = useLang();
  const { open, closeModal } = useTourModal();
  const { track } = useConsent();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setErrors({});
    setForm(EMPTY);
    track("custom_tour_modal_open");
  }, [open, track]);

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
    if (s === 0 && form.adults + form.kids < 1) e.pax = d.modal.errors.pax;
    if (s === 1) {
      if (!form.name.trim()) e.name = d.modal.errors.required;
      if (form.email.trim() && !EMAIL_RE.test(form.email.trim()))
        e.email = d.modal.errors.email;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const dest = form.destinations
      .map((id) => DESTINATION_OPTIONS.find((o) => o.id === id)?.label[lang])
      .filter(Boolean)
      .join(", ");
    const budget = d.modal.fields.budgetOpts[form.budget];
    const pax =
      form.kids > 0
        ? `${form.adults} ${d.modal.fields.paxAdults.toLowerCase()}, ${form.kids} ${d.modal.fields.paxKids.toLowerCase()}`
        : `${form.adults} ${d.modal.fields.paxAdults.toLowerCase()}`;

    const L =
      lang === "id"
        ? {
            intro: `Halo Vera Bali Tour! Saya mau mengajukan *${d.tourTypes.customized.name}*.`,
            name: "Nama",
            dest: "Tujuan",
            date: "Tanggal mulai",
            days: "Durasi",
            daysUnit: "hari",
            pax: "Jumlah orang",
            budget: "Budget per orang",
            email: "Email",
            country: "Negara",
            notes: "Catatan",
          }
        : {
            intro: `Hi Vera Bali Tour! I'd like to request a *${d.tourTypes.customized.name}*.`,
            name: "Name",
            dest: "Destinations",
            date: "Start date",
            days: "Length",
            daysUnit: "days",
            pax: "Travellers",
            budget: "Budget per person",
            email: "Email",
            country: "Country",
            notes: "Notes",
          };

    const lines = [
      L.intro,
      "",
      `${L.name}: ${form.name.trim()}`,
      dest ? `${L.dest}: ${dest}` : null,
      form.date ? `${L.date}: ${form.date}` : null,
      `${L.days}: ${form.days} ${L.daysUnit}`,
      `${L.pax}: ${pax}`,
      `${L.budget}: ${budget}`,
      form.email.trim() ? `${L.email}: ${form.email.trim()}` : null,
      form.country.trim() ? `${L.country}: ${form.country.trim()}` : null,
      form.notes.trim() ? `${L.notes}: ${form.notes.trim()}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(1)) return;
    track("custom_tour_submit", { pax: form.adults + form.kids });
    window.open(waLink(buildMessage()), "_blank", "noopener,noreferrer");
    closeModal();
  };

  if (!open) return null;

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
          transition={{ duration: 0.24 }}
          onClick={closeModal}
          className="absolute inset-0 bg-ink/35"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={d.modal.title}
          variants={{
            hidden: { y: 24, opacity: 0 },
            show: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
          className="relative flex max-h-[94dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl border border-line bg-surface sm:max-h-[88dvh] sm:rounded-2xl"
        >
          {/* header */}
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-6 pb-4 pt-6">
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
                {d.modal.title}
              </h2>
              <p className="mt-1 text-[0.86rem] leading-relaxed text-muted">
                {d.modal.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              aria-label={d.modal.close}
              className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-line-2 hover:text-ink"
            >
              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* steps */}
          <div className="flex shrink-0 gap-6 border-b border-line px-6 py-3">
            {d.modal.steps.map((label, i) => (
              <span
                key={label}
                className={cn(
                  "text-[0.74rem] font-medium transition-colors",
                  i === step ? "text-ink" : "text-faint"
                )}
              >
                <span className="tabular-nums">{i + 1}</span>
                <span className="ml-2">{label}</span>
              </span>
            ))}
          </div>

          {/* body */}
          <form
            id="custom-tour-form"
            onSubmit={submit}
            noValidate
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              {step === 0 ? (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-6"
                >
                  <Field label={d.modal.fields.destinations} hint={d.modal.fields.destinationsHint}>
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
                              "rounded-full border px-3.5 py-1.5 text-[0.84rem] transition-colors duration-200",
                              active
                                ? "border-ink bg-ink text-paper"
                                : "border-line text-muted hover:border-ink hover:text-ink"
                            )}
                          >
                            {o.label[lang]}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label={d.modal.fields.date}>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                    <Field label={d.modal.fields.days}>
                      <Stepper value={form.days} min={1} max={21} onChange={(v) => set("days", v)} />
                    </Field>
                  </div>

                  <Field label={d.modal.fields.pax} error={errors.pax}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Stepper
                        label={d.modal.fields.paxAdults}
                        value={form.adults}
                        min={0}
                        max={30}
                        onChange={(v) => set("adults", v)}
                      />
                      <Stepper
                        label={d.modal.fields.paxKids}
                        value={form.kids}
                        min={0}
                        max={20}
                        onChange={(v) => set("kids", v)}
                      />
                    </div>
                  </Field>

                  <Field label={d.modal.fields.budget}>
                    <div className="flex flex-wrap gap-2">
                      {d.modal.fields.budgetOpts.map((opt, i) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => set("budget", i)}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-[0.84rem] transition-colors duration-200",
                            form.budget === i
                              ? "border-ink bg-ink text-paper"
                              : "border-line text-muted hover:border-ink hover:text-ink"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </Field>
                </motion.div>
              ) : (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label={d.modal.fields.name} error={errors.name} required>
                      <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder={d.modal.fields.namePh}
                        className={cn(inputCls, errors.name && errorCls)}
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

                  <Field label={`${d.modal.fields.email} (${d.common.optional})`} error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder={d.modal.fields.emailPh}
                      className={cn(inputCls, errors.email && errorCls)}
                    />
                  </Field>

                  <Field label={d.modal.fields.notes}>
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder={d.modal.fields.notesPh}
                      className={cn(inputCls, "resize-none leading-relaxed")}
                    />
                  </Field>

                  <p className="text-[0.78rem] leading-relaxed text-faint">{d.modal.outro}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* footer */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-6 py-4">
            <span className="text-[0.74rem] text-faint">
              {d.modal.step} {step + 1} {d.modal.of} {d.modal.steps.length}
            </span>
            <div className="flex items-center gap-2">
              {step > 0 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => setStep(0)}>
                  {d.modal.back}
                </Button>
              )}
              {step === 0 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => validate(0) && setStep(1)}
                >
                  {d.modal.next}
                </Button>
              ) : (
                <Button type="submit" form="custom-tour-form" variant="book" size="sm">
                  {d.modal.submit}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */

const inputCls =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[0.92rem] text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-lagoon";
const errorCls = "border-coral focus:border-coral";

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[0.8rem] font-medium text-ink-2">
        {label}
        {required && <span className="ml-1 text-coral">*</span>}
      </label>
      {hint && <p className="-mt-1 text-[0.78rem] text-faint">{hint}</p>}
      {children}
      {error && <p className="text-[0.78rem] text-coral-deep">{error}</p>}
    </div>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label?: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-[0.78rem] text-muted">{label}</span>}
      <div className="flex items-center justify-between rounded-lg border border-line px-1.5 py-1.5">
        <StepBtn onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} label="−" />
        <span className="font-display text-[0.95rem] font-medium tabular-nums text-ink">{value}</span>
        <StepBtn onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} label="+" />
      </div>
    </div>
  );
}

function StepBtn({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label === "+" ? "increase" : "decrease"}
      className="grid h-8 w-8 place-items-center rounded-md text-muted transition-colors duration-200 hover:bg-line-2 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
    >
      {label}
    </button>
  );
}
