import { Analytics } from "@vercel/analytics/react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

import { useTilt } from "./lib/use-tilt";
import { useEffect, useRef, useState, lazy, Suspense } from "react";

import Lenis from "lenis";
import { ProjectsSection } from "./sections/Projects";
import { ContactBlock } from "./sections/Contact";

// Lazy load heavy components
// @ts-ignore
const AnimatedList = lazy(() => import("./components/AnimatedList"));

const PROFILE = {
  name: "Aditya Patil",
  title: "AI Developer | Multi-Agent Orchestration | RL & Cognitive Architectures",
  summary:
    "Highly technical AI Developer & IEEE Student Branch Chair (2026) with a focus on Multi-Agent Orchestration, Reinforcement Learning, and Applied Cognitive Architectures. Proven track record of building production-ready AI environments and long-term memory systems.",
  location: "Belgaum, India",
  email: "adityavpatil818@gmail.com",
  phone: "+91 815284 5070",
  avatarUrl: "/profile.jpg",
  initials: "AP",
  socials: [
    { name: "GitHub", icon: Github, url: "https://github.com/Nadex19-Adi" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/aditya-patil-77aab2352/",
    },
    { name: "Portfolio", icon: Globe, url: "#" },
  ],
};

const STATS = [
  { label: "Systems Engineered", value: "12+" },
  { label: "Research Projects", value: "4" },
  { label: "AI Frameworks", value: "6+" },
  { label: "Publications", value: "2" },
];

const EXPERIENCE = [
  {
    role: "Chair",
    company: "IEEE Student Branch JCER",
    period: "2026 - 2027",
    location: "Belgaum",
    highlights: [
      "Leading the student branch for 2026 as the Chair.",
      "Organizing and managing technical activities, student life, and volunteer functions."
    ],
  },
  {
    role: "Technical Committee (LEAD)",
    company: "IEEE North Karnataka Sub Section SAC (NKSS SAC)",
    period: "2026 - 2027",
    location: "North Karnataka",
    highlights: [
      "Working as a LEAD in the technical committee, Students Association Committee (SAC) under IEEE North Karnataka Subsection.",
      "Organizing and managing technical activities, student life, and volunteer functions throughout the region."
    ]
  },
  {
    role: "Co-Lead (Technical Committee)",
    company: "IEEE North Karnataka Sub-Section (NKSS)",
    period: "2025 - 2026",
    location: "North Karnataka",
    highlights: [
      "Worked as Co-Lead in the technical committee, Students Association Committee (SAC) under IEEE North Karnataka Subsection.",
      "Organized and managed technical activities, student life, and volunteer functions throughout the region."
    ],
  },
  {
    role: "B.Tech in Computer Science & Engineering (AIML)",
    company: "Jain College of Engineering and Research",
    period: "7.7 CGPA",
    location: "Belgaum",
    highlights: [
      "Currently pursuing B.Tech with focus on Artificial Intelligence and Machine Learning.",
      "Leading technical and volunteer initiatives across the university."
    ]
  }
];

const SKILL_CATEGORIES = [
  {
    title: "AI & ML Frameworks",
    skills: ["LangChain", "Transformers", "HuggingFace", "Scikit-Learn", "Reinforcement Learning", "CrewAI", "LangGraph"]
  },
  {
    title: "Languages",
    skills: ["Python", "SQL", "Bash", "C/C++", "TypeScript", "JavaScript"]
  },
  {
    title: "Full-Stack & Backend",
    skills: ["React 18", "Vite", "FastAPI", "Streamlit", "Node.js", "Supabase", "Flask", "Docker"]
  }
];

