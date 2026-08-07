"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "@/components/providers/TransitionProvider";

type Props = React.ComponentPropsWithoutRef<typeof Link> & {
  href: string;
  /** fired after the navigation is kicked off (e.g. to close a mobile menu) */
  onNavigate?: () => void;
};

/**
 * A drop-in <Link> that hands navigation to the curtain state machine so the
 * page swap happens completely out of sight.
 */
export function TransitionLink({ href, onClick, onNavigate, children, ...rest }: Props) {
  const { navigate, busy } = useTransition();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      prefetch
      aria-current={pathname === href ? "page" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        // let modified clicks (new tab, download…) behave natively
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        if (busy) return;
        onNavigate?.();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
