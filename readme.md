# 🚗 Roadtrip

**Roadtrip** is a local-first, prompt-first project operating system for people who build software with AI and want to keep context, decisions, features, chats, sprints, analyses and long-term project memory under control.

Roadtrip is a browser-based **single-file HTML / Vanilla JavaScript app**. The productive app is `index.html`; there is no framework, backend requirement or build step.

> **Build iteratively without losing the map.**

---

## What Roadtrip is for

Roadtrip helps you:

* manage multiple software projects in one place
* keep planned features and implemented features separate
* enrich features with intent, workflow context, acceptance criteria and source context
* prepare sprint starts and sprint handoffs for AI-assisted work
* route context between Roadtrip, a main chat and sprint/execution chats
* preserve notes, decisions, resources, analyses and open questions
* generate structured prompts for GPT, Codex, Codex Cloud and similar tools
* review code-analysis findings, duplicate candidates and cleanup results deliberately
* track Pull Request references in project/chat context
* export feature and notes CSV, JSON data, ZIP backups and Obsidian Kanban Markdown
* optionally sync encrypted data through GitHub Gist and use Trello as an integration channel

Roadtrip does **not** replace human review:

> **AI proposes. Roadtrip structures. The user decides.**

---

## Core areas

### Projects

Projects are the main workspace. A project can hold title, summary, focus, next step, status, resources, repository references, notes, chats, sprints, handoffs, feature context, analyses and delivery references such as PR/branch information.

### Feature Database

Roadtrip separates:

* **planned features** — desired state, roadmap, ideas and future work
* **implemented features** — actual detected, imported or confirmed state

This keeps Soll-/Ist thinking explicit: code evidence does not automatically promote a planned feature or mutate existing feature data.

### Planned Feature details and `featureFlow`

Planned Features can include `purpose`, `workflowContext`, `acceptanceCriteria`, `sourceContext`, open questions and optional `featureFlow`. `featureFlow` is a text field for Mermaid/flowchart source; the preview is visual and non-destructive.

### Notes Workspace

The Notes Workspace keeps project notes and working context close to the projects and features they support. Notes can feed review and feature-derivation workflows, but Roadtrip remains conservative: useful context is preserved without turning every thought into a feature automatically.

### Chats, Sprints and Handoffs

Roadtrip supports a prompt-driven sprint loop:

```text
Roadtrip → Main Chat → Roadtrip → Sprint Chat → Roadtrip → Main Chat
```

Current workflow building blocks include Sprint-Dock, sprint-start prompt generation, sprint completion handoff, next-sprint/main-chat handoff, Rückführungs-/Hauptchat prompts, an Arbeitsmodus dropdown for Codex steering vs. direct mode, structured JSON imports and defensive project focus / next-step updates.

### Pull Requests and Obsidian Kanban

The code contains Pull Request extraction/storage paths and renders PR references in chat/project context. Roadtrip can also generate Obsidian Kanban Markdown in project and sprint-card modes, with copy/download actions.

---

## Import, Analysis and Cleanup

Roadtrip can process several kinds of external or AI-generated input:

* pasted HTML / code
* structured analysis JSON
* handoff JSON
* proposed features
* sprint completion reports
* main-chat handoffs
* code analysis results
* cleanup proposals
* feature and notes CSV exports for project-specific review

The current analysis/cleanup flow is:

```text
Feature-CSV / Code
→ analysis prompt
→ model response
→ optional transformation step
→ local cleanup import
→ direct review cases / main-chat cases / dedupe pairs
→ structured JSON returns
→ local validation
→ mutation-free preview
→ for allowed update-existing only: selection / diff / confirm / commit
```

Important contracts:

