# Roadtrip Docs-/Design-Contract-Audit · Juni 2026

## Kurzfazit

Phase 1 wurde als reiner Docs-Audit durchgeführt. Bestehende Kern-Dokumente wurden gelesen, aber nicht verändert. Der aktuelle Repository-Stand enthält nur wenige Dokumente; die meisten stammen aus dem Atlas-/Sprint-25-bis-29-Kontext. Sie sind als historische Design- und Agentenbasis weiterhin wertvoll, bilden aber den heutigen Roadtrip-Stand nach Sprint 31 bis 38 nicht vollständig ab.

Wichtigste Befunde:

- `index.html` ist weiterhin die gültige produktive Roadtrip-App.
- `docs/archive/prototypes/` enthält einen alten Prototyp und ist korrekt als Designreferenz abgegrenzt.
- `AGENTS.md` und `DECISIONS.md` enthalten robuste Schutzlisten, sind aber auf Sprint 29 datiert und sollten um die Sprints 31 bis 38 ergänzt werden.
- `docs/DESIGN.md` und `docs/ARCHITECTURE.md` sind stark Atlas-/Sprint-25-geprägt. Sie enthalten gute Gestaltungsprinzipien, aber auch überholte oder zu absolute Aussagen wie echte Kartenübersicht, Lernpfade als eigener Designzustand und alte Settings-/Sprintzyklus-Annahmen.
- `readme.md` ist als Produktbeschreibung brauchbar, aber für den heutigen Stand zu allgemein und erwähnt wichtige konkrete Funktionen wie planned Feature Details, `featureFlow`, Mermaid Preview, Backfill/Hauptchat-Abgleich, ZIP-Backup und Tombstone-Schutz nicht ausreichend.
- Phase 2 sollte gezielt bestehende Dokumente aktualisieren, nicht neu schreiben.

## Geprüfte Dateien

| Datei | Status | Bewertung | Empfohlene Aktion |
|---|---|---|---|
| `AGENTS.md` | Teilweise veraltet | Gute Schutzliste und Arbeitsweise, aber Stand Sprint 29; Pfad-/Workflow-Text ist teils zu lokal/terminalorientiert für Codex Cloud; heutige Features wie planned Feature Details, `featureFlow`, Mermaid Preview und Hauptchat-Rückführung fehlen. | In Phase 2 aktualisieren; Schutzliste erhalten und um aktuelle No-Touch-Bereiche ergänzen. |
| `DECISIONS.md` | Teilweise veraltet | Hat klare Präzedenz und dokumentiert Atlas-/Sprint-29-Entscheidungen; fehlt Stand Sprint 31 bis 38; enthält weiterhin sinnvolle Entscheidungen zur Relationship Map und Vokabulargrenze. | In Phase 2 um Entscheidungen seit Sprint 31 ergänzen; alte Atlas-Entscheidungen beibehalten, aber als Design-Contract statt laufender Auftrag einordnen. |
| `docs/DESIGN.md` | Deutlich teilweise veraltet | Sehr detailliertes Atlas-Designsystem; gute Token-, Akzent-, Button-, Progressive-Disclosure-Regeln; einige Soll-Formulierungen sind aus heutiger Sicht zu absolut oder nicht mehr erfüllt. | In Phase 2 aktualisieren/relativieren; Prototyp-Prinzipien als Referenz aufnehmen; keine 1:1-Atlas-Pflicht. |
| `docs/ARCHITECTURE.md` | Teilweise veraltet | Mermaid-IA von Sprint 25; nützlich für Navigationsprinzipien und 4-Schritt-Sprintzyklus, aber nicht vollständig für Sprint-Dock, Arbeitsmodus, Hauptchat-Rückführung, planned Feature Detailfelder, `featureFlow` und Mermaid Preview. | In Phase 2 ergänzen; technische und Datenmodell-Grenzen klarer dokumentieren. |
| `readme.md` | Teilweise veraltet / zu allgemein | Produktvision und Architekturgrundrichtung passen; konkrete aktuelle Roadtrip-Fähigkeiten fehlen oder bleiben generisch. | In Phase 2 aktualisieren: Roadtrip 1.x-Funktionsliste, Persistenz, Sync/Backup, planned Feature Details, Sprint-/Handoff-Loop, `featureFlow`/Mermaid Preview. |
| `docs/archive/CODEX-HANDOFF.md` | Archiviert / historisch | Korrekt als abgeschlossener Sprint-25-bis-28-Auftrag markiert; darf nicht als aktiver Auftrag gelesen werden. | Im Archiv belassen; ggf. in Phase 2 Querverweis auf neuere Audits/Handoffs ergänzen, falls gewünscht. |
| `docs/archive/prototypes/README.md` | Aktuell | Klare Abgrenzung: Prototyp ist Referenz, kein produktiver App-Code und kein Implementierungsziel. | Beibehalten; keine Änderung in Sprint 39 Phase 1. |
| `docs/archive/prototypes/Roadtrip Atlas Redesign (standalone).html` | Historische Designreferenz | Nicht produktiv; nur als Inspirationsquelle geeignet. | Nicht verändern; Designprinzipien nur in Audit-/Briefing-Dokumenten extrahieren. |
| `docs/handoffs/Roadtrip sprint29 handoff.md` | Historisch / teilweise veraltet | Guter Übergabestand für Sprint 29; enthält Schutzliste, Sprint-30-Hinweise und alte Workflow-Notizen. Nicht mehr aktueller Gesamtstand nach Sprint 31 bis 38. | Im Handoff-Verzeichnis belassen; ggf. später Archivierung oder Index-Konvention entscheiden. |
| `index.html` | Aktueller App-Code, nur lesend geprüft | Suchprüfung bestätigt aktuelle Feature-Spuren: planned Feature Details, `featureFlow`, Mermaid Preview, Gist, IndexedDB, ZIP/JSZip, Tombstones, Sprintstart-Vertrag. | Nicht ändern; in Phase 2 nur dokumentarisch referenzieren. |

