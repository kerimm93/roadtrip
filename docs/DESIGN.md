# Roadtrip — DESIGN.md

> Designsystem für Roadtrip.
> Single-File-HTML · Vanilla JS · CSS Custom Properties.
> Keine Tailwind-Klassen, kein Framework, kein Build-Step.
> Diese Datei beschreibt Regeln und Tokens — keine React-Komponenten.

---

## 1 · Prinzipien

- **Ruhig vor reich.** Wenige Borders, viel Whitespace, keine Hover-Lifts.
- **Eine Hauptaktion pro Bereich.** Sekundäres bleibt sichtbar sekundär.
- **Sprint-Zyklus ist linear.** Vier Stufen, immer in derselben Reihenfolge.
- **Advanced/Legacy ist eingeklappt.** Niemals auf Primary-Hierarchieebene.
- **Status über Pills**, niemals über volle Zeilen-/Karten-Hintergrundfarben.
- **Dark First**, Light und E-Ink bleiben funktional erhalten.
- **Touch-tauglich:** Tap-Targets ≥ 38 px, Listenitems ≥ 44 px effektive Höhe.

---

## 2 · Design-Tokens

### Farben (Dark)

```
--rt-bg:            #0E1117
--rt-bg-elevated:   #141923
--rt-surface:       #1A2030
--rt-surface-2:     #232A3C
--rt-surface-3:     #2C3447
--rt-surface-quiet: #161B26

--rt-border-line:   #2A3346
--rt-border-strong: #3A4760

--rt-ink:           #E8ECF3
--rt-ink-mid:       #A3AEC1
--rt-ink-dim:       #6B7689
--rt-ink-quiet:     #4F596C
--rt-on-accent:     #15161A

--rt-gold:          #C9A86A    /* einziger Primary */
--rt-gold-hi:       #DDBE85
--rt-gold-soft:     rgba(201,168,106,0.14)
--rt-gold-line:     rgba(201,168,106,0.35)

--rt-indigo:        #7B8FE0    /* nur Sprint-Kontext */
--rt-indigo-soft:   rgba(123,143,224,0.14)

--rt-success:       #6BB590
--rt-warning:       #D4A856
--rt-danger:        #D27575
--rt-info:          #7AA4D6
--rt-success-soft:  rgba(107,181,144,0.13)
--rt-warning-soft:  rgba(212,168,86,0.13)
--rt-danger-soft:   rgba(210,117,117,0.13)
--rt-info-soft:     rgba(122,164,214,0.13)
--rt-neutral-soft:  rgba(163,174,193,0.10)
```

### Radius

```
--r-xs:   4px      /* Tag-Chips */
--r-sm:   6px      /* Buttons, Inputs */
--r-md:   10px     /* Inner Panels, Boxen */
--r-lg:   14px     /* Karten, Hauptpanels */
--r-xl:   18px     /* Hero / App-Shell-Außenkante */
--r-pill: 9999px   /* Pills, Badges */
```

### Spacing (Base 4)

```
--s-1: 4px · --s-2: 8px · --s-3: 12px · --s-4: 16px
--s-5: 24px · --s-6: 32px · --s-7: 48px · --s-8: 64px
```

### Shadow

```
--sh-0: none                                    /* Default */
--sh-1: 0 1px 0 rgba(0,0,0,0.4)                 /* Sticky-Top/-Footer */
--sh-2: 0 4px 14px rgba(0,0,0,0.28)             /* Popover, Dropdown */
--sh-3: 0 18px 40px -10px rgba(0,0,0,0.5)       /* Modal */
--ring: 0 0 0 2px rgba(201,168,106,0.40)        /* Focus-Ring */
```

### Typografie

```
--font-ui:   'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif
--font-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Consolas, monospace

--t-display:   30px / 600 / line-height 1.15 / letter-spacing -0.015em
--t-h1:        22px / 600 / 1.25 / -0.005em
--t-h2:        17px / 600 / 1.35
--t-h3:        14px / 600 / uppercase / letter-spacing 0.10em
--t-body:      14px / 400 / 1.55
--t-body-em:   14px / 500 / 1.55
--t-meta:      12px / 400 / 1.45
--t-eyebrow:   10px / 600 / uppercase / 0.12em
--t-mono:      12px / 400 (JetBrains Mono)
```

