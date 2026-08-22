# Team Averera — Meet Our Team

A premium, animated "Meet Our Team" page for Team Averera, IIT (BHU) Varanasi, built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Design system

- **Theme:** dark "engineering blueprint" — graphite background, faint schematic grid, a copper accent (`copper-400` #F2A766) for primary actions/highlights and a signal-teal accent (`signal-400` #6FE3C4) for secondary/data accents.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (labels/data/eyebrows).
- **Signature element:** the Legacy section's timeline is rendered as a glowing circuit trace with solder-point nodes — a nod to the team's electronics/robotics identity — rather than a generic vertical list.

## Editing team content

**All member data lives in `data/team.ts`.** No member information is hardcoded inside any component.

- To add a leadership member, add an entry to the `leadership` array.
- To add a current-generation member, add a row to the relevant `gen2026` / `gen2025` / `gen2024` tuple array (or add a new generation array and register it in `currentTeam` + `currentGenerations`).
- To add an alumni generation, add a new key to `alumniRoster` — the Legacy timeline picks it up automatically and sorts by year.
- Each member automatically gets a generated avatar, default bio/skills/timeline via the `makeMember()` helper — override any field (bio, skills, projects, achievements, timeline, social) for richer profiles, as done for the President example.

## Component map

```
components/
  Hero.tsx                 full-screen hero w/ mesh, particles, stagger text
  SearchSection.tsx         sticky wrapper for SearchBar + FilterChips
  SearchBar.tsx
  FilterChips.tsx
  LeadershipSection.tsx     -> PORCard -> MemberCard
  CurrentTeamSection.tsx    -> GenerationTabs -> MemberCard
  StatsCounter.tsx          animated counters, in-view triggered
  LegacySection.tsx         -> Timeline -> TimelineNode + ExpandableGeneration
  ProfileDrawer.tsx         -> SocialLinks, SkillBadge, ContributionTimeline, Gallery
  SearchResultsSection.tsx  flat results grid shown while searching/filtering
  LoadingSkeleton.tsx
  Footer.tsx
```

## Accessibility

- All interactive elements are real `<button>`/`<a>` tags with visible focus rings (`focus-ring` utility).
- `prefers-reduced-motion` is respected globally in `app/globals.css`.
- The profile drawer uses `role="dialog"` / `aria-modal`.
- Images use `next/image` with descriptive `alt` text and lazy loading by default.
