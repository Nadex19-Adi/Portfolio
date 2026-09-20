"use client";

import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { useCallback, useEffect, useState } from "react";

import { AvailabilityTab } from "@/components/availability-tab";
import { Background } from "@/components/background";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";
import { MarqueeBand } from "@/components/marquee-band";
import { Preloader } from "@/components/preloader";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { Gallery } from "@/sections/Gallery";
import { LaunchFilm } from "@/sections/LaunchFilm";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Stats } from "@/sections/Stats";
import type { GithubStats, WakatimeStats } from "@/lib/github";

export function PortfolioShell({
  github,
  wakatime,
}: {
  github: GithubStats | null;
  wakatime: WakatimeStats | null;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  // Hold the page still while the boot screen is up.
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15 });
    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-svh overflow-x-clip bg-[color:var(--bg)] text-[color:var(--text-secondary)]">
      <div className="grain-overlay" />

      <Cursor />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={finishLoading} />}
      </AnimatePresence>

      <Background />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:bg-accent focus:px-5 focus:py-3 focus:font-subhead focus:text-[11px] focus:font-bold focus:tracking-[0.2em] focus:text-white"
      >
        Skip to content
      </a>

      <SiteNav />
      <AvailabilityTab />

      <main className="relative z-10">
        <Hero ready={!isLoading} />
        <MarqueeBand />
        <LaunchFilm />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Stats github={github} wakatime={wakatime} />
        <Gallery />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}