---

## 3 · Mapping (bestehend → neu)

```
--bg            → --rt-bg
--bg-mid        → --rt-bg-elevated
--surface       → --rt-surface
--surface-2     → --rt-surface-quiet
--surface-3     → --rt-surface-2
--border        → --rt-border-line
--border-light  → --rt-border-strong
--ink           → --rt-ink
--ink-light     → --rt-ink-mid
--ink-dim       → --rt-ink-dim
--accent        → --rt-gold
--accent-2      → --rt-indigo
--green         → --rt-success
--yellow        → --rt-warning
--red           → --rt-danger
--blue          → --rt-info
--radius        → --r-lg          (Karten)
                  --r-sm          (Buttons & Inputs)
```

Die alten Variablennamen können als Kompatibilitäts-Alias bestehen bleiben:

```css
:root {
  /* neue Tokens */
  --rt-bg: #0E1117;
  /* … */

  /* Aliase für bestehenden Code */
  --bg: var(--rt-bg);
  --surface: var(--rt-surface);
  --border: var(--rt-border-line);
  --accent: var(--rt-gold);
  --accent-2: var(--rt-indigo);
  --green: var(--rt-success);
  --yellow: var(--rt-warning);
  --red: var(--rt-danger);
  --blue: var(--rt-info);
}
```

So muss der bestehende Render-Code nicht angefasst werden, nur die `:root`-Werte ändern sich.

---

## 4 · Komponentenregeln

### Buttons

```
.btn
  height: 38px
  padding: 0 14px
  border-radius: 6px
  font-weight: 500
  font-size: 14px
  border: 1px solid var(--rt-border-strong)
  background: var(--rt-surface-2)
  color: var(--rt-ink)

.btn-primary
  background: var(--rt-gold)
  color: var(--rt-on-accent)
  border-color: var(--rt-gold)
  font-weight: 600
  → maximal 1 pro Bereich

.btn-secondary
  background: transparent
  color: var(--rt-ink)
  border: 1px solid var(--rt-border-strong)

.btn-ghost
  background: transparent
  border: 0
  color: var(--rt-ink-mid)
  → tertiär; für „Mehr…", „Advanced öffnen", „Ausblenden"

.btn-danger
  background: transparent
  color: var(--rt-danger)
  border: 1px solid rgba(210,117,117,0.4)
  → niemals gefüllt; nur für destruktive Aktionen + „Nicht übernehmen"
```

Keine `transform: translateY` Hover-Effekte mehr. Hover ändert nur Background/Border.

### Pills / Badges

```
.pill
  display: inline-flex
  padding: 3px 10px
  border-radius: 9999px
  font-size: 12px
  font-weight: 500
  background: var(--rt-neutral-soft)
  color: var(--rt-ink-mid)

.pill.pill-success → bg: --rt-success-soft, color: --rt-success
.pill.pill-warning → bg: --rt-warning-soft, color: --rt-warning
.pill.pill-danger  → bg: --rt-danger-soft,  color: --rt-danger
.pill.pill-info    → bg: --rt-info-soft,    color: --rt-info
.pill.pill-gold    → bg: --rt-gold-soft,    color: --rt-gold
.pill.pill-indigo  → bg: --rt-indigo-soft,  color: --rt-indigo
.pill.pill-outline → bg: transparent, border: 1px solid --rt-border-line
```

Optional 6 px Dot vor dem Text (`.pill::before`). Wenn der Dot stört (z. B. in Filter-Pills mit Checkbox), via `.no-dot` deaktivieren.

**Niemals** Pill-Farbe als ganzen Zeilen-Hintergrund verwenden.

### Karten / Container

```
.card / .panel
  background: var(--rt-surface)
  border: 1px solid var(--rt-border-line)
  border-radius: 14px
  padding: 24px
  box-shadow: none      /* Default – kein Schatten auf flächigen Karten */
```

