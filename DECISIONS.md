# DECISIONS.md — Roadtrip Atlas-Redesign

Bewusste Umsetzungsentscheidungen, die vom ursprünglichen Atlas-Entwurf
(DESIGN.md / ARCHITECTURE.md) abweichen. Bei Widerspruch gilt DIESE Datei.
DESIGN.md/ARCHITECTURE.md sind der Ausgangsentwurf; hier stehen die finalen
Entscheidungen aus der Umsetzung. Diese Punkte sind entschieden und werden
nicht erneut „korrigiert".

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
