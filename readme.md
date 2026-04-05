# 🚗 Roadtrip

**Roadtrip** ist eine Single-File Web-App zur Verwaltung von Softwareprojekten, Features und Ideen – mit Fokus auf **schnelle Iteration, Prompt-Weitergabe und KI-gestützte Analyse**.

Die App dient als Meta-Ebene über mehrere Projekte hinweg und hilft dir dabei, Features zu tracken, Ideen zu strukturieren und externe Tools wie Trello oder OpenAI einzubinden.

---

## ✨ Kernidee

Roadtrip verbindet drei Dinge:

- 📊 **Feature-Tracking** (ähnlich wie ein leichtgewichtiges Jira/Trello)
- 🧠 **Ideen- & Notizen-Inbox**
- 🤖 **KI-gestützte Analyse & Prompt-Workflows**

Alles in **einer einzigen HTML-Datei** – ohne Build-Step, ohne Backend.

---

## 🚀 Features

### 📦 Projekt- & Feature-Management
- Projekte mit Status, Tags und Beschreibung
- Features mit:
  - Status (Idee → umgesetzt)
  - Kategorie (UI, Workflow, Sync, KI, etc.)
  - Priorität
- Mehrere Ansichten:
  - Tabelle
  - Kanban
  - Karten

---

### 🧠 Inbox & Quick Notes
- Schnelles Erfassen von Ideen ("Raw Notes")
- Umwandlung von Notizen in Features
- Prompt-Generierung für KI-Auswertung

---

### 🤖 KI-Integration (Prompt-first)
- Automatische Prompt-Erstellung für:
  - Feature-Analyse
  - HTML-Code-Analyse
- Import von KI-Ergebnissen (JSON)
- Matching & Reconciliation:
  - erkennt bestehende Features
  - aktualisiert statt dupliziert

---

### 📂 HTML-Analyse
- Upload oder Paste von HTML-Dateien
- Heuristische Analyse (lokal)
- KI-gestützte Tiefenanalyse via Prompt
- Automatische Feature-Extraktion

---

### 🔄 Sync & Export
- JSON Export / Import
- Raw Notes Backup
- GitHub Gist Integration (optional)
- Lokale Speicherung via `localStorage`

---

### 🧩 Trello Integration
- Push von Features als Karten
- Pull-Updates von Trello
- Konflikt-Erkennung
- Label-System:
  - Projekt (`P:`)
  - Kategorie (`C:`)
  - Priorität (`Prio:`)

---

### 🎨 UI & Themes
- Dark Mode
- Light Mode
- E-Ink Mode (minimalistisch & lesefreundlich)
- Serif / UI Font Toggle

---

## 🧱 Architektur

- **Single-File App** (`index.html`)
- Kein Build-System
- Kein Framework
- Reines:
  - HTML
  - CSS
  - Vanilla JavaScript

### State
- Speicherung in `localStorage`
- Struktur:
```json
{
  "projects": [],
  "features": [],
  "notes": [],
  "analyses": []
}
