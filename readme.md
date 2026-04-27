# 🚗 Roadtrip

**Roadtrip** ist eine Single-File Web-App zur Verwaltung von Softwareprojekten, Features, Ideen, Notizen, KI-Analysen und Projekt-Chats.

Die App dient als persönliche Meta-Ebene über mehrere Softwareprojekte hinweg. Sie hilft dabei, geplante Features, bereits umgesetzte Features, Importstände, Sprint-Kontexte und KI-gestützte Analyse-Workflows strukturiert zu verwalten.

Roadtrip ist bewusst leichtgewichtig gebaut:

- eine einzige `index.html`
- kein Framework
- kein Build-Step
- kein Backend
- lokale Speicherung im Browser
- optionaler Sync über GitHub Gist

---

## ✨ Kernidee

Roadtrip verbindet fünf Dinge:

- 📊 **Projekt- & Feature-Tracking**
- 🧠 **Ideen- und Notizen-Inbox**
- 🤖 **KI-gestützte Analyse- und Prompt-Workflows**
- 🧹 **Import-Cleanup und Feature-Abgleich**
- 💬 **Chat- und Sprint-Kontextverwaltung**

Ziel ist nicht maximale Automatisierung, sondern kontrollierte Projektsteuerung:

> Roadtrip hilft dir, Features zu sammeln, zu prüfen, einzuordnen und bewusst in die nächste Arbeitsschleife zu überführen.

---

## 🚀 Features

## 📦 Projekt-Management

Roadtrip verwaltet mehrere Softwareprojekte parallel.

Projekte enthalten unter anderem:

- Titel
- Typ
- Status
- Zusammenfassung
- aktueller Fokus
- nächster Schritt
- Tags
- verknüpfte Features
- verknüpfte Notizen
- verknüpfte Chats
- Import-Versionen

Der globale Projektkontext wird über die Sidebar gesteuert. Dadurch können viele Ansichten entweder projektbezogen oder projektübergreifend genutzt werden.

---

## 🧩 Feature-Management

Features werden zentral in `S.features` gespeichert und projektbezogen zugeordnet.

Ein Feature enthält unter anderem:

- Titel
- Beschreibung
- Projekt
- Kategorie
- Priorität
- Status
- Quelle
- Trello-Verknüpfung
- Erstellungs- und Änderungszeitpunkt

### Feature-Pools

Roadtrip trennt inzwischen zwei Feature-Pools:

### Geplante Features

Diese Features bilden den **Soll-Zustand**:

- Ideen
- geplante Features
- Sprint-Kandidaten
- laufende Arbeit
- blockierte Features
- erledigte/geplante Arbeit
- zurückgestellte Features

Statuswerte:

- `idea`
- `planned`
- `selected-for-sprint`
- `in-progress`
- `blocked`
- `done`
- `deferred`

### Umgesetzte Features

Diese Features bilden den **Ist-Zustand** aus Code-Analysen, Importen oder manueller Erfassung:

- erkannte Features
- bestätigte Features
- manuell ergänzte umgesetzte Features
- reviewbedürftige Features
- veraltete Features

Statuswerte:

- `detected`
- `confirmed`
- `manually-added`
- `needs-review`
- `obsolete`

### Migration alter Features

Ältere Features ohne Pool werden defensiv migriert:

```json
{
  "pool": "planned",
  "reviewStatus": "needs-review"
}
```

Alte deutsche Statuswerte werden beim Laden normalisiert, ohne bestehende Feature-Daten zu verlieren.

---

## 🗂️ Feature-Ansichten

Roadtrip bietet mehrere Ansichten auf die Feature-Datenbank:

* Tabelle
* Kanban
* Kartenansicht

Die Feature-Ansichten unterscheiden inzwischen sichtbar zwischen:

* **Geplante Features**
* **Umgesetzte Features**

Zusätzlich gibt es Filter für:

* Projektkontext
* Pool
* Status
* Kategorie
* Suchbegriff

---

## 🧠 Inbox & Quick Notes

Roadtrip enthält eine einfache Inbox für rohe Ideen und Projekt-Notizen.

Funktionen:

* schnelle Notizerfassung
* projektgebundene Notizen
* Markierung als verarbeitet
* Umwandlung von Notizen in Features
* Prompt-Erstellung für Review- und Analyse-Workflows

Die Inbox ist bewusst roh gehalten: Notizen können zunächst ungeordnet erfasst und später in Features, Projektkontext oder Prompt-Workflows überführt werden.

---

## 🤖 KI-Integration: Prompt-first

Roadtrip ist prompt-first aufgebaut.

Die App erzeugt strukturierte Prompts, die anschließend in ChatGPT, Claude, Codex oder andere KI-Systeme kopiert werden können.

Roadtrip automatisiert nicht blind, sondern unterstützt kontrollierte Übergaben:

