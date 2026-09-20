import { TICKER } from "@/data/profile";

export function MarqueeBand() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-10 w-full overflow-hidden border-y border-black/30 bg-accent py-3.5">
      <div className="marquee-track flex w-max">
        {items.map((t, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 px-4 font-display text-lg text-white md:text-xl"
          >
            {t}
            <span className="text-white/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