### Notices

```
.notice
  background: var(--rt-warning-soft)
  border-left: 2px solid var(--rt-warning)
  border-radius: 0 6px 6px 0
  padding: 10px 14px

.notice.notice-info   → linker Stripe + Soft-Tint in --rt-info
.notice.notice-danger → linker Stripe + Soft-Tint in --rt-danger
```

Keine vollen Borders, kein Drop-Shadow.

### Advanced-Container

```
.advanced
  border: 1px dashed var(--rt-border-line)
  border-radius: 10px
  padding: 12px 14px

.advanced-head
  text-transform: uppercase
  letter-spacing: 0.12em
  font-size: 11px
  color: var(--rt-ink-dim)
```

Innerhalb von `.advanced` nur **Ghost-Buttons**.

### Chat-/Sprint-Karten

```
.chat-card
  background: var(--rt-surface-quiet)
  border: 1px solid var(--rt-border-line)
  border-radius: 6px
  padding: 10px 12px
  border-left-width: 2px

.chat-card.type-main   → border-left-color: var(--rt-gold)
.chat-card.type-sprint → border-left-color: var(--rt-indigo)
.chat-card.type-branch → border-left-color: var(--rt-border-strong)
.chat-card.is-done     → opacity: 0.55; border-left-color: transparent
```

### Review-Karten (Import/Cleanup)

Die Aktionsleiste folgt **immer** dieser Reihenfolge:

1. **Primary** — `Bestehendes Feature aktualisieren` (wenn Ziel erkannt)
   **oder** `Als neues Feature anlegen` (wenn kein Ziel erkannt).
2. **Secondary** — `Trotzdem als neues Feature anlegen` (nur sichtbar bei erkanntem Ziel).
3. **Danger-Secondary** — `In Papierkorb verschieben` (nur sichtbar bei `duplicateFeatureId`).
4. **Ghost** — `Nicht übernehmen` (rechts via `margin-left: auto`).

Bereits behandelte Karten:

```
.review-card.is-resolved
  opacity: 0.45
  pointer-events: none on Buttons
  zeigt Status-Pill „übernommen" oder „ignoriert"
```

### Momentum-Sektion

Zwei Klassen-Varianten:

```
.momentum.is-open
  Grid 2x2: Fokus · Next Step · Top-Kandidaten · Blockiert/Aufgeschoben

.momentum.is-collapsed
  Einzeiler: Fokus + Next Step + Counter-Pill
```

Toggle-Zustand persistiert per Projekt-ID in:

```
localStorage.roadtrip.ui.momentumCollapsed[<projectId>] = true|false
```

### Tabellen

```
table
  width: 100%
  border-collapse: collapse
  font-size: 13px

th
  text-transform: uppercase
  font-size: 11px
  letter-spacing: 0.08em
  color: var(--rt-ink-dim)
  background: var(--rt-surface-quiet)
  font-weight: 600

td
  border-bottom: 1px solid var(--rt-border-line)
  color: var(--rt-ink-mid)

td.title  /* erste Spalte */
  color: var(--rt-ink)
  font-weight: 500
```

Kein Zebra. Keine Zeilen-Hintergrundfarben.

### Filter-Pills

Statt `<select>` für ≤ 8 Werte: Reihe von `.pill.is-active` / `.pill.pill-outline`.
Genau eine aktive Pill pro Achse (Pool, Status, Kategorie).

### App-Shell / Header

