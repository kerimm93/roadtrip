# Roadtrip Docs Change Report · Sprint 39 Phase 2

## Grundlage

Sprint 39 Phase 2 baut auf Sprint 39 Phase 1 auf. Die erwarteten Phase-1-Dateien
waren im Repository vorhanden:

- `docs/audits/2026-06-roadtrip-docs-design-contract-audit.md`
- `docs/audits/2026-06-roadtrip-ui-redesign-inputs.md`
- `docs/handoffs/sprint-39-docs-design-contract-audit-handoff.md`

Phase 1 klassifizierte `AGENTS.md`, `DECISIONS.md`, `docs/DESIGN.md`,
`docs/ARCHITECTURE.md` und `readme.md` als teilweise veraltet bzw.
aktualisierungsbedürftig. Phase 2 aktualisiert diese Kern-Dokumente, ohne
App-Code zu ändern.

## Scope

Docs-only. Geändert wurden ausschließlich Markdown-/Dokumentationsdateien.

Nicht geändert:

- `index.html`
- App-JavaScript
- App-CSS
- produktive Prototyp-Dateien
- Sync-, Verschlüsselungs-, ZIP-, Import-/Export-, Tombstone-, Trello-, Notes-,
  Sprintstart-, Handoff- oder Chat-Workflow-Logik

## Aktualisierte Kern-Dokumente

### `AGENTS.md`

- Stand von Sprint 29 auf Sprint 39 Phase 2 aktualisiert.
- Roadtrip als Single-File-HTML-/Vanilla-JS-App beschrieben.
- Minimal-invasive Arbeitsweise und kleine prüfbare Patches betont.
- Code-Sprint-Checks und Docs-only-Sprint-Checks getrennt dokumentiert.
- Codex-Internetregel ergänzt: Standard AUS; nur offizielle externe Quellen bei
  echter Notwendigkeit; keine privaten Daten/Tokens/Backups/App-Exports nach außen.
- Git-/Workflow-Präferenzen und Handoff-Mindestinhalte aktualisiert.

### `DECISIONS.md`

- Entscheidungen aus Sprint 31 bis Sprint 39 Phase 2 ergänzt:
  - Sprint 31: Planned Feature Editing MVP
  - Sprint 32: Planned Feature Detail & Brainstorm MVP
  - Sprint 33: Planned Feature Backfill / Hauptchat-Abgleich MVP
  - Sprint 34: Detailfelder in Prompt-Workflows
  - Sprint 35: Next-Sprint-/Hauptchat-Handoff
  - Sprint 36: Sprint-Dock / Sprint-Zyklus konsolidiert
  - Sprint 36.1: Arbeitsmodus-Dropdown
  - Sprint 37: optionales `featureFlow`
  - Sprint 38: optionale Mermaid-/Feature-Flow-Preview
  - Sprint 39 Phase 1: Docs-/Design-Contract-Audit
  - Sprint 39 Phase 2: Docs-only-Kern-Dokumentationsupdate
- Roadmap-/Workflow-Entscheidungen ergänzt:
  - Prototyp ist Referenz, kein 1:1-Bauplan.
  - Sprintabschluss soll Codeanalyse-Bedarf einschätzen.
  - SOP-Extraktion aus Handoffs bleibt Roadmap.
  - Normaler Sprintstart und großer Hauptchat-Abgleich bleiben getrennt.
  - Kleine Hauptchat→Feature-Database-Mitnahme bleibt spätere Richtung.
  - Open Questions Workspace bleibt Roadmap.
  - Selektives Feature-Merge für übersprungene Import-Kandidaten bleibt Roadmap.

### `docs/DESIGN.md`

- Aktuellen Design-Contract ab Sprint 39 ergänzt.
- Roadtrip als ruhiges Meta-Tool für Projekt-, Feature-, Chat- und Sprintsteuerung
  beschrieben.
- Prototyp als Referenz statt 1:1-Bauplan eingeordnet.
- Designrichtungen für Beziehungskarte, Momentum, Sidebar, Sprintzyklus,
  Projektansicht, Chats, Toasts, Notes, Settings, Sync, Feature Database und
  Lern-/Skill-Ansicht dokumentiert.
- Mermaid Preview als optionale, nicht-destruktive Preview für befülltes
  `featureFlow` festgehalten.
- Feature Database gegen blinde Komplexität und gegen Rückbau auf Prototyp-Niveau
  abgegrenzt.

### `docs/ARCHITECTURE.md`

- Aktuellen Architektur-Contract ab Sprint 39 ergänzt.
- Single-File-HTML-/Vanilla-JS-App, IndexedDB-first + localStorage-Fallback,
  JSON Export/Import, ZIP-Backup, verschlüsselter bidirektionaler Gist-Sync,
  Tombstones und Trello-Kontext beschrieben.
- Kernflüsse für Projekte, Feature-Datenbank, Planned-Feature-Detailfelder,
  `featureFlow`, Mermaid Preview, Notes, Chats und Sprint-/Handoff-Workflow
  dokumentiert.
- Schutzbereiche und Docs-only-Sprint-Regeln ergänzt.
- Architektur-/Workflow-Roadmap als Ausblick statt implementierter Architektur
  eingeordnet.

### `readme.md`

- README nutzerverständlicher neu strukturiert.
- Roadtrip als local-first, prompt-first Projekt-OS beschrieben.
- Kernbereiche Projekte, Feature Database, Planned Features, Notes Workspace,
  Chats, Sprints/Handoffs, AI Prompt Workflows sowie Sync/Backup erklärt.
- Technische Grundrichtung und aktuelle Feature-Workflow-Bausteine ergänzt.
- Roadmap-Themen klar als nicht fertig implementiert abgegrenzt.

## Neu angelegte Dateien

- `docs/audits/2026-06-roadtrip-docs-change-report.md`
- `docs/handoffs/sprint-39-phase-2-docs-update-handoff.md`

## Bewusst nicht umgesetzt

- Kein Migration Bundle.
- Keine Hauptchat-Migration.
- Kein CSV-Export.
- Kein Open Questions Workspace.
- Keine SOP-Extraktion als App-Funktion.
- Kein selektives Feature-Merge.
- Kein UI-Redesign.
- Keine Relationship Map / Project Graph / Canvas Export.
- Keine neue Handoff-, Import-/Export- oder App-Logik.

## Checks

Die finalen Checks sind im Handoff `docs/handoffs/sprint-39-phase-2-docs-update-handoff.md`
dokumentiert. Kein JS-Syntaxcheck wurde ausgeführt, weil keine App-Code-Datei
geändert wurde.

## Merge-Einschätzung

Mergefähig nach Review als Docs-only-Patch. Die Änderungen aktualisieren Kern-
Dokumente und legen zwei Markdown-Dokumente für Änderungsbericht und Handoff an.
