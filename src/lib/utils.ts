export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Deterministic pseudo-random in [0,1) — keeps SVG art identical between server and client. */
export function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
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

/** Stable pastel-ish gradient pair derived from a string — used for generated avatars. */
export function hashPair(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  const a = Math.abs(h) % 360;
  const b = (a + 48) % 360;
  return [`hsl(${a} 72% 62%)`, `hsl(${b} 78% 48%)`] as const;
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}
