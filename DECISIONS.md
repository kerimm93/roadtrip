# DECISIONS.md — Roadtrip Entscheidungslog

Bewusste Produkt-, Workflow-, Architektur- und Designentscheidungen für Roadtrip.
**Bei Widerspruch gilt diese Datei vor `docs/DESIGN.md` und
`docs/ARCHITECTURE.md`; Implementierungsfakten müssen trotzdem am aktuellen
produktiven Code geprüft werden.**

Frühere Atlas-/UI-Entscheidungen bleiben gültige historische Designentscheidungen,
sofern sie nicht ausdrücklich durch neuere Verträge ersetzt wurden. Der Atlas-
Prototyp ist Inspirationsquelle, kein Soll-Stand.

## Gültigkeit / Präzedenz

Bei Widerspruch zwischen Quellen gilt diese Reihenfolge:

1. aktueller produktiver Code für Implementierungsfakten
2. expliziter aktueller Auftrag für fachlichen Scope, Realtestbefunde und neue Entscheidungen
3. `DECISIONS.md` (diese Datei)
4. aktuelle Audit-/Handoff-Dateien des Auftrags
5. `docs/DESIGN.md` und `docs/ARCHITECTURE.md`
6. historische Referenzen, Archivmaterial und Prototypen

---

## Aktuelle Analyse-/Cleanup-/Review-Entscheidungen seit 2026-07-18

### Getrennte Feature-Pools und Codeevidenz

- Planned und implemented Features bleiben getrennte Soll-/Ist-Pools.
- Codeevidenz führt nicht automatisch zu Promotion, Statuswechsel, Poolwechsel,
  Archivierung, Löschung oder Feature-Neuanlage.
- CSV-Transformationskontexte schützen bestehende Featurebeschreibungen; eine
  Modellantwort darf bestehende Beschreibungen nicht durch gekürzte oder unbelegte
  Fassungen ersetzen.
- Feature-IDs, Fall-IDs und Dedupe-Paar-IDs sind verbindliche lokale Bindungen.
  Modellantworten dürfen keine fremden IDs erfinden oder bestehende IDs doppelt
  beziehungsweise gar nicht binden.

### Modellantworten sind untrusted input

- Analyse- und Transformationsmodellantworten sind untrusted input.
- Prompts mit der Forderung „ausschließlich gültiges JSON“ sind keine technische
  Garantie gegen Escaping-, Struktur- oder Vertragsfehler.
- Lokale Parser, Validatoren, Normalisierung, Lossless-/Kürzungs-Guards und
  Snapshot-Prüfungen sind autoritativ.
- Ungültiges JSON und gültiges JSON mit leerem Ergebnis sind fachlich verschiedene
  Zustände und müssen in späterer Produktarbeit getrennt dargestellt werden.

### Versionierte Hauptchat- und Dedupe-Rückgaben

- Hauptchat-Rückgaben für Cleanup-Review nutzen den Vertrag
  `roadtrip-mainchat-decisions-v1`.
- Dedupe-Rückgaben nutzen den Vertrag `roadtrip-dedupe-decisions-v1`.
- Dedupe bleibt Preview-only. Es gibt keine Dedupe-Mutation: kein Merge, keine
  Archivierung, keine Löschung, keine Duplicate-Markierung, kein Statuswechsel,
  keine Pool-Promotion.
- Dedupe-Empfehlungen dürfen keine unbelegten neuen Zielbeschreibungen oder
  Folgefeatures als Fakten konstruieren.
- Fälle ohne `featureId` dürfen keine persistierbaren Featurefelder und keine
  fremde `canonicalFeatureId` einführen.

### Enger `update-existing`-Diff-/Confirm-/Commitpfad

- Nur lokal validierte Hauptchat-Entscheidungen vom Typ `update-existing` dürfen
  den bestehenden Diff-/Confirm-/Commitpfad betreten.
- Der aktuelle MVP erlaubt ausschließlich Änderungen an `title`, `description` und
  `category`.
- Status, Pool, Promotion, Create, Split, Merge, Archivierung und Löschung sind
  nicht Teil dieses Pfads.
- Auswahl startet leer; erst explizit ausgewählte Fälle erzeugen einen Batch-Diff.
- Commit benötigt Diff, menschliche Bestätigung, Driftprüfung und atomaren
  Gesamtbatch mit Rollback bei Fehlern.
