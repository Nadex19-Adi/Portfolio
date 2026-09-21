import { ArrowUpRight, Briefcase, Github, Globe, Layers, Linkedin, Mail, Sparkles } from "lucide-react";

export const PROFILE = {
  name: "Aditya Patil",
  title: "AI Systems Engineer",
  summary:
    "I design production multi-agent systems and RL environments \u2014 long-term memory engines, 6-agent translation pipelines, and training gyms that survive contact with real tickets. IEEE Student Branch Chair, 2026.",
  location: "Belgaum, India",
  shortLocation: "BELGAUM, IN",
  email: "adityavpatil818@gmail.com",
  phone: "+91 815284 5070",
  avatarUrl: "/profile.jpg",
  resumeUrl: "/Aditya_Patil_Resume.pdf",
  initials: "AP",
  availability: "Available for opportunity",
  collaborationNote: "Open to roles, research collaborations and hard systems problems.",
  socials: [
    { name: "GitHub", icon: Github, url: "https://github.com/Nadex19-Adi" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/aditya-patil-77aab2352/",
    },
    { name: "Portfolio", icon: Globe, url: "https://aditya-jcer-portfolio.vercel.app/" },
  ],
  emailIcon: Mail,
};

/** Display lines for the hero — three huge lines, same words as the previous hero. */
export const HERO_LINES = [
  { text: "Building", treatment: "solid" as const },
  { text: "Intelligent", treatment: "outline" as const },
  { text: "Systems", treatment: "accent" as const },
];

export const STATS = [
  { label: "Featured Systems", value: "5" },
  { label: "Cloud Cost Cut", value: "28%" },
  { label: "Agent Pipeline", value: "6" },
  { label: "IEEE Chair", value: "'26" },
];

export const EXPERIENCE = [
  {
    role: "Chair",
    company: "IEEE Student Branch JCER",
    period: "2026 - 2027",
    location: "Belgaum",
    highlights: [
      "Chair of the JCER Student Branch for 2026\u20132027 \u2014 technical calendar, volunteer ops, and student programs.",
      "Translate community work into shipped workshops, not just event photos.",
    ],
  },
  {
    role: "Technical Committee (LEAD)",
    company: "IEEE North Karnataka Sub Section SAC (NKSS SAC)",
    period: "2026 - 2027",
    location: "North Karnataka",
    highlights: [
      "Lead for the NKSS SAC technical committee \u2014 regional events across North Karnataka.",
      "Own the technical program: workshops, conferences, and volunteer execution.",
    ],
  },
  {
    role: "Co-Lead (Technical Committee)",
    company: "IEEE North Karnataka Sub-Section (NKSS)",
    period: "2025 - 2026",
    location: "North Karnataka",
    highlights: [
      "Co-led the NKSS SAC technical committee through NKCON 2025 and regional programming.",
      "Built the operating rhythm the current Lead role now runs.",
    ],
  },
  {
    role: "B.Tech in Computer Science & Engineering (AIML)",
    company: "Jain College of Engineering and Research",
    period: "7.7 CGPA",
    location: "Belgaum",
    highlights: [
      "B.Tech CSE (AIML) \u2014 agents, RL environments, and full-stack AI systems as the coursework that matters.",
      "7.7 CGPA while chairing the student branch and shipping production systems.",
    ],
  },
];

export const SKILL_CATEGORIES = [
  {
    title: "AI & ML Frameworks",
    skills: [
      "LangChain",
      "Transformers",
      "HuggingFace",
      "Scikit-Learn",
      "Reinforcement Learning",
      "CrewAI",
      "LangGraph",
    ],
  },
  {
    title: "Languages",
    skills: ["Python", "SQL", "Bash", "C/C++", "TypeScript", "JavaScript"],
  },
  {
    title: "Full-Stack & Backend",
    skills: ["React 18", "Vite", "FastAPI", "Streamlit", "Node.js", "Supabase", "Flask", "Docker"],
  },
];

export const HOW_I_WORK = [
  {
    title: "Think in Systems",
    desc: "I break complex problems into controllable subsystems, design for failure cases early, and engineer with scalability in mind.",
    icon: Layers,
  },
  {
    title: "Build What Others Avoid",
    desc: "I deliberately choose technically uncomfortable projects \u2014 the kind that force rapid growth and differentiate me from the average engineer.",
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
    desc: "After every build, I analyze bottlenecks, skill gaps, and architectural mistakes \u2014 then upgrade.",
    icon: Sparkles,
  },
];

export const TECHNICAL_FOCUS = [
  "Multi-Agent Orchestration & Cognitive Architectures",
  "Reinforcement Learning Environments (OpenEnv Specs)",
  "Full-Stack Development (React, FastAPI, Supabase)",
  "Research-Focused Optimization (Cost, Pathing, Classification)",
  "Leadership & Strategic Community Management",
];

export const BIO_PARAGRAPHS = [
  "I specialize in full-stack AI systems: multi-agent orchestration, reinforcement-learning environments, and memory architectures that have to work after the demo ends. SupportEnv, MemoryForm, and Bhasha AI are the proof \u2014 production paths, not graveyards of side projects.",
  "I care about the uncomfortable layer between a model and a product: graders that cannot be gamed, retrieval that ranks what still matters, pipelines you can inspect stage by stage. Python, React, FastAPI, and Supabase are the tools; the job is shipping something a stranger can run.",
  "I also chair the IEEE Student Branch at JCER (2026) and lead technical work across North Karnataka. Leadership is how I scale taste. Engineering is how I keep the score \u2014 28% less cloud waste, a 6-agent translation workflow, systems built to be measured.",
];

export const BIO_PULL_QUOTE = "\u201CExecution is the only currency that compounds.\u201D";

export const NAV_LINKS = [
  { id: "about", num: "01", label: "About" },
  { id: "experience", num: "02", label: "Leadership" },
  { id: "projects", num: "03", label: "Work" },
  { id: "signal", num: "04", label: "Signal" },
  { id: "gallery", num: "05", label: "Gallery" },
  { id: "contact", num: "06", label: "Contact" },
];

export const TICKER = [
  "Multi-Agent Orchestration",
  "Reinforcement Learning",
  "Cognitive Architectures",
  "Full-Stack AI Systems",
  "IEEE Chair 2026",
  "Production-Ready Environments",
];

export const LANG_ICONS = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", alt: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", alt: "SQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", alt: "Bash" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", alt: "C/C++" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", alt: "JavaScript" },
];
