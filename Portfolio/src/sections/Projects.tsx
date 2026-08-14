import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen } from "lucide-react";
import { GlassProjectCard } from "../components/glass-project-card";

// Import Event Images
import imgNKCON2024 from "../../Events attended or conducted/NKCON 2024.jpg";
import imgNKCON2025 from "../../Events attended or conducted/NKCON 2025.jpg";
import imgGoogleDevFest from "../../Events attended or conducted/GOOGLE DEV FEST 2026.jpg";
import imgGoogleCloud from "../../Events attended or conducted/GOOGLE CLOUD COMMUNITY DAYS BANGLORE.jpg";
import imgAdvisorMeet from "../../Events attended or conducted/IEEE BANGLORE SECTION ADVISOR MEET.jpg";
import imgAESS from "../../Events attended or conducted/KLE BELGAUM AESS CONCLAVE.jpg";
import imgAGM from "../../Events attended or conducted/IEEE NKSS AGM 2026.jpg";
import imgMakeBelagavi from "../../Events attended or conducted/Make for Belagavi.jpg";
import imgVolunteerMeet from "../../Events attended or conducted/Volunteer meet Bglor 2026.jpg";

export const PROJECT_CATEGORIES = [
  {
    id: "group",
    name: "Group Projects",
    description: "Collaborative initiatives and large-scale architectures.",
    projects: [
      {
        name: "MemoryForm",
        tech: ["Python", "FastAPI", "Supabase", "React"],
        desc: "AI Long-Term Memory Engine solving LLM amnesia using integrated Sentence-Transformers and a custom weighted ranking algorithm.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        stars: 10,
        metrics: {
          "Architecture": "Multi-Agent",
          "Storage": "Hybrid PostgreSQL",
          "Embeddings": "all-MiniLM-L6-v2",
          "Features": "Recency & Confidence",
          "Status": "Production"
        }
      },
      {
        name: "Bhasha AI",
        tech: ["LangGraph", "LangChain", "Transformers"],
        desc: "Architected a 6-agent translation workflow that handles technical glossary injection, cultural adaptation, and sentiment alignment.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        stars: 12,
        metrics: {
          "Scale": "6-Agent Workflow",
          "Domain": "Localization",
          "Quality": "High-fidelity",
          "Status": "Production"
        }
      },
      {
        name: "SupportEnv",
        tech: ["FastAPI", "Stable Baselines3", "Gradio", "OpenEnv"],
        desc: "Built a production-grade Reinforcement Learning environment to train AI agents on high-stress support tickets.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        stars: 18,
        metrics: {
          "Type": "RL Environment",
          "Target": "Support Tickets",
          "Grader": "Sentiment & Accuracy",
          "Status": "Production"
        }
      },
      {
        name: "Disaster Management & Incident Response",
        tech: ["CrewAI", "Streamlit", "Transformers"],
        desc: "Multi-agent emergency orchestrator simulating an Incident Response Team (IRT) with five specialized agents for incident triage, business continuity, and SLA tracking.",
        image: "/disaster.png",
        githubUrl: "https://github.com/Nadex19-Adi",
        stars: 15,
        metrics: {
          "Incident Response": "SLA & IRT Protocols",
          "Architecture": "5-Agent Crew",
          "NLP Focus": "Zero-shot RoBERTa",
          "Task": "Triage & Contingency",
          "Status": "Prototype"
        }
      },
      {
        name: "Cloud Cost Optimization",
        tech: ["Python", "ARIMA", "LSTM", "K-Means"],
        desc: "Hybrid cost-optimization engine that achieved a 28% reduction in cloud over-provisioning costs by accurately classifying machine workloads.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        stars: 15,
        metrics: {
          "Cost Focus": "28% Reduction",
          "Architecture": "Hybrid Engine",
          "Dataset": "Google Cluster Trace",
          "Status": "Research"
        }
      },
      {
        name: "Elevare Platform",
        tech: ["React", "Flask", "Gemini 2.5", "Supabase"],
        desc: "AI-driven job matching platform featuring an automated ATS scoring engine and domain-specific recommendations.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        stars: 20,
        metrics: {
          "Matching": "Domain-Specific",
          "Analysis": "Automated ATS",
          "Platform": "Vercel Hosted",
          "Status": "Production"
        }
      },
      {
        name: "Agri-Sethu (SIH)",
        tech: ["Streamlit", "Scikit", "MongoDB", "SoilGrids"],
        desc: "Smart crop recommendation system reducing fertilizer waste and improving yield prediction accuracy by 18%.",
        image: "/crop.png",
        githubUrl: "https://github.com/Nadex19-Adi",
        stars: 15,
        metrics: {
          "Accuracy": "18% Improvement",
          "Geospatial": "ISRO Bhuvan Maps",
          "Database": "MongoDB",
          "Status": "Hackathon"
        }
      }
    ]
  },
  {
    id: "solo",
    name: "Solo Projects",
    description: "Independent research, tools, and technical explorations.",
    projects: [
      {
        name: "KT-Bridge",
        tech: ["FastAPI", "React", "ChromaDB", "LangChain", "Node.js"],
        desc: "Knowledge Transfer Bridge: an automation suite to capture legacy workspace details from emails, compile handover documentation, and extract Git metrics.",
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        metrics: {
          "Focus": "Knowledge Transfer",
          "AI": "Gemini 2.0 / LangChain",
          "Database": "ChromaDB Vector Store",
          "Status": "Production"
        }
      },
      {
        name: "Paper2Code",
        tech: ["Streamlit", "Gemini Pro", "Regex", "Python"],
        desc: "Automated research productivity pipeline that analyzes scientific PDFs to identify methodological gaps and generate functional Python implementations.",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        metrics: {
          "Task": "Research Gap Analysis",
          "Input": "Scientific PDFs",
          "Output": "Functional Code",
          "Status": "Completed"
        }
      },
      {
        name: "RAG Trading Machine",
        tech: ["Python", "LangChain", "Vector DB", "Finance APIs"],
        desc: "Retrieval-Augmented Generation (RAG) based AI trading machine that analyzes market documents and news to generate predictive trading insights.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        metrics: {
          "Architecture": "RAG",
          "Domain": "Quantitative Finance",
          "Status": "Prototype"
        }
      },
      {
        name: "SpotiFLAC",
        tech: ["Go", "React", "Wails", "APIs"],
        desc: "Desktop application to download true FLAC lossless tracks from Tidal, Qobuz, and Amazon Music without requiring user authentication.",
        image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/spotbye/SpotiFLAC",
        stars: 100,
        metrics: {
          "Platform": "Windows/macOS/Linux",
          "Quality": "Lossless FLAC",
          "Status": "Production"
        }
      },
      {
        name: "RCEAD Sensor Plotting",
        tech: ["Streamlit", "Q-Learning", "KD-Tree", "LEACH"],
        desc: "Redundancy-Constrained Energy-Aware Adaptive Sensor Deployment Framework. A WSN deployment optimization system for irregular agricultural terrains.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        metrics: {
          "Algorithm": "Gradient Field Greedy",
          "Validation": "Graph-theoretic",
          "Coverage": "95%+",
          "Status": "Research"
        }
      },
      {
        name: "Agentic Bug-Hunter",
        tech: ["Docker", "Ollama", "CodeLlama", "ChromaDB"],
        desc: "AI agent that finds and fixes bugs using a ReAct loop. Uses a local vector database of 5,000 past bug fixes and requires human-in-the-loop approval.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        metrics: {
          "Sandbox": "Docker Executor",
          "Memory": "5,000 Bug-fix pairs",
          "Model": "CodeLlama 7B/34B",
          "Status": "Active"
        }
      },
      {
        name: "Machine Learning Models",
        tech: ["PyTorch", "Scikit-learn", "ResNet-50", "Pandas"],
        desc: "Collection of standalone ML implementations including EuroSAT Image Classification using ResNet-50/Swin-Transformer and Telco Customer Churn Prediction.",
        image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/Nadex19-Adi",
        metrics: {
          "Domain": "Vision / Tabular",
          "Models": "CNNs, Trees",
          "Status": "Research"
        }
      }
    ]
  },
  {
    id: "events",
    name: "Events Conducted / Attended",
    description: "Workshops, hackathons, and conferences.",
    projects: [
      {
        name: "NKCON 2024",
        tech: ["Participant", "IEEE", "Conference"],
        desc: "Participated in NKCON 2024, the flagship technical convention under the IEEE North Karnataka Sub-Section.",
        image: imgNKCON2024,
        metrics: {
          "Role": "Participant",
          "Organization": "IEEE NKSS",
          "Status": "Attended"
        }
      },
      {
        name: "NKCON 2025",
        tech: ["Co-Lead", "Technical Committee", "IEEE"],
        desc: "Served as SAC Volunteer and Technical Committee Co-lead handling events under IEEE North Karnataka Subsection.",
        image: imgNKCON2025,
        metrics: {
          "Role": "Co-Lead",
          "Organization": "IEEE NKSS",
          "Status": "Conducted"
        }
      },
      {
        name: "Google DevFest 2026",
        tech: ["Google", "DevFest", "Networking"],
        desc: "Active participant in Google DevFest 2026, engaging with the developer community and exploring new tech trends.",
        image: imgGoogleDevFest,
        metrics: {
          "Role": "Participant",
          "Event": "DevFest 2026",
          "Status": "Attended"
        }
      },
      {
        name: "Google Cloud Community Days",
        tech: ["Google Cloud", "Architecture", "Bangalore"],
        desc: "Attended sessions in Bangalore exploring advanced cloud architectures and Google Cloud innovations.",
        image: imgGoogleCloud,
        imageClassName: "object-contain bg-white/5",
        metrics: {
          "Role": "Participant",
          "Location": "Bangalore",
          "Status": "Attended"
        }
      },
      {
        name: "IEEE CAS Workshop 2024",
        tech: ["Circuits & Systems", "VTU Belagavi"],
        desc: "Attended the Circuits and Systems (CAS) Workshop held at VTU Belagavi.",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800",
        metrics: {
          "Role": "Participant",
          "Location": "VTU Belagavi",
          "Status": "Attended"
        }
      },
      {
        name: "Faculty-Student Advisor Meet",
        tech: ["IEEE Bangalore", "Strategy"],
        desc: "Participated in the Faculty-Student Branch Meet to discuss branch strategies and collaborative technical events.",
        image: imgAdvisorMeet,
        metrics: {
          "Role": "Volunteer",
          "Section": "IEEE Bangalore",
          "Status": "Managed Logistics"
        }
      },
      {
        name: "Git & GitHub Workshop",
        tech: ["Version Control", "CSE/AIML"],
        desc: "Conducted a hands-on workshop for CSE/AIML in December 2025 for 3rd semester students, teaching version control and collaborative development.",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
        metrics: {
          "Role": "Instructor",
          "Location": "JCER Campus",
          "Status": "Conducted"
        }
      },
      {
        name: "Hackathon Winning Strategies",
        tech: ["Ideation", "Strategy", "Mentorship"],
        desc: "Conducted a workshop sharing insights, ideation techniques, and strategic planning for winning technical hackathons.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
        metrics: {
          "Role": "Speaker",
          "Location": "JCER Campus",
          "Status": "Conducted"
        }
      },
      {
        name: "IEEE AESS Conclave",
        tech: ["AESS", "KLE Belagavi"],
        desc: "Participated in the Aerospace and Electronic Systems Society Conclave at KLE Belagavi Sheshgiri Campus.",
        image: imgAESS,
        metrics: {
          "Role": "Participant",
          "Location": "KLE Belagavi",
          "Status": "Attended"
        }
      },
      {
        name: "IEEE NKSS AGM 2026",
        tech: ["AGM", "IEEE NKSS", "Bijapur"],
        desc: "Attended the Annual General Meeting for IEEE North Karnataka Sub-Section at Bijapur.",
        image: imgAGM,
        metrics: {
          "Role": "SAC Volunteer",
          "Location": "Bijapur",
          "Status": "Event Management"
        }
      },
      {
        name: "Make for Belagavi",
        tech: ["Titan", "Innovation", "Belgaum"],
        desc: "Participated in Make for Belagavi, an innovation-focused event conducted by Titan.",
        image: imgMakeBelagavi,
        metrics: {
          "Role": "Participant",
          "Organizer": "Titan",
          "Status": "Attended"
        }
      },
      {
        name: "MSME Hackathon 2025",
        tech: ["Hackathon", "MSME", "Top 15"],
        desc: "Secured a spot in the Top 15 shortlisted teams among 60 to 70 participating teams from Belgaum.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
        metrics: {
          "Achievement": "Top 15",
          "Organization": "MSME",
          "Status": "Shortlisted"
        }
      },
      {
        name: "IEEE Volunteer Meet May 2026",
        tech: ["SAC Volunteer", "Bangalore"],
        desc: "Attended the exclusive IEEE SAC volunteer meet under the Bangalore section, where Chairs from all Student Branches were invited.",
        image: imgVolunteerMeet,
        metrics: {
          "Role": "SAC Volunteer",
          "Section": "IEEE Bangalore",
          "Status": "Attended"
        }
      }
    ]
  }
];

