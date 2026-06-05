# Sprint 39 Handoff · Docs-/Design-Contract-Audit

## Status

Phase 1 abgeschlossen. Es wurden nur neue Markdown-Dokumente angelegt. Bestehende Kern-Dokumente, `index.html` und Prototyp-Dateien wurden nicht verändert.

Phase 2 wurde nicht gestartet. Für Änderungen an `AGENTS.md`, `DECISIONS.md`, `docs/DESIGN.md`, `docs/ARCHITECTURE.md` oder `readme.md` ist weiterhin eine ausdrückliche Nutzerfreigabe erforderlich.

## Codex-Umgebung / Branch-Hinweis

- Arbeitsumgebung: Codex-Task-Umgebung im Repository `/workspace/roadtrip`.
- Sichtbarer Git-Branch per `git branch --show-current`: `work`.
- Kein zusätzlicher Branch wurde per Terminal angelegt.
- Branchname in Codex UI prüfen.

## Geänderte Dateien

Neu angelegte Markdown-Dateien:

- `docs/audits/2026-06-roadtrip-docs-design-contract-audit.md`
- `docs/audits/2026-06-roadtrip-ui-redesign-inputs.md`
- `docs/handoffs/sprint-39-docs-design-contract-audit-handoff.md`

Nicht geändert:

- `index.html`
- `AGENTS.md`
- `DECISIONS.md`
- `docs/DESIGN.md`
- `docs/ARCHITECTURE.md`
- `readme.md`
- `docs/archive/prototypes/README.md`
- `docs/archive/prototypes/Roadtrip Atlas Redesign (standalone).html`

## Neu angelegte Dateien

### `docs/audits/2026-06-roadtrip-docs-design-contract-audit.md`

Enthält:

- Kurzfazit,
- geprüfte Dateien mit Status/Bewertung/empfohlener Aktion,
- aktueller Roadtrip-Stand,
- veraltete Annahmen,
- Widersprüche,
- Design-/Architektur-/Agenten-Contract,
- Update- und Archivierungsempfehlungen,
- Phase-2-Vorschläge,
- Nicht-Ziele,
- Risiken und offene Fragen.

### `docs/audits/2026-06-roadtrip-ui-redesign-inputs.md`

Enthält:

- UI-/Design-Inputs aus Prototyp und Sprint-39-Kontext,
- Beziehungskarte / Projektlandkarte,
- Momentum-Übersicht,
- Sidebar / Navigation mit Icons,
- Sprintzyklus,
- Projektansicht als Meta-Tool,
- Chat-/Sprintkontexte,
- Toast-Feedback,
- Notes, Settings, Sync, Feature-Datenbank,
- Lern-/Verarbeitungsübersicht,
- Nicht-Übernahme-Regeln,
- mögliche spätere UI-Sprints.

### `docs/handoffs/sprint-39-docs-design-contract-audit-handoff.md`

Dieses Handoff dokumentiert Ergebnis, Checks, Risiken, Phase-2-Empfehlungen und Merge-Einschätzung.

## Wichtigste Audit-Ergebnisse

- Die Repository-Dokumentation ist grundsätzlich brauchbar, aber überwiegend auf Atlas-/Sprint-25-bis-29-Stand geprägt.
- Der heutige Stand nach Sprint 31 bis 38 fehlt in den Kern-Dokumenten weitgehend.
- `AGENTS.md` enthält eine gute Schutzliste, braucht aber Aktualisierung für Codex Cloud, Docs-only-Sprints, planned Feature Details, `featureFlow`, Mermaid Preview und Sprint-Dock/Hauptchat-Rückführung.
- `DECISIONS.md` ist weiterhin die beste Quelle für umgesetzte Abweichungen, endet aber inhaltlich bei Sprint 29.
- `docs/DESIGN.md` enthält weiterhin gültige Designprinzipien, muss aber als Design-Contract statt alter Etappenplan verstanden werden.
- `docs/ARCHITECTURE.md` beschreibt die alte Atlas-IA und sollte heutige Flüsse ergänzen.
- `readme.md` ist produktstrategisch stimmig, aber für konkrete aktuelle Funktionen zu allgemein.
- Der Prototyp ist durch `docs/archive/prototypes/README.md` korrekt als Designreferenz und Nicht-App-Code markiert.

