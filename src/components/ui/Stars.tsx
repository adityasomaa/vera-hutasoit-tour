import { cn } from "@/lib/utils";

/** Rating marks. The only place sunbeam is allowed to appear. */
export function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`${n} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className={cn("h-3 w-3", i < n ? "text-sunbeam" : "text-line")}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6 0.5 7.6 4.2 11.5 4.6 8.6 7.2 9.4 11 6 9.1 2.6 11 3.4 7.2 0.5 4.6 4.4 4.2Z" />
        </svg>
      ))}
    </span>
  );
}
