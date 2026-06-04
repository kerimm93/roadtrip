# Roadtrip · Atlas-Redesign — Codex / Coding-Agent Handoff-Prompt

> ⚠️ **STATUS: ABGESCHLOSSEN (Sprint 25–28). Historisches Referenzdokument, KEIN aktiver Auftrag.**
> Die hier beschriebenen 15 Etappen sind umgesetzt und in `main` gemerged.
> Aktueller Projektstand: siehe `DECISIONS.md`. Verbindlicher Agentenvertrag: `AGENTS.md`.
> Dieses Dokument NICHT als laufende Aufgabenliste abarbeiten — es dient nur noch als
> Referenz für die ursprüngliche Atlas-Redesign-Planung und die dort festgehaltenen
> harten Grenzen / Token-Strategie.

---

> **In Codex / Claude Code einfügen.** Mitgeben: dieses Dokument, `docs/DESIGN.md` (Atlas), `docs/ARCHITECTURE.md`, der visuelle Prototyp `Roadtrip Atlas Redesign.html` als Stilreferenz, und die aktuelle `index.html`.
> Ziel: das Atlas-Redesign in **kleinen, einzeln committbaren und testbaren Etappen** umsetzen.

---

## ROLLE & AUFTRAG

Du bist ein Coding-Agent für die bestehende Single-File-HTML-App **Roadtrip** (`index.html`, ~9.400 Zeilen, Vanilla JS, CSS Custom Properties, kein Build-Step, localStorage). Du setzt ein **helles „Atlas"-Skin + IA-Refactor** um. Es ist ein **Skin- und Informationsarchitektur-Refactor, KEIN Rewrite**.

Arbeite die Etappen **strikt der Reihe nach** ab. **Ein Commit pro Etappe.** Führe nach jeder Etappe den angegebenen Smoke-Test aus und beschreibe das Ergebnis, bevor du die nächste beginnst. Wenn ein Smoke-Test fehlschlägt, korrigiere **innerhalb derselben Etappe**, bevor du weitergehst.

---

## ⛔ HARTE GRENZEN — bei jeder Etappe einhalten

Diese Dinge bleiben **unverändert**. Wenn eine Aufgabe sie zu verletzen scheint, halte an und melde es:

