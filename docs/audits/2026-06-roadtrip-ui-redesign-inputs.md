# Roadtrip UI-/Design-Inputs · Juni 2026

## Zweck

Dieses Dokument sammelt UI-/Designrichtungen aus dem Atlas-/Roadtrip-Prototyp, aus Sprint-39-Nutzerkontext und aus dem Dokumenten-Audit. Es dient als Referenz für spätere UI- und Design-Sprints, damit künftige Arbeiten nicht wieder alte Prototyp-Annahmen mit produktivem Roadtrip-App-Code verwechseln.

## Status

Diese Datei ist eine Referenz für spätere UI-Sprints. Sie ist kein 1:1-Umsetzungsauftrag.

Gültige Roadtrip-App bleibt `index.html`. Der Prototyp unter `docs/archive/prototypes/` ist keine produktive Codequelle und darf nicht automatisch in App-Code übertragen werden.

## Prototyp-Prinzipien

### Beziehungskarte / Projektlandkarte

Gewünschte Richtung:

- ruhiger, heller Kartenhintergrund,
- dezentes Raster,
- Projekt-/App-Knoten als kleine Karten,
- Verbindungslinien zwischen Knoten,
- eleganter Graph-/Landkartencharakter.

Roadtrip-Transfer:

- Eine spätere Roadtrip-Karte soll eine Beziehungskarte / Projektlandkarte werden.
- Sie soll Roadtrip-Projekte, Abhängigkeiten, Handoff-Beziehungen oder thematische Nähe sichtbar machen.
- Sie darf nicht die alte Prototyp-Karte kopieren und darf keine bedeutungslosen Positionen aus IDs ableiten.
- Dieser Bereich ist vermutlich ein eigener Sprint mit Daten-/Vertragsentscheidung.

Nicht automatisch umsetzen:

- keine Relationship Map in Sprint 39,
- kein Project Graph,
- kein Canvas Export,
- keine Schema-Erweiterung ohne neue Entscheidung.

### Momentum-Übersicht / Meta-Dashboard

Gewünschte Richtung:

- kompakter Überblick über aktive Projekte,
- Fokus und nächster Schritt sichtbar,
- Status wie aktiv, pausiert, Idee,
- Übersicht darüber, was sich gerade bewegt,
- gute Grundlage für Projekt-Momentum und nächste Sprints.

Roadtrip-Transfer:

- Die Projekt- und Momentum-Ansicht soll stärker als Meta-Tool funktionieren.
- Der Nutzer soll schnell erkennen können, welches Projekt als Nächstes Aufmerksamkeit braucht.
- Momentum ist nicht nur Statistik, sondern Entscheidungsunterstützung für den nächsten Sprint.

### Sidebar / Navigation mit Icons

Gewünschte Richtung:

- Navigation mit Icon + Label + klarer Hierarchie,
- Icons geben Orientierung,
- Status-Bubbles/Pills unterstützen, ersetzen aber nicht die Hauptnavigation,
- visuelle Gruppierung bleibt ruhig und funktional.

Roadtrip-Transfer:

- Sidebar darf weiter Orientierung und Status andeuten.
- Projekt-Identität und Projektzustand müssen getrennte Bedeutungsachsen bleiben.
- Bestehende IDs, Handler und View-Keys dürfen nicht für reine Optik geändert werden.

Nicht automatisch umsetzen:

- kein neues Nav-System,
- kein App-Shell-Umbau,
- keine Reaktivierung einer alten Prototyp-Shell.

### Sprintzyklus

Gewünschte Richtung:

1. Start,
2. Importieren,
3. Abschluss,
4. Übergabe.

Weitere UX-Richtung:

- Der Button für den nächsten Schritt soll direkt unter oder in der Nähe des aktuell offenen Schritts liegen.
- Nutzer sollen nicht scrollen müssen, um die nächste Sprintaktion zu finden.
- Rückführungs-/Hauptchat-Prompt nach Sprintabschluss bleibt prominent erreichbar.
- Arbeitsmodus / Codex-Steuerung vs. Direktmodus gehört in den Sprint-Dock-Kontext.

Roadtrip-Transfer:

- Sprint-Dock und Sprintzyklus sollten langfristig visuell klar zusammengeführt werden.
- Die bestehenden Sprintstart-/Import-/Abschluss-/Handoff-Verträge bleiben geschützt.

### Projektansicht als Meta-Tool

Gewünschte Richtung:

- Status, Fokus und nächster Schritt prominent,
- Projekt-Momentum sichtbar,
- aktuelle Chat-/Sprintlage verständlich,
- Ansicht wirkt wie Steuerungswerkzeug, nicht nur wie Datenanzeige.

Roadtrip-Transfer:

- Roadtrip soll den Meta-Tool-Charakter behalten und ausbauen.
- Gute Projektansicht beantwortet: Was ist dieses Projekt, wo steht es, was passiert als Nächstes, welcher Chat/Sprint ist relevant?

### Chat- und Sprintkontexte

Gewünschte Richtung:

- aktive Chats klar sichtbar,
- abgeschlossene oder ausgeblendete Chats verblassen,
- Hauptchat und Sprintchats visuell unterscheidbar,
- Legacy-/Sprintchat-Struktur später besser aufräumen.

Roadtrip-Transfer:

- Unterstützt spätere Arbeit an Chat-Status-Übersicht, Hauptchat-Migration, Mainchat-Rollover und Legacy-/Sprintchat-Struktur.
- Eine spätere Mini-Datenbank für Chat-Status kann sinnvoll sein.

### Toast-Feedback

Gewünschte Richtung:

