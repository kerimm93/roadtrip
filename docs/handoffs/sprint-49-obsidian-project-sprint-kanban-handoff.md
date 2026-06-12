# Sprint 49 Handoff — Projekt-Sprint-Kanban für Obsidian

## Ergebnis

Sprint 49 ergänzt im projektübergreifenden **Momentum Dashboard** einen ruhigen,
standardmäßig eingeklappten Block **„Obsidian Kanban“**. Der Block erzeugt aus
dem vorhandenen Roadtrip-State read-only ein Markdown-Board, zeigt es in einer
readonly Vorschau, kopiert es mit Clipboard-Fallback und lädt es optional als
`.md`-Datei herunter.

- Branch: `work`
- Sprint-Commit: siehe Commit-Hash im finalen Agentenbericht
- Geänderte produktive Datei: `index.html`
- Neu angelegte Datei: `docs/handoffs/sprint-49-obsidian-project-sprint-kanban-handoff.md`
- Internet: nicht verwendet

## Betroffene Funktionen

Neu in `index.html`:

- `compactProjectSprintKanbanValue`
- `getProjectSprintKanbanValue`
- `getProjectSprintKanbanDeliveryMeta`
- `buildProjectSprintKanbanItems`
- `classifyProjectSprintKanbanColumn`
- `escapeProjectSprintKanbanWikiTitle`
- `renderProjectSprintKanbanCard`
- `buildProjectSprintKanbanMarkdown`
- `renderObsidianKanbanExportPanel`
- `refreshProjectSprintKanbanMarkdown`
- `copyProjectSprintKanbanMarkdown`
- `downloadProjectSprintKanbanMarkdown`

Minimal erweitert:

- `wireDynamicView` bindet die drei neuen Export-Aktionen.
- `renderMomentumDashboardView` rendert den Exportblock auch dann, wenn keine
  aktiven Projekte vorhanden sind; dadurch bleiben pausierte/archivierte
  Projekte exportierbar.

## Export-UX

Der Exportblock liegt oben im **Momentum Dashboard**, direkt nach dessen Kopf und
vor den bestehenden projektübergreifenden Brainstorm-/Notizwerkzeugen. Er ist als
`details` standardmäßig eingeklappt und enthält:

- `Obsidian Kanban erzeugen`
- `Obsidian Kanban kopieren`
- `Obsidian Kanban herunterladen`
- readonly Markdown-Vorschau

„Erzeugen“ aktualisiert nur die Vorschau. „Kopieren“ nutzt zuerst
`navigator.clipboard.writeText`; bei nicht verfügbarer oder abgewiesener
Clipboard API wird die Vorschau markiert und `document.execCommand('copy')`
versucht. Die Vorschau bleibt in jedem Fehlerfall für manuelles Kopieren sichtbar.
Der Download verwendet den vorhandenen `downloadTextFile`-Helper und den Namen
`roadtrip-projekt-sprint-kanban-YYYY-MM-DD.md`.

## Erzeugte Spalten und Priorität

Jedes Element aus `S.projects` wird genau einmal einsortiert. Die finale,
konservative Priorität lautet:

1. **Pause / Archiv** — Projektstatus ist `pausiert` oder `archiviert`.
2. **Noch nicht überführt 🕸️** — keine erkennbare Hauptchat-, Sprintchat-,
   Sprint- oder Handoff-Verknüpfung.
3. **Aktiver Sprint** — ein Sprintchat hat Status `aktiv`.
4. **Wartet / Blockiert** — Blocker/offene Fragen oder blockierte planned
   Features sind erkennbar.
5. **Nächster Sprint klar** — ein nächster Schritt/Sprint ist vorhanden.
6. **Wartet / Blockiert** — konservativer Fallback für verbundene, aktive
   Projekte ohne klaren nächsten Sprint.

Das Board enthält den YAML-Header `kanban-plugin: basic`, die fünf geforderten
Spalten, Checkbox-Karten und den einfachen Kanban-Settings-Block. Leere Spalten
enthalten nur den Text `_Keine Projekte._`, keine künstliche Projektkarte.

## Ableitungsheuristiken

### Projekt und Status

- Titel aus `project.title`, sonst `Ohne Titel`.
- Status aus `project.status`, sonst `nicht erfasst`.
- Zeilenumbrüche und Folge-Whitespace werden für kompakte Karten auf ein
  Leerzeichen reduziert.
- `[[`/`]]` innerhalb eines Projekttitels werden defensiv in vollbreite Zeichen
  überführt, damit der äußere Obsidian-Wikilink intakt bleibt.

### Aktueller und letzter Sprint

- Projekt-Chats werden nach `updatedAt`, danach `completedAt`/`startedAt`
  absteigend betrachtet.
- Sprintchats werden anhand des produktiven Felds `type === "sprint"` erkannt;
  `chatType === "sprint"` wird defensiv ebenfalls gelesen.
- „Aktuell“ ist der Titel des neuesten aktiven Sprintchats; nur wenn kein solcher
  Chat existiert, werden optionale Projektfelder `currentSprint`/`activeSprint`
  gelesen.
- „Letzter Abschluss“ ist der Titel des neuesten abgeschlossenen Sprintchats
  (`status === "abgeschlossen"` oder `completedAt`); danach folgen optionale
  Projektfelder `lastCompletedSprint`/`completedSprint`.

### Nächster Sprint und weitere Kandidaten

- „Nächster Sprint“ liest defensiv `nextStep`, `recommendedSprint` oder
  `nextSprint` zuerst am Projekt, danach am aktiven, zuletzt abgeschlossenen und
  neuesten Sprintchat.