* Projektkontext sammeln
* Features auflisten
* Notizen vorbereiten
* HTML-Code analysieren lassen
* Cleanup-Vorschläge erzeugen
* JSON-Ergebnisse importieren
* Änderungen manuell prüfen

---

## 📂 HTML-Analyse & Code-Import

Roadtrip kann HTML-Code aufnehmen, lokal heuristisch auswerten und für KI-Analysen vorbereiten.

Möglichkeiten:

* HTML-Datei hochladen
* HTML-Code einfügen
* lokale Feature-Kandidaten erkennen
* Analyse-Prompt erzeugen
* KI-JSON zurück importieren
* Import-Version speichern
* Änderungen gegenüber vorherigen Importen vergleichen

Neue aus Code-Analyse erkannte Features landen standardmäßig im Pool:

```json
{
  "pool": "implemented",
  "status": "detected",
  "reviewStatus": "needs-review"
}
```

---

## 🆕 Import-Versionen & Change-Tracking

Roadtrip speichert Importvorgänge als eigene Versionen.

Ein Import kann enthalten:

* Rohtext der Analyse
* erkannte Features
* technische Hinweise
* Vergleich zur vorherigen Version

Verglichen werden unter anderem:

* ➕ neue Features
* ✏️ geänderte Features
* ➖ fehlende Features
* = unveränderte Features

Ziel:

> Änderungen aus Code-Analysen nachvollziehbar machen, ohne bestehende Projektdaten blind zu überschreiben.

---

## 🧹 Cleanup & Deduplication

Roadtrip enthält einen Cleanup-/Review-Workflow für importierte oder bestehende Features.

Der Workflow kann helfen bei:

* Dubletten-Erkennung
* Abgleich neuer Import-Features mit bestehenden Features
* Vorschlägen zur Aktualisierung bestehender Features
* Erkennung veralteter Features
* defensiver Übernahme neuer Features

Wichtig:

* Vorschläge werden nicht automatisch übernommen.
* Nutzer entscheidet pro Vorschlag.
* Bestehende Features werden nur nach Bestätigung aktualisiert.
* Dubletten können in den Papierkorb verschoben werden.

### Aktueller UX-Nachziehpunkt

Als nächster kleiner Patch ist geplant:

* „Bestehendes aktualisieren“ nur anzeigen, wenn wirklich ein Ziel-Feature existiert
* sonst primär nur „Als neues Feature hinzufügen“
* bei vorhandenem Ziel-Feature „Bestehendes aktualisieren“ klar hervorheben
* „Trotzdem als neues Feature“ sekundär anbieten
* Duplicate-Aktion nur anzeigen, wenn eine konkrete Dublette erkannt wurde

---

## 💬 Chat- und Sprint-Kontext

Roadtrip kann GPT-/Claude-/Codex-Chats als Projektressourcen verwalten.

Chat-Typen:

* `project-main`
* `sprint`
* `execution`
* `branch`

Chat-Status:

* `aktiv`
* `pausiert`
* `abgeschlossen`
* `referenz`

Funktionen:

* Chats projektbezogen erfassen
* Hauptchat pro Projekt setzen
* Sprint-Handoff-JSON importieren
* Rückgabe-Prompt zum Hauptchat erzeugen
* relevante offene Features in Sprint-Prompts einbetten

Dadurch kann Roadtrip als Brücke zwischen Hauptchat, Sprintchat und konkreter Umsetzung genutzt werden.

---

## 🔄 Sync & Export

Roadtrip speichert lokal im Browser über `localStorage`.

Zusätzlich gibt es:

* JSON-Export
* JSON-Import
* selektiven Merge
* GitHub Gist Push/Pull
* Raw Backup Gist

Wichtig:

* Tokens werden lokal gespeichert.
* Export enthält App-Daten, aber keine Credentials.
* Gist ist optional.
* Roadtrip bleibt lokal nutzbar.

---

## 🧩 Trello-Integration

Roadtrip kann Features nach Trello pushen und von Trello aktualisieren.

Funktionen:

* Feature → Trello-Karte
* Trello-Karte → Feature-Pull
* Sync-Block in Kartenbeschreibung
* Konflikterkennung
* Label-System

Labels:

* Projekt: `P: ...`
* Kategorie: `C: ...`
* Priorität: `Prio: ...`

Aktueller Hinweis:

* Trello-Listen verwenden derzeit technische Statuswerte wie `in-progress` oder `confirmed`.
* Das ist stabil, aber noch nicht optimal lesbar.
* Eine spätere Verbesserung kann Status-Labels wie „In Arbeit“ als Listennamen nutzen.

---

## 🎨 UI & UX

Roadtrip unterstützt verschiedene Darstellungen und Themes.

UI-Funktionen:

* Sidebar für Projektkontext
* globale Projekt-Auswahl
* Tabellenansicht
* Kanbanansicht
* Kartenansicht
* Pool-/Status-/Kategorie-Filter
* Dark Theme
* Light Theme
* E-Ink Theme
* UI-/Serif-Font-Umschaltung