- Status des Pfads: code-seitig implementiert und statisch geprüft; ein natürlicher
  Browser-Realnachweis für Commit, Driftprüfung, Hard-Reload-Persistenz und
  Batchatomarität steht noch aus.

### Realtestentscheidung vom 18.07.2026

- Der FIAE-RPG-Realbetrieb bestätigte Roadtrip für mutationsfreie Analyse, lokale
  Validierung und Preview **eingeschränkt freigegeben**.
- Bestätigt wurden u. a. vollständige eindeutige Bindung aller 65 CSV-Feature-IDs,
  Ablehnung ungültiger Modellantworten, Ablehnung fremder `canonicalFeatureId`,
  Schutz bestehender Featurebeschreibungen im CSV-Transformationskontext,
  mutationsfreier Dedupe und bytegleicher finaler Feature-CSV-Export.
- Nicht freigegeben ist der Ablauf als dauerhaft wiederaufnehmbarer,
  zeitsparender Cleanup-Arbeitsprozess.
- Nächste Produktpriorität ist die **Persistente Cleanup-Workbench & bestätigte
  Review-Entscheidungen**: Runs dauerhaft speichern, Baseline/Herkunft/Fallstatus/
  menschliche Entscheidung/nächste Aktion sichtbar machen, Reload-Wiederaufnahme
  ermöglichen, nicht-mutierende Entscheidungen dauerhaft abschließbar machen und
  validierte `update-existing`-Fälle nur an den bestehenden Commitpfad übergeben.
- Harte Nicht-Ziele der nächsten Workbench-Arbeit: kein automatischer Dedupe-Merge,
  keine Archivierung oder Löschung, keine automatische Status-/Pool-Promotion,
  keine Feature-Neuanlage aus Analysebefunden, kein unstrukturiertes Voll-Auditlog
  und kein paralleler neuer `update-existing`-Commitmechanismus.

---

## Feature-, Sprint- und Prompt-Contracts

### Planned Feature Editing und Detailfelder

- Planned Features können direkt in Roadtrip gepflegt und nachgeführt werden.
- Ziel ist eine belastbare Feature-Datenbank als Soll-/Ist-Arbeitsbasis, nicht nur
  eine lose Ideensammlung.
- Planned Features haben kontextreiche Detailfelder:
  - `purpose`
  - `workflowContext`
  - `acceptanceCriteria`
  - `sourceContext`
- Diese Felder sind Teil des aktuellen Feature-Workflow-Vertrags und werden in
  Sprintstart-, Hauptchat-, Codex-, Analyse-, Import- und Cleanup-Prompts genutzt.
- Änderungen an Prompt-Verträgen brauchen einen klaren Auftrag und Review.

### Hauptchat-Abgleich und Sprint-Dock

- Roadtrip unterstützt den Abgleich sparse geplanter Features mit Hauptchat- bzw.
  Kontextmaterial.
- Normaler Sprintstart und großer Hauptchat-Abgleich bleiben getrennte Werkzeuge.
- Sprintabschlüsse führen Kontext für den nächsten Sprint und den Hauptchat
  strukturiert zurück.
- Der Sprint-Zyklus ist als zentraler Arbeitsbereich konsolidiert; offene Schritte
  und nächste Aktionen müssen klar bleiben.
- Das Arbeitsmodus-Dropdown unterscheidet Codex-Steuerung und Direktmodus und ist
  Workflow-Steuerung, keine Datenmodelländerung.

### `featureFlow` und Mermaid Preview

- Planned Features können optional ein Feld `featureFlow` enthalten.
- `featureFlow` ist Textquelle für Mermaid-/Feature-Flow-Notizen.
- Das Feld ist optional; leere Werte erzeugen keine UI- oder Importpflicht.
- Für befülltes `featureFlow` kann eine optionale Mermaid-/Feature-Flow-Preview
  angezeigt werden.
- Die Preview ist rein visuell und defensiv; sie verändert den gespeicherten Text
  nicht. Renderfehler werden sichtbar gemacht und dürfen Daten nicht destruktiv
  verändern.

---

## Historische Atlas-/UI-Designentscheidungen