## Klassifikation der Dokumente

| Datei | Klassifikation |
|---|---|
| `AGENTS.md` | teilweise veraltet |
| `DECISIONS.md` | teilweise veraltet |
| `docs/DESIGN.md` | deutlich teilweise veraltet / aktualisierungsbedürftig |
| `docs/ARCHITECTURE.md` | teilweise veraltet |
| `readme.md` | teilweise veraltet / zu allgemein |
| `docs/archive/CODEX-HANDOFF.md` | historisch archiviert |
| `docs/archive/prototypes/README.md` | aktuell |
| `docs/archive/prototypes/Roadtrip Atlas Redesign (standalone).html` | historische Designreferenz |
| `docs/handoffs/Roadtrip sprint29 handoff.md` | historisch / teilweise veraltet |

## Übernommene Designprinzipien

Als spätere UI-/Design-Inputs dokumentiert:

- Beziehungskarte / Projektlandkarte als späterer eigener Sprint.
- Momentum-Übersicht und Projektansicht als Meta-Tool.
- Sidebar mit Icons, Labels und klarer Hierarchie.
- Sprintzyklus mit vier Schritten und nächster Aktion in direkter Nähe.
- Klare Unterscheidung aktiver, abgeschlossener und ausgeblendeter Chat-/Sprintkontexte.
- Ruhiges Toast-Feedback für Copy-/Prompt-Aktionen.
- Ruhige Notes- und Settings-Ansichten mit klaren Gruppen.
- Sync als mögliche globale Aktion oben rechts prüfen.
- Feature-Datenbank optisch beruhigen, aber nicht vereinfachen.
- Lern-/Verarbeitungsübersicht statt einfacher Lernziel-Logik.

## Bewusst nicht übernommene Regeln

- Keine 1:1-Übernahme der alten Prototyp-Karte.
- Keine Relationship Map / kein Project Graph / kein Canvas Export in Sprint 39.
- Kein App-Shell-Umbau.
- Kein neues Nav-System.
- Keine Datenmodelländerung für visuellen Polish.
- Keine alte Lernziel-Logik als Ersatz für Roadtrip-spezifische Chat-/Handoff-Verarbeitung.
- Keine Feature-Datenbank-Vereinfachung nach Prototyp-Niveau.
- Kein globaler Sync-Button ohne separate UX-/Datenflussentscheidung.
- Keine Änderung an Sync-, Persistenz-, Gist-, ZIP-, Trello-, Tombstone-, Feature-, Chat- oder UI-Code-Pfaden.

## Empfohlene Phase-2-Dokumentationsupdates

1. `AGENTS.md`
   - Stand auf Sprint 39 aktualisieren.
   - Codex-Cloud-Workflow und Docs-only-Sprint-Regeln ergänzen.
   - Schutzliste um planned Feature Details, `featureFlow`, Mermaid Preview, Sprint-Dock und Hauptchat-Rückführung ergänzen.
2. `DECISIONS.md`
   - Sprints 31 bis 38 als aktuellen Entscheidungsstand nachtragen.
   - Mermaid Preview als read-only Preview-Pfad festhalten.
   - Relationship Map weiter als eigener späterer Sprint bestätigen.
3. `docs/DESIGN.md`
   - Atlas-Skin als Grundlage behalten, aber alte Etappenplan-Sprache relativieren.
   - UI-/Design-Inputs aus Sprint 39 einarbeiten.
   - Karten-, Settings- und Lern-Regeln an heutige Entscheidungen anpassen.
4. `docs/ARCHITECTURE.md`
   - Sprint-Dock, Arbeitsmodus, Hauptchat-Rückführung, planned Feature Details, `featureFlow` und Mermaid Preview ergänzen.
   - Geschützte Architekturpfade klarer dokumentieren.
