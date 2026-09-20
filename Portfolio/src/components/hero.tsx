"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ResumeCapsule } from "@/components/resume-capsule";
import { HERO_LINES, PROFILE, STATS } from "@/data/profile";
import { EASE } from "@/lib/motion";

const TREATMENT = {
  solid: "text-white",
  outline: "text-outline",
  accent: "text-accent",
} as const;

/**
 * `ready` flips true when the boot screen lifts, so the headline reveal plays
 * for the visitor instead of finishing unseen behind the preloader. The copy
 * is always in the DOM, so it stays server-rendered and crawlable.
 */
export function Hero({ ready }: { ready: boolean }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-36 pb-16 md:pt-40"
    >
      {/* Angled light beams */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-0 top-0 h-[1380px] w-[560px] -translate-y-[300px] -rotate-45"
          style={{
            background:
              "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0,0%,100%,.10) 0, hsla(0,0%,100%,.03) 50%, transparent 80%)",
          }}
        />
        <div
          className="absolute right-0 top-0 h-[1380px] w-[560px] -translate-y-[300px] rotate-45"
          style={{
            background:
              "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0,0%,100%,.08) 0, hsla(0,0%,100%,.02) 50%, transparent 80%)",
          }}
        />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-[105rem] px-6 md:px-10"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:items-center md:gap-10">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-subhead text-[10px] font-bold leading-relaxed tracking-[0.2em] text-text-muted md:text-right md:text-xs"
          >
            Hi, I&apos;m {PROFILE.name}. I build systems that have to work after the demo ends.
          </motion.p>

          <h1 className="font-display text-[clamp(3rem,12.5vw,14rem)] leading-[0.85] tracking-[-0.02em]">
            {HERO_LINES.map((line, i) => (
              <span key={line.text} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={ready ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease: EASE }}
                  className={`block ${TREATMENT[line.treatment]}`}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-8 flex justify-end md:mt-4">
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
            className="max-w-[260px] font-subhead text-[10px] font-bold leading-relaxed tracking-[0.2em] text-text-muted md:text-right md:text-xs"
          >
            {PROFILE.collaborationNote}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 flex flex-col gap-6 md:mt-20 md:flex-row md:items-center md:gap-6"
        >
          <span className="hidden h-px flex-1 bg-foreground/10 md:block" />
          <span className="font-subhead text-[10px] font-bold tracking-[0.3em] text-text-muted md:text-xs">
            {PROFILE.shortLocation} &mdash; 2026
          </span>
          <ResumeCapsule />
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.95 }}
        className="relative z-10 mt-16 border-t border-white/10 md:mt-24"
      >
        <div className="mx-auto grid w-full max-w-[105rem] grid-cols-2 px-6 md:grid-cols-4 md:px-10">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 py-8 pr-6 ${i !== 0 ? "md:border-l md:border-white/10 md:pl-8" : ""}`}
            >
              <span className="font-display text-4xl text-white md:text-5xl">
                {s.value}
                {!s.value.includes("%") && <span className="text-accent">.</span>}
              </span>
              <span className="font-subhead text-[9px] font-bold tracking-[0.25em] text-text-muted">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
