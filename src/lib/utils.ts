export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function formatDate(iso: string, lang: "en" | "id") {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}
