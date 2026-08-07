import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/** A quiet label. No pill, no dot, no pulse — just small caps above the title. */
export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "block text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
        light ? "text-paper/55" : "text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <As
        className={cn(
          "font-display font-semibold leading-[1.12] tracking-[-0.025em]",
          As === "h1"
            ? "text-[clamp(2.1rem,5.2vw,3.4rem)]"
            : "text-[clamp(1.6rem,3.4vw,2.35rem)]",
          light ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </As>
      {subtitle && (
        <p
          className={cn(
            "max-w-[62ch] text-[0.98rem] leading-relaxed",
            light ? "text-paper/65" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
