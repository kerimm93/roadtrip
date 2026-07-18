# Roadtrip — DESIGN.md (Atlas-Skin)

> Designsystem für Roadtrip · **helles, warmes „Atlas/Roadtrip"-Skin**.
> Single-File-HTML · Vanilla JS · CSS Custom Properties.
> Keine Tailwind-Klassen, kein Framework, kein Build-Step.
> Diese Datei beschreibt Regeln und Tokens — sie ist ein **Skin- und IA-Refactor, kein Rewrite**.
> Begleitprototyp: `Roadtrip Atlas Redesign.html`.

---


> Aktualisierung 2026-07-18: Dieses Dokument bleibt das Designsystem und
> die Designreferenz für Roadtrip, wird aber nicht mehr als 1:1-Atlas-Umsetzungsplan
> gelesen. Der produktive Stand ist die Single-File-HTML-/Vanilla-JS-App
> `index.html`; der Prototyp ist Inspiration, kein Soll-Stand. Roadmap-Ideen in
> diesem Dokument sind ausdrücklich nicht automatisch implementiert.

## 0 · Aktueller Design-Contract ab 2026-07-18

Roadtrip ist ein ruhiges Meta-Tool für Projekt-, Feature-, Chat- und
Sprintsteuerung. Das UI soll Kontext ordnen, nächste Aktionen sichtbar machen und
Prompt-/Handoff-Arbeit unterstützen, ohne die App in ein schweres Dashboard oder
einen Prototyp-Nachbau zu verwandeln.

### Prototyp-Status

- Der Roadtrip-/Atlas-Prototyp ist Designreferenz und Inspirationsquelle.
- Er ist kein 1:1-Bauplan, keine aktuelle Architektur und kein automatischer
  Implementierungsauftrag.
- Wo Prototyp und aktueller Roadtrip-Stand kollidieren, gelten produktiver Code und
  `DECISIONS.md`.

### Gewünschte Designrichtungen

Diese Richtungen sind Leitplanken für spätere UI-Sprints, nicht Behauptungen über
bereits umgesetzte Features:

- Beziehungskarte als elegante Projektlandkarte / Graph-Visualisierung, aber nur
  als eigener späterer Sprint mit Schema-/Contract-Entscheidung.
- Momentum-Übersicht als Meta-Dashboard für Fokus, Bewegung, Blocker und nächste
  Schritte.
- Sidebar mit sprechenden Icons, Labels und klarer Hierarchie statt bloßer
  Bubble-Sprache.
- Sprintzyklus als 4-Schritt-Prozess; die primäre Aktion soll direkt unter oder
  bei dem offenen Schritt liegen.
- Projektansicht als Meta-Tool: Status, Fokus, Features, Chats, Sprints, Ressourcen
  und Handoffs sollen zusammen lesbar bleiben.
- Aktive, abgeschlossene und ausgeblendete Chats klar unterscheiden.
- Copy-/Prompt-Aktionen bevorzugt mit ruhigen Toasts bestätigen statt unnötige
  Aufklappbereiche zu erzeugen.
- Notes Workspace ruhig, minimalistisch und textfreundlich halten.
- Settings clean gruppieren; Verbindung/Sync nicht in destruktiven Bereichen
  verstecken.
- Sync langfristig auf globale Sichtbarkeit prüfen, ohne Sync-/Token-Verträge
  nebenbei zu ändern.
- Feature Database optisch beruhigen, aber nicht auf die niedrigere
  Prototyp-Komplexität zurückbauen.
- Lern-/Skill-Ansicht in Roadtrip eher als Chat-Verarbeitung, Themenverteilung,
  Lernmaterial-Backlog und Projekt-/Deep-Research-Impulse interpretieren, nicht als
  simple alte Lernziel-Logik.

### Mermaid Preview und `featureFlow`

- `featureFlow` ist ein optionales Textfeld für Mermaid-/Feature-Flow-Quelltext.
- Eine Mermaid Preview ist optional und erscheint nur sinnvoll bei befülltem
  `featureFlow`.
- Die Preview verändert den gespeicherten Text nicht.
- Renderfehler sollen sichtbar, aber nicht destruktiv sein.
- Preview-Polish darf keine Datenmodell-, Import-/Export- oder Promptvertrag-Änderung
  verdeckt mitbringen.