- Linke Sidebar 220 px, Sticky.
- Header eines Projektes: schlanke Zeile mit Crumb („Projekt · …") + H1 + Status-Pill + 1 Primary-CTA.
- Kein großer Hero-Block.
- Darunter Status-Strip mit 4 Karten: Status, Fokus, Nächster Schritt, Hauptchat.
  Die Hauptchat-Karte ist klickbar und scrollt zur Chat-Liste.

### Empty States

- Kein illustriertes Bild.
- Aufbau: H2 + erläuternde Body-Zeile + ein Primary-Button.
- Beispiel: „Noch keine Sprints. Starte den Zyklus mit *Hauptchat um Sprintstart bitten*."

---

## 5 · Screen-Regeln (Kurzform)

### Projekt-Workspace
- Header · Status-Strip · Momentum · Sprint-Zyklus · Ressourcen.
- Primary-CTA: **Hauptchat um Sprintstart bitten**.
- Demo-/Raw-Backup-/Theme-Buttons gehören in Settings oder Advanced.

### Chats & Sprints
- Hauptchat angepinnt oben.
- Aktive Sprints und Branches darunter, nach `updatedAt` absteigend.
- Abgeschlossene Sprints **per Default ausgeblendet**, Toggle: **Abgeschlossene Sprints anzeigen / ausblenden**.
- Counter-Pill über der Liste: „3 aktiv · 18 abgeschlossen ausgeblendet".

### Sprint-Zyklus
Vier nummerierte Stufen:

1. **Start** — Hauptchat um Sprintstart bitten.
2. **Importieren** — Sprintstart-JSON importieren.
3. **Abschluss** — Sprintabschluss anfordern.
4. **Übergabe** — Sprint-Handoff importieren (setzt Sprintchat auf `abgeschlossen`).

In Advanced-Footer (eingeklappt):
- Zum Hauptchat-Kontext zurück
- Neuen Hauptchat-Kontext bauen
- Hauptchat-Update-Prompt erzeugen
- Alten Sprintchat migrieren

### Projekt-Momentum
- Zwei Zustände, persistiert per Projekt-ID.
- Kompakt zeigt nur Fokus + Next Step + Counter.

### Feature-Datenbank
- Pool als Segmented Control oben (Geplant · Umgesetzt).
- Status-Filter passt sich dem Pool an (`planned` ↔ `implemented`).
- Tabelle: max. 6 Spalten (Titel, Pool, Status, Priorität, Kategorie, Aktualisiert).
- Kein Zebra. Pool/Status nur über Pills.

### Import / Cleanup Review
- Drei Stufen: Quelle · Prompt+Import · Review.
- Counter über der Review-Liste: „x neu · y Updates · z Dubletten · w bereits übernommen".
- Bereits behandelte Karten bleiben **gedimmt sichtbar**, Buttons deaktiviert.

### Settings / Sync
Gruppen in dieser Reihenfolge:

1. **Darstellung** — Theme, UI-Font, Serif-Modus.
2. **GitHub Gist** — Push, Pull, Token.
3. **Trello** — Token, Board-Verbindung.
4. **Datenverwaltung** — Export, Import, **gefolgt** von Advanced-Bereich: Notfall-Export, Raw-Backup, Speicherdiagnose.

Letztere Gruppe trägt einen 2-px-Danger-Stripe links.

---

## 6 · Buttontexte und Labels

| Funktion | Empfohlenes deutsches Label |
|---|---|
| Hauptchat markieren | Als Hauptchat markieren |
| Prompt-Workflow auswählen | Prompt-Workflow wählen |
| In Hauptchat zurückkehren | Zum Hauptchat-Kontext zurück |
| Neuen Hauptchat-Kontext vorbereiten | Neuen Hauptchat-Kontext bauen |
| Sprintabschluss anfordern | Sprintabschluss anfordern |
| Sprintabschluss / Handoff importieren | Sprint-Handoff importieren |
| Abgeschlossene Sprints anzeigen | Abgeschlossene Sprints anzeigen |
| Abgeschlossene Sprints ausblenden | Abgeschlossene ausblenden |
| Projekt-Momentum einklappen | Momentum einklappen |
| Projekt-Momentum ausklappen | Momentum ausklappen |
| Bestehendes Feature aktualisieren | Bestehendes Feature aktualisieren |
| Trotzdem als neues Feature anlegen | Trotzdem als neues Feature anlegen |
| Als neues Feature anlegen | Als neues Feature anlegen |
| Nicht übernehmen | Nicht übernehmen |
| Dublette in Papierkorb verschieben | In Papierkorb verschieben |
| Advanced / Legacy | Advanced · Legacy |

Empty-State-Texte:

- *Keine Projekte:* „Noch kein Projekt angelegt. Lege das erste Projekt an, um zu starten."
- *Keine Sprints:* „Noch keine Sprints. Starte den Zyklus mit „Hauptchat um Sprintstart bitten"."
- *Keine Review-Vorschläge:* „Keine Vorschläge geladen. Erzeuge den Cleanup-Prompt und füge das KI-JSON oben ein."
- *Keine Features im Pool:* „Keine Features in diesem Pool. Wechsle den Pool oder lege ein neues Feature an."

---

## 7 · Umsetzungsreihenfolge

1. **Token-Block im `:root` ersetzen.** Bestehende Variablen­namen als Alias beibehalten.
2. **Button-CSS.** Radius 6 px, klare Hierarchie primary / secondary / ghost / danger. Hover-Lift entfernen.
3. **Pills umbauen** auf Soft-Tint + farbige Schrift + optional Dot.
4. **Notices** auf 2-px-Stripe-Style.
5. **Chat-Karten** mit linkem 2-px-Stripe nach Typ. Default-Filter „abgeschlossene Sprints ausgeblendet".
6. **Sprint-Zyklus-Block** strukturieren in 4 nummerierte Stufen + Advanced-Footer.
7. **Review-Cards** Aktionsleiste in der spezifizierten Reihenfolge, inkl. Dublette-Fall.
8. **Momentum-Toggle** + Persistierung pro Projekt.
9. **Feature-Datenbank-Toolbar:** Pool als Segmented Control, abhängiger Status-Filter.
10. **Settings-Gruppen** sortieren, Notfall/Raw in Advanced.

---

## 8 · Was nicht angefasst wird

- State-Struktur (`S.projects`, `S.features`, `S.notes`, `S.analyses`, `S.chats`, `S.importVersions`).
- Migrations- und Normalisierungslogik beim Laden (alte deutsche Statuswerte).
- Sprintstart-JSON-Validierung (`type === "roadtrip-sprint-start"`, Pflichtfelder).
- Gist-Sync-, Trello- und Import-/Export-Logik (Verträge, Felder, Endpoints).
- Button-IDs und Event-Handler-Bindings — UI-Buttons behalten ihre `id`.
- localStorage-Schema des App-Datenstands. Nur neue UI-Keys unter `roadtrip.ui.*` sind zulässig.

---

## 9 · Risiken

- **Inline-Styles** im Render-Code (zahlreich): müssen weitgehend in CSS-Klassen überführt werden, sonst überschreiben sie das neue Designsystem.
- **Pill-Verwendung als Filter-Checkbox**: Neue Pill-Optik muss `:has(input:checked)` oder eine explizite Klasse berücksichtigen.
- **Dichte Tabellen**: auf schmalen Viewports horizontal scrollen, kein Reflow.
- **Sprint-Status-Konsistenz**: beim Sprint-Handoff-Import muss `chats[].status` auf `abgeschlossen` gesetzt werden (Roadmap-Punkt „Sprintabschluss-Flow schärfen").

---

## 10 · Empfohlene Smoke-Tests

1. `node -e "…"`-Syntaxcheck (siehe `readme.md`).
2. Projekt anlegen, Feature anlegen, Pool-Wechsel `planned` ↔ `implemented`.
3. Sprint-Zyklus voll durchlaufen:
   Start-Prompt → Sprintstart-JSON-Import → Sprintchat angelegt →
   Sprintabschluss-Prompt → Sprint-Handoff-JSON-Import → Sprintchat = `abgeschlossen`.
4. Cleanup-Review mit drei Fällen (Ziel erkannt · kein Ziel · Dublette).
5. Momentum-Toggle: einklappen, neu laden, Zustand bleibt erhalten.
6. „Abgeschlossene Sprints anzeigen / ausblenden" — Toggle persistiert.
7. JSON-Export + Re-Import: alle Daten unverändert.
8. Theme-Wechsel Dark / Light / E-Ink: keine Token-Lücken.

---

*Roadtrip · DESIGN.md · v1.0*