- Copy-/Prompt-Aktionen nutzen bevorzugt ruhige Toasts, wenn keine weitere Nutzeraktion nötig ist.
- Nicht bei jedem Klick sollen große UI-Felder aufklappen.
- Fehler, Warnungen oder notwendige Folgeaktionen dürfen weiterhin sichtbarere UI-Zustände verwenden.

Roadtrip-Transfer:

- Besonders relevant für Prompt-Copy, Mermaid-Code-Copy, Export-/Sync-Bestätigungen und kleine Hilfsaktionen.
- Toasts dürfen keine wichtigen import-/sync-relevanten Entscheidungen verstecken.

### Notizenansicht

Gewünschte Richtung:

- ruhige Karten,
- klare Filter,
- wenig visuelles Rauschen,
- großzügige Abstände.

Roadtrip-Transfer:

- Die echte Notes-Ansicht ist komplexer als der Prototyp.
- Sie soll trotzdem die ruhige Formensprache behalten: klare Filter, gute Lesbarkeit, keine unnötige Dichte.
- Notes-Workspace-Datenmodell bleibt geschützt.

### Settings

Gewünschte Richtung:

- klare Gruppen,
- ruhiger Aufbau,
- logisch getrennte Aktionen,
- Settings wirken nicht überladen.

Roadtrip-Transfer:

Settings sollten sauber gruppiert bleiben:

- Darstellung,
- Sync/Gist,
- Trello,
- Datenverwaltung,
- Advanced/Notfall.

Wichtig:

- Danger-/Notfall-Bereiche sind für riskante oder destruktive Aktionen reserviert.
- Sync-/Gist-Einstellungen dürfen nicht automatisch wieder in eine alte Danger-Zone verschoben werden.

### Sync als globale Aktion

Gewünschte Richtung:

- Sync als globale Aktion oben rechts sichtbar machen oder prüfen.
- Aktueller Status, letzter Push/Pull oder Fehler könnten in ruhiger Form sichtbar sein.

Roadtrip-Transfer:

- Als UX-Prüfspur für spätere Sprints dokumentieren.
- Vor Umsetzung muss entschieden werden, ob globaler Sync-Button nur Shortcut ist oder neue Sync-Statuslogik braucht.

Nicht automatisch umsetzen:

- kein globaler Sync-Button in Sprint 39,
- keine Änderung am Gist-Sync-Algorithmus,
- keine Änderung an Verschlüsselung oder Tokenhandling.

### Feature-Datenbank

Gewünschte Richtung:

- optisch ruhiger und klarer,
- bestehende Roadtrip-Komplexität nicht wegvereinfachen,
- planned/implemented-Denken erhalten,
- planned Feature Details und `featureFlow` respektieren,
- Prototyp nicht 1:1 kopieren.

Roadtrip-Transfer:

- Feature-Datenbank soll Soll-/Ist-Vergleich, Backlog-Hygiene, planned Feature Details, Backfill und spätere Exporte unterstützen.
- Eine UI-Beruhigung darf keine Detailfelder, Promptpfade oder Statuslogik entfernen.

### Lern-/Verarbeitungsübersicht

Gewünschte Richtung:

Roadtrip braucht eher eine Verarbeitungsübersicht als simple Lernziele:

- welche Chats verarbeitet wurden,
- welche Chats noch Lernmaterial erzeugen müssen,
- Themenverteilung,
- mögliche Lern-/Projektimpulse,
- spätere Zuordnung von Handoffs zu Lernpfaden,
- Lernmaterial-Backlog.

Nicht primär:

- einfache Lernziele wie im alten Prototyp,
- isolierte Progressbars ohne Bezug zu Chats, Handoffs und Projekten.

## Was nicht automatisch übernommen werden darf

- Alte Prototyp-App-Struktur.
- Alte Datenmodelle.
- Alte Feature-Datenbank-Vereinfachungen.
- Alte Lernziel-Logik als Ersatz für Roadtrip-Verarbeitung.
- Komplette App-Shell oder neues Grid-System.
- Produktiver HTML-/CSS-/JS-Code aus dem Prototyp.
- Direkte 1:1-UI-Kopie.
- Relationship Map ohne eigenen Sprint und Vertragsentscheidung.
- Globaler Sync-Button ohne UX-/Datenflussentscheidung.
- Narrative Umbenennung von Projekt, Feature, Sprint, Hauptchat oder Handoff.

## Mögliche spätere UI-Sprints

- Mermaid-Preview-Polish: Status, Fehlerzustand, Copy-Feedback, Lesbarkeit.
- UI-/Button-Audit mit Screenshots je Ansicht.
- Sprint-Dock-Polish: nächster Schritt direkt sichtbar, 4-Schritt-Zyklus klarer, Arbeitsmodus gut platziert.
- Projektansicht als Meta-Tool: Status/Fokus/Next Step/Momentum prominenter und ruhiger.
- Feature-Datenbank-Polish: ruhigere Detaildarstellung ohne Verlust der Roadtrip-Komplexität.
- Backlog-Hygiene-UI für erledigte planned Features.
- Planned Feature Export / Migration Bundle.
- Hauptchat-Migration / Mainchat-Rollover-UX.
- Feature Gap Scan / Soll-Ist-Matching-Ansicht.
- Projektbezogener CSV-Export für planned/implemented Features.
- Beziehungskarte / Projektlandkarte als eigener Konzept- und ggf. Schema-Sprint.
- Chat-Status-Übersicht als Mini-Datenbank.
- Chat-/Legacy-/Hauptchat-Struktur aufräumen.
- Sync-UX / globaler Sync-Button prüfen.
- Notes-Import und ruhigere Notes-Import-UX.
- ZIP-Import von GitHub-Repositories.
- Lern-/Verarbeitungsübersicht: Chat-Verarbeitung, Themenverteilung, Lernmaterial-Backlog.
