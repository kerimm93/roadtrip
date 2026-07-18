# AGENTS.md — Roadtrip Coding-Agent-Vertrag

> Stand: 2026-07-18 · aktueller sprintunabhängiger Roadtrip-Contract. Dieser
> Vertrag gilt für jeden Coding-Agent-Auftrag (Codex, Claude Code, GPT) im
> Roadtrip-Repository und ersetzt ältere Sprint-Arbeitsnotizen, soweit sie
> widersprechen.

---

## Projekt

Roadtrip ist eine browserbasierte **Single-File-HTML-/Vanilla-JS-App**:

- produktive App: `index.html`
- Vanilla JS, CSS Custom Properties
- keine Frameworks, kein Build-Step
- Persistenz: IndexedDB-first mit localStorage-Fallback
- optionale Funktionen: verschlüsselter bidirektionaler GitHub-Gist-Sync,
  ZIP-Backup, JSON Export/Import, Trello-Anbindung, Tombstone-Löschschutz

Änderungen bleiben **minimal-invasiv**: kleine, prüfbare Patches statt großer
Rewrites. Render-Logik nur anfassen, wenn eine CSS-/Markup-Korrektur nicht reicht.

---

## Kontextgrenzen für Agenten

Coding-Agenten kennen nur das Repository, den aktuellen Prompt und selbst gelesene
Dateien. Sie haben keinen automatischen Zugriff auf frühere Hauptchats,
Sprintchats, Reviewkommentare, Screenshots, lokale Browserdaten oder Handoffs
außerhalb des Repositorys. Review-, Audit- und Nachziehaufträge müssen deshalb
selbsttragende Prompts enthalten: relevante Fakten, gewünschte Priorität,
Akzeptanzkriterien, Nicht-Ziele und erwartete Checks dürfen nicht nur in einem
anderen Chat vorausgesetzt werden.

Implementierungsbehauptungen müssen gegen den aktuellen produktiven Code geprüft
werden. Fachliche Realtestbefunde dürfen aus einem expliziten aktuellen Auftrag
übernommen werden, müssen aber als Promptquelle erkennbar bleiben, wenn sie nicht
im Code belegbar sind.

---

## Verbindliche Dokumente

| Dokument | Rolle |
|---|---|
| `DECISIONS.md` | Finale Produkt-, Workflow- und Architekturentscheidungen — **hat Vorrang** vor DESIGN/ARCHITECTURE |
| `docs/DESIGN.md` | Designsystem, UI-Prinzipien, Roadmap-Designrichtungen |
| `docs/ARCHITECTURE.md` | Architektur-, Workflow- und Schutzbereichsübersicht |
| `docs/audits/` | Audit-/Review-Befunde; aktuelle Auftragsaudits sind Kontext, ältere Dateien historisch |
| `docs/handoffs/` | Sprint-/Patch-Handoffs und Merge-/Risiko-Einschätzungen |

Der visuelle Roadtrip-/Atlas-Prototyp ist **Designreferenz und Inspiration, kein
1:1-Bauplan**.

### Präzedenz bei Widerspruch

1. aktueller produktiver Code für Implementierungsfakten
2. expliziter aktueller Auftrag für fachlichen Scope, Realtestbefunde und neue Entscheidungen
3. `DECISIONS.md`
4. aktuelle Audit-/Handoff-Dateien des Auftrags
5. `docs/DESIGN.md` und `docs/ARCHITECTURE.md` gemäß ihrer Rollen
6. historische Referenzen, Archivmaterial und Prototypen

---

## ⛔ Schutzliste — nicht ohne expliziten Vertrag ändern

Wenn ein Auftrag eine Grenze beiläufig zu verletzen scheint: **anhalten und
melden, nicht umgehen**. Die folgenden Bereiche sind nicht absolut für alle Zeit
unveränderlich; sie dürfen aber nur mit explizitem Auftrag, dokumentiertem Vertrag,
Migrations-/Normalisierungsplan, Tests und Handoff geändert werden.

