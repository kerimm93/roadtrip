# 🚗 Roadtrip

**Roadtrip** ist eine Single-File-Web-App zur Verwaltung von Softwareprojekten, Features, Ideen, Notizen, KI-Analysen und Projekt-Chats.

Die App dient als persönliche Meta-Ebene über mehrere Softwareprojekte hinweg. Sie hilft dabei, geplante Features, bereits umgesetzte Features, Importstände, Sprint-Kontexte und KI-gestützte Analyse-Workflows strukturiert zu verwalten.

Roadtrip ist bewusst leichtgewichtig gebaut:

* eine einzige `index.html`
* kein Framework
* kein Build-Step
* kein Backend
* lokale Speicherung im Browser über `localStorage`
* optionaler Sync über GitHub Gist
* optionale Trello-Anbindung

---

## ✨ Kernidee

Roadtrip verbindet fünf Dinge:

* 📊 **Projekt- & Feature-Tracking**
* 🧠 **Ideen- und Notizen-Inbox**
* 🤖 **KI-gestützte Analyse- und Prompt-Workflows**
* 🧹 **Import-Cleanup und Feature-Abgleich**
* 💬 **Chat- und Sprint-Kontextverwaltung**

Ziel ist nicht maximale Automatisierung, sondern kontrollierte Projektsteuerung:

> Roadtrip hilft dabei, Features zu sammeln, zu prüfen, einzuordnen und bewusst in die nächste Arbeitsschleife zu überführen.

Roadtrip ist dabei kein zweites Gedächtnis neben den KI-Chats, sondern ein strukturierter Router zwischen Projektdaten, Hauptchat, Sprintchat, Code-Import und Review.

---

# 🚀 Features

## 📦 Projekt-Management

Roadtrip verwaltet mehrere Softwareprojekte parallel.

Projekte enthalten unter anderem:

* Titel
* Typ
* Status
* Zusammenfassung
* aktueller Fokus
* nächster Schritt
* Tags
* Hauptchat-URL
* optionale Ressourcenlinks, z. B. Drive oder Obsidian
* verknüpfte Features
* verknüpfte Notizen
* verknüpfte Chats
* Import-Versionen

Der globale Projektkontext wird über die Sidebar gesteuert. Viele Ansichten können dadurch entweder projektbezogen oder projektübergreifend genutzt werden.

---

## 🧩 Feature-Management

Features werden zentral in `S.features` gespeichert und projektbezogen zugeordnet.

Ein Feature enthält unter anderem:

* Titel
* Beschreibung
* Projekt
* Kategorie
* Priorität
* Pool
* Status
* Review-Status
* Quelle
* Trello-Verknüpfung
* Erstellungs- und Änderungszeitpunkt

---

## 🧭 Feature-Pools

Roadtrip trennt zwei Feature-Pools:

1. **Geplante Features** = Soll-Zustand
2. **Umgesetzte Features** = Ist-Zustand

Diese Trennung ist zentral, weil Roadtrip nicht nur eine Aufgabenliste ist, sondern zwischen gewünschter Roadmap und tatsächlich im Code erkennbarer Umsetzung unterscheidet.

---

### Geplante Features

Geplante Features bilden den **Soll-Zustand**:

* Ideen
* geplante Features
* Sprint-Kandidaten
* laufende Arbeit
* blockierte Features
* zurückgestellte Features

Statuswerte:

* `idea`
* `planned`
* `selected-for-sprint`
* `in-progress`
* `blocked`
* `deferred`

Hinweis: Abgeschlossene oder tatsächlich umgesetzte Arbeit wird nicht mehr als `done` im geplanten Pool geführt. Umsetzung gehört in den Pool `implemented`, z. B. als `confirmed` oder `detected`.

---

### Umgesetzte Features

Umgesetzte Features bilden den **Ist-Zustand** aus Code-Analysen, Importen oder manueller Erfassung:

* erkannte Features
* bestätigte Features
* manuell ergänzte umgesetzte Features
* reviewbedürftige Features
* veraltete Features

Statuswerte:

* `detected`
* `confirmed`
* `manually-added`
* `needs-review`
* `obsolete`

Neue Features aus Code-Analysen landen standardmäßig im Pool:

```json
{
  "pool": "implemented",
  "status": "detected",
  "reviewStatus": "needs-review"
}
```

---

### Migration alter Features

Ältere Features ohne Pool werden defensiv migriert:

```json
{
  "pool": "planned",
  "reviewStatus": "needs-review"
}
```

Alte deutsche Statuswerte werden beim Laden normalisiert, ohne bestehende Feature-Daten zu verlieren.

Beispiele:

* `geplant` → `planned`
* `in arbeit` → `in-progress`
* `erledigt`, `umgesetzt`, `done`, `fertig` → `implemented` / `confirmed`
* `teilweise umgesetzt`, `vorbereitet` → `implemented` / `detected`

---

## 🗂️ Feature-Ansichten

Roadtrip bietet mehrere Ansichten auf die Feature-Datenbank:

* Tabelle
* Kanban
* Kartenansicht

Die Feature-Ansichten unterscheiden sichtbar zwischen:

* **Geplante Features**
* **Umgesetzte Features**

Zusätzlich gibt es Filter für:

* Projektkontext
* Pool
* Status
* Kategorie
* Suchbegriff

Der Statusfilter ist abhängig vom gewählten Pool. Wenn `planned` ausgewählt ist, erscheinen nur geplante Statuswerte. Wenn `implemented` ausgewählt ist, erscheinen nur Implementierungsstatuswerte.

---

## 🧭 Projekt-Momentum

Im Project View zeigt Roadtrip eine kompakte **Projekt-Momentum**-Sektion.

Sie beantwortet die Frage:

> Was hält dieses Projekt als Nächstes in Bewegung?

Angezeigt werden:

* aktueller Fokus
* nächster Schritt
* aktive oder sprintfähige Features
* Top-Kandidaten
* blockierte Features
* zurückgestellte Features
* offene Notizen

Zusätzlich kann Roadtrip daraus einen Prompt erzeugen, um den nächsten konkreten Projektschritt zu planen.

---

## 🧠 Inbox & Quick Notes

Roadtrip enthält eine einfache Inbox für rohe Ideen und Projekt-Notizen.

Funktionen:

* schnelle Notizerfassung
* projektgebundene Notizen
* Markierung als verarbeitet
* Umwandlung von Notizen in Features
* Prompt-Erstellung für Review- und Analyse-Workflows
* Review-Vorschläge aus KI-JSON laden und manuell übernehmen

Die Inbox ist bewusst roh gehalten: Notizen können zunächst ungeordnet erfasst und später in Features, Projektkontext oder Prompt-Workflows überführt werden.

---

## 🧩 Multi-Projekt-Notizenimport

Roadtrip kann Freitext- oder Markdown-Notizen mit mehreren Projektbezügen in einen strukturierten Review-Workflow überführen.

Ablauf:

1. Markdown/Freitext mit projektbezogenen Notizen einfügen.
2. Roadtrip erzeugt einen Bereinigungsprompt.
3. KI liefert ein JSON mit Projekt-Updates, Notizen, Feature-Vorschlägen und nicht zugeordneten Einträgen.
4. Roadtrip lädt die Vorschläge in eine Review-Ansicht.
5. Nutzer übernimmt oder ignoriert Vorschläge einzeln.

Übernommen werden können:

* Fokus-Updates
* Next-Step-Updates
* neue Notizen
* neue geplante Features

Bereits übernommene oder ignorierte Vorschläge werden sichtbar markiert und die Buttons werden deaktiviert. Dadurch werden Doppelübernahmen vermieden.

---