* Model responses are untrusted input, even when the prompt demands valid JSON.
* Local parsing and validation are authoritative.
* Invalid JSON must not be imported as cleanup results.
* Existing Feature IDs and pair/case bindings are locally validated.
* Existing feature descriptions are protected in CSV transformation contexts.
* Main-chat cleanup decisions use `roadtrip-mainchat-decisions-v1`.
* Structured Dedupe decisions use `roadtrip-dedupe-decisions-v1`; that versioned return is preview-only and has no apply, merge, archive, delete, status, pool or Duplicate-marking path.
* Separate from the structured Dedupe return, the existing direct Cleanup Review can move a concretely identified duplicate feature to trash after explicit confirmation outside CSV transformation mode. In CSV transformation mode the same direct duplicate action remains review-only.
* Main-chat and structured Dedupe returns may be partial; empty `decisions` and `dedupeDecisions` arrays are valid and mutation-free. Returned IDs must be known, unique within the response and locally consistent with their case or pair.

### Confirm-/Commit MVP

Roadtrip has a narrow code-side Confirm-/Commit MVP for cleanup decisions:

* implemented and statically checked in the code
* limited to validated main-chat `update-existing` decisions
* limited to `title`, `description` and `category`
* requires explicit selection, batch diff, user confirmation, drift check and guarded save
* not a structured Dedupe apply path and not a status/pool/promotion/create/archive/delete path

As of the 18 July 2026 real test, a natural browser proof for commit, drift handling, hard-reload persistence and batch atomicity is still open.

---

## Sync and Backup

Roadtrip is local-first and supports several safety and portability paths:

* IndexedDB-first persistence with localStorage fallback
* JSON Export / Import
* ZIP Backup with project-related CSV files and raw recovery artifacts
* optional encrypted GitHub Gist Sync
* Tombstone deletion protection
* optional Trello integration

Historical sync-safety audits remain relevant references for future sync hardening:

* `docs/reference/daily-log-sync-reference.md`
* `docs/audits/roadtrip-sync-safety-audit.md`
* `docs/handoffs/roadtrip-sync-safety-audit-handoff.md`

They are no longer presented as the immediate main product priority after the 18 July 2026 cleanup real test. Sync, backup, encryption, tombstones and Trello remain protected areas that need narrow, explicit sprints when changed.

---

## Current Status — 18 July 2026

Roadtrip is actively evolving and used as a real local project operating system.

Current verified status:

* **Restricted release:** mutation-free analysis, local validation and preview were verified in real browser use with a 65-feature FIAE-RPG CSV analysis path.
* **Safety basis confirmed:** all existing Feature IDs were bound exactly once; invalid model JSON was not accepted as cleanup result; an invalid foreign `canonicalFeatureId` was rejected; existing descriptions stayed protected; the structured Dedupe preview stayed mutation-free; the final Feature CSV export was byte-identical to the starting export.
* **Not yet released as persistent cleanup workflow:** cleanup runs and review decisions are still mostly temporary UI/runtime state and are not yet a durable, reload-resumable workbench.
* **Confirm-/Commit:** implemented and statically checked for a narrow `update-existing` path, but natural browser proof for commit/drift/atomicity remains open.

Current immediate product priority:

```text
Persistent Cleanup Workbench & confirmed review decisions
```

The next product sprint should persist analysis/cleanup runs, restore the same run after reload, show baseline/origin/status/decision/next action per case, store non-mutating decisions, provide filters and counters, separate JSON parse errors from valid empty results and hand validated `update-existing` cases only to the existing diff/confirm/commit path.

---

## Roadmap — Direction, Not Finished Features

### Current priority

* Persistent Cleanup Workbench & confirmed review decisions
* Clear parse-error UX for invalid JSON vs. valid empty results
* Durable non-mutating review decisions
* Reload-resumable cleanup runs with baseline and next action

### Later mutation paths, only with explicit contracts

* Broader update/apply paths after real proof of the current MVP
* Any status, pool or promotion workflow from analysis findings
* Any create/split/merge/archive/delete workflow
* Any new structured Dedupe apply path

### Later protected areas

* Sync result hardening and write verification
* Force-push preflight / snapshots
* optimistic concurrency / revision protection
* schema and reference validation
* tombstone lifecycle and restore contracts
* protected raw-backup recovery