- **localStorage-Schema** des App-Datenstands. Nur **neue** UI-Keys unter `roadtrip.ui.*` sind erlaubt.
- **State-Struktur:** `S.projects`, `S.features`, `S.notes`, `S.analyses`, `S.chats`, `S.importVersions`.
- **Migrations-/Normalisierungslogik** beim Laden (alte deutsche Statuswerte).
- **Sprintstart-JSON-Validierung** (`type === "roadtrip-sprint-start"`, Pflichtfelder).
- **Gist-Sync-, Trello-, Import-/Export-Logik** (Verträge, Felder, Endpoints).
- **Element-IDs, Event-Handler-Bindings, Funktionsnamen.** UI-Buttons behalten ihre `id`.
- **Funktions-Vokabular:** Projekt, Feature, Sprint, Hauptchat, Handoff. **Keine** narrative Umbenennung (kein „XP→Meilen"). Die Landkarten-Metapher ist rein visuell/atmosphärisch, **nicht** im Datenmodell.

**Token-Strategie:** Neue kanonische Tokens definieren, alte Variablennamen als umgefärbte **Aliase** behalten, damit Bestandscode automatisch erbt. Render-Code möglichst nicht anfassen — nur `:root`-Werte und CSS-Klassen ändern.

**Globaler Smoke-Test (nach JEDER Etappe):**
- Syntaxcheck (Pattern aus `readme.md`, z. B. `node --check` bzw. das dort genutzte `node -e`).
- App lädt ohne Konsolenfehler; ein bestehendes Projekt mit Features/Sprints rendert.
- `JSON-Export → Re-Import` ergibt identische Daten (mindestens einmal pro 3 Etappen prüfen).

---

## ETAPPE 0 — Sicherung & Inventar
**Tun:** Branch `atlas-redesign` anlegen. `index.html` sichern (Kopie `index.legacy.html` lokal, nicht committen falls unerwünscht). Alle Vorkommen von `--accent-2`/Indigo, Inline-`style="…"` im Render-Code und Pill-/Filter-Stellen auflisten (als Kommentar/Notiz, kein Codeumbau).
**Smoke-Test:** App startet unverändert; Inventarliste liegt vor.
**Commit:** `chore(atlas): branch + inventory, no behavior change`

## ETAPPE 1 — Token-Block (`:root`)
**Tun:** Den `:root`-Block durch die hellen Atlas-Tokens aus `DESIGN.md §2` ersetzen. Alte Namen als Aliase setzen (`DESIGN.md §3`). `--accent-2` auf `var(--info)` mappen (Indigo wird ruhiger Info-Ton, **kein** zweiter Primary). Google-Fonts laden: Cormorant Garamond, IBM Plex Sans, IBM Plex Mono. `body` auf `--font-ui`, `--paper`, `--ink`.
**Smoke-Test:** App ist hell, kein Element unsichtbar (kein weiß-auf-weiß), Theme-Wechsel Atlas/E-Ink wirft keine Token-Lücke.
**Commit:** `feat(atlas): light token block + font roles, legacy vars aliased`

## ETAPPE 2 — Typografie-Rollen
**Tun:** Überschriften (`h1/h2/h3`, `.display`) auf `--font-display` (Serif). Eyebrows/`.section-label`, alle Counts/Timestamps/Zahlen auf `--font-mono` (`.num`/`.mono`, `tnum`). Fließtext `--font-ui`. Größen aus `DESIGN.md §2`.
**Smoke-Test:** Überschriften sind Serif, Zahlen sind Mono, Fließtext Sans; nichts überlappt.
**Commit:** `feat(atlas): typographic roles (serif headings, mono numerals)`

## ETAPPE 3 — Buttons
**Tun:** `.btn`/`.btn-primary`/`.btn-secondary`/`.btn-ghost`/`.btn-danger` gemäß `DESIGN.md §4`. Hover-Lift (`transform: translateY`) entfernen, Hover nur Background/Border. Focus = `--ring`. Pro Bereich **genau ein** Primary; überzählige Primaries auf Secondary/Ghost herabstufen.
**Smoke-Test:** Jeder Panel-Kopf hat ≤ 1 Primary; Buttons reagieren; Tab-Fokus sichtbar.
**Commit:** `feat(atlas): button hierarchy, one primary per region`

## ETAPPE 4 — Pills & Filter-Pills
**Tun:** `.pill` auf Soft-Tint + farbige Schrift + optional `.dot`. Filter-Reihen: aktive Pill `pill-accent`, Rest `pill-outline`, genau eine aktiv pro Achse. `:has(input:checked)`/explizite `is-active`-Klasse berücksichtigen. **Keine** Pill-Farbe als Zeilen-/Karten-Hintergrund.
**Smoke-Test:** Status-/Pool-/Kategorie-Filter schalten korrekt; keine Zeile ist flächig eingefärbt.
**Commit:** `feat(atlas): soft-tint pills + single-active filter pills`

## ETAPPE 5 — Karten, Notices, Tabellen
**Tun:** `.card`/`.panel` auf helles `--surface` + `--sh-1` + Serif-Köpfe. `.notice` auf 2px-Stripe + Soft-Tint. Tabellen: kein Zebra, keine Zeilen-Fills, Mono-`th`, `--rule-faint`-Trenner, `overflow-x:auto` im Container.
**Smoke-Test:** Tabellen lesbar & ohne Zebra; Notices haben Stripe statt Vollrahmen; schmaler Viewport scrollt Tabelle horizontal.
**Commit:** `feat(atlas): cards, stripe-notices, quiet tables`

## ETAPPE 6 — Sidebar & IA-Gruppierung
**Tun:** Sidebar in Gruppen **Reise** (Karte, Momentum), **Werkstatt** (Datenbank, Notizen, Lernen), **Werkzeuge** (Import, Einstellungen) gemäß `ARCHITECTURE.md (a)`. **Projekt-Item auf Titel + Aktiv-Zustand + genau EIN Sekundärsignal** reduzieren (4 Etappen-Dots = Sprint-Zyklus-Fortschritt). Feature-Count/Timestamp/Hauptchat-Status/Sprint-Count aus dem Sidebar-Item **entfernen** (wandern in den Workspace). Bestehende `view`-Werte und Handler beibehalten.
**Smoke-Test:** Navigation wechselt alle Views; Projektauswahl öffnet Workspace; Sidebar-Item zeigt nur Titel + 1 Signal.
**Commit:** `feat(atlas): regrouped sidebar + calm project items`

## ETAPPE 7 — Karten-Übersicht (neuer Startpunkt)
**Tun:** Neue View `overview` (ruhiger Startpunkt vor den Detail-Views): gezeichnete Karte mit Projekt-Reisezielen (dekorative `--hue-*`-Punkte, Routen, Kompass, Maßstab) + Momentum-Liste darunter. Default-View beim ersten Laden = `overview` (UI-Key `roadtrip.ui.view`, **kein** Datenschema-Eingriff). Reiseziel-Klick → Workspace.
**Smoke-Test:** App startet auf der Karte; Knoten-Klick öffnet das richtige Projekt; „Neues Projekt" legt an.
**Commit:** `feat(atlas): map overview as calm entry point`

## ETAPPE 8 — Projekt-Workspace: Status-Strip & Momentum-Toggle
**Tun:** Schlanker Header (Crumb + H1 + Status-Pill + **1** Primary „Hauptchat um Sprintstart bitten"). Darunter Status-Strip (Status · Fokus · Nächster Schritt · Hauptchat; Hauptchat-Karte klickbar → Chat-Liste). Momentum mit zwei Zuständen (`is-open` 2×2 / `is-collapsed` Einzeiler), Toggle persistiert in `localStorage.roadtrip.ui.momentumCollapsed[<projectId>]`.
**Smoke-Test:** Momentum einklappen → neu laden → Zustand bleibt; Hauptchat-Karte scrollt zur Chat-Liste.
**Commit:** `feat(atlas): project status-strip + persistent momentum toggle`

## ETAPPE 9 — Sprint-Zyklus-Block (4 Etappen)
**Tun:** Sprint-Bereich als 4 nummerierte Etappen entlang einer Route: **Start · Importieren · Abschluss · Übergabe** (`ARCHITECTURE.md (b)`). Genau ein Primary an der aktuellen Etappe. Migrations-/Kontext-Aktionen (Zum Hauptchat-Kontext zurück / Neuen Kontext bauen / Update-Prompt / Alten Sprintchat migrieren) in eingeklappten **Advanced**-Footer. Bestehende Button-IDs/Handler erhalten.
**Smoke-Test:** Voller Durchlauf: Start-Prompt → Sprintstart-JSON-Import → Sprintchat angelegt → Abschluss-Prompt → **Handoff-Import setzt `chats[].status = "abgeschlossen"`**.
**Commit:** `feat(atlas): four-stage sprint cycle + advanced footer`

## ETAPPE 10 — Chats & Sprints
**Tun:** Hauptchat oben gepinnt (Pill „Hauptchat"), Typ-Stripe-Karten (`type-main/-sprint/-branch`, `is-done`). **Abgeschlossene Sprints per Default ausgeblendet**, Toggle „Abgeschlossene Sprints anzeigen/ausblenden" (UI-Key). Counter-Pill „x aktiv · y abgeschlossen ausgeblendet".
**Smoke-Test:** Toggle blendet abgeschlossene Sprints ein/aus und persistiert; Counter stimmt.
**Commit:** `feat(atlas): pinned main chat + collapsible done sprints`

## ETAPPE 11 — Feature-Datenbank-Toolbar
**Tun:** Pool als **Segmented Control** (Geplant · Umgesetzt). Status-Filter **abhängig** vom Pool (`planned` ↔ `implemented`) via bestehender `ensureValidStatusFilterForPool`. Tabelle ≤ 6 Spalten (Titel, Pool, Status, Priorität, Kategorie, Aktualisiert), Pool/Status nur über Pills.
**Smoke-Test:** Pool-Wechsel `planned` ↔ `implemented` passt Status-Filter an; Suche filtert; keine ungültige Filterkombination.
**Commit:** `feat(atlas): feature-db segmented pool + dependent status filter`

## ETAPPE 12 — Import / Cleanup-Review
**Tun:** Drei Stufen (Quelle · Prompt+Import · Review). Counter-Pill „x neu · y Updates · z Dubletten · w übernommen". Review-Karten-Aktionsleiste **immer** in dieser Reihenfolge (`DESIGN.md §6`): Primary (aktualisieren **oder** neu anlegen) → Secondary (trotzdem neu) → Danger (Papierkorb, nur bei `duplicateFeatureId`) → Ghost (Nicht übernehmen, `margin-left:auto`). Behandelte Karten gedimmt sichtbar, Buttons deaktiviert, Status-Pill.
**Smoke-Test:** Drei Fälle (Ziel erkannt · kein Ziel · Dublette) zeigen die korrekte Buttonreihenfolge; behandelte Karte bleibt gedimmt.
**Commit:** `feat(atlas): cleanup-review action order + resolved dimming`

## ETAPPE 13 — Einstellungen-Gruppen
**Tun:** Reihenfolge Darstellung → Gist → Trello → Datenverwaltung. Notfall-Export/Raw-Backup/Speicherdiagnose und Gist-Token in **Advanced/Danger-Zone** (2px-Danger-Stripe, ghost-only). Theme-Auswahl Atlas/E-Ink.
**Smoke-Test:** Settings-Gruppen in Reihenfolge; Notfall/Raw nur nach Aufklappen erreichbar; Theme-Wechsel ohne Token-Lücke.
**Commit:** `feat(atlas): settings groups + advanced danger zone`

## ETAPPE 14 — Schmal-Viewport
**Tun:** ≤ 940 px Sidebar → Off-Canvas-Drawer (Hamburger + Scrim); Status-Strip 2-spaltig; Momentum 1-spaltig; Sprint-Zyklus 2-spaltig (Route-Linie aus). ≤ 560 px alles 1-spaltig. Ein Primary im Topbar.
**Smoke-Test:** Bei 390 px / 768 px / 1280 px: Drawer öffnet/schließt, nichts läuft über, ein Primary sichtbar.
**Commit:** `feat(atlas): narrow-viewport sidebar drawer + reflow`

## ETAPPE 15 — Inline-Style-Bereinigung & Abschluss
**Tun:** Verbliebene Inline-`style`s im Render-Code, die das Designsystem überschreiben, in CSS-Klassen überführen. `--accent-2`/Indigo-Reste prüfen: zu Info/Hue degradieren, nie als Aktion. Voller Regressionslauf der Smoke-Tests aus `DESIGN.md §13`.
**Smoke-Test:** Alle 9 Tests aus `DESIGN.md §13` grün; kein gefüllter Akzent im E-Ink; Export/Import identisch.
**Commit:** `refactor(atlas): inline-style cleanup + final regression`

---

## ARBEITSWEISE
- Pro Etappe: kleiner Diff, ein Commit, Smoke-Test, kurze Ergebnisnotiz.
- Render-Logik nicht umbauen, wenn eine CSS-Klasse genügt.
- Bei Konflikt mit den **harten Grenzen**: anhalten und melden, nicht umgehen.
- Visuelle Referenz ist `Roadtrip Atlas Redesign.html`; verbindliche Regeln stehen in `docs/DESIGN.md`.

*Roadtrip · Codex-Handoff · Atlas-Skin · Sprint 25*
