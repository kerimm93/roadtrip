# 🚗 Roadtrip

**Roadtrip** ist eine Single-File Web-App zur Verwaltung von Softwareprojekten, Features und Ideen – mit Fokus auf **schnelle Iteration, Prompt-Workflows und KI-gestützte Analyse**.

Die App dient als Meta-Ebene über mehrere Projekte hinweg und hilft dir dabei, Features zu tracken, Ideen zu strukturieren und externe Tools wie Trello oder OpenAI einzubinden.

---

## ✨ Kernidee

Roadtrip verbindet drei Dinge:

* 📊 **Feature-Tracking** (leichtgewichtig, projektübergreifend)
* 🧠 **Ideen- & Notizen-Inbox**
* 🤖 **KI-gestützte Analyse & Prompt-Workflows**

Alles in **einer einzigen HTML-Datei** – ohne Build-Step, ohne Backend.

---

## 🚀 Features

### 📦 Projekt- & Feature-Management

* Projekte mit Status (inkl. Archivierung), Tags und Beschreibung
* Features mit:

  * Status (Idee → umgesetzt)
  * Kategorie (UI, Workflow, Sync, KI, etc.)
  * Priorität
* Projektkontext wird global gesteuert (aktive Auswahl)
* Mehrere Ansichten:

  * Tabelle
  * Kanban
  * Karten

---

### 🧠 Inbox & Quick Notes

* Schnelles Erfassen von Ideen ("Raw Notes")
* Projektgebundene Inbox
* Umwandlung von Notizen in Features
* Prompt-Generierung für Analyse & Review

---

### 🤖 KI-Integration (Prompt-first)

* Automatische Prompt-Erstellung für:

  * Feature-Analyse
  * HTML-Code-Analyse
  * Review- und Bereinigungs-Workflows
* Import von KI-Ergebnissen (JSON)
* **Reconciliation-System**:

  * erstellt neue Features
  * aktualisiert bestehende Features (regelbasiert)
  * erkennt mögliche veraltete Features

---

### 🆕 Import-Versionen & Change-Tracking

* Jeder Import wird als **Version gespeichert**
* Vergleich zur vorherigen Version:

  * ➕ neue Features
  * ✏️ geänderte Features
  * ➖ fehlende Features
  * = unveränderte Features
* Anzeige direkt im Projekt-Dashboard
* Verknüpfung mit relevanten Notizen

👉 Ziel: Änderungen nachvollziehen, ohne bestehende Daten zu überschreiben

---

### 🧹 (Neu geplant) Cleanup & Deduplication

* Geplanter zusätzlicher Schritt zwischen Import und Übernahme
* KI-gestützter **Bereinigungs-Prompt**:

  * erkennt Dubletten
  * schlägt Updates vor
  * trennt neue vs. bestehende Features sauber
* Separate Projekt-Cleanup-Analyse zur Aufräumung bestehender Daten

---

### 📂 HTML-Analyse

* Upload oder Paste von HTML-Dateien
* Lokale heuristische Analyse
* KI-gestützte Tiefenanalyse via Prompt
* Automatische Feature-Extraktion als Grundlage für Import

---

### 🔄 Sync & Export

* JSON Export / Import (inkl. selektivem Merge)
* Raw Notes Backup
* GitHub Gist Integration (optional)
* Lokale Speicherung via `localStorage`

---

### 🧩 Trello Integration

* Push von Features als Karten
* Pull-Updates von Trello
* Konflikt-Erkennung
* Label-System:

  * Projekt (`P:`)
  * Kategorie (`C:`)
  * Priorität (`Prio:`)

---

### 🎨 UI & UX

* Projektkontext wird global gesteuert (Sidebar)
* Archivierte Projekte (geplant: ausgeblendet)
* Dark / Light / E-Ink Themes
* Serif / UI Font Toggle

---

## 🧱 Architektur

* **Single-File App** (`index.html`)
* Kein Build-System
* Kein Framework

Technologien:

* HTML
* CSS
* Vanilla JavaScript

---

## 🧠 State-Struktur (vereinfacht)

```json
{
  "projects": [],
  "features": [],
  "notes": [],
  "analyses": [],
  "chats": [],
  "importVersions": []
}
```

---

## 🧭 Philosophie

* **Prompt-first statt Automatik**
* **Keine stillen Überschreibungen**
* **Transparenz über Änderungen (Versionen)**
* **Single Source of Truth pro Projekt**
* **Manuelle Kontrolle vor "magischer" Synchronisation**

---

## 🔮 Roadmap (kurz)

* [ ] Import-Cleanup-Prompt (Deduplication & Matching verbessern)
* [ ] Projektinterne Cleanup-Analyse
* [ ] Archiv-Filter für Projekte
* [ ] Feature → Chat / Prompt Embedding
* [ ] Bessere Version-Diffs (Detailansicht)

---

## 🏁 Nutzung

1. `index.html` öffnen
2. Projekt anlegen oder auswählen
3. HTML analysieren oder Notes erfassen
4. Prompt erzeugen und KI verwenden
5. JSON zurück importieren
6. Features prüfen und iterieren

---

## 💡 Hinweis

Roadtrip ist bewusst **kein automatisches Sync-Tool**, sondern ein:

> Denk- und Steuerungssystem für deine Projekte.

Du entscheidest, was übernommen wird.

---

## 📄 Lizenz

(noch offen / optional ergänzen)