const HOW_I_WORK = [
  {
    title: "Think in Systems",
    desc: "I break complex problems into controllable subsystems, design for failure cases early, and engineer with scalability in mind.",
    icon: Layers,
  },
  {
    title: "Build What Others Avoid",
    desc: "I deliberately choose technically uncomfortable projects — the kind that force rapid growth and differentiate me from the average engineer.",
    icon: ArrowUpRight,
  },
  {
    title: "Execution > Motivation",
    desc: "Consistency, structured learning, and aggressive iteration drive my progress more than temporary inspiration.",
    icon: Briefcase,
  },
  {
    title: "Engineer for Reality",
    desc: "I prioritize reliability, measurable performance, and deployment-readiness over demo-friendly builds.",
    icon: Globe,
  },
  {
    title: "Relentless Improvement",
    desc: "After every build, I analyze bottlenecks, skill gaps, and architectural mistakes — then upgrade.",
    icon: Sparkles,
  },
];

const TECHNICAL_FOCUS = [
  "Multi-Agent Orchestration & Cognitive Architectures",
  "Reinforcement Learning Environments (OpenEnv Specs)",
  "Full-Stack Development (React, FastAPI, Supabase)",
  "Research-Focused Optimization (Cost, Pathing, Classification)",
  "Leadership & Strategic Community Management",
];

const BIO_PARAGRAPHS = [
  "I am a highly technical AI Developer focusing on Multi-Agent Orchestration, Reinforcement Learning, and Applied Cognitive Architectures. I build production-ready AI environments, such as SupportEnv, and design long-term memory systems for intelligent agents.",
  "In addition to my technical work, I actively serve as the IEEE Student Branch Chair (2026), leading technical committees and organizing regional activities across the North Karnataka and Bangalore Sections. My core expertise spans Python, React, FastAPI, and Supabase, empowering me to tackle everything from robust AI pipelines to full-stack web platforms.",
  "Whether I'm reducing cloud infrastructure costs by 28%, architecting complex 6-agent language translation pipelines, or leading technical communities, I prioritize execution, measurable performance, and real-world impact."
];

const NAV_LINKS = [
  { id: "about", num: "01", label: "About" },
  { id: "experience", num: "02", label: "Record" },
  { id: "projects", num: "03", label: "Work" },
  { id: "contact", num: "04", label: "Contact" },
];

const TICKER = [
  "Multi-Agent Orchestration",
  "Reinforcement Learning",
  "Cognitive Architectures",
  "Full-Stack AI Systems",
  "IEEE Chair 2026",
  "Production-Ready Environments",
];

const LANG_ICONS = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", alt: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", alt: "SQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", alt: "Bash" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", alt: "C/C++" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", alt: "JavaScript" },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineReveal: Variants = {
  hidden: { opacity: 0, y: "110%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

function SectionHeader({ num, label, title }: { num: string; label: string; title: string }) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      <div className="flex items-center gap-4">
        <span className="font-display text-sm text-accent">{num}</span>
        <span className="h-px w-12 bg-accent" />
        <span className="font-subhead text-[11px] font-bold tracking-[0.3em] text-text-muted">{label}</span>
      </div>
      <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-white">
        {title}
      </h2>
    </motion.div>
  );
}

