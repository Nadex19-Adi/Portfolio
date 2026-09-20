"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { SectionHeader } from "@/components/section-header";
import { GALLERY } from "@/data/gallery";
import { VIEWPORT, reveal, revealScale, stagger } from "@/lib/motion";

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative mx-auto w-full max-w-[105rem] scroll-mt-24 px-6 py-20 md:px-10 md:py-28"
    >
      <SectionHeader num="07" label="Field Notes" title="Off the" accent="clock" />

      <motion.p
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
      >
        Community work lives here, not in the product list. Rooms I showed up to, ran
        sessions in, and volunteered at across North Karnataka.
      </motion.p>

      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
      >
        {GALLERY.map((item, index) => (
          <motion.figure
            key={item.name}
            variants={revealScale}
            className={`group relative overflow-hidden border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-accent/60 ${item.span}`}
          >
            <div className={`relative ${item.ratio} overflow-hidden`}>
              <Image
                src={item.image}
                alt={`${item.name} — Aditya Patil as ${item.role}`}
                fill
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
              />

              <span className="absolute right-4 top-4 font-display text-xs text-white/40">
                {String(index + 1).padStart(2, "0")}
              </span>

              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
                <span className="font-display text-base leading-tight text-white md:text-lg">
                  {item.name}
                </span>
                <span className="shrink-0 border border-white/20 px-2.5 py-1 font-subhead text-[8px] font-bold tracking-[0.22em] text-text-secondary transition-colors duration-500 group-hover:border-accent group-hover:text-white">
                  {item.role}
                </span>
              </figcaption>

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
              />
            </div>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