- **State-Schema (`S`) und Persistenz:** aktuelles Modell aus `defaultState()`,
  Normalisierung, Export/Import, Mergepfaden und Syncpfaden prüfen; keine
  veraltete Teilmenge als vollständiges Schema annehmen. Dazu gehören u. a.
  Projekte, Features, Notes, Analysen, Chats, Importversionen, Pull Requests,
  unmatched Notes und Tombstones.
- **Config-Key-Namen (`C`).**
- **IndexedDB-/localStorage-Logik.** Neue rein visuelle UI-Keys unter
  `roadtrip.ui.*` sind nur dann unkompliziert, wenn sie keine Datenmodell- oder
  Workflow-Vertragsänderung verdecken.
- **Migrations-/Normalisierungslogik** beim Laden.
- **Sprintstart-/Handoff-Verträge** inklusive JSON-Validierung und
  Rückführungslogik.
- **Chat-Workflow-Verträge** und Hauptchat-/Sprintchat-Rückführung.
- **CSV-/Codeanalyse- und Cleanup-Contracts:** Feature-CSV-Felder, stabile
  Feature-/Fall-/Paarbindungen, lossless/Kürzungs-Guards, lokale Parser,
  Validatoren und Preview-Verträge.
- **Versionierte Cleanup-Rückgaben:** `roadtrip-mainchat-decisions-v1` und
  `roadtrip-dedupe-decisions-v1`.
- **Preview-only-Dedupe:** keine Merge-, Archivierungs-, Lösch-, Status-, Pool-
  oder sonstige Dedupe-Mutation ohne eigenen atomaren Vertrag.
- **Enger `update-existing`-Diff-/Confirm-/Commitpfad:** nur validierte
  Hauptchat-Entscheidungen, Auswahl, Diff, Confirm, Driftprüfung und Commit;
  aktueller MVP nur für `title`, `description`, `category`.
- **Gist-Sync-Algorithmus & Verschlüsselungslogik.**
- **ZIP-Backup, JSON-Export/-Import, Tombstone-Logik, Trello-Sync.**
- **Notes-Workspace-Datenmodell.**
- **Planned-Feature-Detailfelder** (`purpose`, `workflowContext`,
  `acceptanceCriteria`, `sourceContext`) und `featureFlow` ohne explizite
  Vertragsentscheidung.
- **`featureFlow`-Textfeld und Mermaid-Preview-Vertrag:** Preview bleibt optional,
  visuell und nicht-destruktiv.
- **Element-IDs, Event-Handler-Bindings, Funktionsnamen.** Buttons behalten ihre
  `id`.
- **Funktions-Vokabular:** Projekt, Feature, Sprint, Hauptchat, Handoff — keine
  narrative Umbenennung. Die Landkarten-Metapher ist rein visuell.

Ein ausdrücklich beauftragter Workbench-Sprint darf persistente Analyse-/Cleanup-
Run- und Fallstrukturen ergänzen, sofern Migration, Tests, Schutzlistenprüfung und
Handoff Teil des Auftrags sind. Das darf nicht nebenbei in Docs-, UI-Polish-,
Backlog- oder Prompt-Cleanup-Aufträgen passieren.

Token-Strategie: neue kanonische Tokens definieren, alte Variablennamen als
umgefärbte Aliase behalten, damit Bestandscode automatisch erbt.

---

## Bewusst akzeptierte Abweichungen / nicht automatisch korrigieren

Diese Punkte sind entschieden und werden nicht nebenbei als Bugfix, Cleanup oder
Prototyp-Angleichung geändert:

- Kein automatischer App-Shell-Umbau auf Prototyp-/Atlas-Grid.
- Mobile Sidebar bleibt Off-Canvas, solange kein eigener UI-Sprint etwas anderes
  entscheidet.
