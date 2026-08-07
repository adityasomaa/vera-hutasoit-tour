/** Minimal, dependency-free cookie helpers used by the consent + language system. */

export function setCookie(name: string, value: string, days = 180) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

/** Removes every cookie whose name starts with any of the given prefixes. */
export function purgeCookiesByPrefix(prefixes: string[]) {
  if (typeof document === "undefined") return;
  document.cookie.split("; ").forEach((row) => {
    const name = row.split("=")[0];
    if (prefixes.some((p) => name.startsWith(p))) deleteCookie(name);
  });
}

export const COOKIE_KEYS = {
  consent: "vbt_consent",
  lang: "vbt_lang",
  lastTour: "vbt_last_tour",
} as const;
