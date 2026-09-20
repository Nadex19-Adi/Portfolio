"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Full-screen boot screen. Draws the AP monogram with an SVG stroke-on
 * animation, then hands control back to the shell so it can unmount.
 */
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => Math.min(p + Math.ceil(Math.random() * 9) + 2, 100));
    }, reduce ? 30 : 90);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    const timer = setTimeout(onComplete, reduce ? 300 : 1750);
    return () => clearTimeout(timer);
  }, [onComplete, reduce]);

  const draw = (duration: number, delay = 0) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: reduce ? 0.01 : duration, delay: reduce ? 0 : delay, ease: "easeInOut" as const },
  });

  return (
    <motion.div
      exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060606]"
    >
      <svg
        viewBox="0 0 96 64"
        className="h-16 w-auto text-white sm:h-20 md:h-24"
        fill="none"
        stroke="currentColor"
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-label="Aditya Patil monogram"
      >
        <motion.path d="M6 56 L26 8 L46 56" {...draw(0.9)} />
        <motion.path d="M16 38 H36" {...draw(0.3, 0.55)} />
        <motion.path d="M58 56 V8" {...draw(0.5, 0.4)} />
        <motion.path d="M58 8 H70 A13 13 0 0 1 70 34 H58" {...draw(0.6, 0.7)} />
      </svg>

      <div className="mt-10 flex w-64 flex-col gap-3">
        <div
          className="h-px w-full bg-white/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Loading portfolio"
        >
          <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between font-subhead text-[9px] font-bold tracking-[0.35em] text-text-muted">
          <span>Aditya Patil</span>
          <span className="text-accent">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
