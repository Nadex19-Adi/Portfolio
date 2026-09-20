# Portfolio

Personal portfolio for **Aditya Patil**, AI Systems Engineer — a dark, editorial single-page site that presents five production AI systems as case studies, plus a 21-second launch film.

The website lives in [`Portfolio/`](./Portfolio). The film that accompanies it lives in [`brag-output/`](./brag-output) and is served by the site from `Portfolio/public/`.

## Repository layout

```
.
├── Portfolio/                  the website — React + TypeScript + Vite
│   ├── index.html              meta tags, Open Graph, JSON-LD
│   ├── public/                 resume PDF, icons, profile photo, launch film
│   ├── src/                    app source, sections, case study data
│   └── README.md               app-level documentation
├── brag-output/                Hyperframes project for the launch film
│   ├── brag.mp4                rendered film — 1920×1080, 30fps, 21.5s
│   ├── brag.jpg                poster still
│   ├── composition/            composition source (index.html + assets)
│   ├── brag-plan.md            storyboard and beat plan
│   └── composition-brief.md    handoff brief
└── skills-lock.json
```

## The site

A single scroll-driven page: hero with contact links above the fold, the launch film, an about section, leadership record, the five case studies, the stack, and contact.

Every case study is driven by one data file — `Portfolio/src/data/case-studies.ts` — and is structured as **Context / Conflict / Change**, with two named engineering decisions and an architecture path per system.

| # | System | What it is |
|---|--------|------------|
| 01 | SupportEnv | Production RL environment with independent sentiment and accuracy graders |
| 02 | MemoryForm | Long-term agent memory with a weighted recency × confidence × similarity ranker |
| 03 | Bhasha AI | 6-agent LangGraph translation pipeline with glossary and sentiment stages |
| 04 | Cloud Cost Optimization | Hybrid ARIMA + LSTM forecasting on cluster traces, 28% less over-provisioning |
| 05 | Elevare | AI job matching with automated ATS scoring |

## Running the site

```bash
cd Portfolio
npm install
npm run dev      # dev server
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build
```

`Portfolio/` is the Vite app root, so that directory is the build root for any static host.

## Stack

- React 19 + TypeScript
- Vite 7 (`rolldown-vite`)
- Tailwind CSS v4 via `@tailwindcss/vite`, with `tw-animate-css`
- Framer Motion 12 for scroll and entrance motion
- Lenis for smooth scrolling
- Three.js for the hero particle field
- Lucide icons and Radix UI primitives
- Fonts via Google Fonts: Anton (display), Outfit (subhead), Cormorant Garamond (serif), Inter (body)

## Launch film

The film was generated with [Hyperframes](https://hyperframes.heygen.com) from the composition in `brag-output/composition/`. It runs four beats on the site's own palette: the hook line, the hero type stack building line by line, three case-study cards arriving on the music's beat grid, then the name and URL.

To re-render after editing the composition:

```bash
cd brag-output/composition
npx hyperframes check
npx hyperframes render --output ../brag.mp4
```

Then copy the new `brag.mp4` and `brag.jpg` into `Portfolio/public/`.
