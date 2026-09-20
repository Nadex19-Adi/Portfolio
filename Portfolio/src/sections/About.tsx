"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { SectionHeader } from "@/components/section-header";
import {
  BIO_PARAGRAPHS,
  BIO_PULL_QUOTE,
  HOW_I_WORK,
  PROFILE,
  TECHNICAL_FOCUS,
} from "@/data/profile";
import { EASE, reveal, VIEWPORT } from "@/lib/motion";
import { useTilt } from "@/lib/use-tilt";

export function About() {
  const tilt = useTilt(6);

  return (
    <>
      <section
        id="about"
        className="relative mx-auto w-full max-w-[105rem] scroll-mt-24 px-6 py-28 md:px-10 md:py-36"
      >
        <SectionHeader num="01" label="About" title="What I" accent="build" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="space-y-6 text-base leading-relaxed text-text-secondary md:text-lg"
          >
            {BIO_PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="font-serif text-2xl italic text-white/80 md:text-3xl">
              {BIO_PULL_QUOTE}
            </p>

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-10 border border-white/10 bg-white/[0.02] p-8"
            >
              <p className="font-subhead text-[10px] font-bold tracking-[0.3em] text-accent">
                Technical Focus
              </p>
              <ul className="mt-6 space-y-5">
                {TECHNICAL_FOCUS.map((f, i) => (
                  <li
                    key={f}
                    className="group flex items-start gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0"
                  >
                    <span className="font-display text-sm text-text-muted transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium leading-snug text-white/85">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Portrait — 3D tilt, framed like the hero plate of the old design */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformPerspective: tilt.transformPerspective,
            }}
            className="relative will-change-transform lg:sticky lg:top-32 lg:self-start"
          >
            <div
              className="absolute -inset-3 translate-x-5 translate-y-5 border border-accent/70"
              aria-hidden="true"
            />
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden">
              <Image
                src={PROFILE.avatarUrl}
                alt={PROFILE.name}
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover contrast-[1.15] brightness-[1.05] saturate-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/50 via-transparent to-transparent" />
            </div>
            <div className="absolute -left-8 top-8 hidden rotate-[-90deg] origin-top-left bg-white px-5 py-2 font-subhead text-[9px] font-bold tracking-[0.3em] text-black sm:block">
              IEEE CHAIR 2026
            </div>
            <div className="absolute -bottom-6 -right-6 flex items-center gap-3 border border-white/15 bg-[#0c0c0c] px-5 py-4">
              <span className="font-display text-4xl leading-none text-accent">
                {PROFILE.initials}
              </span>
              <span className="font-subhead text-[9px] font-bold tracking-[0.25em] text-white/70">
                AI SYSTEMS
                <br />
                ENGINEER
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-[105rem] px-6 py-8 md:px-10">
        <SectionHeader num="02" label="Operating Principles" title="How I" accent="work" />

        <div className="mt-14 border-t border-white/10">
          {HOW_I_WORK.map((w, i) => (
            <motion.div
              key={w.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="group grid gap-4 border-b border-white/10 py-8 transition-colors md:grid-cols-[80px_1fr_2fr] md:items-center md:gap-10 md:py-10"
            >
              <span className="font-display text-3xl text-text-muted transition-colors group-hover:text-accent md:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-white transition-transform group-hover:scale-110">
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl text-white md:text-3xl">{w.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-text-muted md:text-base">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