export function ProjectsSection() {
  const [activeFolder, setActiveFolder] = useState<string>("group");

  const activeCategory = PROJECT_CATEGORIES.find(c => c.id === activeFolder) || PROJECT_CATEGORIES[0];

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-white/10">
        {PROJECT_CATEGORIES.map((category, i) => (
          <button
            key={category.id}
            onClick={() => setActiveFolder(category.id)}
            className={`group relative flex items-baseline gap-2 pb-4 font-subhead text-[11px] font-bold tracking-[0.2em] transition-colors ${
              activeFolder === category.id ? "text-white" : "text-text-muted hover:text-white"
            }`}
          >
            <span className={`font-display text-xs transition-colors ${activeFolder === category.id ? "text-accent" : "text-text-muted group-hover:text-accent"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {category.name}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${
                activeFolder === category.id ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {activeCategory.projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-white/15 bg-white/[0.02]">
              <FolderOpen className="w-16 h-16 text-text-muted/40 mb-4" />
              <p className="text-text-muted font-medium">This category is currently empty.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {activeCategory.projects.map((p) => (
                <GlassProjectCard 
                  key={p.name} 
                  title={p.name} 
                  description={p.desc} 
                  image={p.image} 
                  tech={p.tech} 
                  metrics={p.metrics}
                  imageClassName={(p as any).imageClassName}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

