# Roadtrip · Sprint 29 — Handoff

**Datum:** 2026-06-04
**Sprint:** 29 · Atlas-Polish (Claude-orchestriert, Codex-ausführend)
**Branch:** `sprint-29-atlas-polish`
**Basis:** main @ Merge-Commit `5141fc3` (Sprint 28 abgeschlossen)
**Status:** 2 Etappen abgenommen & gemerged · 1 Etappe bewusst verschoben · 1 Etappe offen
**Rollen:** Dieser Chat = Orchestrator / Reviewer / Prompt-Designer. Codex Cloud = Ausführung. App wird NICHT von diesem Chat editiert.

---

## 1 · Executive Summary

Sprint 29 war ein kontrollierter, rein visueller Atlas-Polish-Sprint ohne Schema-,
Logik- oder Architektur-Eingriffe. Ziel: Roadtrip optisch näher an den Atlas-Prototyp
bringen, ohne in einen großen Refactor abzurutschen.

Erreicht: Der Sidebar-Brand-Block (Mark + Wortmarke + Kicker) und Projekt-Identitäts-Pips
(Hue aus ID-Hash) sind umgesetzt, reviewed und in `sprint-29-atlas-polish` gemerged.
Der statische Inline-Style-Cleanup wurde analysiert und **bewusst auf Sprint 30 verschoben**
(P2-Hygiene, kein sichtbarer Mangel, erhöhtes Template-Literal-Risiko). Die
Sidebar-Hierarchie/Actions-Politur (29.4) ist noch offen.

Vor Beginn wurde die **Dokumentenlage saniert**: AGENTS.md, DECISIONS.md und readme.md
wurden aktualisiert und ins Repo eingecheckt, bevor Codex-Aufträge formuliert wurden.

---

## 2 · Repository-Stand

### Dokumente (alle im Repo, aktuell)
| Datei | Stand |
|---|---|
| `AGENTS.md` | NEU — generischer, sprint-unabhängiger Coding-Agent-Vertrag (ersetzt den alten eingefrorenen Etappe-1-Auftrag). Enthält Schutzliste, Gültigkeitsregel, Smoke-Test, Git-Workflow. |
| `DECISIONS.md` | Aktualisiert — Gültigkeits-/Präzedenzregel, Sidebar-Pip-Entscheidung (C), Stand Sprint 28. (Sprint-30-Cleanup-Notiz siehe §6 — ggf. noch zu ergänzen.) |
| `readme.md` | Persistenz-Zeile korrigiert: „IndexedDB-first persistence with localStorage fallback". |
| `docs/DESIGN.md` | Unverändert. Maßgeblich für Tokens/Komponenten. Enthält KEINE Brand-Block-Spec. |
| `docs/ARCHITECTURE.md` | Unverändert. IA-Mermaid-Diagramme. |
| `docs/CODEX-HANDOFF.md` | Unverändert. Sprint-25-Plan (abgeschlossen), nur Referenz. |

### Gültigkeits-/Präzedenzregel (bei Widerspruch)
1. aktueller main-Code → 2. DECISIONS.md → 3. Sprint-Delta-Analyse →
4. docs/DESIGN.md → 5. docs/ARCHITECTURE.md → 6. Atlas-Prototyp.
Der Prototyp ist Inspirationsquelle, kein Soll-Stand.

---

## 3 · Abgeschlossene Etappen (abgenommen & gemerged)

### Etappe 29.1 — Sidebar-Brand-Block ✅
- Commit: `f24a9f1` · `feat(atlas): sidebar brand block (mark + wordmark + kicker)`
- `<h1 class="sidebar-title">` ersetzt durch `.sb-brand`-Block: Inline-SVG-Mark
  (Wimpel/Marker in `currentColor`/`--accent`), Wortmarke „Roadtrip" (Serif, 22px),
  Sub-Kicker „Dev OS" (Mono, uppercase, gesperrt).
- Neue CSS: `.sb-brand`, `.sb-mark`, `.sb-text`, `.sb-word`, `.sb-sub`. Alte
  `.sidebar-title`-Regel entfernt (keine verwaiste Referenz).
- Review: Diff minimal, Schutzliste eingehalten, Syntaxcheck grün. Visuell bestätigt
  (Desktop). Mark wirkt leicht generisch, aber trägt — austauschbar bei Bedarf.

### Etappe 29.2 — Projekt-Identitäts-Pips ✅
- Commit: `60ac2e9` · `feat(atlas): sidebar project identity pips (hue from id-hash)`
- Jede reguläre Projektzeile erhält links einen 8px-Pip. Farbe STABIL aus Projekt-ID:
  `getOverviewProjectHue(getStableProjectSortValue(p))` — **bestehende Helfer
  wiederverwendet, keine neue Hash-/Farbfunktion**. Inline-`--pip`-Custom-Property
  (dynamisch, daher KEIN Cleanup-Kandidat).
