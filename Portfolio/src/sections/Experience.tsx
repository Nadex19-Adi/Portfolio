"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/section-header";
import { EXPERIENCE } from "@/data/profile";
import { reveal } from "@/lib/motion";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-[105rem] scroll-mt-24 px-6 py-28 md:px-10 md:py-36"
    >
      <SectionHeader num="03" label="Leadership" title="The" accent="record" />

      <div className="mt-14 space-y-6">
        {EXPERIENCE.map((role, i) => (
          <motion.article
            key={role.role}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.05 }}
            className="group border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-accent/60 hover:bg-white/[0.05] md:p-10"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-subhead text-[9px] font-bold tracking-[0.3em] text-text-muted">
                  Role
                </p>
                <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">{role.role}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  {role.company} · {role.location}
                </p>
              </div>
              <span className="border border-white/15 px-4 py-2 font-subhead text-[10px] font-bold tracking-[0.2em] text-white/70 transition-colors group-hover:border-accent group-hover:text-white">
                {role.period}
              </span>
            </div>
            <ul className="mt-6 space-y-3">
              {role.highlights.map((h, hi) => (
                <li key={hi} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