### Cleanup-Workbench / Review-UX

Dieser Abschnitt ist ein UX-Vertrag für die geplante persistente Cleanup-Workbench.
Er beschreibt Zielprinzipien, keine bereits implementierte vollständige Workbench.
Der aktuelle Code enthält Cleanup-Import, Hauptchat-/Dedupe-Rückgaben, lokale
Validierung, Preview und einen engen Confirm-/Commit-MVP für bestimmte
`update-existing`-Fälle; der dauerhafte Run-/Fall-Arbeitsstand ist noch geplant.

- **Wiederaufnahme statt Neustart:** Ein Analyse-/Cleanup-Lauf soll nach Hard Reload
  wiederherstellbar sein, statt nur im temporären Textarea-/Preview-Zustand zu
  existieren.
- **Herkunft und Baseline:** Jeder Fall braucht sichtbare Quelle, betroffene
  Featurebindung, ursprünglichen CSV-/Featurestand und Analysegrund.
- **Fallstatus:** Status wie offen, geprüft bestätigt, bewusst offen, zurückgestellt,
  Browser-Test nötig, Dedupe-Entscheidung vorhanden, nicht übernommen, commitbereit
  oder angewendet sind Produktkontext für die geplante Workbench, aber noch nicht
  als implementierte Statusliste zu behandeln.
- **Nächste Aktion:** Pro Fall muss erkennbar sein, ob eine menschliche Entscheidung,
  ein Hauptchat-Abgleich, ein Dedupe-Review, ein Browser-Test oder ein Commit-Diff
  als nächstes ansteht.
- **Preview versus echte Mutation:** Preview-Ergebnisse, Dedupe-Entscheidungen und
  nicht-mutierende Reviews dürfen visuell nicht wie gespeicherte Featureänderungen
  wirken. Echte Mutation benötigt klaren Diff, Confirm und Ergebnisnotiz.
- **Präzise Fehlerursache:** Ungültiges JSON muss als Parse-/Syntaxfehler erscheinen
  und darf nicht als „keine Vorschläge“ oder gültiges leeres Ergebnis dargestellt
  werden.
- **Progressive Disclosure:** Lange Evidenz, Modellbegründungen, Diffs, Baselines und
  JSON-Felder gehören in aufklappbare Details, damit Reviewkarten ruhig bleiben.
- **Nicht-mutierende Entscheidungen:** `no-change`, `keep-open`, `defer`,
  `needs-browser-test`, `needs-project-decision` und Ablehnungen sind
  Reviewentscheidungen, keine Featurefeldänderungen.
- **Dedupe ohne versteckte Apply-Aktion:** Dedupe darf Entscheidungen sichtbar
  machen, aber keine implizite Merge-/Archivierungs-/Löschaktion anbieten.
- **Sicherer Confirm-/Commit:** Nur ausdrücklich ausgewählte, lokal validierte
  `update-existing`-Änderungen an zulässigen Feldern dürfen in den bestehenden
  Diff-/Confirm-/Commitpfad.

### Historische Designreferenz vs. aktueller Contract

Atlas-Tokens, ruhige Panels, eindeutige Primäraktionen, Pills, Progressive
Disclosure und die klare Trennung von Navigation/Arbeitsfläche/Status/Advanced
bleiben relevante Designprinzipien. Ältere konkrete Screen- oder Buttonlisten in
diesem Dokument sind jedoch dort historisch zu lesen, wo der aktuelle Code
Preview-, Hauptchat-, Dedupe- und Confirm-Pfade differenzierter abbildet. Alte
Cleanup-Review-Buttonreihenfolgen sind keine vollständige Beschreibung des heutigen
Hauptchat-/Dedupe-Decision-Preview- und Commit-MVP.

### Feature Database

- Die Feature Database ist ein Arbeitsbereich für planned und implemented Features
  und für Soll-/Ist-Denken.
- Planned-Feature-Detailfelder (`purpose`, `workflowContext`,
  `acceptanceCriteria`, `sourceContext`) sollen Kontext liefern, aber UI-seitig
  beherrschbar bleiben.
