# AGENTS.md — Roadtrip Coding-Agent-Vertrag

> Stand: Sprint 29. Dieser Vertrag gilt für **jeden** Coding-Agent-Auftrag
> (Codex, Claude Code) an `index.html`. Er ist sprint-unabhängig.
> Er ersetzt den früheren eingefrorenen Etappe-1-Einzelauftrag.

---

## Projekt

Roadtrip ist eine **Single-File-HTML-App** (`index.html`, ~11.000 Zeilen):
Vanilla JS, CSS Custom Properties, **keine Frameworks, kein Build-Step**.
Persistenz: IndexedDB-first mit localStorage-Fallback. Optional GitHub-Gist-Sync,
ZIP-Backup, Trello-Anbindung.

Alle Änderungen sind **minimal-invasiv**: kleiner Diff, eine Etappe pro Commit,
Render-Logik nur anfassen, wenn eine CSS-Klasse nicht genügt.

---

## Verbindliche Dokumente

| Dokument | Rolle |
|---|---|
| `DECISIONS.md` | Finale Umsetzungsentscheidungen — **hat Vorrang** vor DESIGN/ARCHITECTURE |
| `docs/DESIGN.md` | Designsystem (Tokens, Komponenten, Screen-Regeln) |
| `docs/ARCHITECTURE.md` | Informationsarchitektur / Navigation (Mermaid) |
| `docs/CODEX-HANDOFF.md` | Ursprünglicher 15-Etappen-Plan (Sprint 25, abgeschlossen) — Referenz, kein laufender Auftrag |

Der visuelle Prototyp (`Roadtrip Atlas Redesign (standalone).html`) ist
**Inspirationsquelle, kein Soll-Stand**.

### Gültigkeit / Präzedenz (bei Widerspruch)

1. aktueller `main`-Code
2. `DECISIONS.md`
3. Sprint-Delta-Analyse (sofern beigelegt)
4. `docs/DESIGN.md`
5. `docs/ARCHITECTURE.md`
6. Atlas-Prototyp

---

## ⛔ Harte Grenzen — Schutzliste (NICHT ändern)

Wenn ein Auftrag eine dieser Grenzen zu verletzen scheint: **anhalten und melden,
nicht umgehen.**

- **State-Schema (`S`):** `S.projects`, `S.features`, `S.notes`, `S.analyses`,
  `S.chats`, `S.importVersions` — Struktur und Feldnamen.
- **Config-Key-Namen (`C`).**
- **Persistenz:** IndexedDB-/localStorage-Logik. Nur **neue** UI-Keys unter
  `roadtrip.ui.*` sind erlaubt.
- **Migrations-/Normalisierungslogik** beim Laden (alte deutsche Statuswerte).
- **Sprintstart-JSON-Validierung** (`type === "roadtrip-sprint-start"`, Pflichtfelder).
- **Gist-Sync-Algorithmus & Verschlüsselungslogik.**
- **ZIP-Backup, JSON-Export/-Import, Tombstone-Logik, Trello-Sync.**
- **Notes-Workspace-Datenmodell.**
- **Sprintstart-/Handoff-Verträge.**
- **Element-IDs, Event-Handler-Bindings, Funktionsnamen.** Buttons behalten ihre `id`.
- **Funktions-Vokabular:** Projekt, Feature, Sprint, Hauptchat, Handoff —
  keine narrative Umbenennung. Die Landkarten-Metapher ist rein
  visuell/atmosphärisch, **nicht** im Datenmodell.

**Token-Strategie:** Neue kanonische Tokens definieren, alte Variablennamen als
umgefärbte **Aliase** behalten, damit Bestandscode automatisch erbt.

---

## Bewusst akzeptierte Abweichungen (nicht „korrigieren")

Diese Punkte sind entschieden und werden ohne neue DECISIONS.md-Entscheidung
nicht angefasst:

- Kein App-Shell-Umbau auf CSS-Variable-Grid (Roadtrip bleibt `workspace-sidebar`,
  nicht das React/`.app-shell`-Grid des Prototyps).
- Mobile Sidebar bleibt Off-Canvas mit `body.sidebar-open`.
- Kein semantisches Nav-System als Großrefactor.
- Eigenes Modal-System bleibt bestehen.
- `.kindgrid` wird nicht nachgezogen, solange die aktuelle Lösung funktioniert.
- Paper-Grain wird nicht automatisch umgesetzt.
- Relationship Map ist ein eigener späterer Sprint (Schema-Änderung).
- Keine Datenmodelländerung für rein visuellen Polish.

---

## Pflicht-Smoke-Test (nach JEDER Etappe ausführen + berichten)

```bash
node -e "const fs=require('fs');const vm=require('vm');const c=fs.readFileSync('index.html','utf8');const scripts=[];let m;const re=/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;while((m=re.exec(c))!==null)scripts.push(m[1]);new vm.Script(scripts.join('\n'));console.log('JS OK');"
```

- `git diff` prüfen — keine unerwarteten Dateien.
- App lädt ohne Konsolenfehler; ein bestehendes Projekt mit Features/Sprints rendert.
- `JSON-Export → Re-Import` ergibt identische Daten (mindestens 1× pro 3 Etappen).
- **Sichtprüfung** beschreiben: Sidebar · Projektliste · Settings · Projektansicht ·
  Feature-Datenbank · mobile Breite (falls betroffen).

---

## Git-/Workflow

- Git läuft über SSH-Key im Terminal.
- Branch, Commit, Push per Kommandozeile.
- PR wird **manuell** auf github.com erstellt.
- **Keine** Vorschläge für gh-CLI-Setup, gh-Auth oder WebStorm-GitHub-Login,
  außer ausdrücklich gefragt.

---

## Arbeitsweise

- Pro Etappe: kleiner Diff, ein Commit, Smoke-Test, kurze Ergebnisnotiz.
- Erst nach sauberem Review die nächste Etappe.
- Bei Konflikt mit den harten Grenzen: anhalten und melden.

*Roadtrip · Coding-Agent-Vertrag · Sprint 29*
