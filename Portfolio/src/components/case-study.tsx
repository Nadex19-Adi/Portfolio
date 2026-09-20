"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";

import type { CaseStudy } from "@/data/case-studies";

function ArchitectureStrip({ study }: { study: CaseStudy }) {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#0a0a0a]">
      <div className="dot-grid pointer-events-none absolute inset-0" />
      <div className="relative flex flex-col gap-0 md:flex-row md:items-stretch">
        {study.architecture.map((node, i) => (
          <div key={node.id} className="relative flex flex-1 items-center">
            <div className="flex w-full flex-col justify-center gap-2 px-6 py-8 md:px-8 md:py-10">
              <span className="font-display text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display text-xl leading-none text-white md:text-2xl">{node.label}</p>
              {node.sub && (
                <p className="font-subhead text-[9px] font-bold tracking-[0.22em] text-text-muted">{node.sub}</p>
              )}
            </div>
            {i < study.architecture.length - 1 && (
              <div
                aria-hidden="true"
                className="hidden h-full w-px shrink-0 bg-gradient-to-b from-transparent via-accent/70 to-transparent md:block"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-6 py-3 md:px-8">
        <span className="font-subhead text-[9px] font-bold tracking-[0.28em] text-text-muted">System path</span>
        <span className="font-subhead text-[9px] font-bold tracking-[0.28em] text-accent">{study.name}</span>
      </div>
    </div>
  );
}

export function CaseStudyBlock({ study, index }: { study: CaseStudy; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={study.featured ? "border-y border-white/10 py-16 md:py-24" : "border-b border-white/10 py-14 md:py-20"}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-display text-sm text-accent">{num}</span>
        {study.featured && (
          <span className="border border-accent bg-accent px-3 py-1 font-subhead text-[9px] font-bold tracking-[0.28em] text-white">
            Featured
          </span>
        )}
        <span className="font-subhead text-[10px] font-bold tracking-[0.28em] text-text-muted">
          {study.year} · {study.role}
        </span>
      </div>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <div>
          <h3 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.95] text-white">{study.name}</h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">{study.tagline}</p>
        </div>
        <p className="font-serif text-xl italic text-white/75 md:text-2xl lg:text-right">{study.impact}</p>
      </div>

      {study.image ? (
        <div className="relative mt-10 aspect-[16/8] overflow-hidden border border-white/10">
          <Image
            src={study.image}
            alt={`Preview of ${study.name}`}
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mt-10">
          <ArchitectureStrip study={study} />
        </div>
      )}

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {[
          { k: "Context", v: study.context },
          { k: "Conflict", v: study.conflict },
          { k: "Change", v: study.change },
        ].map((col) => (
          <div key={col.k} className="border-t border-white/10 pt-5">
            <p className="font-subhead text-[10px] font-bold tracking-[0.28em] text-accent">{col.k}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{col.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {study.decisions.map((d, i) => (
          <div key={d.title} className="border border-white/10 bg-white/[0.02] p-6">
            <p className="font-display text-xs text-text-muted">Decision {String(i + 1).padStart(2, "0")}</p>
            <h4 className="mt-2 font-display text-xl text-white">{d.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{d.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {study.tech.map((t) => (
          <span
            key={t}
            className="border border-white/15 px-3 py-1.5 font-subhead text-[9px] font-bold tracking-[0.18em] text-text-secondary"
          >
            {t}
          </span>
        ))}
        <a
          href={study.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-2 border border-white/15 px-4 py-2 font-subhead text-[10px] font-bold tracking-[0.2em] text-white transition-colors hover:border-accent hover:bg-accent"
        >
          <Github className="h-3.5 w-3.5" />
          Code
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        {study.liveUrl && (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent px-4 py-2 font-subhead text-[10px] font-bold tracking-[0.2em] text-white transition-colors hover:bg-accent-hover"
          >
            Live
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