## Aktueller Roadtrip-Stand

Der heutige Roadtrip-Stand ist eine browserbasierte Single-File-HTML-App mit Vanilla JS, CSS Custom Properties, IndexedDB-first-Persistenz und localStorage-Fallback. Das Repository enthält weiterhin keinen Build-Step und keine Framework-Struktur. Die produktive App ist `index.html`.

Aktuelle Funktionsbereiche, die in den Dokumenten künftig explizit zusammengeführt werden sollten:

- Projektverwaltung mit Status, Fokus, nächstem Schritt, Chat-/Sprintkontext und Ressourcen.
- Feature-Datenbank mit planned/implemented Features und Soll-/Ist-Denken.
- Planned Feature Editing inklusive Detailfeldern `purpose`, `workflowContext`, `acceptanceCriteria`, `sourceContext`.
- Planned Feature Backfill / Hauptchat-Abgleich für sparse planned Features.
- Verwendung der planned Feature Details in Sprintstart-, Hauptchat-, Codex-, Analyse-, Import- und Cleanup-Prompts.
- Next-Sprint-/Hauptchat-Handoff und Rückführung von Zwischen-Sprint-Entscheidungen.
- Sprint-Dock / Sprint-Zyklus mit Rückführungs-/Hauptchat-Prompt nach Sprintabschluss.
- Arbeitsmodus-Dropdown für Codex-Steuerung vs. Direktmodus im Sprint-Dock.
- Optionales `featureFlow` als Mermaid-/Feature-Flow-Quelltext.
- Optionale Mermaid Preview für `featureFlow`, defensive Lazy-Integration per CDN, Renderstatus, Fehlerhinweise und Copy-Aktion.
- Notes Workspace, Analysen, Chats, Import-Versionen.
- GitHub Gist Sync, Verschlüsselung, ZIP-Backup, JSON Export/Import, Tombstone-Löschschutz und Trello-Anbindung.

## Veraltete Annahmen