- Die Feature Database soll nicht blind komplexer werden; Komplexität braucht einen
  Workflow-Nutzen.
- Umgekehrt soll sie nicht auf den alten Prototyp-Stand vereinfacht werden, weil der
  heutige Feature-/Prompt-Workflow mehr Kontext benötigt.

## 1 · Prinzipien

- **Hell und warm statt dunkel.** Pergament-/Papier-Canvas als Grund. Eine Oberfläche, in die man gerne schaut.
- **Genau ein Akzent.** Eine einzige Aktionsfarbe (Wachssiegel-Zinnober). **Niemals zwei Primärfarben.** Dekorative Kartenfarben sind erlaubt, aber strikt von UI-Aktionen getrennt.
- **Landkarten-Optik, dosiert.** Die Übersicht ist eine echte gezeichnete Karte; sonst bleiben Kompass/Routen/Maßstab ruhige Atmosphäre — nie Lärm.
- **Funktionsrollen-Typografie.** Display-Serif für Überschriften, humanistische Sans für Fließtext, Mono für **alle** Zahlen/Counts/Timestamps. Hierarchie über Schrift, nicht über Farblärm.
- **Status nur über Pills.** Niemals über Zeilen-/Karten-Hintergrundflächen.
- **Eine Hauptaktion pro Bereich.** Pro Panel-Kopf genau ein Akzent-Button; alles andere sekundär/ghost.
- **Progressive Disclosure als Pflicht.** Pro Screen explizit definiert, was default sichtbar ist und was eingeklappt in „Advanced/Werkzeuge" liegt.
- **Ruhig vor reich.** Wenige Linien, kein Schattenrauschen, Trennung über Linealfarbe und Flächenwechsel.
- **Vier UI-Modi getrennt:** Navigation (Sidebar) · Arbeitsfläche · Status (Strip) · Advanced/Werkzeuge.
- **Touch-tauglich:** Tap-Targets ≥ 40 px, Listenitems ≥ 44 px effektive Höhe.

---

## 2 · Design-Tokens (hell)

### Paper / Surfaces (warmes Pergament)

```
--paper:        #F4ECDC   /* App-Canvas */
--paper-edge:   #EADFC9   /* gesenkt / Kartenfeld */
--surface:      #FCF8EF   /* Karten / Panels */
--surface-2:    #F6EFE0   /* innere / ruhige Panels */
--surface-3:    #EFE6D2   /* Hover / Segmented aktiv */
```

### Ink (warmes Fast-Schwarz → blass)

```
--ink:        #2C2419
--ink-mid:    #6C6051
--ink-dim:    #9A8B73
--ink-quiet:  #BCAC90
--on-accent:  #FBF4E8
```

### Lineal-Linien

```
--rule:        #E3D8C1
--rule-strong: #CFC0A3
--rule-faint:  #ECE3D1
```

### Der eine Akzent — Wachssiegel-Zinnober

```
--accent:      #C24A2B   /* einzige Aktionsfarbe */
--accent-hi:   #D45B3A   /* Hover */
--accent-deep: #9F3A1E   /* Text auf hellem Grund */
--accent-soft: rgba(194,74,43,0.10)
--accent-line: rgba(194,74,43,0.30)
```

### Dekorative Karten-/Kategorie-Farben — **niemals UI-Aktionen**

```
--hue-sage:  #6F7E63
--hue-slate: #5C748A
--hue-plum:  #7E6A88
--hue-ochre: #A9823F
--hue-teal:  #4E8079
```

Nur für Karten-Reiseziel-Punkte, Projekt-Pips und Kategorie-Swatches. **Nie** auf Buttons.

### Semantik (gedämpft, nur in Pills)

```
--ok:     #4F7A52   --ok-soft:     rgba(79,122,82,0.12)
--warn:   #A9772B   --warn-soft:   rgba(169,119,43,0.13)
--danger: #A8432B   --danger-soft: rgba(168,67,43,0.12)
--info:   #4F6E89   --info-soft:   rgba(79,110,137,0.12)
--neutral-soft: rgba(120,108,88,0.10)
```

### Radius

