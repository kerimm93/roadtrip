# DECISIONS.md — Roadtrip Atlas-Redesign

Bewusste Umsetzungsentscheidungen, die vom ursprünglichen Atlas-Entwurf
(`docs/DESIGN.md` / `docs/ARCHITECTURE.md`) abweichen. **Bei Widerspruch gilt
DIESE Datei.** DESIGN.md/ARCHITECTURE.md sind der Ausgangsentwurf; hier stehen
die finalen Entscheidungen aus der Umsetzung. Diese Punkte sind entschieden und
werden nicht erneut „korrigiert".

## Gültigkeit / Präzedenz

Bei Widerspruch zwischen Quellen gilt diese Reihenfolge:

1. aktueller `main`-Code
2. `DECISIONS.md` (diese Datei)
3. Sprint-Delta-Analyse (sofern beigelegt)
4. `docs/DESIGN.md`
5. `docs/ARCHITECTURE.md`
6. Atlas-Prototyp (`Roadtrip Atlas Redesign (standalone).html`)

Der Prototyp ist Inspirationsquelle, kein Soll-Stand.

## Karten-Übersicht (Overview)
- Die Overview-View ist eine ruhige LISTENDARSTELLUNG der Projekte als Cards,
  NICHT das im Entwurf gezeigte verstreute Knoten-/Karten-Layout.
- Begründung: Bei vielen Projekten (>12) ist das verstreute Layout unübersichtlich;
  bedeutungslose Positionen (aus Projekt-ID abgeleitet) tragen keine Information.
- Der Knoten-/Karten-Code (overview-node, --node-x/y, getOverviewNodePosition)
  bleibt ungenutzt im Code (useListFallback=true) als Grundlage für den späteren
  Karten-Sprint. NICHT entfernen, aber auch nicht reaktivieren.

## Sidebar
- Projekt-Items zeigen Hue-Pip (Identität, links) + Titel + 4 Cycle-Dots
  (Sprint-Zyklus-Fortschritt: Start / Sprint läuft / Abgeschlossen / Zyklus rund,
  rechts), abgeleitet aus getProjectChatStructure + S.chats. KEIN neues Datenfeld
  (siehe Entscheidung unten zum Hue-Pip).
- „Alle Projekte" ist eine eigene abgesetzte Variante oben, ohne Zweitfarbe.
- Genau ein Akzent (Zinnober) in der Navigation; kein accent-2 als Nav-/Aktionsfarbe.

