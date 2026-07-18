# Handoff · Docs Contract Refresh · 2026-07-18

## Auftrag und Scope

Docs-only Cleanup zwischen zwei Produktsprints. Ziel war, die Kern-Dokumentation
auf den aktuellen Produkt-, Architektur- und Realteststand zu bringen, ohne App-
Code oder historische Audit-/Handoff-Dateien rückwirkend umzuschreiben.

## Branch

- Ausgangsbranch: `work`
- Arbeitsbranch: `docs/current-contract-refresh-2026-07`

## Commit

- Commit: nach finalem Amend im Abschlussbericht genannt
- Commit-Message: `docs: refresh Roadtrip contracts after cleanup realtest`

## Geänderte Dateien

- `AGENTS.md`
- `DECISIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/DESIGN.md`
- `readme.md`

## Neu angelegte Dateien

- `docs/audits/2026-07-18-analysis-cleanup-realbetrieb.md`
- `docs/handoffs/2026-07-18-docs-contract-refresh-handoff.md`

## Zentrale Dokumentationsentscheidungen

- `AGENTS.md` ist jetzt sprintunabhängig und präzisiert getrennte Agenten-/Chatkontexte.
- Schutzlisten wurden von „nie ändern“ auf „nicht ohne expliziten Vertrag,
  Migration, Tests und Handoff ändern“ präzisiert.
- Das aktuelle State-Modell wird nicht mehr als alte Teilmenge festgeschrieben;
  spätere ausdrücklich beauftragte Workbench-Strukturen bleiben möglich.
- `DECISIONS.md` ist ein allgemeiner Entscheidungslog; Atlas-Entscheidungen sind
  als historische Designphase eingeordnet.
- Analyse-/Cleanup-/Review-Verträge wurden dokumentiert: untrusted model input,
  lokale Parser/Validatoren, `roadtrip-mainchat-decisions-v1`,
  `roadtrip-dedupe-decisions-v1`, Preview-only-Dedupe und enger
  `update-existing`-Commitpfad.
- `docs/ARCHITECTURE.md` beschreibt jetzt State/Config/UI-/Runtime-State,
  Exportartefakte, den aktuellen End-to-End-Analysepfad, Trust Boundaries und die
  geplante persistente Workbench als Zielarchitektur.
- `docs/DESIGN.md` ergänzt Review-/Workbench-UX-Prinzipien, ohne die Workbench als
  implementiert darzustellen.
- `readme.md` priorisiert den aktuellen Analyse-/Cleanup-Stand und ordnet ältere
  Sync-Safety-Themen als geschützten späteren Bereich statt unmittelbaren Fokus ein.

## Bewusst unveränderte historische Dateien

Nicht rückwirkend geändert wurden vorhandene Dateien unter:

- `docs/audits/` außer dem neu angelegten Auditbericht,
- `docs/handoffs/` außer diesem neuen Handoff,
- `docs/archive/`,
- `docs/reference/`,
- Prototypdateien.

## Ausgeführte Checks

- `git status --short` — erfolgreich; fünf geänderte Kern-Markdown-Dateien und
  zwei neue Markdown-Dateien angezeigt.
- `git diff --name-only` — erfolgreich; zeigte die fünf bereits getrackten
  Markdown-Dateien im Diff.
- `git diff --stat` — erfolgreich; zeigte ausschließlich Markdown-Änderungen an
  den getrackten Kern-Dokumenten.
- `git diff --check` — erfolgreich ohne Ausgabe.
- `git diff -- index.html` — erfolgreich ohne Ausgabe; `index.html` blieb
  unverändert.
- `git diff -- '*.md'` — erfolgreich; Markdown-Diff erzeugt (1684 Zeilen).
- `git diff --name-only | grep -Ev '(^|/)[^/]+\.md$'` — erfolgreich ohne
  Ausgabe.
- Zusätzliche Untracked-Scope-Prüfung über `git ls-files --others --exclude-standard`
  zeigte nur die zwei neu angelegten Markdown-Dateien.

Kein JS-Syntaxcheck ausgeführt, weil ausschließlich Markdown-/Dokumentationsdateien
geändert oder neu angelegt wurden.

## Risiken / offene Fragen

- Der Auditbericht beruht für Realtestdaten auf dem aktuellen Auftrag; Browserdaten
  oder frühere Chats standen nicht zur Verfügung.
- Der Confirm-/Commit-Pfad ist als implementiert und statisch geprüft beschrieben,
  aber nicht als natürlicher Browser-Realbetrieb freigegeben.
- Die geplante Workbench-Fallstatusliste ist als Produktkontext dokumentiert, nicht
  als implementiertes Schema.

## Bewusste Nicht-Umsetzungen

- Kein `index.html` geändert.
- Keine App-Funktion implementiert.
- Keine Migration, Persistenzlogik, Promptgeneratoren, JSON-Schemata oder Decision-
  Enums geändert.
- Kein Parsefehler-UI-Fix implementiert.
- Kein Dedupe-Apply implementiert.
- Kein Confirm-/Commit-Verhalten geändert.
- Kein Internet verwendet.

## Mergeeinschätzung

Mergefähig als Docs-only-Patch, wenn die Scope- und Diff-Checks erfolgreich sind.
Der Patch aktualisiert Verträge und Prioritäten, ohne produktiven Code zu ändern.