```
--r-xs: 4px   /* Tag-Chips */
--r-sm: 7px   /* Buttons, Inputs */
--r-md: 11px  /* Inner Panels, Boxen */
--r-lg: 16px  /* Karten, Hauptpanels */
--r-xl: 22px  /* App-Shell-Außenkante */
--r-pill: 999px
```

### Spacing (Base 4)

```
--s-1:4 · --s-2:8 · --s-3:12 · --s-4:16 · --s-5:24 · --s-6:32 · --s-7:48 · --s-8:64
```

### Shadow (flüsterleise)

```
--sh-1: 0 1px 2px rgba(70,52,24,0.05)        /* Default-Karten */
--sh-2: 0 10px 30px -16px rgba(70,52,24,0.28) /* Popover, Map-Flag */
--sh-3: 0 24px 60px -22px rgba(70,52,24,0.40) /* Modal, mobile Sidebar */
--ring: 0 0 0 3px rgba(194,74,43,0.28)        /* Focus-Ring */
```

### Typografie

```
--font-display: "Cormorant Garamond", "Iowan Old Style", Georgia, serif
--font-ui:      "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif
--font-mono:    "IBM Plex Mono", ui-monospace, Consolas, monospace

Display   34px / 600 / 1.08 / -0.01em   (Cormorant Garamond)
H2        25px / 600 / 1.15             (Cormorant Garamond)
H3        20px / 600 / 1.20             (Cormorant Garamond)
Body      15px / 400 / 1.55             (IBM Plex Sans)
Body-em   15px / 500 / 1.55
Meta      13px / 400                    (IBM Plex Sans, --ink-dim)
Eyebrow   11px / 500 / uppercase / 0.18em (IBM Plex Mono)
Mono      Zahlen/Counts/Timestamps      (IBM Plex Mono, tnum)
```

**Regel:** Jede Zahl, jeder Count, jeder Timestamp und jeder Code-Schnipsel ist Mono. Überschriften sind immer Serif. Fließtext immer Sans.

---

## 3 · Mapping (Dark-Bestand → Atlas-hell)

Alte Variablennamen bleiben als **umgefärbte Aliase** bestehen, damit der Bestandscode automatisch erbt — nur die `:root`-Werte ändern sich.

```css
:root {
  /* neue kanonische Tokens … (siehe §2) */

  /* Aliase für bestehenden Code */
  --bg:           var(--paper);
  --bg-mid:       var(--paper-edge);
  --surface:      var(--surface);       /* bleibt, jetzt hell */
  --border:       var(--rule);
  --border-light: var(--rule-strong);
  --ink:          var(--ink);
  --ink-light:    var(--ink-mid);
  --ink-dim:      var(--ink-dim);
  --accent:       var(--accent);        /* Gold → Zinnober */
  --accent-2:     var(--info);          /* Indigo → ruhiger Info-Ton, KEIN zweiter Primary */
  --green:        var(--ok);
  --yellow:       var(--warn);
  --red:          var(--danger);
  --blue:         var(--info);
  --radius:       var(--r-lg);
}
```

**Wichtig:** `--accent-2` (vormals Indigo) wird zu einem ruhigen Info-Ton degradiert und darf **nie** mehr als Navigations-/Aktions-Akzent neben `--accent` auftreten. Wo der Bestand „Alle Projekte/Sprint" mit Indigo akzentuierte, übernimmt jetzt der dekorative `--hue-slate` (Atmosphäre) bzw. `--accent` (Aktion).

E-Ink-Theme bleibt funktional erhalten (alles `--ink`/`--rule`, kein Akzent gefüllt).

---

## 4 · Komponentenregeln

### Buttons

```
.btn            height 40 · padding 0 16 · radius 7 · 500 · border --rule-strong · bg --surface · color --ink
.btn-primary    bg --accent · color --on-accent · 600        → maximal 1 pro Bereich
.btn-secondary  transparent · border --rule-strong · color --ink
.btn-ghost      transparent · borderless · color --ink-mid    → „Mehr…", „Advanced öffnen", Toggles
.btn-danger     transparent · color --danger · border rgba(danger,.4) → nie gefüllt; nur destruktiv + „Nicht übernehmen"
.btn-sm 32px · .btn-icon quadratisch
```

Hover ändert nur Background/Border, **kein** `transform: translateY`. Focus = `--ring`.