## 🤖 KI-Integration: Prompt-first

Roadtrip ist prompt-first aufgebaut.

Die App erzeugt strukturierte Prompts, die anschließend in ChatGPT, Claude, Codex oder andere KI-Systeme kopiert werden können.

Roadtrip automatisiert nicht blind, sondern unterstützt kontrollierte Übergaben:

* Projektkontext sammeln
* Features auflisten
* Notizen vorbereiten
* HTML-/Code-/Repository-Auszüge analysieren lassen
* Cleanup-Vorschläge erzeugen
* JSON-Ergebnisse importieren
* Änderungen manuell prüfen

Grundprinzip:

> KI analysiert und schlägt vor. Roadtrip strukturiert. Der Nutzer entscheidet.

---

## 📂 Code-Analyse & Import

Roadtrip kann HTML-Code, Projektdateien oder Repository-Auszüge aufnehmen, lokal heuristisch auswerten und für KI-Analysen vorbereiten.

Möglichkeiten:

* Code-Datei hochladen
* HTML, JS, CSS, JSON, Markdown oder Text einfügen
* lokale Feature-Kandidaten erkennen
* Analyse-Prompt erzeugen
* KI-JSON zurück importieren
* Import-Version speichern
* Änderungen gegenüber vorherigen Importen vergleichen
* Projekt-Summary-only-Import durchführen

Der Import-Workflow unterscheidet zwischen:

* Projekt-Summary aktualisieren
* umgesetzte Features aus Code-Analyse erkennen
* Cleanup-/Review-Vorschläge erzeugen
* Fallback-Zeilenimport für einfache Featurelisten

Neue aus Code-Analyse erkannte Features landen im Pool `implemented`, üblicherweise als `detected` und `needs-review`.

---

## 🆕 Import-Versionen & Change-Tracking

Roadtrip speichert Importvorgänge als eigene Versionen.

Ein Import kann enthalten:

* Rohtext der Analyse
* erkannte Features
* technische Hinweise
* Vergleich zur vorherigen Version
* Project Summary
* App-Typ

Verglichen werden unter anderem:

* ➕ neue Features
* ✏️ geänderte Features
* ➖ fehlende Features
* = unveränderte Features
* mögliche relevante Notizen

Ziel:

> Änderungen aus Code-Analysen nachvollziehbar machen, ohne bestehende Projektdaten blind zu überschreiben.

---

## 🧹 Cleanup & Deduplication

Roadtrip enthält einen Cleanup-/Review-Workflow für importierte oder bestehende Features.

Der Workflow hilft bei:

* Dubletten-Erkennung
* Abgleich neuer Import-Features mit bestehenden Features
* Vorschlägen zur Aktualisierung bestehender Features
* Erkennung veralteter Features
* defensiver Übernahme neuer Features
* Markierung von Dubletten im Papierkorb

Wichtig:

* Vorschläge werden nicht automatisch übernommen.
* Nutzer entscheidet pro Vorschlag.
* Bestehende Features werden nur nach Bestätigung aktualisiert.
* Dubletten können in den Papierkorb verschoben werden.

---

### Aktueller Stand der Cleanup-UX

Der Cleanup-/Review-Workflow rendert Aktionen kontextsensitiv:

* **Bestehendes aktualisieren** erscheint nur, wenn ein Ziel-Feature erkannt wurde.
* Wenn kein Ziel-Feature erkannt wurde, wird primär **Als neues Feature hinzufügen** angeboten.
* Bei vorhandenem Ziel-Feature bleibt **Trotzdem als neues Feature** als sekundäre Option verfügbar.
* Duplicate-Aktionen erscheinen nur, wenn eine konkrete `duplicateFeatureId` vorhanden ist.
* Ignorieren bleibt immer als sichere Abbruchoption verfügbar.

---

## 🗑️ Papierkorb

Roadtrip kann Feature-Dubletten oder bereinigte Einträge in einen Papierkorb verschieben.