- Cycle-Dots bleiben unverändert (Identität=Pip links, Zustand=Dots rechts).
  „Alle Projekte" hat keinen Pip.
- Codex-Mehrwert: `.title`-Selektor korrekt auf `:not(.project-pip):not(.archive-pill)`
  umgestellt und `justify-content` auf `flex-start` — antizipierter Folgefehler vermieden.
- Review: sauber, Schutzliste eingehalten. Visuell bestätigt: unterschiedliche, stabile
  Farben, korrekte Ausrichtung.

---

## 4 · Offene Entscheidung: E-Ink-Pips

**Beobachtung (verifiziert):** Das E-Ink-Theme überschreibt die `--hue-*`-Token NICHT.
Folge: Die Projekt-Pips bleiben im E-Ink-Theme **farbig** statt grau.

**Entscheidung:** Bewusst SO GELASSEN. Die Pips sind dekorativ und winzig (8px); sie
stören das E-Ink-Bild nicht. DESIGN.md §E-Ink zielt auf gefüllte *Aktions*-Akzente
(Buttons), nicht auf 8px-Identitätspunkte.

**Falls später strenger gewünscht (risikoloser Einzeiler):** im E-Ink-Theme-Block
die `--hue-*` (oder `--pip`) auf eine Graustufe/`--ink-dim` mappen. Kein eigener
Sprint nötig — kann in 29.4 oder 30 mitlaufen.

---

## 5 · Offen in Sprint 29: Etappe 29.4 — Sidebar-Hierarchie / Actions-Polish

**Noch NICHT umgesetzt.** Entscheidung steht aus, ob in Sprint 29 oder Sprint 30.

**Ausgangslage (verifiziert im Branch):**
- Nav ist bereits gruppiert (`.nav-group`, `.nav-group-label`, `.nav-group-items`
  ab Z. ~647 CSS / ~2478 JS) — Reise / Werkstatt / Werkzeuge. Hier ist wenig zu tun.
- Footer-Actions (`.sidebar-actions`, Z. ~1783) sind vier ungruppierte Buttons:
  Demo · Export · Raw Backup · Import. Das ist der eigentliche Polish-Kandidat.

**Scope (klein halten):** Footer-Actions visuell ordnen (z. B. Primär/Sekundär-Hierarchie,
ruhigere Gruppierung), ggf. Nav-Gruppen-Labels feinschleifen. NUR Markup/CSS.

**Explizit NICHT:** kein neues/semantisches Nav-System, kein App-Shell-Umbau,
keine Handler-/ID-Änderung.

---

## 6 · Verschoben auf Sprint 30: Statischer Inline-Style-Cleanup

**In Sprint 29 analysiert, bewusst nicht umgesetzt.**

**Befund:** ~271 Inline-`style`-Vorkommen gesamt, davon ~130 statisch. Sie reduzieren
sich auf wenige Muster:
- `margin-bottom:8px` (17×), `margin-bottom:12px` (13×), `:10px` (6×), `:6px` (6×)
- `font-weight:700` (14×)
- `gap:4px/6px`, `cursor:pointer`, `width:16px;height:16px` (6×, Checkbox-Icons), `flex:1`

**Warum verschoben:**
1. P2-Hygiene laut Delta-Analyse — kein sichtbarer/funktionaler Mangel.
2. **Template-Literal-Falle:** Viele statische `style`-Attribute sitzen INNERHALB
   dynamischer `${…}`-Ausdrücke (z. B. renderImportWorkspace, Z. ~4782). Ein globaler
   Find-Replace ist daher unsicher — Risiko, Template-Strings zu beschädigen.

**Empfehlung Sprint 30 (zwei Klassen):**
- Klasse A — Vorkommen in reinem statischem Markup zuerst (sicher), z. B. Modal-Felder.
- Klasse B — Vorkommen in Template-Literalen einzeln und vorsichtig, mit Syntaxcheck.

**TABU (dynamisch, niemals anfassen):** `--node-x/y`, `--node-color`, `--pip`,
`--hue-*`, `opacity`-States, Positions-/`transform`-Werte. Fragile Modal-Container
mit `var(--shadow)` (Z. 8934, 9737, 10150) auslassen.

---

## 7 · Schutzliste (galt durchgehend, gilt weiter)

Codex darf NICHT ändern:
- S-State-Schema (`S.projects/features/notes/analyses/chats/importVersions`)
- C-Config-Key-Namen · IndexedDB/localStorage-Persistenz (nur neue `roadtrip.ui.*`)
- Gist-Sync-Algorithmus · Verschlüsselungslogik · ZIP-Backup · JSON-Export/Import
- Tombstone-Logik · Trello-Sync · Notes-Datenmodell
- Sprintstart-/Handoff-Verträge · Element-IDs · Handler-Bindings · Funktionsnamen
- Funktions-Vokabular (Projekt/Feature/Sprint/Hauptchat/Handoff)