### Pills / Badges — Status lebt NUR hier

```
.pill           bg --neutral-soft · color --ink-mid · Mono 11.5px · radius pill
.pill.dot       6px Punkt in currentColor davor
.pill-ok / -warn / -danger / -info   Soft-Tint + farbige Schrift
.pill-accent    --accent-soft + --accent-deep
.pill-outline   transparent + 1px --rule-strong
```

**Niemals** Pill-Farbe als ganzen Zeilen-/Karten-Hintergrund. Filter-Pills: genau **eine** aktive Pill pro Achse (`pill-accent` aktiv, sonst `pill-outline`).

### Karten / Panels

```
.card / .panel  bg --surface · 1px --rule · radius 16 · shadow --sh-1 · padding var(--pad)
.quiet          bg --surface-2 · 1px --rule · radius 11   (innere Boxen)
.panel-head     Flex space-between; links Eyebrow(Mono)+H3(Serif), rechts 1 Aktion
```

### Notices — 2px-Stripe, Soft-Tint

```
.notice         bg --warn-soft · border-left 2px --warn · radius 0 7 7 0
.notice-info / .notice-danger   Stripe + Soft-Tint in jeweiliger Semantikfarbe
```

Keine vollen Borders, kein Drop-Shadow.

### Advanced-Container — dashed, eingeklappt, ghost-only

```
.advanced       1px dashed --rule-strong · radius 11
.advanced-head  Mono uppercase 11px / 0.16em · --ink-dim · klickbar (Caret rotiert)
.advanced-body  nur .btn-ghost
```

### Segmented Control (Pool / View-Switch / Theme)

```
.segmented      bg --surface-2 · 1px --rule · radius 7 · padding 3
  button.active bg --surface · color --ink · shadow --sh-1
```

### Tabellen — kein Zebra, keine Zeilen-Fills

```
th  Mono uppercase 10.5px / 0.1em · --ink-dim · bg --surface-2 · border-bottom --rule
td  padding 12 14 · border-bottom --rule-faint · color --ink-mid
td.title  --ink · 500
tr:hover td  bg --surface-2
```

Max. 6 Spalten. Auf schmalen Viewports horizontal scrollen (`overflow-x:auto`), kein Reflow der Tabelle selbst.

### Chat-/Sprint-Karten — linker 2px-Stripe nach Typ

```
.chat-card           bg --surface-2 · 1px --rule · border-left 2px --rule-strong · radius 7
.type-main           border-left --accent
.type-sprint         border-left --hue-slate
.type-branch         border-left --rule-strong
.is-done             opacity .5 · border-left transparent
```

### Karten-Knoten (Übersicht)

```
.map-node .dot   18px · 3px --surface-Rand · Ring --rule-strong · Fill = Projekt-Hue (dekorativ)
.is-active .dot  Ring in --accent + --accent-soft
.map-node .flag  --surface-Karte mit Titel (Sans 600) + Meta (Mono)
```

### Sprint-Zyklus — 4 nummerierte Etappen entlang einer Route

```
.cycle-track     4-Spalten-Grid; gestrichelte Route (--rule-strong) dahinter
.stage .marker   44px Kreis, Mono-Nummer
  .done          gefüllt --accent (Häkchen)
  .current       Rand --accent + --accent-soft-Halo; zeigt den EINEN Primary-CTA
```

### Status-Strip (Status-Modus)

4 ruhige Karten: **Status · Fokus · Nächster Schritt · Hauptchat**. Die Hauptchat-Karte ist klickbar (`.status-card.link`) und führt zur Chat-Liste.

### Momentum

```
.momentum-grid       2×2: Fokus · Nächster Schritt · Top-Kandidaten · Blockiert/Aufgeschoben
.momentum-collapsed  Einzeiler: Fokus + Next Step + Counter-Pill
```

Toggle-Zustand persistiert: `localStorage.roadtrip.ui.momentumCollapsed[<projectId>] = true|false`.

### Empty States

Kein Bild. Aufbau: H3 (Serif) + Body-Zeile + **ein** Primary-Button.

---

## 5 · Informationsarchitektur (neu)

