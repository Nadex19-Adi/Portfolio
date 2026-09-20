"use client";

import { motion } from "framer-motion";

import { reveal, VIEWPORT } from "@/lib/motion";

export { reveal };

export function SectionHeader({
  num,
  label,
  title,
  accent,
}: {
  num: string;
  label: string;
  title: string;
  accent?: string;
}) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <div className="flex items-center gap-4">
        <span className="font-display text-sm text-accent">{num}</span>
        <span className="h-px w-12 bg-accent" />
        <span className="font-subhead text-[11px] font-bold tracking-[0.3em] text-text-muted">
          {label}
        </span>
      </div>
      <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-white">
        {title}
        {accent ? (
          <span className="font-serif normal-case italic text-text-secondary"> {accent}</span>
        ) : null}
      </h2>
    </motion.div>
  );
}
