"use client";

import { motion } from "framer-motion";

import { CaseStudyBlock } from "@/components/case-study";
import { SectionHeader } from "@/components/section-header";
import { CASE_STUDIES } from "@/data/case-studies";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-[105rem] scroll-mt-24 px-6 py-8 md:px-10"
    >
      <SectionHeader num="04" label="Selected Work" title="Selected" accent="work" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14"
      >
        <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          Five systems. No filler. Each one is a case study — the problem, the hard part, and the
          measurable change.
        </p>

        <div className="mt-4">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyBlock key={study.id} study={study} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
