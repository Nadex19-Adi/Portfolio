"use client";

import { motion } from "framer-motion";

import { VIEWPORT, reveal } from "@/lib/motion";

export function LaunchFilm() {
  return (
    <section className="relative mx-auto w-full max-w-[105rem] px-6 py-20 md:px-10 md:py-28">
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <div className="flex items-center gap-4">
          <span className="font-display text-sm text-accent">00</span>
          <span className="h-px w-12 bg-accent" />
          <span className="font-subhead text-[11px] font-bold tracking-[0.3em] text-text-muted">
            Launch Film
          </span>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:items-end">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.95] text-white">
            21 seconds.
            <br />
            Same claims.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-text-secondary md:text-base">
            The launch film runs the same edit as this page — five systems, no filler. Sound on.
          </p>
        </div>
        <div className="mt-8 overflow-hidden border border-white/10 bg-black">
          <video
            className="aspect-video w-full"
            src="/brag.mp4"
            poster="/brag.jpg"
            controls
            playsInline
            preload="none"
          />
        </div>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-text-muted">
          Film transcript: Five systems. No filler. Building intelligent systems. AI Systems Engineer,
          multi-agent &amp; RL, Belgaum. Selected work — SupportEnv, a production RL environment; Cloud
          Cost, 28% less over-provisioning waste; Bhasha AI, a 6-agent translation workflow. Aditya
          Patil, AI Systems Engineer, aditya-patil.com.
        </p>
      </motion.div>
    </section>
  );
}
