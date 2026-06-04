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
- Projekt-Items zeigen Titel + 4 Cycle-Dots (Sprint-Zyklus-Fortschritt:
  Start / Sprint läuft / Abgeschlossen / Zyklus rund), abgeleitet aus
  getProjectChatStructure + S.chats. KEIN neues Datenfeld.
- „Alle Projekte" ist eine eigene abgesetzte Variante oben, ohne Zweitfarbe.
- Genau ein Akzent (Zinnober) in der Navigation; kein accent-2 als Nav-/Aktionsfarbe.

### OFFEN — zu entscheiden in Sprint 29: Hue-Pip vs. Cycle-Dots
Der Atlas-Prototyp zeigt pro Projektzeile zusätzlich einen dekorativen
Hue-`.pip` (Farbe aus `--hue-*`). `docs/DESIGN.md §5` erlaubt nur **genau ein
Sekundärsignal** pro Projekt-Item; die Cycle-Dots sind dieses eine Signal.
Damit kollidieren Prototyp (Pip + Dots = zwei Signale) und DESIGN.md/DECISIONS.md
(ein Signal). Optionen:
- **A** — Nur Cycle-Dots bleiben; Hue-Pip wird NICHT nachgezogen (regeltreu).
- **B** — Hue-Pip ERSETZT die Cycle-Dots (ein Signal, prototypnäher, dekorativ).
- **C** — Beide nebeneinander; überstimmt DESIGN.md §5 (prototypgetreu, regelwidrig).
Bis zur Entscheidung bleibt der main-Stand (nur Cycle-Dots) maßgeblich.
Hue-Pips dürfen vorher nicht von Codex umgesetzt werden.

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