Ziel der UI ist nicht maximale Dichte, sondern schnelle Orientierung:

> Was ist geplant? Was ist umgesetzt? Was ist als Nächstes relevant?

---

## 🧱 Architektur

Roadtrip folgt dem Single-File-Prinzip:

```text
index.html
``

Enthalten sind:

* HTML
* CSS
* JavaScript
* State-Management
* Import/Export
* Prompt-Generatoren
* Trello/Gist-Anbindung

Technologien:

* HTML
* CSS
* Vanilla JavaScript
* Browser `localStorage`
* optionale GitHub Gist API
* optionale Trello API

Kein Build-System. Kein Framework. Kein Backend.

---

## 🧠 State-Struktur vereinfacht

```json
{
  "version": 1,
  "projects": [],
  "features": [],
  "notes": [],
  "analyses": [],
  "chats": [],
  "importVersions": []
}
```

Ein Feature enthält vereinfacht:

```json
{
  "id": "f_...",
  "projectId": "p_...",
  "title": "...",
  "description": "...",
  "pool": "planned",
  "reviewStatus": "needs-review",
  "status": "idea",
  "priority": "mittel",
  "category": "Workflow",
  "sourceType": "manual",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 🧭 Philosophie

Roadtrip folgt diesen Prinzipien:

* **Prompt-first statt Black-Box-Automatik**
* **Manuelle Kontrolle vor Übernahme**
* **Keine stillen Überschreibungen**
* **Bestehende Daten schützen**
* **Geplantes und Umgesetztes trennen**
* **Importe nachvollziehbar versionieren**
* **KI als Analysewerkzeug, nicht als alleinige Entscheidungsinstanz**
* **Single-File bleibt transportierbar und KI-kompatibel**

---

## 🧪 Empfohlene Tests nach Änderungen

Nach Codeänderungen sollte mindestens ein Syntaxcheck laufen:

```bash
node -e "
const fs=require('fs');
const vm=require('vm');
const c=fs.readFileSync('index.html','utf8');
const scripts=[];
let m; const re=/<script(?![^>]*src)[^>]*>([\\s\\S]*?)<\\/script>/gi;
while((m=re.exec(c))!==null) scripts.push(m[1]);
new vm.Script(scripts.join('\\n'));
console.log('JS OK');
"
```

Manuelle Smoke-Tests:

* bestehende Daten laden
* Feature-Pools prüfen
* Pool-Wechsel `planned` ↔ `implemented`
* Status-Filter prüfen
* JSON exportieren/importieren
* Cleanup-Review prüfen
* Trello-Buttons ohne Crash öffnen
* Gist Push/Pull nur bei Bedarf testen

---

## 🔮 Roadmap

Kurzfristig:

* [ ] Cleanup-/Import-Review-Buttons kontextsensitiv rendern
* [ ] „Bestehendes aktualisieren“ nur bei vorhandenem Ziel-Feature anzeigen
* [ ] Duplicate-Aktionen nur bei konkreter `duplicateFeatureId` anzeigen
* [ ] Browser-Test des neuen Feature-Pool-Systems durchführen

Mittelfristig:

* [ ] App-Versionen für Code-Import einführen
* [ ] Soll/Ist-Matching zwischen `planned` und `implemented` bauen
* [ ] Sprint-Auswahl aus geplantem Feature-Pool verbessern
* [ ] Prompt für Sprint-Start aus Hauptchat-Kontext verbessern
* [ ] Chat-Status-Übersicht als Mini-Datenbank ausbauen
* [ ] Trello-Listen optional mit lesbaren Statuslabels statt technischen Statuswerten führen

Langfristig:

* [ ] Roadtrip als zentrale Steuerungsebene für mehrere Single-File-Apps ausbauen
* [ ] bessere Version-Diffs mit Detailansicht
* [ ] robustere Import-/Cleanup-Review-Flows
* [ ] bessere Verknüpfung von Features, Chats, Prompts und Code-Versionen

---

## 🏁 Nutzung

1. `index.html` öffnen.
2. Projekt anlegen oder auswählen.
3. Features, Notizen oder Chats erfassen.
4. HTML-Code analysieren oder Prompt erzeugen.
5. KI-Ergebnis als JSON importieren.
6. Cleanup-/Review-Vorschläge prüfen.
7. Features einem Pool zuordnen:

   * `planned` für geplante/offene Features
   * `implemented` für erkannte/umgesetzte Features
8. Projektstand weiter iterieren.

---

## 💡 Hinweis

Roadtrip ist kein magisches Auto-Sync-Tool.

Roadtrip ist ein:

> Denk-, Steuerungs- und Review-System für Softwareprojekte.

Du entscheidest, was übernommen, aktualisiert, ignoriert oder später geprüft wird.

---

## 📄 Lizenz

Noch offen.


