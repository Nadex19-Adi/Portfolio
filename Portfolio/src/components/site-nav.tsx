"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { NAV_LINKS, PROFILE } from "@/data/profile";
import { EASE } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navigate = useCallback((id: string) => {
    setMenuOpen(false);
    // Let the panel close and body scroll unlock before scrolling.
    setTimeout(() => scrollToId(id), 80);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#060606]/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-[105rem] items-center justify-between px-6 py-4 md:px-10">
          <button onClick={() => scrollToId("home")} className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-accent font-display text-sm text-white transition-transform group-hover:scale-105">
              {PROFILE.initials}
            </span>
            <span className="hidden font-subhead text-[11px] font-bold tracking-[0.25em] text-white sm:block">
              {PROFILE.name}
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToId(link.id)}
                className="group flex items-baseline gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-white"
              >
                <span className="text-[8px] text-accent">{link.num}</span>
                {link.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-text-muted transition-colors hover:text-white sm:block"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={PROFILE.socials[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-text-muted transition-colors hover:text-white sm:block"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="hidden text-text-muted transition-colors hover:text-white sm:block"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={PROFILE.resumeUrl}
              download="Aditya_Patil_Resume.pdf"
              className="group hidden items-center gap-2 border border-white/15 px-4 py-2 font-subhead text-[10px] font-bold tracking-[0.2em] text-white transition-colors hover:border-accent hover:bg-accent sm:flex"
            >
              RESUME
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center border border-white/15 text-white transition-colors hover:border-accent hover:bg-accent md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
        <motion.div className="h-[2px] origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            />
            <motion.nav
              key="panel"
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[420px] flex-col border-l border-white/10 bg-[#0a0a0a]"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <p className="font-subhead text-[10px] font-bold tracking-[0.35em] text-text-muted">
                  Menu
                </p>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white transition-colors hover:border-accent hover:bg-accent"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-center gap-1 px-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: EASE }}
                    onClick={() => navigate(link.id)}
                    className="group flex items-baseline gap-4 border-b border-white/5 py-5 text-left"
                  >
                    <span className="font-display text-sm text-accent">{link.num}</span>
                    <span className="font-display text-4xl text-white transition-colors group-hover:text-accent">
                      {link.label}
                    </span>
                    <ArrowUpRight className="ml-auto h-6 w-6 text-white/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-6 border-t border-white/10 px-6 py-8"
              >
                <a
                  href={PROFILE.resumeUrl}
                  download="Aditya_Patil_Resume.pdf"
                  className="flex items-center justify-center gap-3 bg-accent px-6 py-4 font-subhead text-[11px] font-bold tracking-[0.2em] text-white transition-colors hover:bg-accent-hover"
                >
                  Download Resume
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 text-accent" /> {PROFILE.email}
                  </a>
                  <div className="flex gap-4">
                    {PROFILE.socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted transition-colors hover:text-accent"
                        aria-label={s.name}
                      >
                        <s.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