Der Papierkorb zeigt:

* Feature-Titel
* Grund der Verschiebung
* Workflow-Herkunft
* Zeitpunkt der Verschiebung
* optionales Ziel-Feature, mit dem ein Eintrag zusammengeführt wurde

Features können aus dem Papierkorb wiederhergestellt werden.

---

# 💬 Chat- und Sprint-Kontext

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
* alten Sprintchat migrieren
* Sprintstart-JSON aus Hauptchat importieren

Dadurch kann Roadtrip als Brücke zwischen Hauptchat, Sprintchat und konkreter Umsetzung genutzt werden.

---

## 🔁 Hauptchat-gesteuerter Sprint-Zyklus

Roadtrip nutzt einen bewusst geführten Chat-Zyklus:

```text
Roadtrip → Hauptchat → Roadtrip → Sprintchat → Roadtrip → Hauptchat
```

Die Rollen sind klar getrennt:

* **Roadtrip** hält strukturierte Projekt-, Feature-, Chat- und Sprint-Metadaten.
* **Der Hauptchat** hält den aktuellen narrativen Projektkontext und erzeugt den eigentlichen Sprintstart.
* **Der Sprintchat** bearbeitet den konkreten Sprint und liefert am Ende einen strukturierten Sprintbericht.

---

### Sprintstart

Im Project View gibt es im Bereich **Chat-Workflow → Sprint-Zyklus** den Button:

```text
Hauptchat um Sprintstart bitten
```

Roadtrip erzeugt damit keinen finalen Sprintchat-Prompt direkt. Stattdessen erzeugt Roadtrip einen Prompt für den Hauptchat.

Der Hauptchat soll daraus zwei Ausgaben liefern:

1. einen fertigen Sprintchat-Startprompt
2. ein `roadtrip-sprint-start`-JSON für Roadtrip

Das JSON wird anschließend in Roadtrip eingefügt und über **Sprintstart-JSON importieren** übernommen.

Dabei werden aktualisiert:

* Sprintchat-Titel
* Sprintchat-Status `aktiv`
* Projektfokus
* nächster Projektschritt
* ausgewählte Features mit Status `selected-for-sprint`

Das Ziel ist, dass Roadtrip und Hauptchat gleichzeitig aktuell bleiben, ohne dass zwei Systeme manuell parallel gepflegt werden müssen.

---

### Sprintstart-JSON

Der Hauptchat soll für Roadtrip ein JSON dieser Art erzeugen:

```json
{
  "type": "roadtrip-sprint-start",
  "chatTitle": "...",
  "chatType": "sprint",
  "status": "aktiv",
  "sprintGoal": "...",
  "summary": "...",
  "currentFocus": "...",
  "nextStep": "...",
  "selectedFeatureIds": ["..."],
  "selectedFeatureTitles": ["..."],
  "acceptanceCriteria": ["..."],
  "notes": ["..."]
}
```

Roadtrip validiert mindestens:

* `type === "roadtrip-sprint-start"`
* `chatTitle`
* `chatType === "sprint"`
* `status === "aktiv"`
* `summary`
* `currentFocus`
* `nextStep`

Unbekannte Feature-IDs werden nicht neu angelegt. Implemented Features werden nicht verändert. Nur geplante Features desselben Projekts können durch `selectedFeatureIds` auf `selected-for-sprint` gesetzt werden.

---

### Sprintabschluss

Am Ende eines Sprintchats erzeugt Roadtrip einen Sprintbericht-Prompt für den Sprintchat.

Der Sprintchat liefert ein JSON mit:

* `summary`
* `currentFocus`
* `nextStep`
* optionalen offenen Fragen
* optionalen neuen Feature-Vorschlägen

Nach dem Import aktualisiert Roadtrip:

