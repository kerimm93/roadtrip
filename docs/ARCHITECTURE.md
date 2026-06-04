# Roadtrip · Atlas — Architektur-Diagramme

> Mermaid-Quellcode. In jedem Mermaid-fähigen Renderer (GitHub, VS Code, Obsidian, mermaid.live) anzeigbar.
> Drei Diagramme: (a) Informationsarchitektur/Navigation · (b) Sprint-Zyklus als Statusdiagramm · (c) Modi-Trennung.

---

## (a) Informationsarchitektur & Navigationshierarchie

Zeigt die neue Sidebar-Gruppierung, den ruhigen Startpunkt **Karte**, und welche Aktion (Button) welchen Übergang auslöst.

```mermaid
flowchart TD
  classDef nav fill:#FCF8EF,stroke:#CFC0A3,color:#2C2419;
  classDef action fill:#C24A2B,stroke:#9F3A1E,color:#FBF4E8;
  classDef ctx fill:#F6EFE0,stroke:#CFC0A3,color:#6C6051;

  SB([Sidebar · Navigation]):::nav

  subgraph REISE["Gruppe · Reise"]
    KARTE[Karte / Übersicht\nProjekte als Reiseziele]:::nav
    MOM[Momentum-Dashboard\nüber alle Projekte]:::nav
  end

  subgraph WERKSTATT["Gruppe · Werkstatt"]
    DB[Feature-Datenbank\nSoll/Ist]:::nav
    NOTES[Notizen]:::nav
    LEARN[Lernen / Skill-Tracker]:::nav
  end

  subgraph WERKZEUGE["Gruppe · Werkzeuge"]
    IMPORT[Import · Cleanup]:::nav
    SET[Einstellungen]:::nav
  end

  PROJ[Projekt-Workspace\nStatus · Momentum · Sprint-Zyklus · Chats · Ressourcen]:::ctx

  SB --> KARTE & MOM & DB & NOTES & LEARN & IMPORT & SET

  KARTE -->|"Reiseziel wählen"| PROJ
  MOM -->|"Projektzeile öffnen"| PROJ
  KARTE -->|"Btn: Neues Projekt"| NEWP{{Neues Projekt anlegen}}:::action
  NEWP --> PROJ

  PROJ -->|"Btn: Hauptchat um Sprintstart bitten"| CYCLE[[Sprint-Zyklus]]:::action
  PROJ -->|"Hauptchat-Karte klicken"| CHATS[Chats & Sprints]:::ctx
  DB -->|"Btn: Neues Feature"| NEWF{{Feature anlegen}}:::action
  IMPORT -->|"Btn: Vorschläge laden → Review"| REVIEW[Cleanup-Review]:::ctx
```

**Kerngedanke:** Die Sidebar führt nur **Navigation**. Alle Projekt-Metadaten erscheinen erst im **Projekt-Workspace** nach Auswahl. Akzent-Buttons (rot) sind die genau einen Primäraktionen pro Bereich.

---

## (b) Sprint-Zyklus als Statusdiagramm

Der lineare Vier-Etappen-Zyklus. Jeder Übergang ist an genau einen Primary-Button gebunden.

```mermaid
stateDiagram-v2
  direction LR
  [*] --> Start

  Start: 1 · Start
  Importieren: 2 · Importieren
  Abschluss: 3 · Abschluss
  Uebergabe: 4 · Übergabe

  Start --> Importieren: Btn „Sprintstart erbitten"\n(Hauptchat liefert JSON)
  Importieren --> Abschluss: Btn „Sprintstart-JSON importieren"\n→ Sprintchat angelegt
  Abschluss --> Uebergabe: Btn „Sprintabschluss anfordern"
  Uebergabe --> Start: Btn „Sprint-Handoff importieren"\n→ chats[].status = abgeschlossen

  note right of Uebergabe
    Handoff schließt den Sprintchat
    und gibt den Kontext zurück
    an den Hauptchat (neue Etappe).
  end note

  state "Advanced · Werkzeuge (eingeklappt)" as ADV
  ADV: Zum Hauptchat-Kontext zurück\nNeuen Hauptchat-Kontext bauen\nUpdate-Prompt erzeugen\nAlten Sprintchat migrieren
```

**Regel:** Immer dieselbe Reihenfolge, immer genau ein Primary an der aktuellen Etappe. Migrations-/Kontext-Werkzeuge liegen eingeklappt im Advanced-Footer, nie auf Primary-Ebene.

---

## (c) Modi-Trennung · Navigation / Arbeitsfläche / Status / Advanced

Die vier UI-Modi und welche Komponenten in welchen Modus gehören.

```mermaid
flowchart LR
  classDef nav fill:#F6EFE0,stroke:#CFC0A3,color:#2C2419;
  classDef work fill:#FCF8EF,stroke:#CFC0A3,color:#2C2419;
  classDef status fill:#FCF8EF,stroke:#4F6E89,color:#4F6E89;
  classDef adv fill:#FCF8EF,stroke:#A8432B,color:#A8432B,stroke-dasharray:4 3;

  subgraph M1["① Navigation"]
    direction TB
    N1[Reise / Werkstatt / Werkzeuge]:::nav
    N2[Projektliste · Titel + 1 Signal]:::nav
  end

  subgraph M2["② Arbeitsfläche"]
    direction TB
    W1[Karte · Tabellen · Karten · Editoren]:::work
    W2[Genau 1 Primary pro Panel-Kopf]:::work
  end

  subgraph M3["③ Status"]
    direction TB
    S1[Status-Strip: Status · Fokus · Next Step · Hauptchat]:::status
    S2[Pills · Counter · Momentum]:::status
  end

  subgraph M4["④ Advanced · Werkzeuge"]
    direction TB
    A1[dashed Container · ghost-only]:::adv
    A2[Raw-Backup · Token · Migration · Diagnose]:::adv
  end

  M1 -->|"wählt Kontext"| M2
  M2 -->|"spiegelt Zustand"| M3
  M2 -.->|"selten / destruktiv eingeklappt"| M4

  L1["rot = Aktion (--accent)\nblau = Info-Status\ngestrichelt = selten/destruktiv"]:::status
```

**Lesart:** Navigation wählt den Kontext, die Arbeitsfläche trägt genau eine Primäraktion, der Status spiegelt ruhig den Zustand (Pills/Strip), und Advanced bündelt alles Seltene/Destruktive eingeklappt. Farbe trennt die Bedeutung: **Rot ist immer Aktion**, niemals Dekoration.

---

*Roadtrip · Architektur · Atlas-Skin · Sprint 25*
