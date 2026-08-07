import { cn, initials } from "@/lib/utils";

/* ---------------------------------------------------------------- */
/*  Logo: a split temple gate that also reads as a V, drawn flat.     */
/* ---------------------------------------------------------------- */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-8 w-8", className)} aria-hidden="true">
      <rect width="48" height="48" rx="11" fill="#3F7A76" />
      <circle cx="24" cy="19" r="6.5" fill="#E3B45F" />
      <path d="M8 40 L11.5 16 L18 16 L20 40 Z" fill="#F4EDE2" />
      <path d="M40 40 L36.5 16 L30 16 L28 40 Z" fill="#F4EDE2" />
    </svg>
  );
}

export function LogoLockup({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-[0.98rem] font-semibold tracking-tight",
          dark ? "text-paper" : "text-ink"
        )}
      >
        Vera Bali Tour
      </span>
    </span>
  );
}

/* ---------------------------------------------------------------- */
/*  Avatar: flat initials on one of four muted, on-palette tones.     */
/* ---------------------------------------------------------------- */

const AVATAR_TONES = [
  { bg: "#DCECE9", fg: "#31625F" },
  { bg: "#EFE2CE", fg: "#7A5A22" },
  { bg: "#E8DCD6", fg: "#8A4632" },
  { bg: "#DDE4E3", fg: "#33484E" },
] as const;

export function Avatar({
  name,
  size = 44,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const tone = AVATAR_TONES[h % AVATAR_TONES.length];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold",
        className
      )}
      style={{
        width: size,
        height: size,
        background: tone.bg,
        color: tone.fg,
        fontSize: size * 0.36,
      }}
    >
      {initials(name)}
    </span>
  );
}