5. `readme.md`
   - Aktuelle konkrete Roadtrip-Funktionen ergänzen.
   - Roadtrip 1.x als IndexedDB-first plus localStorage-Fallback, Sync/Backup und Prompt-/Sprint-OS beschreiben.
6. Optional: `docs/audits/2026-06-roadtrip-docs-change-report.md` für Phase 2 anlegen.

## Nächste mögliche Sprints

- Phase 2: gezielter Dokumentationspatch für Kern-Dokumente.
- Mermaid-Preview-Polish.
- UI-/Button-Audit mit Screenshots je Ansicht.
- Backlog-Hygiene für erledigte planned Features.
- Planned Feature Export / Migration Bundle.
- Hauptchat-Migration / Mainchat-Rollover.
- Feature Gap Scan / Soll-Ist-Matching.
- Projektbezogener CSV-Export für planned/implemented Features.
- Beziehungskarte / Projektlandkarte als separater Konzept-/Schema-Sprint.
- Chat-Status-Übersicht als Mini-Datenbank.
- Sync-UX / globaler Sync-Button prüfen.
- Notes-Import.
- ZIP-Import von GitHub-Repositories.
- Lern-/Verarbeitungsübersicht.

## Checks

Ausgeführt:

```bash
git status --short
```

Ergebnis vor dem Staging: drei neue Markdown-Dateien unter `docs/audits/` und `docs/handoffs/` wurden als ungetrackt angezeigt.

```bash
git diff --check
```

Ergebnis: ohne Fehler. Hinweis: Zu diesem Zeitpunkt waren die neuen Dateien noch ungetrackt; deshalb wurde zusätzlich nach dem Staging geprüft.

```bash
git diff --name-only
```

Ergebnis vor dem Staging: leer, weil neu angelegte Dateien noch ungetrackt waren. `git status --short` wurde als Liste der neuen Dateien genutzt.

```bash
git add docs/audits/2026-06-roadtrip-docs-design-contract-audit.md docs/audits/2026-06-roadtrip-ui-redesign-inputs.md docs/handoffs/sprint-39-docs-design-contract-audit-handoff.md
```

Ergebnis: die drei neuen Markdown-Dateien wurden gestaged.

```bash
git diff --cached --name-only
```

Ergebnis:

```text
docs/audits/2026-06-roadtrip-docs-design-contract-audit.md
docs/audits/2026-06-roadtrip-ui-redesign-inputs.md
docs/handoffs/sprint-39-docs-design-contract-audit-handoff.md
```

```bash
git diff --cached --check
```

Ergebnis: ohne Fehler.

```bash
git diff --cached --name-only -- index.html
```

Ergebnis: leer. `index.html` blieb unverändert.

```bash
git diff --cached --name-only -- docs/archive/prototypes
```

Ergebnis: leer. Prototyp-Dateien blieben unverändert.

```bash
find docs -maxdepth 3 -type d | sort
```

Ergebnis: `docs/audits/` und `docs/handoffs/` existieren.

Kein JS-Syntaxcheck ausgeführt, weil kein App-Code geändert wurde.

## Risiken / offene Fragen

- Phase 1 ändert bewusst keine Kern-Dokumente. Die gefundenen Widersprüche bleiben bis Phase 2 in den bestehenden Dokumenten bestehen.
- Die App wurde nur lesend per Suchprüfung und Dateiaudit geprüft, nicht im Browser visuell getestet.
- In der Codex-Umgebung ist nur der Branchname `work` sichtbar; Branch-/PR-Kontext sollte in der Codex UI geprüft werden.
- Es ist offen, ob alte Handoffs langfristig im selben `docs/handoffs/`-Ordner bleiben oder nach `docs/archive/handoffs/` wandern sollen.
- Es ist offen, ob künftige Contracts in bestehenden Kern-Dokumenten oder in einem neuen `docs/contracts/`-Bereich gepflegt werden sollen.

## Merge-Einschätzung

Mergefähig als Docs-only-Phase-1-Patch. Der Patch legt ausschließlich neue Markdown-Dokumente an und verändert weder `index.html` noch Prototyp-Dateien noch bestehende Kern-Dokumente.