Die sieben Bestands-Views bleiben funktional, werden aber in **drei ruhige Gruppen** + den Projektkontext gefasst. Ein neuer Startpunkt **Karte** geht den Detail-Views voraus.

| Gruppe | Views | Rolle |
|---|---|---|
| **Reise** | Karte (neu), Momentum | Ruhiger Ankerpunkt: wo bin ich, was bewegt sich |
| **Projekt** | Projekt-Workspace | Erscheint **nach** Projektauswahl; trägt alle Projekt-Metadaten |
| **Werkstatt** | Datenbank, Notizen, Lernen | Arbeitsflächen über Projekte hinweg |
| **Werkzeuge** | Import · Cleanup, Einstellungen | Selten/utilitär; unten in der Sidebar, ruhig |

**Sidebar-Regel (Kern des Refactors):** Ein Projekt-Item zeigt **Titel + Aktiv-Zustand + genau ein Sekundärsignal** (4 Etappen-Dots = Sprint-Zyklus-Fortschritt). Alle weiteren Metadaten (Feature-Count, Timestamp, Hauptchat-Status, Sprint-Count) wandern in den Projekt-Workspace und erscheinen erst **nach** Auswahl.

**Was erst nach Projektauswahl erscheint:** Status-Strip, Momentum, Sprint-Zyklus, Chat-/Sprint-Liste, Ressourcen.

---

## 6 · Screen-Regeln (Default ↔ Eingeklappt)

| Screen | Default sichtbar | Eingeklappt in Advanced/Werkzeuge |
|---|---|---|
| **Karte (Übersicht)** | Karte mit Reisezielen, Momentum-Liste, „Neues Projekt" (1 Primary) | — |
| **Momentum-Dashboard** | Projektzeilen (Fokus, Next Step, Status), Sortier-Segmented | — |
| **Projekt-Workspace** | Header(1 Primary) · Status-Strip · Momentum · Sprint-Zyklus · Chats · Ressourcen | „Zum Hauptchat-Kontext zurück", „Neuen Hauptchat-Kontext bauen", „Update-Prompt erzeugen", „Alten Sprintchat migrieren" |
| **Sprint-Zyklus** | 4 Etappen (Start · Importieren · Abschluss · Übergabe), 1 Primary an der aktuellen Etappe | Migrations-/Kontext-Werkzeuge (s. o.) |
| **Chats & Sprints** | Hauptchat gepinnt, aktive Sprints/Branches; Counter-Pill | Abgeschlossene Sprints **default ausgeblendet** (Toggle) |
| **Feature-Datenbank** | Pool-Segmented (Geplant·Umgesetzt) · abhängige Status-Filter-Pills · Suche · Tabelle (≤6 Spalten) · 1 Primary | — |
| **Notizen** | Status-Filter-Pills, Notizkarten, 1 Primary | — |
| **Lernen** | Lernpfade mit Fortschrittsbalken, 1 Primary | — |
| **Import · Cleanup** | 3 Stufen (Quelle · Prompt+Import · Review), Counter-Pill, Review-Karten | — |
| **Einstellungen** | Darstellung · Gist · Trello · Datenverwaltung | Gist-Token; Notfall-Export, Raw-Backup, Speicherdiagnose (Danger-Zone, 2px-Stripe) |

### Historische Review-Karten-Regel (Import/Cleanup) — nicht vollständiger heutiger Cleanup-Contract

Diese Regel stammt aus dem Atlas-/Import-Review-Design. Für den heutigen Cleanup-Pfad gelten zusätzlich lokale Hauptchat-/Dedupe-Preview, Auswahl, Batch-Diff und Confirm.

1. **Primary** — `Bestehendes Feature aktualisieren` (Ziel erkannt) **oder** `Als neues Feature anlegen` (kein Ziel).
2. **Secondary** — `Trotzdem als neues Feature anlegen` (nur bei erkanntem Ziel).
3. **Danger-Secondary** — `In Papierkorb verschieben` (nur bei `duplicateFeatureId`).
4. **Ghost** — `Nicht übernehmen` (rechts via `margin-left:auto`).

Bereits behandelte Karten bleiben **gedimmt sichtbar** (`opacity .5`, Buttons deaktiviert) mit Status-Pill „übernommen"/„ignoriert".

### Einstellungen — Gruppenreihenfolge

