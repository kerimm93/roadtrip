# AGENTS.md — Roadtrip Coding-Agent-Vertrag

> Stand: Sprint 39 Phase 2. Dieser Vertrag gilt für jeden Coding-Agent-Auftrag
> (Codex, Claude Code, GPT) im Roadtrip-Repository. Er ist sprint-unabhängig und
> ersetzt ältere Sprint-29-Arbeitsnotizen, soweit sie widersprechen.

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

## Verbindliche Dokumente

| Dokument | Rolle |
|---|---|
| `DECISIONS.md` | Finale Umsetzungsentscheidungen — **hat Vorrang** vor DESIGN/ARCHITECTURE |
| `docs/DESIGN.md` | Designsystem, UI-Prinzipien, Roadmap-Designrichtungen |
| `docs/ARCHITECTURE.md` | Architektur-, Workflow- und Schutzbereichsübersicht |
| `docs/audits/` | Audit-/Review-Befunde als Sprint-Kontext |
| `docs/handoffs/` | Sprint-Handoffs und Merge-/Risiko-Einschätzungen |

Der visuelle Roadtrip-/Atlas-Prototyp ist **Designreferenz und Inspiration, kein
1:1-Bauplan**.

### Präzedenz bei Widerspruch

1. aktueller produktiver Code
2. `DECISIONS.md`
3. Sprint-Delta-/Audit-/Handoff-Dokumente des aktuellen Auftrags
4. `docs/DESIGN.md`
5. `docs/ARCHITECTURE.md`
6. Prototypen / Archivmaterial

---

## ⛔ Harte Grenzen — Schutzliste (NICHT ändern)

Wenn ein Auftrag eine Grenze zu verletzen scheint: **anhalten und melden, nicht
umgehen**.

- **State-Schema (`S`):** `S.projects`, `S.features`, `S.notes`, `S.analyses`,
  `S.chats`, `S.importVersions` — Struktur und Feldnamen.
- **Config-Key-Namen (`C`).**
- **Persistenz:** IndexedDB-/localStorage-Logik. Nur neue UI-Keys unter
  `roadtrip.ui.*` sind ohne explizite Entscheidung erlaubt.
- **Migrations-/Normalisierungslogik** beim Laden.
- **Sprintstart-/Handoff-Verträge** inklusive JSON-Validierung.
- **Chat-Workflow-Verträge** und Hauptchat-/Sprintchat-Rückführung.
- **Gist-Sync-Algorithmus & Verschlüsselungslogik.**
- **ZIP-Backup, JSON-Export/-Import, Tombstone-Logik, Trello-Sync.**
- **Notes-Workspace-Datenmodell.**
- **Planned-Feature-Detailfelder** (`purpose`, `workflowContext`,
  `acceptanceCriteria`, `sourceContext`) ohne explizite Vertragsentscheidung.
- **`featureFlow`-Textfeld und Mermaid-Preview-Vertrag:** Preview bleibt optional,
  visuell und nicht-destruktiv.
- **Element-IDs, Event-Handler-Bindings, Funktionsnamen.** Buttons behalten ihre
  `id`.
- **Funktions-Vokabular:** Projekt, Feature, Sprint, Hauptchat, Handoff — keine
  narrative Umbenennung. Die Landkarten-Metapher ist rein visuell.

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
- PR wird manuell auf github.com erstellt.
- Keine WebStorm-GitHub-Login-, GitHub-CLI- oder `gh auth`-Empfehlungen, außer
  ausdrücklich gefragt.

Handoffs dokumentieren mindestens:

- Branchname
- geänderte Dateien
- neu angelegte Dateien
- ausgeführte Checks und Ergebnisse
- Risiken/offene Fragen
- bewusste Nicht-Umsetzungen
- klare Merge-Einschätzung

*Roadtrip · Coding-Agent-Vertrag · Sprint 39 Phase 2*