function MarqueeBand() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-10 w-full overflow-hidden border-y border-black/30 bg-accent py-3.5">
      <div className="marquee-track flex w-max">
        {items.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8 px-4 font-display text-lg text-white md:text-xl">
            {t}
            <span className="text-white/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 racing-grid opacity-60" />
      <div className="absolute inset-0 speed-lines" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 0%, rgba(225,6,0,0.10) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 85% 90%, rgba(225,6,0,0.06) 0%, transparent 60%)," +
            "linear-gradient(180deg, #060606 0%, #0a0a0a 50%, #060606 100%)",
        }}
      />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const portraitTilt = useTilt(6);

  // Scroll parallax within the hero
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const aiY = useTransform(heroProgress, [0, 1], [0, 220]);
  const contentY = useTransform(heroProgress, [0, 1], [0, -60]);
  const portraitY = useTransform(heroProgress, [0, 1], [0, -90]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the menu with the Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBootProgress((p) => Math.min(p + Math.ceil(Math.random() * 9) + 2, 100));
    }, 130);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = (id: string) => {
    setMenuOpen(false);
    // Wait for the menu to close and body scroll to unlock before scrolling
    setTimeout(() => scrollTo(id), 80);
  };

  return (
    <div className="relative min-h-svh overflow-x-clip bg-[color:var(--bg)] text-[color:var(--text-secondary)]">
      <div className="grain-overlay" />

      {/* ===== CINEMATIC BOOT LOADER ===== */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060606]"
          >
            <p className="font-subhead text-[10px] font-bold tracking-[0.5em] text-text-muted">Aditya Patil Presents</p>
            <div className="mt-6 overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(3rem,10vw,8rem)] leading-none text-white"
              >
                ENGINEERED<span className="text-accent">.</span>
              </motion.h1>
            </div>
            <div className="mt-10 flex w-72 flex-col gap-3">
              <div className="h-px w-full bg-white/10">
                <div className="h-full bg-accent" style={{ width: `${bootProgress}%` }} />
              </div>
              <div className="flex items-center justify-between font-subhead text-[9px] font-bold tracking-[0.35em] text-text-muted">
                <span>Systems Boot</span>
                <span className="text-accent">{bootProgress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Background />

          {/* ===== TOP NAV ===== */}
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#060606]/80 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
              <button onClick={() => scrollTo("home")} className="group flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-accent font-display text-sm text-white transition-transform group-hover:scale-105">
                  AP
                </span>
                <span className="hidden font-subhead text-[11px] font-bold tracking-[0.25em] text-white sm:block">
                  Aditya Patil
                </span>
              </button>

              <nav className="hidden items-center gap-8 md:flex">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="group flex items-baseline gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-white"
                  >
                    <span className="text-[8px] text-accent">{link.num}</span>
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="/Aditya_Patil_Resume.pdf"
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

          {/* ===== MOBILE MENU ===== */}
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
                    <p className="font-subhead text-[10px] font-bold tracking-[0.35em] text-text-muted">Menu</p>
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
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => navigate(link.id)}
                        className="group flex items-baseline gap-4 border-b border-white/5 py-5 text-left"
                      >
                        <span className="font-display text-sm text-accent">{link.num}</span>
                        <span className="font-display text-4xl text-white transition-colors group-hover:text-accent">{link.label}</span>
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
                      href="/Aditya_Patil_Resume.pdf"
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

          <main className="relative z-10">
            {/* ===== HERO ===== */}
            <section id="home" ref={heroRef} className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28">
              {/* Parallax background wordmark */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 top-1/2 select-none text-center"
                style={{ y: aiY }}
                aria-hidden="true"
              >
                <div className="font-display leading-none text-outline-dark opacity-60" style={{ fontSize: "26vw", transform: "translateY(-58%)" }}>
                  AI
                </div>
              </motion.div>

              <motion.div style={{ y: contentY }} className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="flex items-center gap-3"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                  <p className="font-subhead text-[10px] font-bold tracking-[0.35em] text-text-muted md:text-[11px]">
                    AI Developer — Belgaum, India · IEEE Chair 2026
                  </p>
                </motion.div>

                <h1 className="mt-8 font-display text-[clamp(3.4rem,11vw,10rem)] leading-[0.9] text-white">
                  <span className="block overflow-hidden">
                    <motion.span className="block" variants={lineReveal} initial="hidden" animate="show" transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>
                      Building
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span className="block text-outline" variants={lineReveal} initial="hidden" animate="show" transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}>
                      Intelligent
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span className="block text-accent" variants={lineReveal} initial="hidden" animate="show" transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}>
                      Systems
                    </motion.span>
                  </span>
                </h1>

                <div className="mt-12 grid items-end gap-12 lg:grid-cols-[1.35fr_1fr]">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1 }}
                  >
                    <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                      {PROFILE.summary}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => scrollTo("projects")}
                        className="group flex items-center gap-3 bg-accent px-7 py-4 font-subhead text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-accent-hover"
                      >
                        Explore Work
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </button>
                      <a
                        href="/Aditya_Patil_Resume.pdf"
                        download="Aditya_Patil_Resume.pdf"
                        className="flex items-center gap-3 border border-white/20 px-7 py-4 font-subhead text-[11px] font-bold tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                      >
                        Download Resume
                      </a>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
                      <a href={`mailto:${PROFILE.email}`} className="group flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-white">
                        <Mail className="h-3.5 w-3.5 text-accent" /> {PROFILE.email}
                      </a>
                      <a href={PROFILE.socials[1].url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-white">
                        <Linkedin className="h-3.5 w-3.5 text-accent" /> LinkedIn
                      </a>
                      <span className="flex items-center gap-2 text-xs text-text-muted">
                        <MapPin className="h-3.5 w-3.5 text-accent" /> {PROFILE.location}
                      </span>
                    </div>
                  </motion.div>

                  {/* Portrait — parallax + 3D tilt + grayscale-to-color hover */}
                  <motion.div style={{ y: portraitY }} className="group relative justify-self-center lg:justify-self-end">
                    <motion.div
                      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
                      onMouseMove={portraitTilt.onMouseMove}
                      onMouseLeave={portraitTilt.onMouseLeave}
                      style={{
                        rotateX: portraitTilt.rotateX,
                        rotateY: portraitTilt.rotateY,
                        transformPerspective: portraitTilt.transformPerspective,
                      }}
                      className="will-change-transform"
                    >
                      <div className="absolute -inset-3 translate-x-5 translate-y-5 border border-accent/70" aria-hidden="true" />
                      <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden">
                        <img
                          src={PROFILE.avatarUrl}
                          alt={PROFILE.name}
                          className="h-full w-full object-cover contrast-[1.15] brightness-[1.05] saturate-[1.1] transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/50 via-transparent to-transparent" />
                      </div>
                      <div className="absolute -left-8 top-8 rotate-[-90deg] origin-top-left bg-white px-5 py-2 font-subhead text-[9px] font-bold tracking-[0.3em] text-black">
                        IEEE CHAIR 2026
                      </div>
                      <div className="absolute -bottom-6 -right-6 flex items-center gap-3 border border-white/15 bg-[#0c0c0c] px-5 py-4">
                        <span className="font-display text-4xl leading-none text-accent">AP</span>
                        <span className="font-subhead text-[9px] font-bold tracking-[0.25em] text-white/70">
                          COGNITIVE<br />ARCHITECT
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="relative z-10 mt-20 border-t border-white/10"
              >
                <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 px-6 md:grid-cols-4 md:px-10">
                  {STATS.map((s, i) => (
                    <div key={s.label} className={`flex flex-col gap-1 border-white/10 py-8 pr-6 ${i !== 0 ? "md:border-l md:pl-8" : ""}`}>
                      <span className="font-display text-4xl text-white md:text-5xl">
                        {s.value}
                        <span className="text-accent">.</span>
                      </span>
                      <span className="font-subhead text-[9px] font-bold tracking-[0.25em] text-text-muted">{s.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* ===== TICKER ===== */}
            <MarqueeBand />

            {/* ===== ABOUT ===== */}
            <section id="about" className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
              <SectionHeader num="01" label="About" title="The Systems Pilot" />
              <div className="mt-14 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
                <motion.div
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className="space-y-6 text-base leading-relaxed text-text-secondary md:text-lg"
                >
                  {BIO_PARAGRAPHS.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <p className="font-serif text-2xl italic text-white/80 md:text-3xl">
                    “Execution is the only currency that compounds.”
                  </p>
                </motion.div>

                <motion.div
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className="border border-white/10 bg-white/[0.02] p-8"
                >
                  <p className="font-subhead text-[10px] font-bold tracking-[0.3em] text-accent">Technical Focus</p>
                  <ul className="mt-6 space-y-5">
                    {TECHNICAL_FOCUS.map((f, i) => (
                      <li key={f} className="group flex items-start gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0">
                        <span className="font-display text-sm text-text-muted transition-colors group-hover:text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium leading-snug text-white/85">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </section>

            {/* ===== HOW I WORK ===== */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 py-8 md:px-10">
              <SectionHeader num="02" label="Operating Principles" title="How I Work" />
              <div className="mt-14 border-t border-white/10">
                {HOW_I_WORK.map((w, i) => (
                  <motion.div
                    key={w.title}
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="group grid gap-4 border-b border-white/10 py-8 transition-colors md:grid-cols-[80px_1fr_2fr] md:items-center md:gap-10 md:py-10"
                  >
                    <span className="font-display text-3xl text-text-muted transition-colors group-hover:text-accent md:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-white transition-transform group-hover:scale-110">
                        <w.icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-xl text-white md:text-3xl">{w.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-text-muted md:text-base">{w.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ===== EXPERIENCE ===== */}
            <section id="experience" className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
              <SectionHeader num="03" label="Racing Record" title="Experience" />
              <div className="mt-14">
                <Suspense fallback={<div className="h-40 w-full animate-pulse rounded-xl bg-white/5" />}>
                  <AnimatedList
                    items={EXPERIENCE.map((role) => (
                      <div key={role.role} className="w-full">
                        <motion.div className="group rounded-xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-accent/60 hover:bg-white/[0.05] md:p-10">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <p className="font-subhead text-[9px] font-bold tracking-[0.3em] text-text-muted">Role</p>
                              <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">{role.role}</h3>
                              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                                {role.company} · {role.location}
                              </p>
                            </div>
                            <span className="border border-white/15 px-4 py-2 font-subhead text-[10px] font-bold tracking-[0.2em] text-white/70 transition-colors group-hover:border-accent group-hover:text-white">
                              {role.period}
                            </span>
                          </div>
                          <ul className="mt-6 space-y-3">
                            {role.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    ))}
                    displayScrollbar={false}
                    showGradients={true}
                  />
                </Suspense>
              </div>
            </section>

            {/* ===== PROJECTS ===== */}
            <section id="projects" className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-8 md:px-10">
              <SectionHeader num="04" label="The Garage" title="Projects" />
              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="mt-14"
              >
                <ProjectsSection />
              </motion.div>
            </section>

            {/* ===== SKILLS ===== */}
            <section id="skills" className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
              <SectionHeader num="05" label="Spec Sheet" title="Skills & Stack" />
              <div className="mt-14 grid gap-10 md:grid-cols-3">
                {SKILL_CATEGORIES.map((c, idx) => (
                  <motion.div
                    key={c.title}
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="group border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-accent/50"
                  >
                    <p className="font-display text-sm text-text-muted transition-colors group-hover:text-accent">{String(idx + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 font-display text-xl text-white md:text-2xl">{c.title}</h3>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {c.skills.map((s) => (
                        <span
                          key={s}
                          className="border border-white/10 px-4 py-2 font-subhead text-[10px] font-bold tracking-[0.15em] text-text-secondary transition-colors hover:border-accent hover:text-white"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Language icons belt */}
              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="mt-20 flex flex-wrap items-center justify-center gap-10 border-t border-white/10 pt-14 md:gap-16"
              >
                {LANG_ICONS.map((l) => (
                  <img
                    key={l.alt}
                    src={l.src}
                    alt={l.alt}
                    title={l.alt}
                    className="h-12 w-12 grayscale opacity-40 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 md:h-16 md:w-16"
                  />
                ))}
              </motion.div>
            </section>

            {/* ===== CONTACT ===== */}
            <ContactBlock />
          </main>

          <footer className="relative z-10 border-t border-white/10 bg-black/40">
            <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row md:px-10">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center bg-accent font-display text-xs text-white">AP</span>
                <span className="font-subhead text-[9px] font-bold tracking-[0.25em] text-text-muted">
                  © 2026 Aditya Patil — Engineered for Performance
                </span>
              </div>
              <div className="flex items-center gap-6">
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
                <a href={`tel:${PROFILE.phone}`} className="text-text-muted transition-colors hover:text-accent" aria-label="Phone">
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </footer>
        </>
      )}
      <Analytics />
    </div>
  );
}
