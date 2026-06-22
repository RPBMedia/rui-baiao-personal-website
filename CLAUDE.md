# CLAUDE.md

## Project Overview

This is Rui Baiao’s personal website.

The site presents Rui as an Engineering Manager with deep software engineering roots, platform leadership experience, and hands-on AI-enabled engineering skills. The tone should be professional, modern, confident, and human — never generic, inflated, or overly corporate.

The visual style should remain dark, minimal, premium, and slightly sci-fi, with subtle motion and clean engineering aesthetics.

## Working Principles

* Preserve the existing visual identity unless explicitly asked to redesign something.
* Prefer small, focused changes over broad rewrites.
* Keep copy concise, sharp, and natural.
* Avoid buzzwords, clichés, and exaggerated claims.
* Do not make the site feel self-aggrandizing or overly flashy.
* Prioritize readability, responsiveness, accessibility, and performance.
* Keep animations subtle. They should reward attention, not demand it.
* When changing content, preserve Rui’s voice: modern, grounded, direct, with some personality.

## Git Workflow

After every completed change:

1. Check the current branch.
2. If currently on `main`, commit directly to `main`.
3. If currently on another branch, commit to the current branch unless instructed otherwise.
4. Push the commit to the remote branch.

Use clear, descriptive commit messages.

Examples:

```bash
git status
git branch --show-current
git add .
git commit -m "Update creative section copy and music links"
git push
```

Do not commit unfinished work, broken builds, debugging leftovers, or unrelated changes.

Before committing, always review the diff:

```bash
git diff
git status
```

## Server Workflow

After every completed change, restart the development server.

Use the project’s existing start command. If unsure, inspect `package.json`.

Common commands may include:

```bash
npm run dev
```

or:

```bash
pnpm dev
```

or:

```bash
yarn dev
```

If a dev server is already running, stop it cleanly and restart it.

## Quality Checks

Before committing and pushing, run the appropriate checks when available:

```bash
npm run lint
npm run typecheck
npm run build
```

If the project uses `pnpm` or `yarn`, use the matching package manager instead.

If any check fails, fix the issue before committing.

If a check is unavailable, do not invent scripts. Inspect `package.json` and use only existing scripts.

## Code Style

* Use clean React and TypeScript.
* Keep components small and readable.
* Prefer clear names over clever abstractions.
* Avoid unnecessary dependencies.
* Do not introduce large libraries for small UI effects.
* Use Tailwind CSS consistently if Tailwind is already used.
* Keep styling aligned with the current design system.
* Avoid inline styles unless there is a strong reason.
* Keep animations performant and lightweight.

## Content Style

The website should sound like an experienced engineering leader, not a startup pitch deck.

Prefer language that is:

* clear
* confident
* specific
* grounded
* human

Avoid language that is:

* inflated
* generic
* cringe
* overly inspirational
* corporate filler
* AI hype

Avoid phrases like:

* “passionate innovator”
* “visionary leader”
* “driving digital transformation”
* “leveraging cutting-edge technology”
* “AI revolution”
* “disruptive mindset”

## AI Positioning

When writing about AI, frame it as practical engineering leverage.

Good framing:

* AI-assisted engineering workflows
* codebase exploration
* prototyping
* documentation
* automation
* delivery flow
* engineering productivity
* responsible adoption
* human review and engineering judgment

Avoid presenting AI as magic or as a replacement for engineers.

The site should communicate that Rui uses AI tools seriously and thoughtfully, without hype.

Relevant tools:

* GitHub Copilot
* Microsoft 365 Copilot
* Claude Code
* OpenAI Codex
* Lovable
* Agentic workflows
* AI-assisted automation
* AI-assisted prototyping

Lovable should be framed as rapid prototyping and validation, not deep enterprise engineering.

## Animation Guidelines

Animations should be subtle, elegant, and restrained.

Preferred feeling:

* quiet networked infrastructure
* intelligent system activity
* minimal sci-fi atmosphere
* cybernetic but calm
* mathematically elegant

Avoid:

* flashy movement
* distracting particles
* excessive glow
* portrait-centered animations
* solar-system effects around the profile photo
* anything that pulls attention away from reading

Respect reduced-motion preferences where possible.

## Accessibility

Maintain good accessibility standards:

* Use semantic HTML.
* Keep sufficient color contrast.
* Buttons should be buttons, links should be links.
* Interactive elements should support keyboard navigation.
* Popovers and menus should close on Escape and outside click where appropriate.
* Use meaningful `aria` attributes when needed.
* Do not hide important text inside visuals only.

## Responsiveness

All changes must work well on:

* desktop
* tablet
* mobile

Always check that:

* hero text remains readable
* navigation behaves correctly
* cards stack cleanly
* buttons do not overflow
* animations do not clutter small screens

## Links

Use the following music links when needed:

SoundCloud:

```text
https://soundcloud.com/eon-rift
```

Spotify:

```text
https://open.spotify.com/artist/6lNAaGeL0T2a4zF750AH95?si=ZfgQade-SA-4d1wIutXpXw
```

Do not expose private personal information such as full home address, phone number, or date of birth on the public website.

## Change Discipline

When making requested changes:

1. Understand the requested change.
2. Inspect the relevant files before editing.
3. Make the smallest clean change that satisfies the request.
4. Preserve existing design and behavior unless asked otherwise.
5. Run available checks.
6. Restart the dev server.
7. Review the diff.
8. Commit.
9. Push.

## When Unsure

If a request could be interpreted in multiple ways, choose the option that:

* preserves the existing design
* keeps the site professional
* avoids over-engineering
* avoids adding dependencies
* protects readability and performance

If the uncertainty affects content accuracy, public personal information, or major design direction, ask before proceeding.
