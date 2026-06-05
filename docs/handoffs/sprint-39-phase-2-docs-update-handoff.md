# Sprint 39 Phase 2 · Docs Update Handoff

## Branch

- `sprint-39-phase-2-docs-update`

Hinweis: Im Container existierte kein lokaler `main`-Branch; der Sprint wurde von
`work` aus auf den neuen Branch `sprint-39-phase-2-docs-update` gelegt. Der
initiale Versuch `git checkout main && git pull` schlug deshalb fehl.

## Grundlage geprüft

Sprint 39 Phase 1 war im Repository vorhanden:

- `docs/audits/2026-06-roadtrip-docs-design-contract-audit.md`
- `docs/audits/2026-06-roadtrip-ui-redesign-inputs.md`
- `docs/handoffs/sprint-39-docs-design-contract-audit-handoff.md`

Diese Dateien wurden zusammen mit `AGENTS.md`, `DECISIONS.md`, `docs/DESIGN.md`,
`docs/ARCHITECTURE.md` und `readme.md` als Arbeitsgrundlage gelesen.

## Geänderte Dateien

- `AGENTS.md`
- `DECISIONS.md`
- `docs/DESIGN.md`
- `docs/ARCHITECTURE.md`
- `readme.md`
- `docs/audits/2026-06-roadtrip-docs-change-report.md`
- `docs/handoffs/sprint-39-phase-2-docs-update-handoff.md`

## Neu angelegte Dateien

- `docs/audits/2026-06-roadtrip-docs-change-report.md`
- `docs/handoffs/sprint-39-phase-2-docs-update-handoff.md`

## Wichtigste Dokumentationsänderungen

- `AGENTS.md` auf Sprint 39 Phase 2 aktualisiert: minimal-invasive Arbeitsweise,
  Code-vs-Docs-only-Checks, Codex-Internetregel, Git-/Workflow-Präferenz und
  Handoff-Inhalte.
- `DECISIONS.md` um Sprint-31-bis-39-Entscheidungen und Roadmap-/Workflow-
  Entscheidungen ergänzt.
- `docs/DESIGN.md` um aktuellen Design-Contract ergänzt: Roadtrip als ruhiges
  Meta-Tool, Prototyp als Referenz, Mermaid Preview als optionale nicht-destruktive
  Preview, Feature Database als kontextreich aber UI-seitig beherrschbar.
- `docs/ARCHITECTURE.md` um aktuellen Architektur-Contract, Schutzbereiche,
  Docs-only-Regeln und Roadmap-Ausblick ergänzt.
- `readme.md` nutzerverständlich neu strukturiert und auf aktuellen Roadtrip-Stand
  gebracht.
- Change Report für die Dokumentationsänderungen angelegt.

## Nachgetragene Sprint-31-bis-39-Regeln

- Sprint 31: Planned Feature Editing MVP.
- Sprint 32: Planned Feature Detail & Brainstorm MVP mit `purpose`,
  `workflowContext`, `acceptanceCriteria`, `sourceContext`.
- Sprint 33: Planned Feature Backfill / Hauptchat-Abgleich MVP.
- Sprint 34: Planned-Feature-Details werden in Sprintstart-, Hauptchat-, Codex-,
  Analyse-/Import-/Cleanup-Prompts genutzt.
- Sprint 35: Next-Sprint-/Hauptchat-Handoff.
- Sprint 36: Sprint-Dock / Sprint-Zyklus konsolidiert.
- Sprint 36.1: Arbeitsmodus-Dropdown für Codex-Steuerung vs. Direktmodus.
- Sprint 37: optionales planned-Feature-Feld `featureFlow`.
- Sprint 38: optionale Mermaid-/Feature-Flow-Preview für befülltes `featureFlow`.
- Sprint 39 Phase 1: Docs-/Design-Contract-Audit.
- Sprint 39 Phase 2: Kern-Dokumente als Docs-only-Patch aktualisiert.

## Codex-Internetregel

- Standard: Internet AUS.
- Internet nur bei echter Notwendigkeit für aktuelle offizielle externe
  Dokumentation.
- Für Docs-only-, UI-Polish-, Backlog-, Prompt-/Workflow- und private Daten-Sprints
  bleibt Internet aus.
- Keine Tokens, Backups, App-Exports oder privaten Projektdaten an externe Dienste.
- Bei späterer Internetnutzung: nur offizielle Quellen und Quellen im Handoff
  dokumentieren.

In diesem Sprint wurde keine Websuche und keine externe Online-Dokumentation
verwendet.