### Later product directions

* Code-analysis modes and sprint-delta analysis
* Import Workspace UI polish
* Open Questions Workspace
* Migration bundle / mainchat rollover
* SOP extraction from handoffs
* documentation/wiki workflows
* Relationship Map / Project Graph
* staged UI polish based on the Atlas design reference

---

## Technical Direction

Roadtrip 1.x is intentionally lightweight:

* Single-file HTML app (`index.html`)
* Vanilla JavaScript
* CSS Custom Properties
* no framework
* no backend requirement
* no build step
* local-first storage
* IndexedDB-first with localStorage fallback
* JSON / CSV / ZIP backup and export paths
* optional encrypted Gist sync
* optional Trello integration

This makes Roadtrip portable, inspectable, easy to back up and friendly to small, minimal-invasive patches.

---

## Development Principles

* local-first before cloud-first
* prompt-first before hidden automation
* small reviewed sprints before large rewrites
* defensive imports before blind overwrite
* implemented features must be protected
* skipped candidates should be reviewable, not silently lost
* JSON is for machine import; Markdown is for human review and planning
* model output is untrusted until locally parsed and validated
* preview is not mutation
* sync is not backup
* backup and recovery need independent paths
* docs-only audits should precede risky code changes
* prompt contracts must be explicit when fields have machine meaning
* user review stays in the loop

---

## Repository Documentation

Important documentation areas include:

* `AGENTS.md` — rules for Codex / agent work
* `DECISIONS.md` — product, workflow and architecture decisions
* `docs/DESIGN.md` — design contract and visual direction
* `docs/ARCHITECTURE.md` — architecture, protected paths and technical contracts
* `docs/audits/` — audit reports; older files are historical unless explicitly current
* `docs/handoffs/` — sprint and analysis handoffs
* `docs/reference/` — reusable reference reports
* `README.md` / `readme.md` — project overview

---

## Installation / Usage

Typical local usage:

1. Clone the repository.
2. Open `index.html` in a browser.
3. Optionally serve the folder through a local development server.
4. Use Roadtrip locally.
5. Export JSON or ZIP backups regularly.
6. Configure optional GitHub-Gist-Sync only when needed.

Example local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## Development Checks

For code changes, run at least:

```bash
git status
git diff --name-only
git diff --check
```

Syntax-check inline scripts in the Single-File HTML app:

```bash
node -e "const fs=require('fs');const vm=require('vm');const c=fs.readFileSync('index.html','utf8');const scripts=[];let m;const re=/<script(?![^>]*src)[^>]*>([\\s\\S]*?)<\\/script>/gi;while((m=re.exec(c))!==null)scripts.push(m[1]);new vm.Script(scripts.join('\\n'));console.log('JS OK');"
```

Docs-only changes do not require the JS syntax check when `index.html` and all app code remain unchanged; they should instead prove scope with diff, file list, `git diff --check` and `git diff -- index.html`.

---

## License

Not yet specified.

---

## Note

Roadtrip is a personal local-first project operating system for AI-assisted software development. It is not designed as a multi-user SaaS, team platform or general-purpose public project management tool.

Data integrity, backup and sync safety remain important. Regular JSON / ZIP exports are still recommended.

### Persistent Cleanup Workbench MVP

Roadtrip now persists cleanup workbench runs in `cleanupRuns` using
`roadtrip-cleanup-run-v1`. A valid cleanup import creates a project-bound run with
stable cases, small feature baselines, source metadata and durable review state.
Hard reload recovery can reopen the active run for the selected project without
re-reading the raw model response.

The MVP distinguishes invalid JSON, parseable-but-invalid JSON, valid empty
results and valid content. Human review decisions are persisted without mutating
features. Valid main-chat `update-existing` decisions can become commit-ready only
when they produce an allowed `title`, `description` or `category` change and still
use the existing diff / confirm / drift / commit path. Structured Dedupe decisions
remain fully mutation-free.
