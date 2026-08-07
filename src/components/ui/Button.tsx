import { cn } from "@/lib/utils";

/* Flat buttons. Solid fills, hairline outlines, no gradients, no glows.
   The press state is a 1px push, nothing more. */

type Variant = "primary" | "book" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  /* the everyday action */
  primary: "bg-ink text-paper hover:bg-ink-2",
  /* reserved for booking, the one place coral appears */
  book: "bg-coral text-paper hover:bg-coral-deep",
  outline: "border border-line bg-transparent text-ink hover:border-ink hover:bg-surface",
  ghost: "text-muted hover:bg-line-2 hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.94rem]",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string
) {
  return cn(base, variants[variant], sizes[size], className);
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Props) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

/** Same shape, rendered as an anchor. Used for every WhatsApp action. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: LinkProps) {
  return (
    <a className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}
