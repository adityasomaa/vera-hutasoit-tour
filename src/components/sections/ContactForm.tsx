"use client";

import { useId, useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { useConsent } from "@/components/providers/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { waLink } from "@/lib/site";
import { EMAIL_RE } from "@/lib/utils";

type Form = {
  name: string;
  email: string;
  dates: string;
  pax: string;
  interest: number | null;
  message: string;
};

const EMPTY: Form = {
  name: "",
  email: "",
  dates: "",
  pax: "",
  interest: null,
  message: "",
};

/**
 * The site has no backend, so this composes a readable WhatsApp message
 * instead of pretending to send an email. Same destination as every other
 * booking action.
 */
export function ContactForm() {
  const { d, lang } = useLang();
  const { track } = useConsent();
  const uid = useId();
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      if (!e[k as string]) return e;
      const next = { ...e };
      delete next[k as string];
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
            interest: "Tur yang diminati",
            message: "Pesan",
          }
        : {
            intro: "Hi Vera Bali Tour!",
            name: "Name",
            email: "Email",
            dates: "Dates",
            pax: "Travellers",
            interest: "Tour of interest",
            message: "Message",
          };

    const body = [
      L.intro,
      "",
      `${L.name}: ${form.name.trim()}`,
      form.email.trim() ? `${L.email}: ${form.email.trim()}` : null,
      form.dates.trim() ? `${L.dates}: ${form.dates.trim()}` : null,
      form.pax.trim() ? `${L.pax}: ${form.pax.trim()}` : null,
      form.interest !== null
        ? `${L.interest}: ${d.contact.form.interestOpts[form.interest]}`
        : null,
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={d.contact.form.name}
          error={errors.name}
          required
          htmlFor={`${uid}-name`}
        >
          <TextInput
            id={`${uid}-name`}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder={d.contact.form.namePh}
            error={errors.name}
          />
        </Field>

        <Field
          label={d.contact.form.email}
          error={errors.email}
          optional
          htmlFor={`${uid}-email`}
        >
          <TextInput
            id={`${uid}-email`}
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder={d.contact.form.emailPh}
            error={errors.email}
          />
        </Field>

        <Field label={d.contact.form.dates} htmlFor={`${uid}-dates`}>
          <TextInput
            id={`${uid}-dates`}
            value={form.dates}
            onChange={(e) => set("dates", e.target.value)}
            placeholder={d.contact.form.datesPh}
          />
        </Field>

        <Field label={d.contact.form.pax} htmlFor={`${uid}-pax`}>
          <TextInput
            id={`${uid}-pax`}
            value={form.pax}
            onChange={(e) => set("pax", e.target.value)}
            placeholder={d.contact.form.paxPh}
          />
        </Field>
      </div>

      <Field label={d.contact.form.interest} htmlFor={`${uid}-interest`}>
        <Select
          id={`${uid}-interest`}
          options={d.contact.form.interestOpts}
          value={form.interest}
          onChange={(i) => set("interest", i)}
          placeholder={d.common.choose}
        />
      </Field>

      <Field
        label={d.contact.form.message}
        error={errors.message}
        required
        htmlFor={`${uid}-message`}
      >
        <TextArea
          id={`${uid}-message`}
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder={d.contact.form.messagePh}
          error={errors.message}
        />
      </Field>

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