## Docs-only-Regelung

- Kein `index.html`.
- Keine App-Code-, CSS- oder JS-Dateien.
- Keine App-Feature-Implementierung.
- Kein JS-Syntaxcheck, weil kein App-Code geändert wurde.
- Nachweis über `git diff --check`, Dateiliste, Diff-Statistik und leeren
  `git diff -- index.html`.

## Roadmap-Hinweise aufgenommen

- Prototyp ist Designreferenz, kein 1:1-Bauplan.
- Sprintabschluss soll Codeanalyse-Bedarf einschätzen.
- Handoffs sollen später optional auf SOP-Extraktion geprüft werden.
- Normaler Sprintstart und großer Hauptchat-Abgleich bleiben getrennte Werkzeuge.
- Kleine Hauptchat→Feature-Database-Mitnahme beim normalen Sprintstart bleibt
  spätere Richtung.
- Open Questions Workspace bleibt Roadmap.
- Selektives Feature-Merge für übersprungene Import-Kandidaten bleibt Roadmap.
- Relationship Map / Project Graph bleibt späterer eigener Sprint.

## Bewusst nicht umgesetzt

- Kein Migration Bundle.
- Keine Hauptchat-Migration.
- Kein CSV-Export.
- Kein Open Questions Workspace.
- Keine SOP-Extraktion als App-Funktion.
- Kein selektives Feature-Merge.
- Kein UI-Redesign.
- Keine Relationship Map / Project Graph / Canvas Export.
- Keine neue Handoff-, Import-/Export-, Sync-, ZIP-, Tombstone-, Trello-, Notes-,
  Prompt- oder App-Logik.

## Checks

### `git status --short`

```text
 M AGENTS.md
 M DECISIONS.md
 M docs/ARCHITECTURE.md
 M docs/DESIGN.md
 M readme.md
?? docs/audits/2026-06-roadtrip-docs-change-report.md
?? docs/handoffs/sprint-39-phase-2-docs-update-handoff.md
```

### `git diff --check`

```text
# keine Ausgabe; Check sauber
```

### `git diff --name-only`

```text
AGENTS.md
DECISIONS.md
docs/ARCHITECTURE.md
docs/DESIGN.md
readme.md
```

Hinweis: Die zwei neuen Markdown-Dateien erscheinen vor dem Staging in
`git status --short` als untracked, nicht in `git diff --name-only`.

### `git diff --stat`

```text
 AGENTS.md            | 163 +++++++++++++++---------
 DECISIONS.md         | 152 ++++++++++++++++++++++
 docs/ARCHITECTURE.md |  80 ++++++++++++
 docs/DESIGN.md       |  73 +++++++++++
 readme.md            | 352 +++++++++++++++++++++------------------------------
 5 files changed, 548 insertions(+), 272 deletions(-)
```

Hinweis: Untracked Markdown-Dateien sind vor dem Staging nicht Teil von
`git diff --stat`; sie sind oben unter `git status --short` und unter „Neu
angelegte Dateien" dokumentiert.

### `git diff -- index.html`

```text
# keine Ausgabe; index.html unverändert
```

### Docs-only-Scope-Prüfung

```text
# `git diff --name-only | grep -Ev '(^|/)([^/]+\.md)$'` gab keine Dateien aus.
```

## Geänderte / neu angelegte Dateiarten

- Alle geänderten und neu angelegten Dateien sind Markdown-Dateien.
- Keine HTML-/JS-/CSS-/App-Code-Dateien wurden geändert.
- `index.html` blieb unverändert.

## Risiken / offene Fragen

- Der Container hatte keinen lokalen `main`-Branch; der Branch wurde von `work` aus
  erstellt. Vor Merge sollte die Zielbranch-Basis in GitHub geprüft werden.
- `docs/ARCHITECTURE.md` enthält weiterhin ältere Atlas-/Sprint-25-Mermaid-
  Diagramme. Sie wurden bewusst nicht entfernt, sondern durch einen aktuellen
  Contract-Kontext relativiert.
- `docs/DESIGN.md` bleibt ein langes Atlas-geprägtes Designdokument. Phase 2
  ergänzt und relativiert, ersetzt aber nicht das gesamte Designsystem.
- README verweist weiterhin auf die GitHub-Wiki; diese wurde wegen Internet-aus-
  Regel nicht geprüft.

## Merge-Einschätzung

**Mergefähig nach Review.** Der Patch ist Docs-only, aktualisiert die
Kern-Dokumente, legt Change Report und Handoff an und verändert keinen App-Code.