1. **Darstellung** — Theme (Atlas/E-Ink), UI-Font, Serif-Modus.
2. **GitHub Gist** — Push, Pull, Token (Token in Advanced).
3. **Trello** — Token, Board-Verbindung.
4. **Datenverwaltung** — Export, Import, **gefolgt** von Danger-Zone (Notfall-Export, Raw-Backup, Speicherdiagnose) mit 2px-Danger-Stripe.

---

## 7 · Primäraktionen pro Workflow (genau eine pro Bereich)

| Workflow | Primary | Sekundär / Ghost |
|---|---|---|
| Projekt anlegen | **Neues Projekt** (Karte) | — |
| Sprint starten | **Hauptchat um Sprintstart bitten** (Projekt-Header) | Sprintstart-JSON importieren |
| Sprint importieren | **JSON importieren** (Etappe 2) | — |
| Sprint abschließen | **Sprintabschluss anfordern** (Etappe 3) | — |
| Sprint übergeben | **Sprint-Handoff importieren** (Etappe 4) | — |
| Feature anlegen | **Neues Feature** (Datenbank-Header) | — |
| Cleanup-Review | **Vorschläge laden**, dann pro Karte 1 Primary | Trotzdem neu / Papierkorb / Nicht übernehmen |
| Sync | **Push** (Settings) | Pull |

---

## 8 · Microcopy / Labels

| Funktion | Label |
|---|---|
| Hauptchat markieren | Als Hauptchat markieren |
| In Hauptchat zurückkehren | Zum Hauptchat-Kontext zurück |
| Neuen Hauptchat-Kontext vorbereiten | Neuen Hauptchat-Kontext bauen |
| Sprintabschluss anfordern | Sprintabschluss anfordern |
| Handoff importieren | Sprint-Handoff importieren |
| Abgeschlossene Sprints zeigen/verbergen | Abgeschlossene Sprints anzeigen / Abgeschlossene ausblenden |
| Momentum ein-/ausklappen | Momentum einklappen / Momentum ausklappen |
| Feature aktualisieren | Bestehendes Feature aktualisieren |
| Feature trotzdem neu | Trotzdem als neues Feature anlegen |
| Feature neu | Als neues Feature anlegen |
| Verwerfen | Nicht übernehmen |
| Dublette | In Papierkorb verschieben |
| Advanced | Advanced · Werkzeuge |

Empty-State-Texte:

- *Keine Projekte:* „Noch kein Projekt angelegt. Lege das erste Reiseziel an, um zu starten."
- *Keine Sprints:* „Noch keine Sprints. Starte den Zyklus mit „Hauptchat um Sprintstart bitten"."
- *Keine Review-Vorschläge:* „Keine Vorschläge geladen. Erzeuge den Cleanup-Prompt und füge das KI-JSON oben ein."
- *Keine Features im Pool:* „Keine Features in diesem Pool. Wechsle den Pool oder lege ein neues Feature an."

---

## 9 · Mobile / Schmal-Viewport

- **≤ 940 px:** Sidebar kollabiert zu Off-Canvas-Drawer (Hamburger im Topbar + Scrim). Status-Strip 2-spaltig, Momentum 1-spaltig, Sprint-Zyklus 2-spaltig (Route-Linie aus).
- **≤ 560 px:** Status-Strip & Sprint-Zyklus 1-spaltig.
- Im Topbar bleibt **ein** Primary sichtbar (kontextabhängig: „Sprintstart erbitten" im Projekt, sonst „Sync").
- Tabellen scrollen horizontal in ihrem Container.

---

## 10 · Historische Atlas-Umsetzungsreihenfolge