- Kein semantisches Nav-System als Großrefactor nebenbei.
- Eigenes Modal-System bleibt bestehen.
- `.kindgrid`, Paper-Grain und ähnliche Prototypdetails nicht automatisch
  nachziehen.
- Relationship Map / Project Graph bleibt eigener späterer Sprint mit Schema-/
  Contract-Entscheidung.
- Keine Datenmodelländerung für rein visuellen Polish.
- Prototyp ist Referenz, nicht Soll-Stand; bei Konflikt gelten produktiver Code und
  `DECISIONS.md`.

---

## Arbeitsweise

- Kleine, prüfbare Änderungen bevorzugen.
- Keine Framework-, Build- oder Architektur-Rewrites ohne expliziten Auftrag.
- Keine Roadmap-Features nebenbei implementieren.
- Pro Etappe/Task: kleiner Diff, Checks, kurze Ergebnisnotiz.
- Bei Konflikt mit Schutzliste oder Dokumentenpräzedenz: stoppen und melden.
- Implementiert / statisch geprüft / browser-real verifiziert / eingeschränkt
  freigegeben / geplant sauber trennen.

### Code-Sprints

Nach jeder JS-/App-Code-Änderung ausführen und berichten:

```bash
node -e "const fs=require('fs');const vm=require('vm');const c=fs.readFileSync('index.html','utf8');const scripts=[];let m;const re=/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;while((m=re.exec(c))!==null)scripts.push(m[1]);new vm.Script(scripts.join('\n'));console.log('JS OK');"
```

Zusätzlich:

- `git diff` prüfen — keine unerwarteten Dateien.
- Wenn UI sichtbar betroffen ist: Sichtprüfung/Screenshot nach Auftragsscope.
- App-Code-Smoke-Tests nur auslassen, wenn nachweislich kein App-Code geändert wurde.

### Docs-only-Sprints

Für Docs-only-Sprints gilt:

- kein `index.html`, keine App-Code-, CSS- oder JS-Dateien ändern
- nur Markdown-/Dokumentationsdateien bearbeiten
- kein JS-Syntaxcheck erforderlich, wenn kein App-Code geändert wurde
- stattdessen dokumentieren:
  - `git diff --check`
  - `git diff --name-only`
  - `git diff --stat`
  - `git diff -- index.html`
  - Scope-Prüfung auf ausschließlich Markdown-Dateien
  - Liste geänderter und neu angelegter Dateien
  - Nachweis, dass `index.html` unverändert blieb

---

## Codex-Internetregel

Standard: **Internet AUS**.

Internet nur nutzen, wenn die Aufgabe wirklich aktuelle offizielle externe
Dokumentation braucht, z. B. externe API-Doku, Library-Doku, Browser-/PWA-Fragen
oder Security-/Dependency-Fragen.

Für Roadtrip-Docs-only-, UI-Polish-, Backlog-, Prompt-/Workflow- und private
Daten-Sprints bleibt Internet aus.

Falls Internet in einem späteren Sprint genutzt wird:

- nur offizielle Quellen verwenden
- keine Tokens, Backups, App-Exports oder privaten Projektdaten an externe Dienste
  geben
- genutzte Quellen im Handoff dokumentieren

---

## Git-/Workflow

- Git per SSH/Terminal.
- Branch, Commit, Push per Kommandozeile.
- PR wird gemäß Umgebungsvorgaben vorbereitet oder manuell auf github.com erstellt.
- Keine WebStorm-GitHub-Login-, GitHub-CLI- oder `gh auth`-Empfehlungen, außer
  ausdrücklich gefragt.

Handoffs dokumentieren mindestens:

- Branchname
- Commit, sofern vorhanden
- geänderte Dateien
- neu angelegte Dateien
- ausgeführte Checks und Ergebnisse
- Risiken/offene Fragen
- bewusste Nicht-Umsetzungen
- klare Merge-Einschätzung

*Roadtrip · Coding-Agent-Vertrag · 2026-07-18*
