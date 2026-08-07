"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * 3D tilt + spotlight card. Pointer position drives rotation on two axes and a
 * soft highlight that tracks the cursor.
 */
export function TiltCard({
  children,
  className,
  intensity = 9,
  glare = true,
  lift = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: (0.5 - py) * intensity * 2,
      ry: (px - 0.5) * intensity * 2,
      mx: px * 100,
      my: py * 100,
      active: true,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT((s) => ({ ...s, rx: 0, ry: 0, active: false }))}
      animate={{
        rotateX: t.rx,
        rotateY: t.ry,
        y: t.active ? -lift : 0,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.6 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            opacity: t.active ? 1 : 0,
            background: `radial-gradient(320px circle at ${t.mx}% ${t.my}%, rgba(255,255,255,0.5), transparent 55%)`,
          }}
        />
      )}
    </motion.div>
  );
}
