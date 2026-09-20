"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/section-header";
import { LANG_ICONS, SKILL_CATEGORIES } from "@/data/profile";
import { reveal, VIEWPORT } from "@/lib/motion";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-[105rem] scroll-mt-24 px-6 py-28 md:px-10 md:py-36"
    >
      <SectionHeader num="05" label="Spec Sheet" title="Skills &" accent="stack" />

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {SKILL_CATEGORIES.map((c, idx) => (
          <motion.div
            key={c.title}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="group border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-accent/50"
          >
            <p className="font-display text-sm text-text-muted transition-colors group-hover:text-accent">
              {String(idx + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-display text-xl text-white md:text-2xl">{c.title}</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="border border-white/10 px-4 py-2 font-subhead text-[10px] font-bold tracking-[0.15em] text-text-secondary transition-colors hover:border-accent hover:text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Language belt */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-20 flex flex-wrap items-center justify-center gap-10 border-t border-white/10 pt-14 md:gap-16"
      >
        {LANG_ICONS.map((l) => (
          // Remote devicon SVGs: next/image would need remotePatterns plus SVG
          // optimisation opt-in for six 1-2 kB icons.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={l.alt}
            src={l.src}
            alt={l.alt}
            title={l.alt}
            width={64}
            height={64}
            loading="lazy"
            decoding="async"
            className="h-12 w-12 grayscale opacity-40 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 md:h-16 md:w-16"
          />
        ))}
      </motion.div>
    </section>
  );
}