* Sprintchat-Kontext
* Projektfokus
* nächsten Projektschritt
* optional neue geplante Features
* Hauptchat-Kontext / Rückgabe-Prompt

Roadtrip erzeugt danach einen Prompt, mit dem der Hauptchat über den Sprintabschluss aktualisiert werden kann.

Aktueller Nachziehpunkt: Der Abschlussflow sollte noch schärfer markieren, dass ein abgeschlossener Sprintchat idealerweise den Status `abgeschlossen` bekommt, während Sprintstart-JSON mit `aktiv` arbeitet.

---

## 🔄 Sync & Export

Roadtrip speichert lokal im Browser über `localStorage`.

Zusätzlich gibt es:

* JSON-Export
* JSON-Import
* selektiven Merge beim Import
* GitHub Gist Push/Pull
* Raw Backup Gist
* vollständigen Notfall-Export
* Kompakt-Export
* Rohdaten-Komprimierung
* Speicherdiagnose

Wichtig:

* Tokens werden lokal in der App-Konfiguration gespeichert.
* App-Daten werden getrennt von lokalen Zugangsdaten behandelt.
* Gist ist optional.
* Roadtrip bleibt lokal nutzbar.
* Bei Speicherproblemen kann ein vollständiger Notfall-Export aus dem aktuellen Arbeitsspeicher erstellt werden.

