"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Timer } from "lucide-react";

import { SectionHeader } from "@/components/section-header";
import type { GithubStats, WakatimeStats } from "@/lib/github";
import { EASE, VIEWPORT, reveal, revealScale, stagger } from "@/lib/motion";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="font-display text-4xl text-white md:text-5xl">{value}</p>
      <p className="mt-1 font-subhead text-[9px] font-bold tracking-[0.24em] text-text-muted">
        {label}
      </p>
    </div>
  );
}

export function Stats({
  github,
  wakatime,
}: {
  github: GithubStats | null;
  wakatime: WakatimeStats | null;
}) {
  const maxLanguageCount = github?.topLanguages.length
    ? Math.max(...github.topLanguages.map((l) => l.count))
    : 1;

  return (
    <section
      id="signal"
      className="relative mx-auto w-full max-w-[105rem] scroll-mt-24 px-6 py-20 md:px-10 md:py-28"
    >
      <SectionHeader num="06" label="Signal" title="Live" accent="telemetry" />

      <motion.p
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
      >
        Pulled straight from the source at request time — no screenshots, no cached vanity
        numbers.
      </motion.p>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]"
      >
        <motion.div
          variants={revealScale}
          className="border border-white/10 bg-white/[0.02] p-6 md:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-accent" />
              <span className="font-subhead text-[10px] font-bold tracking-[0.28em] text-text-muted">
                GitHub
              </span>
            </div>
            {github && (
              <a
                href={github.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-subhead text-[10px] font-bold tracking-[0.2em] text-text-secondary transition-colors hover:text-accent"
              >
                @{github.username}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {github ? (
            <>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <Metric label="Public Repos" value={String(github.publicRepos)} />
                <Metric label="Total Stars" value={String(github.totalStars)} />
                <Metric label="Followers" value={String(github.followers)} />
              </div>

              {github.topLanguages.length > 0 && (
                <div className="mt-10">
                  <p className="font-subhead text-[9px] font-bold tracking-[0.28em] text-text-muted">
                    Most used languages
                  </p>
                  <div className="mt-5 space-y-3">
                    {github.topLanguages.map((language, index) => (
                      <div key={language.name} className="flex items-center gap-4">
                        <span className="w-24 shrink-0 font-subhead text-[9px] font-bold tracking-[0.14em] text-text-secondary">
                          {language.name}
                        </span>
                        <span className="h-1 flex-1 bg-white/5">
                          <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: index * 0.08, ease: EASE }}
                            style={{
                              width: `${(language.count / maxLanguageCount) * 100}%`,
                            }}
                            className="block h-full origin-left bg-accent"
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="mt-8">
              <p className="text-sm leading-relaxed text-text-secondary">
                Live GitHub figures are unavailable right now — the public API may be rate
                limiting this request. The profile itself always works.
              </p>
              <a
                href="https://github.com/Nadex19-Adi"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-subhead text-[10px] font-bold tracking-[0.2em] text-white transition-colors hover:border-accent hover:bg-accent"
              >
                Open GitHub profile
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </motion.div>

        {wakatime ? (
          <motion.div
            variants={revealScale}
            className="border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            <div className="flex items-center gap-3">
              <Timer className="h-5 w-5 text-accent" />
              <span className="font-subhead text-[10px] font-bold tracking-[0.28em] text-text-muted">
                WakaTime · last 7 days
              </span>
            </div>
            <div className="mt-8 space-y-8">
              <Metric label="Tracked Total" value={wakatime.total} />
              <Metric label="Daily Average" value={wakatime.dailyAverage} />
              {wakatime.topLanguage && (
                <Metric label="Top Language" value={wakatime.topLanguage} />
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={revealScale}
            className="flex flex-col justify-between border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            <div>
              <p className="font-subhead text-[10px] font-bold tracking-[0.28em] text-text-muted">
                WakaTime
              </p>
              <p className="mt-5 text-sm leading-relaxed text-text-secondary">
                Coding-time telemetry is wired up behind a{" "}
                <code className="border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-white">
                  WAKATIME_API_KEY
                </code>{" "}
                environment variable. Add the key and this card fills itself in — until then
                this panel stays empty rather than showing a made-up number.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
