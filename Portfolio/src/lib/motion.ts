import type { Variants } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Standard section reveal — travels further and settles slower than a default fade. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 64 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** For cards, media and tiles: same travel plus a slight scale-up. */
export const revealScale: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

/** Masked line reveal for display headings. */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: "110%" },
  show: { opacity: 1, y: "0%", transition: { duration: 1, ease: EASE } },
};

/** Parent for staggered groups. `variants={stagger()} initial="hidden" whileInView="show"`. */
export const stagger = (each = 0.09, delayChildren = 0.12): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
});

export const VIEWPORT = { once: true, margin: "-80px" } as const;