- `AGENTS.md` ist auf Sprint 29 datiert und benennt `docs/CODEX-HANDOFF.md`, obwohl der historische Handoff im Repository unter `docs/archive/CODEX-HANDOFF.md` liegt.
- `docs/DESIGN.md` beschreibt noch einen Atlas-Skin-Refactor als aktive Umsetzungslinie. Viele Etappen sind abgeschlossen oder durch spätere Sprints überholt.
- `docs/DESIGN.md` formuliert die Übersicht als echte gezeichnete Karte; `DECISIONS.md` entscheidet dagegen eine ruhige Listendarstellung als aktuellen Stand und parkt die Relationship Map für später.
- `docs/DESIGN.md` beschreibt Lernen primär als Lernpfade mit Fortschrittsbalken. Für spätere Roadtrip-Arbeit ist eher eine Lern-/Verarbeitungsübersicht zu Chats, Themen und Handoff-Lernmaterial relevant.
- `docs/ARCHITECTURE.md` zeigt Sprint-25-IA und deckt den konsolidierten Sprint-Dock sowie die Sprint-36/36.1-Änderungen nicht vollständig ab.
- `readme.md` nennt langfristige Ideen und allgemeine Fähigkeiten, aber nicht den konkreten App-Stand nach Sprint 31 bis 38.
- Ältere Handoff-Texte enthalten lokale/terminalbezogene Workflow-Annahmen und Sprint-29-spezifische Hinweise, die nicht automatisch für Codex Cloud gelten.

## Widersprüche

- Kartenübersicht: `docs/DESIGN.md` und `docs/ARCHITECTURE.md` beschreiben eine Karte als neuen Startpunkt; `DECISIONS.md` stellt klar, dass aktuell eine ruhige Listendarstellung gilt und die Relationship Map ein späterer Sprint ist.
- Sidebar-Signal: `docs/DESIGN.md` fordert genau ein Sekundärsignal; `DECISIONS.md` präzisiert, dass Hue-Pip plus Cycle-Dots erlaubt sind, weil Identität und Zustand unterschiedliche Bedeutungsachsen sind.
- Settings: `docs/DESIGN.md` beschreibt Gist-Token in Advanced/Danger-Zone; `DECISIONS.md` dokumentiert Sprint 28, dass `gistId`, `gistToken`, `rawGistId` und `rawGistToken` nicht mehr in der Danger-Zone liegen und die Danger-Zone riskanten/destruktiven Aktionen vorbehalten ist.
- Prototyp-Status: Alte Dokumente nennen den Prototyp teilweise als Begleitprototyp/visuelle Referenz; `docs/archive/prototypes/README.md` grenzt ihn inzwischen korrekt als nicht-produktive Designreferenz ab.
- Dokumentpfade: Nutzerkontext erwartet teilweise Root-`DESIGN.md`/`ARCHITECTURE.md`; das Repository enthält sie tatsächlich unter `docs/DESIGN.md` und `docs/ARCHITECTURE.md`.

## Design-Contract: gültige Leitlinien

Diese Designlinien sind weiterhin gültig und sollten in Phase 2 stabilisiert werden:

- Helles, warmes Atlas/Roadtrip-Skin als ruhige Grundrichtung.
- Genau ein Aktionsakzent; dekorative Projekt-/Kategorie-Farben dürfen keine Primäraktionen werden.
- Landkarten-Metapher bleibt visuell/atmosphärisch, nicht Datenmodell oder Funktionsvokabular.
- Funktionale Begriffe bleiben: Projekt, Feature, Sprint, Hauptchat, Handoff.
- Progressive Disclosure: seltene, riskante oder diagnostische Aktionen nicht prominent machen.
- Eine Hauptaktion pro Bereich bleibt als Zielrichtung sinnvoll, muss aber für komplexe heutige Views pragmatisch geprüft werden.
- Sidebar mit klarer Hierarchie; Icons/Pips/Pills unterstützen Orientierung, ersetzen aber nicht die Navigation.
- Projektansicht soll als Meta-Tool wirken: Status, Fokus, nächster Schritt und Momentum sichtbar machen.
- Chat- und Sprintkontexte sollen visuell unterscheidbar bleiben; abgeschlossene/ausgeblendete Kontexte dürfen ruhiger erscheinen.
- Notes und Settings sollen ruhig, gruppiert und rauscharm bleiben.
- Copy-/Prompt-Aktionen sollen bevorzugt ruhiges Toast-Feedback nutzen, wenn keine weitere Interaktion nötig ist.
- Feature-Datenbank darf optisch beruhigt werden, aber ihre Roadtrip-Komplexität nicht verlieren.

## Architektur-Contract: gültige Leitlinien

Diese Architekturgrenzen sollten in Phase 2 klar in `docs/ARCHITECTURE.md` stehen:

- Roadtrip 1.x bleibt Single-File-HTML-App mit Vanilla JS, CSS Custom Properties, ohne Framework und ohne Build-Step.
- `index.html` bleibt die produktive App; Prototyp-Dateien sind keine App-Quelle.
- Persistenz bleibt IndexedDB-first mit localStorage-Fallback.
- JSON Export/Import, ZIP-Backup, Gist-Sync, Verschlüsselung, Tombstones und Trello-Sync sind geschützte Pfade.
- State-Schema und Vertragsfelder dürfen nicht für visuellen Polish geändert werden.
- Planned Feature Detailfelder und `featureFlow` sind heutiger Bestandteil des Feature-Modells und der Promptpfade.
- Mermaid Preview ist optionaler UI-/Preview-Pfad und darf den gespeicherten `featureFlow`-Text nicht verändern.
- Sprintstart-, Handoff-, Hauptchat- und Rückführungsverträge sind geschützt.
- Relationship Map / Projektlandkarte ist ein späterer eigener Sprint und voraussichtlich eine Vertrags-/Schemafrage, nicht bloßer Skin-Polish.

## Agenten-/Codex-Contract: gültige Leitlinien

Diese Regeln sollten in `AGENTS.md` aktualisiert oder erhalten werden:

- Minimal-invasive Patches; pro Sprint/Etappe kleiner Diff.
- Bei App-Code-Änderungen JS-Syntaxcheck ausführen; bei Docs-only-Sprints dokumentieren, dass kein JS-Syntaxcheck nötig war.
- Harte Schutzliste: State-Schema, Config-Keys, Persistenz, Gist/Verschlüsselung, ZIP, JSON Import/Export, Tombstones, Trello, Notes-Datenmodell, Sprintstart-/Handoff-/Chat-Verträge, Element-IDs, Handler-Bindings, Funktionsnamen.
- Keine narrative Umbenennung des Datenmodells.
- Prototyp nur als Designreferenz lesen, nicht implementieren oder verändern.
- Bestehende Kern-Dokumente nur nach Freigabe ändern, wenn ein Sprint in Phasen getrennt ist.
- Codex-Cloud-Workflow gesondert von lokalem Terminal-/SSH-/manuellem PR-Workflow dokumentieren.
- Für Docs-only-Sprints müssen `index.html` und Prototyp-Dateien unverändert bleiben.

## Dateien mit Updatebedarf

- `AGENTS.md`: Stand von Sprint 29 auf aktuellen Contract heben; Pfade korrigieren; Codex-Cloud-Workflow ergänzen; Sprints 31 bis 38 in Schutzliste/No-Touch-Regeln berücksichtigen.
- `DECISIONS.md`: Sprint-31-bis-38-Entscheidungen ergänzen; `featureFlow`, Mermaid Preview, Sprint-Dock, Arbeitsmodus und Hauptchat-Rückführung dokumentieren.
- `docs/DESIGN.md`: Atlas-Refactor als Grundlage statt laufenden Auftrag markieren; widersprüchliche Karten-/Settings-/Lernen-Regeln relativieren; Prototyp-Designrichtungen als spätere Inputs integrieren.
- `docs/ARCHITECTURE.md`: heutige IA um Sprint-Dock, planned Feature Details, Backfill, Hauptchat-Rückführung, `featureFlow`/Mermaid Preview und geschützte Verträge ergänzen.
- `readme.md`: konkrete aktuelle Fähigkeiten und geschützte Architekturgrundrichtung ergänzen.

## Dateien mit Archivierungsbedarf

Akuter Archivierungsbedarf besteht in Phase 1 nicht. Mögliche spätere Entscheidungen:

- `docs/handoffs/Roadtrip sprint29 handoff.md` könnte langfristig nach `docs/archive/handoffs/` verschoben werden, wenn eine Handoff-Archivkonvention eingeführt wird.
- `docs/archive/CODEX-HANDOFF.md` ist bereits archiviert und korrekt als historisch markiert.
- Der Prototyp bleibt im Archiv und darf nicht verschoben oder verändert werden, solange Pfade in Dokumenten darauf verweisen.

## Empfohlene neue Dokumente

- `docs/audits/2026-06-roadtrip-docs-change-report.md` für Phase 2, falls freigegeben.
- Optional: `docs/roadmap.md` oder `docs/audits/2026-06-roadtrip-next-sprints.md` als kuratierte Liste nächster UI-/Feature-/Docs-Sprints.
- Optional: `docs/contracts/` oder einzelne Contract-Abschnitte in bestehenden Dokumenten für geschützte Daten-, Sync-, Prompt- und UI-Verträge.
- Optional: Handoff-Index oder Archivkonvention für `docs/handoffs/`.

