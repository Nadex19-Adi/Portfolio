export type Decision = {
  title: string;
  detail: string;
};

export type ArchNode = {
  id: string;
  label: string;
  sub?: string;
};

export type CaseStudy = {
  id: string;
  featured?: boolean;
  name: string;
  year: string;
  role: string;
  tagline: string;
  context: string;
  conflict: string;
  change: string;
  decisions: [Decision, Decision];
  impact: string;
  tech: string[];
  image?: string;
  githubUrl: string;
  liveUrl?: string;
  metrics: Record<string, string>;
  architecture: ArchNode[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "supportenv",
    featured: true,
    name: "SupportEnv",
    year: "2026",
    role: "Sole architect",
    tagline: "A production RL environment for high-stress support agents — not a toy gym.",
    context:
      "Most reinforcement-learning gyms are toy problems. Training agents on real support work needs a realistic, high-stress environment with graders that match how humans actually judge a ticket.",
    conflict:
      "A single scalar reward collapses sentiment and factual accuracy into one number, so agents game the metric. The environment also had to follow OpenEnv specs so it could ship as a reusable training target, not a one-off notebook.",
    change:
      "Shipped a production-grade OpenEnv environment with dual graders (sentiment + accuracy), FastAPI serving, and a Gradio training surface — so agents can be trained, evaluated, and demoed in one loop.",
    decisions: [
      {
        title: "Dual-grader reward",
        detail:
          "Split the reward into sentiment and accuracy heads so an agent cannot hide a wrong answer behind a polite tone.",
      },
      {
        title: "OpenEnv as the contract",
        detail:
          "Implemented the environment against OpenEnv specs instead of a custom gym, so the same env can plug into other trainers later.",
      },
    ],
    impact: "Production RL environment with independent sentiment and accuracy graders",
    tech: ["FastAPI", "Stable Baselines3", "Gradio", "OpenEnv"],
    githubUrl: "https://github.com/Nadex19-Adi",
    metrics: {
      Type: "RL Environment",
      Target: "Support tickets",
      Grader: "Sentiment + accuracy",
      Status: "Production",
    },
    architecture: [
      { id: "agent", label: "Policy Agent", sub: "Stable Baselines3" },
      { id: "env", label: "SupportEnv", sub: "OpenEnv spec" },
      { id: "grade", label: "Dual Graders", sub: "Sentiment · Accuracy" },
      { id: "serve", label: "FastAPI + Gradio", sub: "Train · Eval · Demo" },
    ],
  },
  {
    id: "memoryform",
    name: "MemoryForm",
    year: "2026",
    role: "Lead engineer",
    tagline: "Long-term memory for agents that otherwise forget every session.",
    context:
      "LLMs reset between sessions. Enterprise agents need durable memory that can be retrieved, ranked, and trusted — not a chat log stuffed back into the prompt.",
    conflict:
      "Naive vector search returns stale or low-confidence memories. Recency, confidence, and semantic similarity pull in different directions, and a single cosine sort cannot reconcile them.",
    change:
      "Built a hybrid PostgreSQL + Sentence-Transformers memory engine with a custom weighted ranker (recency × confidence × similarity) so agents recall what still matters.",
    decisions: [
      {
        title: "Hybrid storage, not vector-only",
        detail:
          "Kept structured records in PostgreSQL and embeddings beside them, so metadata filters and semantic search can run in one query path.",
      },
      {
        title: "Weighted ranking",
        detail:
          "Replaced cosine-only retrieval with recency and confidence weights so old, uncertain memories lose to recent, high-confidence ones.",
      },
    ],
    impact: "Solves LLM amnesia with ranked, durable memory instead of prompt stuffing",
    tech: ["Python", "FastAPI", "Supabase", "React", "Sentence-Transformers"],
    githubUrl: "https://github.com/Nadex19-Adi",
    metrics: {
      Architecture: "Hybrid memory",
      Storage: "PostgreSQL + embeddings",
      Model: "all-MiniLM-L6-v2",
      Ranking: "Recency × confidence",
    },
    architecture: [
      { id: "query", label: "Agent Query", sub: "Session turn" },
      { id: "embed", label: "Embed", sub: "all-MiniLM-L6-v2" },
      { id: "rank", label: "Weighted Ranker", sub: "Recency · Confidence" },
      { id: "store", label: "Supabase", sub: "Postgres + vectors" },
    ],
  },
  {
    id: "bhasha",
    name: "Bhasha AI",
    year: "2025",
    role: "Systems architect",
    tagline: "A 6-agent translation pipeline that protects glossary, culture, and tone.",
    context:
      "Technical localization is not a BLEU contest. Domain glossaries, cultural framing, and sentiment have to survive the translation — or the output is fluent and wrong.",
    conflict:
      "A single model cannot hold glossary fidelity, cultural adaptation, and tone at once. Mega-prompts drift; terms get paraphrased; sentiment flips.",
    change:
      "Architected a 6-agent LangGraph workflow that injects glossaries first, then translates, adapts culture, and realigns sentiment as separate, inspectable stages.",
    decisions: [
      {
        title: "Specialists over a mega-prompt",
        detail:
          "Split the job across six agents so each stage has one job and a visible intermediate, instead of hoping one call does everything.",
      },
      {
        title: "Glossary as a pipeline stage",
        detail:
          "Injected domain terms before translation so the model cannot invent synonyms for locked technical language.",
      },
    ],
    impact: "High-fidelity localization via a 6-agent, inspectable workflow",
    tech: ["LangGraph", "LangChain", "Transformers"],
    githubUrl: "https://github.com/Nadex19-Adi",
    metrics: {
      Scale: "6-agent workflow",
      Domain: "Localization",
      Quality: "Glossary-locked",
      Status: "Production",
    },
    architecture: [
      { id: "src", label: "Source Text", sub: "Technical copy" },
      { id: "gloss", label: "Glossary Agent", sub: "Term lock" },
      { id: "tr", label: "Translate + Culture", sub: "4 specialist agents" },
      { id: "tone", label: "Sentiment Align", sub: "Final pass" },
    ],
  },
  {
    id: "cloud-cost",
    name: "Cloud Cost Optimization",
    year: "2025",
    role: "Research engineer",
    tagline: "A hybrid engine that cut cloud over-provisioning cost by 28%.",
    context:
      "Cluster traces show machines sitting idle or oversized. The goal was to classify workloads well enough to stop paying for capacity nobody uses.",
    conflict:
      "A pure time-series model misses mixed workload shapes; pure clustering ignores how demand evolves. Either one alone mis-labels bursty jobs as always-on.",
    change:
      "Combined K-Means workload classification with ARIMA + LSTM forecasting on Google Cluster Trace data — a 28% reduction in over-provisioning cost.",
    decisions: [
      {
        title: "Hybrid forecast",
        detail:
          "Used ARIMA for stable seasonal load and LSTM for bursty residuals instead of forcing one model to explain both.",
      },
      {
        title: "Classify, then forecast",
        detail:
          "Clustered machines by workload shape first, then forecasted inside each cluster so recommendations matched the job type.",
      },
    ],
    impact: "28% reduction in cloud over-provisioning cost",
    tech: ["Python", "ARIMA", "LSTM", "K-Means"],
    githubUrl: "https://github.com/Nadex19-Adi",
    metrics: {
      Result: "28% cost cut",
      Dataset: "Google Cluster Trace",
      Method: "Hybrid engine",
      Status: "Research",
    },
    architecture: [
      { id: "trace", label: "Cluster Trace", sub: "Google dataset" },
      { id: "km", label: "K-Means", sub: "Workload shape" },
      { id: "fc", label: "ARIMA + LSTM", sub: "Demand forecast" },
      { id: "act", label: "Resize Action", sub: "28% less waste" },
    ],
  },
  {
    id: "elevare",
    name: "Elevare Platform",
    year: "2026",
    role: "Full-stack engineer",
    tagline: "AI job matching with an automated ATS scorer — a product, not a notebook.",
    context:
      "Candidates and roles fail to match because keyword filters ignore domain fit. The product needed scoring that a recruiter could trust and a candidate could act on.",
    conflict:
      "Generic LLM summaries are not an ATS. Scoring had to be structured, domain-aware, and persisted — while the UI had to feel like a real platform, not a Streamlit demo.",
    change:
      "Shipped a React + Flask + Gemini 2.5 + Supabase platform with automated ATS scoring and domain-specific recommendations, hosted on Vercel.",
    decisions: [
      {
        title: "ATS as a scoring engine",
        detail:
          "Treated matching as a structured score with domain weights, not a free-form chatbot reply that cannot be compared across candidates.",
      },
      {
        title: "Product stack, not a demo stack",
        detail:
          "Used React, Flask, and Supabase so auth, persistence, and scoring live behind a real UI instead of a local notebook.",
      },
    ],
    impact: "Production job-matching platform with automated ATS scoring",
    tech: ["React", "Flask", "Gemini 2.5", "Supabase"],
    githubUrl: "https://github.com/Nadex19-Adi",
    metrics: {
      Matching: "Domain-specific",
      Analysis: "Automated ATS",
      Platform: "Vercel",
      Status: "Production",
    },
    architecture: [
      { id: "cv", label: "Resume / JD", sub: "Candidate input" },
      { id: "ats", label: "ATS Engine", sub: "Structured score" },
      { id: "llm", label: "Gemini 2.5", sub: "Domain recs" },
      { id: "db", label: "Supabase", sub: "Auth + persist" },
    ],
  },
];
