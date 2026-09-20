"use client";

import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { ResumeCapsule } from "@/components/resume-capsule";
import { NAV_LINKS, PROFILE } from "@/data/profile";
import { scrollToId } from "@/lib/scroll";

export function SiteFooter() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-[105rem] px-6 py-20 md:px-10 md:py-28">
        <p className="font-subhead text-[10px] font-bold tracking-[0.35em] text-accent">
          Let&apos;s Work
        </p>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] text-white">
          Let&apos;s Work{" "}
          <span className="font-serif normal-case italic text-text-secondary">Together</span>
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-text-secondary md:text-base">
          Have a role, a research idea, or a system that needs building? The fastest path is email.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group flex items-center gap-3 bg-accent px-7 py-4 font-subhead text-[11px] font-bold tracking-[0.2em] text-white transition-colors hover:bg-accent-hover"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <ResumeCapsule />
        </div>

        <div className="mt-20 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-4">
          <div>
            <p className="font-subhead text-[9px] font-bold tracking-[0.3em] text-text-muted">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToId(link.id)}
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-subhead text-[9px] font-bold tracking-[0.3em] text-text-muted">
              Socials
            </p>
            <ul className="mt-5 space-y-3">
              {PROFILE.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {s.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-subhead text-[9px] font-bold tracking-[0.3em] text-text-muted">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm text-text-secondary">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Mail className="h-3.5 w-3.5 text-accent" /> {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PROFILE.phone}`}
                  className="flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Phone className="h-3.5 w-3.5 text-accent" /> {PROFILE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent" /> {PROFILE.location}
              </li>
            </ul>
          </div>

          <div>
            <p className="font-subhead text-[9px] font-bold tracking-[0.3em] text-text-muted">
              Local time
            </p>
            <p className="mt-5 font-display text-3xl text-white">
              {time ?? "--:--"}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-2 font-subhead text-[9px] font-bold tracking-[0.25em] text-text-muted">
              IST · 2026 Edition
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[105rem] flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row md:px-10">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-accent font-display text-xs text-white">
              {PROFILE.initials}
            </span>
            <span className="font-subhead text-[9px] font-bold tracking-[0.25em] text-text-muted">
              © 2026 {PROFILE.name} — Five systems. Built to be measured.
            </span>
          </div>
          <button
            onClick={() => scrollToId("home")}
            className="group flex items-center gap-2 font-subhead text-[9px] font-bold tracking-[0.25em] text-text-muted transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