- „Danach“ enthält höchstens drei Titel vorhandener planned Features mit Status
  `selected-for-sprint`, `in-progress` oder `planned`, sofern sie nicht bereits
  dem aktuellen/nächsten Sprinttext entsprechen.
- Nicht eindeutig vorhandene Werte werden als `—` ausgegeben; es werden keine
  neuen Felder angelegt.

### Blocker/offene Fragen

- Zuerst werden optionale Felder `blocker`, `blockers`, `openQuestion` oder
  `openQuestions` am Projekt bzw. aktuellen/neuesten Sprint gelesen.
- Danach werden vorhandene `chat.openQuestions` projektweit zusammengeführt.
- Danach dienen Titel bestehender planned Features mit Status `blocked` als
  defensiver Fallback.

### PR, Branch und Merge-Status

- Gelesen werden optionale, bereits vorhandene Werte `pr`, `prNumber`,
  `pullRequest`, `pullRequestNumber`, `prUrl`, `pullRequestUrl`, `branch`,
  `branchName`, `gitBranch`, `repoBranch`, `mergeStatus`, `mergeState` oder
  `merged` aus aktuellem/abgeschlossenem/neuestem Sprint, Hauptchat, Projekt und
  den jüngsten Projektchats.
- JSON-förmige vorhandene `rawHandoffText`-/`rawReportText`-Werte werden nur für
  den Export temporär geparst; nicht parsebare Inhalte werden ignoriert.
- Als letzter defensiver Fallback werden kompakte `PR #123`-/`Branch: name`-
  Muster in vorhandenem Bericht-/Handoff-/Summary-Text gelesen.
- Es gibt keine GitHub-Abfrage und keine PR-Datenmutation.

### Hauptchat, Sprintchat und 🕸️

- Hauptchat-URL: `project.mainChatUrl`, danach URL des per `mainChatId` oder Typ
  `project-main` verknüpften Chats.
- Sprintchat-URL: URL des aktiven, danach des neuesten Sprintchats.
- Ein Projekt erhält 🕸️ nur, wenn **keines** der folgenden Signale existiert:
  Hauptchat-URL, verknüpfter Hauptchat-Eintrag, Sprintchat-Eintrag,
  Handoff-Metadaten/-Text/-Historie in Projekt-Chats oder optionale erkennbare
  Sprintfelder am Projekt.
- Pause/Archiv hat bei der Spaltenwahl Vorrang vor 🕸️; die Karte kann intern
  weiterhin als unverbunden erkannt und mit dem Marker dargestellt werden.

## Beispielauszug

```md
---
kanban-plugin: basic
---

# Roadtrip Projekt-Sprint-Kanban

## Aktiver Sprint

- [ ] [[Roadtrip]]
  - Status: aktiv
  - Aktuell: Sprint 49 · Projekt-Sprint-Kanban für Obsidian
  - Letzter Abschluss: Sprint 48 · Analyse-Kontextbundle UX-Polish
  - Nächster Sprint: —
  - Danach: —
  - PR/Branch: #109 / sprint-49-obsidian-kanban
  - Blocker: —
  - Hauptchat: https://...
  - Sprintchat: https://...
```

## Schutzbereiche / bewusste Nicht-Umsetzungen

Der Patch enthält keine Änderung an:

- Gist-Sync, Remote-Readback oder Verschlüsselung
- Tombstones
- Trello
- ZIP-/JSON-Backup-Grundverträgen
- Sprintstart-/Sprintabschluss-Importverträgen
- Codeanalyse-Kontextbundle, Analysemodus-Hilfen, Privacy-Gates oder
  review-only Delta-Verhalten
- Notes-/Learning-Workspace
- PR-Erfassung oder GitHub API
- State-Schema, Migration oder Persistenz

Es wurden keine automatische Lösch-, Merge-, Import-, Status- oder
Datenmutationsaktion und weder Obsidian API noch Canvas JSON eingeführt.

## Checks

Ausgeführt und im finalen Agentenbericht mit Ergebnis aufgeführt:

- `git status`
- `git diff --name-only`
- `git diff --check`
- Single-File-JS-Syntaxcheck gemäß `AGENTS.md`
- isolierter Node-Smoke-Test der Exporthelper mit fünf Projekten für alle fünf
  Spalten, Gesamtprojektzahl, 🕸️, PR/Branch und Kanban-Header
- statische Diff-Prüfung der geschützten Bereiche

Eine echte Browser-Screenshot-Prüfung ist in der Laufzeitumgebung nur möglich,
wenn ein Browser/Browser-Automation-Paket vorhanden ist. Das Ergebnis dieses
Umgebungschecks wird im finalen Bericht ausgewiesen.

## Risiken / offene Fragen

- PR-/Branch-/Merge-Daten sind im kanonischen Chatmodell keine festen Felder.
  Der Export zeigt sie daher nur, wenn sie in den defensiv gelesenen vorhandenen
  Feldern oder eindeutigem Bericht-/Handoff-Text vorkommen; sonst `—`.
- `recommendedSprint` ist kein kanonisches Projektfeld. Es wird nur gelesen,
  wenn es in vorhandenen Daten bereits vorkommt; es wird nicht persistiert.
- Featuretitel sind nur Sprint-Kandidaten, keine neu eingeführte Sprintplanung.
- Der Export wird bei Rendern bzw. Buttonklick frisch aus dem State gebaut und
  nicht separat gespeichert.

## Merge-Einschätzung

Der Patch ist nach erfolgreichen Syntax-, Diff- und Helper-Smoke-Checks
mergefähig. Er ist auf read-only Exportlogik, drei neue Buttons und eine
Vorschau im Momentum Dashboard begrenzt.
