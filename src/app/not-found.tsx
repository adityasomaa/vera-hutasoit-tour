"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Blobs, Squiggle } from "@/components/graphics/Brand";
import { Scene } from "@/components/graphics/Scene";

export default function NotFound() {
  const { d } = useLang();

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden py-32">
      <Blobs variant="tri" />
      <div className="bg-linegrid pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-vbt relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-[clamp(5rem,20vw,11rem)] font-extrabold leading-none text-gradient-tri"
            >
              {d.notFound.code}
            </motion.p>

            <Squiggle className="mt-2 text-coral-400" />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 font-display text-[clamp(1.7rem,4.5vw,2.6rem)] font-extrabold leading-tight text-ink"
            >
              {d.notFound.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-md text-[1rem] leading-relaxed text-ink/60"
            >
              {d.notFound.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-9"
            >
              <TransitionLink href="/">
                <span className="group inline-flex items-center gap-2 rounded-full bg-lagoon-600 px-7 py-4 text-base font-semibold text-sand shadow-[0_14px_36px_-14px_rgba(5,146,143,0.9)] transition-all duration-400 hover:bg-lagoon-700">
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  {d.notFound.cta}
                </span>
              </TransitionLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="animate-float-slow overflow-hidden rounded-[2.5rem] border-4 border-sand shadow-[0_40px_90px_-40px_rgba(6,23,29,0.5)]"
          >
            <div className="aspect-4/3">
              <Scene variant="village" seed={9} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