Hinweis: Der Gist-Sync ist aktuell bewusst einfach gehalten. Der JSON-Import unterstützt selektive Merge-Logik; Gist Push/Pull ist vor allem Cloud-Sicherung und Geräteangleichung, kein vollwertiges konfliktbewusstes Sync-System wie in der Daily Log App.

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
* Project View
* Database View
* Import View
* Settings View
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
```

Enthalten sind:

* HTML
* CSS
* JavaScript
* State-Management
* Import/Export
* Prompt-Generatoren
* Chat-Workflow
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

Ein Projekt enthält vereinfacht:

```json
{
  "id": "p_...",
  "title": "...",
  "type": "Meta-App",
  "status": "aktiv",
  "summary": "...",
  "tags": [],
  "mainChatId": "ch_...",
  "mainChatUrl": "...",
  "driveUrl": "...",
  "obsidianUrl": "...",
  "currentFocus": "...",
  "nextStep": "...",
  "createdAt": "...",
  "updatedAt": "..."
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

Ein Chat enthält vereinfacht:

```json
{
  "id": "ch_...",
  "projectId": "p_...",
  "title": "...",
  "type": "sprint",
  "status": "aktiv",
  "url": "...",
  "summary": "...",
  "nextStep": "...",
  "mainChatId": "ch_...",
  "rawReportText": "...",
  "rawHandoffText": "...",
  "startedAt": "...",
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
* **Hauptchat bleibt narrativer Projektkontext**
* **Sprintchat bleibt Ausführungskontext**
* **Roadtrip bleibt strukturierter Router und Review-System**
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
* Multi-Projekt-Notizenimport prüfen
* Trello-Buttons ohne Crash öffnen
* Gist Push/Pull nur bei Bedarf testen
* Sprint-Zyklus testen

---

## 🧪 Sprint-Zyklus-Testplan

Minimaler Test für den Startflow:

1. Projekt öffnen.
2. Hauptchat prüfen oder setzen.
3. Optional Features auf `selected-for-sprint` setzen.
4. Sprintziel eintragen.
5. **Hauptchat um Sprintstart bitten** klicken.
6. Prompt in Hauptchat kopieren.
7. Hauptchat erzeugt:

   * Sprintchat-Startprompt
   * `roadtrip-sprint-start`-JSON
8. JSON in Roadtrip einfügen.
9. **Sprintstart-JSON importieren** klicken.
10. Prüfen:

    * Sprintchat wurde als `sprint` / `aktiv` angelegt oder aktualisiert.
    * Projektfokus wurde aktualisiert.
    * Next Step wurde aktualisiert.
    * ausgewählte geplante Features stehen auf `selected-for-sprint`.

Minimaler Test für den Abschlussflow:

1. Sprintchat als Ausgangschat auswählen.
2. **Prompt: Sprint-Bericht anfordern** klicken.
3. Prompt in Sprintchat kopieren.
4. Sprintchat liefert Handoff-JSON.
5. JSON in Roadtrip importieren.
6. Prüfen:

   * Projektfokus wurde aktualisiert.
   * Next Step wurde aktualisiert.
   * neue vorgeschlagene Features wurden defensiv angelegt.
   * Roadtrip erzeugt einen Prompt zur Rückgabe an den Hauptchat.

---

## 🔮 Roadmap

### Kurzfristig

* [ ] Sprintabschluss-Flow schärfen: Sprint-Handoff soll Sprintchats als `abgeschlossen` markieren, nicht als `aktiv`
* [ ] Hauptchat-Update-Prompt nach Sprintabschluss sichtbarer und eindeutiger machen
* [ ] Sprint-Zyklus-UX weiter vereinfachen: Start, Import, Abschluss und Rückgabe klarer staffeln
* [ ] Feature-Auswahl für den nächsten Sprint direkt im Sprint-Zyklus ermöglichen
* [ ] Browser-Test des vollständigen Zyklus durchführen: Roadtrip → Hauptchat → Roadtrip → Sprintchat → Roadtrip → Hauptchat

### Mittelfristig

* [ ] App-Versionen für Code-Import weiter ausbauen
* [ ] Soll/Ist-Matching zwischen `planned` und `implemented` vorbereiten
* [ ] Chat-Status-Übersicht als Mini-Datenbank ausbauen
* [ ] Trello-Listen optional mit lesbaren Statuslabels statt technischen Statuswerten führen
* [ ] Summary-only vs. Feature-Import im UI noch klarer trennen
* [ ] Sprint-Feature-Auswahl und Projekt-Momentum enger verzahnen

### Langfristig

* [ ] Roadtrip als zentrale Steuerungsebene für mehrere Single-File-Apps ausbauen
* [ ] bessere Version-Diffs mit Detailansicht
* [ ] robustere Import-/Cleanup-Review-Flows
* [ ] bessere Verknüpfung von Features, Chats, Prompts und Code-Versionen
* [ ] optional robusteren konfliktbewussten Gist-Sync nach Daily-Log-Vorbild prüfen

---

## 🏁 Nutzung

1. `index.html` öffnen.
2. Projekt anlegen oder auswählen.
3. Features, Notizen oder Chats erfassen.
4. Code analysieren oder Prompt erzeugen.
5. KI-Ergebnis als JSON importieren.
6. Cleanup-/Review-Vorschläge prüfen.
7. Features einem Pool zuordnen:

   * `planned` für geplante/offene Features
   * `implemented` für erkannte/umgesetzte Features
8. Projekt-Momentum prüfen.
9. Sprint-Zyklus nutzen:

   * Roadtrip erzeugt Hauptchat-Anweisung
   * Hauptchat erzeugt Sprintstart + JSON
   * Roadtrip importiert JSON
   * Sprintchat führt Sprint aus
   * Sprintchat liefert Abschlussbericht
   * Roadtrip aktualisiert Hauptchat-Kontext

---

## 💡 Hinweis

Roadtrip ist kein magisches Auto-Sync-Tool.

Roadtrip ist ein:

> Denk-, Steuerungs- und Review-System für Softwareprojekte.

Du entscheidest, was übernommen, aktualisiert, ignoriert oder später geprüft wird.

Roadtrip soll dir dabei helfen, weniger Kontext im Kopf jonglieren zu müssen: strukturierte Daten liegen in Roadtrip, narrativer Projektkontext liegt im Hauptchat, konkrete Ausführung liegt im Sprintchat.

---

## 📄 Lizenz

Noch offen.
