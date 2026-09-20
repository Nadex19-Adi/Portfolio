import { PROFILE } from "@/data/profile";

/**
 * Vertical tab pinned to the left edge, desktop only.
 */
export function AvailabilityTab() {
  return (
    <div className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <a
        href="#contact"
        className="block rounded-r-3xl border-y border-r border-zinc-200 bg-white px-4 py-10 shadow-2xl transition-colors hover:bg-zinc-100"
      >
        <span className="font-subhead text-[10px] font-black tracking-[0.5em] text-black [writing-mode:vertical-rl]">
          {PROFILE.availability}
        </span>
      </a>
    </div>
  );
}
