# Aditya Patil — Portfolio

Personal portfolio for Aditya Patil, AI Systems Engineer. A dark, editorial single-page site on the Next.js App Router that presents five production AI systems as case studies — context, constraint, and measurable outcome — alongside a 21-second launch film.

## What's on the page

- **Boot screen** — animated monogram that lifts into the hero
- **Hero** — three-line display headline, location, and a resume capsule
- **Marquee band** — scrolling capability strip
- **Launch film** — 21.5s video served from `public/brag.mp4`
- **About** — what I build and how I work
- **Experience** — IEEE Student Branch Chair (2026), NKSS SAC work, and role history
- **Selected work** — five systems, each with Context / Conflict / Change, two engineering decisions, and an architecture path
- **Skills & stack** — capability categories plus the language belt
- **Signal** — live GitHub telemetry, plus WakaTime when a key is configured
- **Gallery** — a nine-photo wall of events and community work
- **Contact** — direct details and a message form

A square-dot custom cursor follows the pointer on fine-pointer devices. It is additive, never a
replacement: the native cursor is only hidden once the component confirms a fine pointer with
motion allowed, and text fields always keep their own cursor.

## Case studies

| # | System | What it is |
|---|--------|------------|
| 01 | SupportEnv | Production RL environment with independent sentiment and accuracy graders |
| 02 | MemoryForm | Long-term agent memory with a weighted recency × confidence × similarity ranker |
| 03 | Bhasha AI | 6-agent LangGraph translation pipeline with glossary and sentiment stages |
| 04 | Cloud Cost Optimization | Hybrid ARIMA + LSTM forecasting on cluster traces, 28% less over-provisioning |
| 05 | Elevare | AI job matching with automated ATS scoring |

Case study copy, metrics, and architecture paths live in `src/data/case-studies.ts`. Profile copy, hero lines, stats, experience, and skills live in `src/data/profile.ts`. Editing those two files is enough to change most of the site's content.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 via `@tailwindcss/postcss`
- Framer Motion 12 for scroll and entrance motion
- Lenis for smooth scrolling
- Lucide icons, Radix UI primitives
- Fonts self-hosted through `next/font/google` in `src/app/layout.tsx`: Anton (display), Outfit (subhead), Cormorant Garamond (serif), Inter (body)

## Running locally

```bash
cd Portfolio
npm install
npm run dev        # dev server on http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

`next dev` and `next build` share the `.next` directory. On Windows, running a build while the
dev server is still up leaves `.next` half-written and the build fails with a confusing
"could not find a production build" error. Stop the dev server before building.

## Live stats

`getGithubStats()` in `src/lib/github.ts` reads the public GitHub REST API — no token needed —
and the page revalidates hourly (`export const revalidate = 3600`).

WakaTime needs a key the repository does not ship. Set `WAKATIME_API_KEY` in the environment
(or `.env.local`) and the WakaTime card fills itself in. With no key the card renders an
explanation instead, and it never displays invented numbers. Both helpers return `null` on any
failure — rate limit, network, missing key — so a build can never break because of them.

## Project layout

```
Portfolio/
  next.config.ts
  eslint.config.mjs
  src/
    app/
      layout.tsx         metadata, fonts, JSON-LD, analytics
      page.tsx           fetches live stats, renders the page shell
      globals.css        design tokens and utility classes
    components/          shell, cursor, preloader, nav, hero, marquee, footer, case study block
    sections/            About, Experience, Projects, Skills, Stats, Gallery, Contact, LaunchFilm
    data/                profile.ts, case-studies.ts, gallery.ts
    lib/                 motion presets, github stats
  public/                resume PDF, icons, profile photo, event photos, launch film
```

## Launch film

`brag-output/` holds the Hyperframes project that generated the launch film:

- `brag.mp4` — 1920×1080, 30fps, 21.5s, poster baked as frame 0
- `brag.jpg` — poster still, for platforms that accept a custom thumbnail
- `composition/` — the Hyperframes composition source
- `brag-plan.md`, `composition-brief.md` — storyboard and handoff brief

The site serves its own copy from `Portfolio/public/`. To re-render after editing the composition:

```bash
cd brag-output/composition
npx hyperframes check
npx hyperframes render --output ../brag.mp4
```

Then copy the new `brag.mp4` and `brag.jpg` into `Portfolio/public/`.
