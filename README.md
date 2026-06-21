# Rui Baiao — Personal Website

A premium, single-page personal portfolio for **Rui Baiao**, Engineering Manager at Volvo Cars (Stockholm). Built with **React + TypeScript + Tailwind CSS** (Vite).

> Engineering Manager building scalable platforms, strong teams, and AI-enabled delivery.

---

## Design concept

- **Dark-mode-first, but elegant.** A near-black charcoal canvas (`#0a0a0c`) with generous spacing, clean Inter typography, and a JetBrains Mono accent for technical labels.
- **Accent used sparingly.** A controlled signal red (`#FF3B30`) appears only where it earns attention — eyebrows, key words, CTAs, the orbiting hero node, and hover affordances — never as wallpaper.
- **Subtle engineering motifs.** A faint masked grid, soft accent glows, an orbit/signal hero graphic, and a stylized waveform in the Creative section — small nods to platforms and music/audio without gimmicks.
- **Senior, not junior.** No mascot icons, no progress bars, no buzzword soup. Skills are grouped as scannable clusters; copy is grounded and direct.
- **Responsive + accessible.** Mobile menu, semantic landmarks, visible focus rings, accessible contrast, sensible hover states, and `prefers-reduced-motion` support.

## Sections

Hero → About → Leadership Philosophy → AI-Enabled Engineering → Experience Highlights → Skills → Selected Career Timeline → Creative Side → Contact → Footer.

## Tech stack

- React 18 + TypeScript
- Tailwind CSS 3
- Vite 5

## Project structure

```
src/
  main.tsx
  App.tsx
  index.css            # Tailwind + design-system layer (grid, glows, motion)
  data.ts              # All copy/content lives here
  components/
    ui.tsx             # Section, Eyebrow, SectionHeading, Lead, Card, Chip
    icons.tsx          # Thin-stroke inline SVG icons (no icon library)
    Nav.tsx
    Hero.tsx
    About.tsx
    LeadershipPhilosophy.tsx
    AIEngineering.tsx
    ExperienceHighlights.tsx
    Skills.tsx
    CareerTimeline.tsx
    CreativeSide.tsx
    Contact.tsx
    Footer.tsx
```

Editing content is intentionally easy: almost everything lives in `src/data.ts`.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Links

- **Email:** rui.palma.baiao@gmail.com
- **GitHub:** https://github.com/RPBMedia
- **LinkedIn:** placeholder — update in `src/data.ts`
- **Eon Rift (music):** placeholder — update in `src/data.ts`

## Assumptions

- **No sensitive personal data** is shown — no home address, date of birth, or phone number, per request.
- **LinkedIn** and **Eon Rift** URLs are placeholders (`src/data.ts` → `links`). GitHub points at the real `RPBMedia` account.
- Platform reach figures (~60k retailers, ~40k internal users, 100+ countries) are taken from the supplied CV and surfaced as approximate stats.
- Footer year is set to 2026; the "Built with React, TypeScript & Tailwind" note is a small craft signal and can be removed.

## Optional future improvements

- **Downloadable CV** (PDF) button in the hero/contact.
- **Blog / writing** section for engineering-leadership and AI-adoption notes.
- **AI workflow case studies** — short write-ups of concrete agentic/automation wins.
- **Project / platform pages** with deeper architecture diagrams.
- **Scroll-spy nav** highlighting the active section, and subtle scroll-reveal animations.
- **Light theme** toggle, **i18n** (PT/EN/SV), and **OG image** generation for richer link previews.
- Wire a real **contact form** (e.g. Formspree/Resend) instead of `mailto:`.
