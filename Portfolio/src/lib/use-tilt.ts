import { useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

/**
 * Spring-smoothed 3D tilt that follows the cursor.
 * Returns motion values + handlers to spread onto an element,
 * plus a transformPerspective to give the rotation depth.
 */
export function useTilt(maxTilt = 8) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.4 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.4 });

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - py) * maxTilt * 2);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return { rotateX, rotateY, onMouseMove, onMouseLeave, transformPerspective: 900 };
}