Bewusst akzeptierte Abweichungen (nicht „korrigieren"):
- Kein App-Shell-CSS-Variable-Grid · Mobile-Sidebar bleibt Off-Canvas (`body.sidebar-open`)
- Eigenes Modal-System · `.kindgrid` nicht nachziehen · Paper-Grain nicht automatisch
- Relationship Map = eigener späterer Sprint · keine Datenmodelländerung für Polish

---

## 8 · Pflicht-Smoke-Test (jede Etappe)

```bash
node -e "const fs=require('fs');const vm=require('vm');const c=fs.readFileSync('index.html','utf8');const scripts=[];let m;const re=/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;while((m=re.exec(c))!==null)scripts.push(m[1]);new vm.Script(scripts.join('\n'));console.log('JS OK');"
```
Zusätzlich: `git diff` prüfen (keine Fremddateien), App lädt fehlerfrei,
Export→Re-Import identisch (1×/3 Etappen), Sichtprüfung beschreiben.

Hinweis: Codex-Cloud hat **kein Browser/Playwright** — visuelle Prüfung erfolgt
manuell durch den Nutzer nach dem Merge.

---

## 9 · Workflow-Notizen

- Codex Cloud arbeitet auf dem Repo (nichts „mitgeben"). Prototyp-Details daher
  IMMER inline in den Prompt schreiben — der Prototyp ist nicht im Repo.
- Base-Branch in Codex ist wählbar und steht auf `sprint-29-atlas-polish`.
- Codex merged Etappen direkt (PR „Zusammengeführt"), kein separater Review-PR-Flow.
- Git: SSH-Terminal, manueller PR auf github.com. Keine gh-CLI-/WebStorm-Vorschläge.

---

## 10 · Empfohlene nächste Schritte

1. **Entscheiden:** 29.4 (Sidebar-Actions-Polish) noch in Sprint 29 ziehen ODER
   nach Sprint 30 verschieben.
2. Falls 29.4 jetzt: kleinen Codex-Auftrag formulieren (Footer-Actions ordnen),
   reviewen, mergen → Sprint 29 abschließen.
3. **DECISIONS.md** um den Sprint-30-Cleanup-Block (§6) ergänzen, damit Sprint 30
   informiert startet und die Template-Literal-Falle nicht neu entdeckt werden muss.
4. **Sprint 30 eröffnen** mit: Inline-Style-Cleanup (Klasse A zuerst), optional
   E-Ink-Pip-Graustufe, ggf. weitere Prototyp-Feinheiten.

---

## 11 · Roadtrip-Handoff (JSON)

```json
{
  "summary": "Sprint 29 Atlas-Polish: Sidebar-Brand-Block (f24a9f1) und Projekt-Identitäts-Pips (60ac2e9) umgesetzt, reviewed, in sprint-29-atlas-polish gemerged. Doku-Lage vorab saniert (AGENTS/DECISIONS/readme). Inline-Style-Cleanup analysiert und wegen Template-Literal-Risiko bewusst auf Sprint 30 verschoben. E-Ink-Pips farbig gelassen (bewusste Entscheidung).",
  "currentFocus": "Sprint 29 — Etappe 29.4 (Sidebar-Hierarchie/Actions-Polish) offen; Entscheidung ob jetzt oder Sprint 30.",
  "nextStep": "Entscheiden ob 29.4 jetzt; falls ja kleinen Codex-Auftrag für Footer-Actions-Ordnung formulieren. Danach Sprint 29 abschließen und DECISIONS.md um Sprint-30-Cleanup-Notiz ergänzen.",
  "proposedFeatures": [
    {"title": "Etappe 29.4: Sidebar-Actions-Polish", "pool": "sprint", "status": "ready", "priority": "P3", "effort": "S", "notes": "Footer-Buttons (Demo/Export/Raw Backup/Import) visuell ordnen. Nav bereits gruppiert. Nur Markup/CSS, kein Nav-System."},
    {"title": "Sprint 30: Statischer Inline-Style-Cleanup", "pool": "backlog", "status": "ready", "priority": "P2", "effort": "M", "notes": "~130 statische Inline-Styles. Achtung Template-Literal-Falle (${} ). Klasse A statisches Markup zuerst, Klasse B Template-Literale einzeln. Dynamische Styles (--node/--pip/--hue/opacity) tabu."},
    {"title": "Optional: E-Ink-Pip-Graustufe", "pool": "backlog", "status": "optional", "priority": "P4", "effort": "XS", "notes": "Einzeiler: --hue-*/--pip im E-Ink-Theme auf Graustufe mappen. Nur falls Theme-Treue gewünscht."}
  ]
}
```

---

*Roadtrip · Sprint 29 Handoff · Atlas-Polish · 2026-06-04*