1. **Token-Block im `:root` ersetzen** (helle Atlas-Tokens), alte Namen als Aliase behalten. Fonts laden (Cormorant Garamond, IBM Plex Sans, IBM Plex Mono).
2. **Button-CSS** — Hierarchie primary/secondary/ghost/danger, Hover-Lift entfernen.
3. **Pills** auf Soft-Tint + farbige Schrift + optional Dot; Filter-Pills `pill-accent`/`pill-outline`.
4. **Notices** auf 2px-Stripe.
5. **Karten/Panels** auf helles Surface, `--sh-1`, Serif-Köpfe.
6. **Sidebar/IA neu** — Gruppen Reise/Werkstatt/Werkzeuge; Projekt-Item auf Titel + 1 Signal reduzieren.
7. **Karten-Übersicht** als neuer Startpunkt (View `overview`).
8. **Status-Strip** im Projekt-Workspace.
9. **Sprint-Zyklus-Block** in 4 nummerierte Etappen + Advanced-Footer.
10. **Chat-Karten** mit Typ-Stripe; Default „abgeschlossene ausgeblendet".
11. **Review-Cards** Aktionsleiste in spezifizierter Reihenfolge.
12. **Momentum-Toggle** + Persistierung pro Projekt.
13. **Feature-Datenbank-Toolbar** (Pool-Segmented, abhängiger Status-Filter).
14. **Settings-Gruppen** sortieren, Notfall/Raw in Danger-Zone.

---

## 11 · Schutzliste — nicht ohne expliziten Vertrag anfassen

- State-/Persistenzmodell des App-Datenstands; aktuelle Struktur aus `index.html` prüfen, nicht eine historische Teilmenge fortschreiben. Explizit beauftragte, migrationssichere Workbench-Erweiterungen sind möglich, aber nicht beiläufig.
- Neue rein visuelle UI-Keys nur, wenn sie keine Datenmodell-/Workflow-Änderung verdecken.
- Migrations-/Normalisierungslogik beim Laden (alte deutsche Statuswerte).
- Sprintstart-JSON-Validierung (`type === "roadtrip-sprint-start"`, Pflichtfelder).
- Gist-Sync-, Trello-, Import-/Export-Logik (Verträge, Felder, Endpoints).
- Element-IDs, Event-Handler-Bindings, Funktionsnamen.
- Funktions-Vokabular: Projekt, Feature, Sprint, Hauptchat, Handoff. **Keine** narrative Umbenennung (kein „XP→Meilen"). Die Landkarten-Metapher ist visuell/atmosphärisch, nicht im Datenmodell.

---

## 12 · Risiken

- **Inline-Styles** im Render-Code (zahlreich): müssen weitgehend in CSS-Klassen überführt werden, sonst überschreiben sie das Designsystem.
- **Pill als Filter-Checkbox**: neue Pill-Optik muss `:has(input:checked)` oder explizite `is-active`-Klasse berücksichtigen.
- **`--accent-2`-Reste**: jede Stelle prüfen, an der Indigo als zweiter Akzent auftrat — muss zu Info/Hue degradieren, nicht als Aktion erscheinen.
- **Dichte Tabellen**: schmaler Viewport → horizontal scrollen, kein Reflow.
- **Sprint-Status-Konsistenz**: beim Handoff-Import muss `chats[].status` auf `abgeschlossen` gesetzt werden.
- **Map-Layout**: Knoten-Koordinaten sind dekorativ/relativ; bei vielen Projekten Auto-Layout oder Liste statt Karte ab Schwelle.

---

## 13 · Smoke-Tests

1. Syntaxcheck (`node -e`-Pattern aus `readme.md`).
2. Projekt anlegen → Feature anlegen → Pool-Wechsel `planned` ↔ `implemented`.
3. Sprint-Zyklus voll durchlaufen: Start-Prompt → Sprintstart-JSON-Import → Sprintchat angelegt → Abschluss-Prompt → Handoff-JSON-Import → Sprintchat = `abgeschlossen`.
4. Cleanup-Review mit drei Fällen (Ziel erkannt · kein Ziel · Dublette) — Button-Reihenfolge stimmt.
5. Momentum-Toggle: einklappen, neu laden, Zustand bleibt.
6. „Abgeschlossene Sprints anzeigen/ausblenden" — persistiert.
7. JSON-Export + Re-Import: Daten unverändert.
8. Theme-Wechsel Atlas / E-Ink: keine Token-Lücken, kein gefüllter Akzent im E-Ink.
9. Schmal-Viewport: Sidebar-Drawer öffnet/schließt, Strip & Zyklus reflowen, ein Primary im Topbar.

---

*Roadtrip · DESIGN.md · Atlas-Skin als historische Designbasis · aktualisiert 2026-07-18*
