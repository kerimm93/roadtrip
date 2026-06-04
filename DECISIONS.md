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
