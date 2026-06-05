# 🚗 Roadtrip

**Roadtrip** is a local-first, prompt-first project operating system for people who
build software with AI and want to keep context, decisions, features, chats and
sprints under control.

Roadtrip is not just a feature tracker. It is the structured layer between:

- projects and ideas
- planned and implemented features
- notes and source context
- main chats and sprint chats
- sprint starts and sprint handoffs
- AI prompts and human review
- sync, backup and long-term project memory

The goal is simple: **build iteratively without losing the map**.

---

## What Roadtrip is for

Roadtrip helps you:

- manage multiple software projects in one place
- keep planned features and implemented features separate
- enrich planned features with useful implementation context
- prepare sprint starts and sprint handoffs for AI-assisted work
- route context between Roadtrip, a main chat and sprint/execution chats
- preserve notes, decisions, resources and analysis results
- export, back up and optionally sync your local project data
- review progress deliberately instead of drifting through unstructured prompts

Roadtrip is especially useful when an AI-assisted project has many conversations,
small decisions and follow-up features that would otherwise be scattered across
chat history.

---

## Core areas

### Projects

Projects are the main workspace. A project can hold status, focus, next steps,
resources, repository references, notes, chats, sprints and feature context.

### Feature Database

Roadtrip separates:

- **planned features** — desired state, roadmap, ideas and future work
- **implemented features** — actual detected or confirmed state

This enables Soll-/Ist thinking: what should exist vs. what already exists.

### Planned Features

Planned Features can be edited and refined inside Roadtrip. Current workflow
building blocks include:

- Planned Feature Editing
- detail fields for `purpose`, `workflowContext`, `acceptanceCriteria` and
  `sourceContext`
- Backfill / Hauptchat-Abgleich for enriching sparse planned features from main
  chat context
- use of detail fields in sprint-start, main-chat, Codex, analysis, import and
  cleanup prompts
- optional `featureFlow` text for Mermaid-/Feature-Flow source
- optional Mermaid Preview for filled `featureFlow`

The Mermaid Preview is visual only: it should not change the saved `featureFlow`
text, and render errors should be visible but non-destructive.

### Notes Workspace

The Notes Workspace keeps project notes and working context close to the projects
and features they support. It is intended to stay calm, minimal and useful for
long-running project memory.

### Chats

Roadtrip tracks chat context so project memory is not trapped in one conversation.
It distinguishes main chat, sprint chats and related working chats, including
active, completed and hidden contexts.

### Sprints and Handoffs

Roadtrip supports a prompt-driven sprint loop:

```text
Roadtrip → Main Chat → Roadtrip → Sprint Chat → Roadtrip → Main Chat
```

Current sprint workflow building blocks include:

- Sprint-Dock / consolidated sprint cycle
- Next-Sprint-/Hauptchat-Handoff
- Arbeitsmodus-Dropdown for Codex steering vs. direct mode
- structured prompt generation for sprint starts, handoffs, analysis and cleanup

### AI Prompt Workflows

Roadtrip is deliberately prompt-first. It helps generate structured prompts for:

- sprint starts
- sprint handoffs
- Codex tasks
- code analysis and cleanup review
- project momentum and next-step planning
- feature refinement and backfill workflows

AI proposes. Roadtrip structures. The user decides.

### Sync and Backup

Roadtrip is local-first but supports portable safety paths:

- JSON Export/Import
- ZIP Backup
- IndexedDB-first persistence with localStorage fallback
- optional encrypted bidirectional GitHub-Gist-Sync
- Tombstone protection for deleted data
- optional Trello integration

---

## Technical direction

Roadtrip 1.x is intentionally lightweight:

- Single-file HTML app (`index.html`)
- Vanilla JavaScript
- CSS Custom Properties
- no framework
- no backend requirement
- no build step
- local-first storage
- IndexedDB-first with localStorage fallback
- JSON/ZIP backup paths
- optional encrypted Gist sync

This makes Roadtrip portable, inspectable, easy to back up and friendly to small,
minimal-invasive patches.

---

## Current feature-workflow building blocks

Implemented or current-contract workflow blocks include:

- Planned Feature Editing MVP
- Planned Feature Detail fields (`purpose`, `workflowContext`,
  `acceptanceCriteria`, `sourceContext`)
- Planned Feature Backfill / Hauptchat-Abgleich MVP
- use of planned-feature details in prompt workflows
- Next-Sprint-/Hauptchat-Handoff
- Sprint-Dock / consolidated sprint cycle
- Arbeitsmodus-Dropdown for Codex steering vs. direct mode
- optional `featureFlow`
- optional Mermaid Preview for filled `featureFlow`

---

## Roadmap — not yet finished features

The following topics are intentionally documented as direction, not as completed
Roadtrip features:

- Open Questions Workspace
- SOP extraction from Sprint Handoffs
- selective Feature Merge for skipped import candidates
- small Hauptchat→Feature-Database carry-over during normal sprint start
- Relationship Map / Project Graph / Canvas Export
- UI redesign follow-up and visual polish
- broader learning/material backlog views

These should not be treated as implemented until a future sprint explicitly builds
and reviews them.

---

## Philosophy

Roadtrip follows one core principle:

> AI should accelerate learning — not replace understanding.

The intended loop is deliberate:

```text
Idea
→ Structure
→ Sprint
→ Build
→ Analyze
→ Review
→ Learn
→ Build something slightly more complex
```

Roadtrip helps reduce cognitive overload, preserve context, separate signal from
noise and keep human review in the loop.

---

## Handbook / Wiki

Roadtrip has a GitHub Wiki with usage guides, mental models, workflows,
architecture notes and feature explanations:

👉 [Open the Roadtrip Handbook](https://github.com/kerimm93/roadtrip/wiki)

---

## Status

Roadtrip is actively evolving. It is both:

- a real daily project operating system
- a long-term architecture, workflow and learning experiment