Diese Entscheidungen stammen aus der früheren Atlas-/Polish-Phase. Sie bleiben als
Designcontract relevant, sind aber kein Auftrag zum 1:1-Nachbau des Prototyps.

### Karten-Übersicht (Overview)

- Die Overview-View ist eine ruhige Listendarstellung der Projekte als Cards, nicht
  das im Entwurf gezeigte verstreute Knoten-/Karten-Layout.
- Begründung: Bei vielen Projekten ist das verstreute Layout unübersichtlich;
  bedeutungslose Positionen tragen keine Information.
- Der ungenutzte Knoten-/Karten-Code bleibt Grundlage für einen späteren
  Karten-Sprint: nicht entfernen, aber auch nicht reaktivieren.

### Sidebar und Projekt-Pips

- Projekt-Items zeigen Hue-Pip als dekoratives Identitätssignal plus Cycle-Dots als
  Sprint-Zyklus-Zustandssignal.
- Der Hue-Pip ist per CSS-/ID-Hashing abgeleitet, kein persistentes Projektfarben-
  Feld und keine Schema-Änderung.
- Die Cycle-Dots bleiben informationstragendes Zustandssignal.
- „Alle Projekte“ ist eine eigene abgesetzte Variante oben, ohne Zweitfarbe.
- Genau ein Aktionsakzent in der Navigation; kein `accent-2` als Nav-/Aktionsfarbe.

### Navigation und Vokabular

- Navigation ist in Reise, Werkstatt und Werkzeuge gegliedert; View-Keys/Handler
  wurden nicht narrativ umbenannt.
- Funktions-Vokabular bleibt funktional-präzise: Projekt, Feature, Sprint,
  Hauptchat, Handoff.
- Die Landkarten-Metapher ist rein visuell/atmosphärisch, nicht im Datenmodell.

### Geparkte UI-/Architektur-Ideen

- „Roadtrip Beziehungskarte“ bleibt eigener späterer Sprint mit Schema-/Contract-
  Entscheidung.
- Kein automatischer App-Shell-Umbau auf Prototyp-/Atlas-Grid.
- Mobile Sidebar bleibt Off-Canvas, solange kein eigener UI-Sprint etwas anderes
  entscheidet.
- Eigenes Modal-System bleibt bestehen.
- `.kindgrid`, Paper-Grain und ähnliche Prototypdetails werden nicht automatisch
  nachgezogen.

---

## Sync-, Backup- und Import-Schutzbereiche

- Settings-Gruppe „Verbindung & Sync“ ist von destruktiven Danger-Zone-Aktionen
  getrennt.
- Gist-ID, Gist-Token, Raw-Gist-ID und Raw-Gist-Token sind Konfigurations- und
  Sicherheitsbereiche.
- Sync, Gist-Verschlüsselung, ZIP-Backup, JSON Export/Import, Tombstones,
  Trello-Sync und Raw-/Recovery-Pfade bleiben geschützte Verträge.
- Historische Sync-Safety-Audits bleiben Referenz für spätere Sync-Sprints, sind
  aber seit dem Realtest vom 18.07.2026 nicht die unmittelbare Produktpriorität.

---

## Roadmap-/Workflow-Entscheidungen

### Sprintabschluss-Codeanalyse-Bedarf

Roadtrip soll nicht reflexhaft nach jedem Sprint eine Voll-Codeanalyse empfehlen.
Der Bedarf soll nach Art der Änderung eingeschätzt werden:

- Docs-only: Docs-Review + Diff-Checks.
- Kleiner UI-/Hotfix: Smoke-Test + JS-Syntaxcheck + Changed-Files-Review.
- Große Datenmodell-/Sync-/Import-/Export-/Promptvertrag-Änderung: Voll-Codeanalyse
  sinnvoll.

### Spätere, nicht implementierte Richtungen

- Sprint-Handoffs optional auf wiederverwendbare SOPs prüfen.
- Open Questions Workspace für Fragen aus Projekten, Features, Handoffs und
  Backfills.
- Selektives Feature-Merge für übersprungene Import-Kandidaten mit Feldvergleich
  und Review-Aktionen.
- Relationship Map / Project Graph.
- Weitergehende Sync-Safety-Härtung in eigenen engen Sprints.
