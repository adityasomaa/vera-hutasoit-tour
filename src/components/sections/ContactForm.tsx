"use client";

import { useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/site";
import { EMAIL_RE, cn } from "@/lib/utils";

type Form = {
  name: string;
  email: string;
  dates: string;
  pax: string;
  message: string;
};

const EMPTY: Form = { name: "", email: "", dates: "", pax: "", message: "" };

/**
 * The site has no backend, so this composes a readable WhatsApp message
 * instead of pretending to send an email. Same destination as every other
 * booking action.
 */
export function ContactForm({ compact = false }: { compact?: boolean }) {
  const { d, lang } = useLang();
  const { track } = useConsent();
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof Form, v: string) => {
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
    if (!form.message.trim()) err.message = d.contact.form.required;
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim()))
      err.email = d.contact.form.invalidEmail;
    setErrors(err);
    if (Object.keys(err).length) return;

    const L =
      lang === "id"
        ? {
            intro: "Halo Vera Bali Tour!",
            name: "Nama",
            email: "Email",
            dates: "Tanggal",
            pax: "Jumlah orang",
            message: "Pesan",
          }
        : {
            intro: "Hi Vera Bali Tour!",
            name: "Name",
            email: "Email",
            dates: "Dates",
            pax: "Travellers",
            message: "Message",
          };

    const body = [
      L.intro,
      "",
      `${L.name}: ${form.name.trim()}`,
      form.email.trim() ? `${L.email}: ${form.email.trim()}` : null,
      form.dates.trim() ? `${L.dates}: ${form.dates.trim()}` : null,
      form.pax.trim() ? `${L.pax}: ${form.pax.trim()}` : null,
      "",
      `${L.message}: ${form.message.trim()}`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    track("contact_form_submit");
    window.open(waLink(body), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className={cn("grid gap-5", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <TextField
          label={d.contact.form.name}
          placeholder={d.contact.form.namePh}
          value={form.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          required
        />
        <TextField
          label={`${d.contact.form.email} (${d.common.optional})`}
          placeholder={d.contact.form.emailPh}
          type="email"
          value={form.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
        />
        <TextField
          label={d.contact.form.dates}
          placeholder={d.contact.form.datesPh}
          value={form.dates}
          onChange={(v) => set("dates", v)}
        />
        <TextField
          label={d.contact.form.pax}
          placeholder={d.contact.form.paxPh}
          value={form.pax}
          onChange={(v) => set("pax", v)}
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
        <Button type="submit" variant="book" size="md">
          {d.contact.form.submit}
        </Button>
        <p className="max-w-[38ch] text-[0.78rem] leading-relaxed text-faint">
          {d.contact.form.note}
        </p>
      </div>
    </form>
  );
}

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
    "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[0.92rem] text-ink outline-none transition-colors duration-200 placeholder:text-faint";
  const tone = error ? "border-coral focus:border-coral" : "border-line focus:border-lagoon";

  return (
    <div className={cn("flex flex-col gap-2", textarea && "sm:col-span-2")}>
      <label className="text-[0.8rem] font-medium text-ink-2">
        {label}
        {required && <span className="ml-1 text-coral">*</span>}
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
      {error && <p className="text-[0.78rem] text-coral-deep">{error}</p>}
    </div>
  );
}
