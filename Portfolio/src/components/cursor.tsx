"use client";

import { useEffect, useRef, useState } from "react";

/** How quickly the trailing ring catches up to the pointer, per frame. */
const LERP = 0.16;

const HOVER_SELECTOR = "a, button, [data-cursor='hover'], input, textarea, select, summary";

/**
 * A square dot plus a lagging ring, matching the site's sharp-cornered system.
 *
 * It is additive, never a replacement: the real cursor is only hidden once
 * `html.has-custom-cursor` is set from this effect, so if JavaScript never runs
 * (or the pointer is coarse, or motion is reduced) the native cursor and every
 * hit target stay exactly as they were. Form fields keep their own cursor.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setActive(fine.matches && !reduced.matches);

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!active || !dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let hovering = false;
    let visible = false;

    const setOpacity = (value: string) => {
      dot.style.opacity = value;
      ring.style.opacity = value;
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!visible) {
        visible = true;
        setOpacity("1");
      }

      const target = event.target;
      const next =
        target instanceof Element ? Boolean(target.closest(HOVER_SELECTOR)) : false;

      if (next !== hovering) {
        hovering = next;
        ring.style.width = hovering ? "56px" : "28px";
        ring.style.height = hovering ? "56px" : "28px";
        ring.style.borderColor = hovering ? "var(--accent)" : "rgba(255,255,255,0.45)";
        ring.style.backgroundColor = hovering ? "rgba(225,6,0,0.12)" : "transparent";
      }
    };

    const onHide = () => {
      visible = false;
      setOpacity("0");
    };

    let frame = requestAnimationFrame(function raf() {
      ringX += (pointerX - ringX) * LERP;
      ringY += (pointerY - ringY) * LERP;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(raf);
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onHide);
    window.addEventListener("blur", onHide);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onHide);
      window.removeEventListener("blur", onHide);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[300] hidden md:block"
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-7 w-7 border border-white/45 opacity-0"
        style={{
          transition:
            "width 300ms cubic-bezier(0.22,1,0.36,1), height 300ms cubic-bezier(0.22,1,0.36,1), background-color 300ms, border-color 300ms, opacity 300ms",
        }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 bg-accent opacity-0"
        style={{ transition: "opacity 300ms" }}
      />
    </div>
  );
}