### Entschieden (Sprint 29): Hue-Pip UND Cycle-Dots nebeneinander
Pro Projektzeile gilt:
- **Hue-`.pip`** (links): dekoratives **Identitätssignal**, Farbe aus `--hue-*`,
  abgeleitet per **CSS-Hashing aus der Projekt-ID**. KEIN Schema-Touch, keine
  persistente Projektfarbe. Rolle laut `docs/DESIGN.md §2` („für Projekt-Pips").
- **4 Cycle-Dots** (rechts): informationstragendes **Zustandssignal**
  (Sprint-Zyklus-Fortschritt), unverändert.

Dies steht NICHT im Widerspruch zu `docs/DESIGN.md §5`. §5 verbietet ein zweites
*Zustands*-Sekundärsignal (Feature-Count, Timestamp, Sprint-Count neben den
Cycle-Dots). Der Pip trägt keine Zustandsinformation, sondern Identität/Kategorie,
und zählt daher nicht als zweites Zustandssignal. Identität (Pip) und Zustand
(Dots) sind zwei verschiedene Bedeutungsachsen.

Deckt sich mit der Sprint-27-Delta-Analyse (Etappe 19, Abschnitt 6.5 + 11):
Pip als Kategorie-Signal, Farbe via ID-Hashing, kein Schema-Eingriff.

## Navigation
- Nav ist in drei Gruppen gegliedert: Reise (Karte, Project, Momentum) ·
  Werkstatt (Database, Notes, Learning) · Werkzeuge (Import, Settings).
- View-Keys/Handler wurden NICHT umbenannt, nur visuell gruppiert.

## Geparkt: „Roadtrip Beziehungskarte" (eigener Sprint NACH dem Redesign)
- Projekte als Inseln (Größe = Anzahl Sprints).
- Verbindungen zwischen Projekten als Relationen, eingespeist über das
  Handoff-JSON (neues optionales Feld + Vertragserweiterung mit
  Migrationssicherheit).
- Graph-Darstellung mit Hover-Popups, die die Verbindung erklären.
- Erfordert eine SCHEMA-Änderung → gehört NICHT in den Skin-Refactor-Branch,
  sondern in einen eigenen Sprint mit eigenem Plan.

## Vokabular / Datenmodell
- Funktions-Vokabular bleibt funktional-präzise (Projekt, Feature, Sprint,
  Hauptchat, Handoff). Keine narrative Umbenennung.
- Die Landkarten-Metapher ist rein visuell/atmosphärisch, NICHT im Datenmodell.

## Stand Sprint 28
- Atlas-Redesign in `main` gemerged (Merge-Commit 5141fc3).
- Settings-Gruppe „Verbindung & Sync" umgesetzt; gistId, gistToken, rawGistId
  und rawGistToken liegen NICHT mehr in der Danger-Zone.
- Danger-Zone auf riskante/destruktive Aktionen beschränkt.
- `.eyebrow` und `.section-label` existieren im CSS und werden im Template genutzt
  (Etappe 17 verifiziert/erledigt, kein eigener Codex-Patch nötig).

## Stand Sprint 29 (Atlas-Polish)
- Branch `sprint-29-atlas-polish` (Basis main @ 5141fc3).
- Etappe 29.1 — Sidebar-Brand-Block gemerged (`f24a9f1`): `.sb-brand` mit
  Inline-SVG-Mark, Serif-Wortmarke, Mono-Kicker „Dev OS". `.sidebar-title` entfernt.
- Etappe 29.2 — Projekt-Identitäts-Pips gemerged (`60ac2e9`): 8px-Pip pro Projekt,
  Farbe stabil via `getOverviewProjectHue(getStableProjectSortValue(p))`
  (bestehende Helfer, kein neues Feld). Cycle-Dots unverändert.
- E-Ink-Pips: bewusst farbig gelassen. Das E-Ink-Theme überschreibt `--hue-*`
  nicht; Pips sind dekorativ/winzig, kein Verstoß gegen §E-Ink (gefüllte
  Aktions-Akzente). Optionaler Einzeiler später: `--hue-*`/`--pip` im E-Ink-Block
  auf Graustufe mappen.

## Geparkt: Statischer Inline-Style-Cleanup (Sprint 30)
- In Sprint 29 analysiert, bewusst NICHT umgesetzt.
- Befund: ~130 statische Inline-`style`-Vorkommen, reduzierbar auf wenige Muster
  (`margin-bottom:8px/12px/10px/6px`, `font-weight:700`, `gap:4px/6px`,
  `cursor:pointer`, `width:16px;height:16px`, `flex:1`).
- WARUM verschoben: P2-Hygiene ohne sichtbaren/funktionalen Mangel UND erhöhtes
  Risiko — viele statische `style`-Attribute sitzen INNERHALB dynamischer
  `${…}`-Template-Literale (z. B. renderImportWorkspace ~Z. 4782). Globaler
  Find-Replace ist daher unsicher (Template-Strings könnten beschädigt werden).
- Empfehlung Sprint 30: zwei Klassen — (A) Vorkommen in reinem statischem Markup
  zuerst (sicher), (B) Vorkommen in Template-Literalen einzeln und vorsichtig.
- TABU (dynamisch, niemals anfassen): `--node-x/y`, `--node-color`, `--pip`,
  `--hue-*`, `opacity`-States, Positions-/`transform`-Werte. Fragile Modal-Container
  mit `var(--shadow)` auslassen.

---

## Stand Sprint 31–39 — aktuelle Roadtrip-Contracts

Diese Entscheidungen ergänzen die Atlas-/Sprint-29-Entscheidungen und beschreiben
den heutigen Roadtrip-Stand. Sie sind Dokumentations- und Workflow-Contracts; sie
implementieren keine neuen App-Features.

### Sprint 31 — Planned Feature Editing MVP

- Planned Features können direkt in Roadtrip gepflegt und nachgeführt werden.
- Ziel ist eine belastbare Feature-Datenbank als Soll-/Ist-Arbeitsbasis, nicht nur
  eine lose Ideensammlung.
- Das Projekt-Schema bleibt geschützt; Änderungen am Datenmodell brauchen einen
  eigenen Sprintvertrag.

### Sprint 32 — Planned Feature Detail & Brainstorm MVP

- Planned Features haben kontextreiche Detailfelder:
  - `purpose`
  - `workflowContext`
  - `acceptanceCriteria`
  - `sourceContext`
- Diese Felder sind Teil des aktuellen Feature-Workflow-Vertrags.
- UI-seitig sollen die Details beherrschbar bleiben; nicht jede Detailtiefe muss
  dauerhaft sichtbar sein.

### Sprint 33 — Planned Feature Backfill / Hauptchat-Abgleich MVP

- Roadtrip unterstützt den Abgleich sparse geplanter Features mit Hauptchat- bzw.
  Kontextmaterial.
- Zweck: bessere Detailfelder und sauberere Feature-Absichten, ohne den normalen
  Sprintstart zu einem Vollabgleich umzubauen.
- Normaler Sprintstart und großer Hauptchat-Abgleich bleiben getrennte Werkzeuge.

### Sprint 34 — Detailfelder in Prompt-Workflows

- Planned-Feature-Details werden in Sprintstart-, Hauptchat-, Codex- sowie
  Analyse-/Import-/Cleanup-Prompts genutzt.
- Prompt-Verträge sind Schutzbereiche: Änderungen daran brauchen einen klaren
  Auftrag und Review.

### Sprint 35 — Next-Sprint-/Hauptchat-Handoff

- Sprintabschlüsse sollen Kontext für den nächsten Sprint und den Hauptchat
  strukturiert zurückführen.
- Handoff-Dokumente sollen Branch, Dateien, Checks, Risiken und Mergefähigkeit
  enthalten.

### Sprint 36 — Sprint-Dock / Sprint-Zyklus konsolidiert

- Der Sprint-Zyklus ist als zentraler Arbeitsbereich konsolidiert.
- Der Ablauf bleibt ein klarer Prozess mit offenen Schritten und direkt erreichbarer
  nächster Aktion.
- Rückführungs- und Handoff-Logik bleiben geschützte Verträge.

### Sprint 36.1 — Arbeitsmodus-Dropdown

- Das Arbeitsmodus-Dropdown unterscheidet Codex-Steuerung und Direktmodus.
- Es sitzt oben im Sprint-Dock und dient der Workflow-Steuerung, nicht einer
  Datenmodelländerung.

### Sprint 37 — `featureFlow`

- Planned Features können optional ein Feld `featureFlow` enthalten.
- `featureFlow` ist Textquelle für Mermaid-/Feature-Flow-Notizen.
- Das Feld ist optional; leere Werte sollen keine UI- oder Importpflicht erzeugen.

### Sprint 38 — Mermaid-/Feature-Flow-Preview

- Für befülltes `featureFlow` kann eine optionale Mermaid-/Feature-Flow-Preview
  angezeigt werden.
- Die Preview ist rein visuell und defensiv.
- Die Preview verändert den gespeicherten `featureFlow`-Text nicht.
- Renderfehler werden sichtbar gemacht, dürfen aber gespeicherte Daten nicht
  destruktiv verändern.

### Sprint 39 Phase 1 — Docs-/Design-Contract-Audit

- Sprint 39 Phase 1 war ein Docs-only-Audit.
- Ergebnis: `AGENTS.md`, `DECISIONS.md`, `docs/DESIGN.md`,
  `docs/ARCHITECTURE.md` und `readme.md` waren teilweise veraltet und sollten
  gezielt aktualisiert werden.
- Bestehende Kern-Dokumente, `index.html` und Prototyp-Dateien blieben in Phase 1
  unverändert.

### Sprint 39 Phase 2 — Kern-Dokumente aktualisiert

- Kern-Dokumente werden gezielt auf den Stand nach Sprint 31–39 gebracht.
- Dieser Sprint ist Docs-only: kein App-Code, kein `index.html`, keine neuen
  App-Features.
- Codex-Internet bleibt für diesen Sprint aus.

---

## Aktuelle Roadmap-/Workflow-Entscheidungen

### Prototyp-Status

- Der alte Roadtrip-/Atlas-Prototyp ist Designreferenz, kein 1:1-Bauplan.
- Prototyp-Ideen dürfen als Richtung genutzt werden, aber nicht gegen aktuellen
  Code, `DECISIONS.md` oder Schutzbereiche durchgesetzt werden.

### Sprintabschluss-Codeanalyse-Bedarf

Roadtrip soll künftig nicht reflexhaft nach jedem Sprint eine Voll-Codeanalyse
empfehlen. Stattdessen soll der Bedarf eingeschätzt werden:

- Docs-only: Docs-Review + Diff-Checks.
- Kleiner UI-/Hotfix: Smoke-Test + JS-Syntaxcheck + Changed-Files-Review.
- Große Datenmodell-/Sync-/Import-/Export-/Promptvertrag-Änderung: Voll-Codeanalyse
  sinnvoll.

### Sprint-Handoff SOP-Extraktion

- Sprint-Handoffs sollen später optional darauf geprüft werden, ob daraus eine
  wiederverwendbare Arbeitsweise als SOP entstehen sollte.
- Beispiele: Codex-Materialpaket vorbereiten, Docs-/Design-Contract-Audit
  orchestrieren, Kern-Dokumente pflegen, Sprintchat → Codex → Review → Handoff
  sauber führen.
- Diese SOP-Prüfung ist Roadmap, noch keine implementierte App-Funktion.

### Sprintstart und Hauptchat-Abgleich

- Normaler Sprintstart und großer Hauptchat-Abgleich bleiben getrennte Werkzeuge.
- Spätere Richtung: Beim normalen Sprintstart kann eine kleine
  Hauptchat→Feature-Database-Mitnahme entstehen.
- Mögliche Mitnahme: neue planned Features, aktualisierte Detailfelder, offene
  Fragen, kleine Kontextfetzen.
- Der große Hauptchat-Abgleich bleibt separates Werkzeug für umfassende Reviews.

### Open Questions Workspace

- Offene Fragen sollen später aus Projekten, Features, Sprint-Handoffs und
  Backfills gesammelt werden können.
- Gewünschte Richtung: Übersicht mit Bezug/Tags/Filter, Brainstorm-Prompt für
  ausgewählte Fragen, JSON-Handoff mit Antworten, Speicherung der Antworten bei
  Fragen und optionale Markierung betroffener Features als refine-needed.
- Dies ist Roadmap, keine bestehende Architektur.

### Selektives Feature-Merge für übersprungene Import-Kandidaten

- Problem: `proposedFeatures` können beim Import wegen möglicher Dubletten
  übersprungen werden; dabei können bessere neue Detailfelder verloren gehen.
- Spätere Richtung: Import-Zusammenfassung unterscheidet neu angelegt,
  aktualisiert, übersprungen wegen möglicher Dublette und Fehler.
- Für übersprungene Kandidaten soll später eine Review-Liste möglich werden:
  bestehendes Feature vs. Import-Kandidat vergleichen; Aktionen wie ignorieren,
  später prüfen, leere Felder ergänzen, einzelne Felder übernehmen, als neues
  Feature anlegen oder mit bestehendem Feature mergen.
- Dies ist Roadmap und ändert aktuell keinen Import-/Export-Vertrag.