## Empfohlene Phase-2-Updates

1. `AGENTS.md` gezielt aktualisieren:
   - Sprintstand auf Sprint 39 setzen.
   - tatsächliche Pfade `docs/DESIGN.md`, `docs/ARCHITECTURE.md`, `docs/archive/CODEX-HANDOFF.md` prüfen.
   - Codex-Cloud-Workflow und Docs-only-Regeln aufnehmen.
   - `featureFlow`, Mermaid Preview und planned Feature Details in Schutzliste ergänzen.
2. `DECISIONS.md` erweitern:
   - Sprints 31 bis 38 als Entscheidungen/Nachtragsstand dokumentieren.
   - Relationship Map weiterhin als späteren separaten Sprint bestätigen.
   - Mermaid Preview als read-only Preview-Pfad festhalten.
3. `docs/DESIGN.md` aktualisieren:
   - Atlas-Skin als gültige Designgrundlage, aber nicht als alter Etappenplan.
   - UI-/Design-Inputs aus diesem Audit einarbeiten.
   - Settings-, Karten- und Lern-Regeln relativieren.
4. `docs/ARCHITECTURE.md` ergänzen:
   - heutige Module und Prompt-/Sprint-Flüsse dokumentieren.
   - Feature-Detailfelder und `featureFlow` als Daten-/Promptbestandteil aufnehmen.
5. `readme.md` aktualisieren:
   - aktuelle Funktionsliste und technische Grundrichtung konkreter machen.
   - Roadtrip 1.x nicht nur als localStorage, sondern IndexedDB-first plus Sync/Backup beschreiben.

## Nicht-Ziele / bewusst nicht übernehmen

- Kein App-Code- oder `index.html`-Patch in Sprint 39 Phase 1.
- Kein CSS-/JS-/HTML-Redesign.
- Keine Prototyp-Dateien verändern.
- Keine Relationship Map, kein Project Graph, kein Canvas Export.
- Kein App-Shell-Umbau und kein neues Nav-System.
- Keine Datenmodelländerung für visuellen Polish.
- Keine Vereinfachung der Feature-Datenbank auf Prototyp-Niveau.
- Keine simple Lernziel-Ansicht als Ersatz für Roadtrip-spezifische Chat-/Lernmaterial-Verarbeitung.
- Keine alte Atlas-Karte 1:1 kopieren.
- Keine alten lokalen Workflow-Regeln automatisch auf Codex Cloud übertragen.

## Risiken

- Wenn `docs/DESIGN.md` ohne Relativierung weiter als aktiver Soll-Stand gelesen wird, können spätere Agenten die alte Karten-/Atlas-Struktur fälschlich reaktivieren.
- Wenn `DECISIONS.md` nicht um Sprint 31 bis 38 ergänzt wird, bleiben wichtige aktuelle Feature-Verträge nur im Code und in Prompt-Historie sichtbar.
- Wenn `AGENTS.md` bei Sprint 29 stehen bleibt, fehlen Schutzregeln für `featureFlow`, Mermaid Preview und moderne Hauptchat-/Sprint-Dock-Pfade.
- Wenn README zu allgemein bleibt, unterschätzt ein neuer Reviewer die aktuelle App-Komplexität.
- Die tatsächliche App-UI wurde nur per Suchprüfung und Dokumentenaudit geprüft, nicht visuell im Browser.

## Offene Fragen

- Soll `docs/DESIGN.md` in Phase 2 als vollständiges aktuelles Designsystem weitergeführt oder in einen Atlas-Historienabschnitt plus neue Design-Contract-Abschnitte geteilt werden?
- Soll `docs/ARCHITECTURE.md` ein technisches Moduldiagramm zusätzlich zur IA erhalten?
- Soll für Roadtrip-Verträge ein separater `docs/contracts/`-Bereich entstehen oder sollen Schutzlisten in `AGENTS.md`/`ARCHITECTURE.md` bleiben?
- Soll `docs/handoffs/` nur aktuelle Handoffs enthalten und ältere Handoffs nach `docs/archive/handoffs/` verschoben werden?
- Soll ein globaler Sync-Button oben rechts als UX-Entscheidung in `DECISIONS.md` vorgemerkt oder zunächst als offene Prüfspur dokumentiert werden?
