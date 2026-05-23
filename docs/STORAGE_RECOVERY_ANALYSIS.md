# Roadtrip Storage & Recovery Analysis

## 1. Executive Summary

Die vorliegende Implementierung spricht **nicht** für eine reine „Anzeige-Panik“ bei nur ~1.8 MB, sondern für einen **realen Save-Fehlerpfad** in `save()` (oder im Anschluss an „Rohdaten komprimieren“), der dann den scharfen Notfall-Text auslöst.

Kurzfazit:
- Bei ~1.8 MB Gesamtgröße liegt die interne Anzeige nur bei ~36 % der angenommenen 5 MB und würde aus der Display-Logik heraus **keine** „fast voll“-Warnung zeigen.
- Der drastische Alert („Browser-Speicher voll … sofort Notfall-Export“) wird nur im Fehlerfall gesetzt, wenn `save()` eine quota-ähnliche Exception erkennt.
- Damit ist die wahrscheinlichste Ursache: **echter `localStorage`-Write-Fehler**, aber potentiell aus einem Edge Case (Origin-/Browser-Quota, Private/Restricted Mode, inkonsistente Quota-Semantik), nicht zwingend aus „objektiv zu großer Roadtrip-Nutzlast“.
- Die aktuelle UX ist dabei zu grob: sie klassifiziert Fehler relativ pauschal als „Speicher voll“ und zeigt `_lastSaveError` nicht sichtbar im UI an.

## 2. Current Roadtrip Storage Architecture

### 2.1 Speicherorte und Trennung

Roadtrip speichert in `localStorage` mit separaten Keys:
- **App-State** unter `LKEY` (persistiert `S` als JSON)
- **Config** unter `CONFIG_KEY` (persistiert `C` als JSON)
- zusätzliche UI-Mappings via `saveUiMap()` (ebenfalls in `localStorage`)

Die Trennung State vs. Config ist vorhanden, aber beide Writes hängen am gleichen Browser-Storage-Mechanismus.

### 2.2 Zentrale Funktionen

- `defaultState()` erstellt den Hauptzustand inkl. `projects`, `features`, `notes`, `analyses`, `chats`, `importVersions`, `unmatchedNotes`.
- `defaultConfig()` enthält Theme/Gist/Trello/OpenAI-Settings.
- `load()` lädt State (`LKEY`) und Config (`CONFIG_KEY`) separat.
- `save()` ist die zentrale Persistenzfunktion.

### 2.3 `save()`-Verhalten

Ablauf in `save()`:
1. `_lastLocalSaveAt` setzen.
2. `ensureDefaults()` aufrufen.
3. `S` serialisieren (`JSON.stringify`).
4. `localStorage.setItem(LKEY, payload)`.
5. unmittelbare Verifikation via `getItem(LKEY)` + `JSON.parse(verifyRaw)`.
6. bei Erfolg: `_lastSaveError` ggf. leeren.
7. bei Fehler: catch-Logik mit quota-Klassifikation, Alerts, optional Notfall-Export.
8. anschließend separater Config-Save `setItem(CONFIG_KEY, JSON.stringify(C))`.
9. `updateStorageDisplay()`, Stats/Sidebar rerendern, `stateSaved` zurückgeben.

### 2.4 Fehlerstatusfelder

- `_lastSaveError` wird in `save()` gesetzt (`'quota-exceeded'` oder Fehlertext / `'save-failed'`) und bei Erfolg wieder geleert.
- Es gibt keinen klar sichtbaren UI-Block, der `_lastSaveError` persistent anzeigt (nur Alert/Confirm zur Laufzeit).

### 2.5 Potenzielle Verschärfung durch Wiederholungs-Saves

Ja, möglich:
- Viele UI-Inputs triggern direkt `save()` (z. B. Settings-Felder per `input`/`change`).
- Wenn ein Fehlerzustand anliegt, können wiederholte User-Aktionen wiederholt Alerts auslösen.
- `save()` schreibt auch bei fehlgeschlagenem State-Save weiterhin Config (separater try/catch), was zwar sinnvoll sein kann, aber zusätzliche Schreibversuche im Problemfall erzeugt.

## 3. Warning Logic

### 3.1 Alert-Stellen mit „Speicher voll / Notfall-Export“

Relevante harte Warntexte:

1. In `save()` bei quota-ähnlichem Fehler:
   - Alert: `⚠ Lokales Speichern fehlgeschlagen: Browser-Speicher voll. Bitte sofort Notfall-Export erstellen. Nicht neu laden.`
   - Confirm: `Soll jetzt ein vollständiger Notfall-Export aus dem aktuellen Arbeitsspeicher erstellt werden?`
   - optional `exportFullEmergencyJson()`.

2. In `compactRoadtripRawData()` wenn nach Komprimierung `save()` fehlschlägt:
   - Alert: `⚠ Rohdaten wurden im aktuellen Arbeitsspeicher komprimiert, aber noch nicht erfolgreich gespeichert. Bitte sofort vollständigen Notfall-Export erstellen und nicht neu laden.`
   - Confirm mit gleichem Notfall-Export-Angebot.

### 3.2 Prozentuale Schwellenwarnung

Unabhängig von Save-Fehlern zeigt `updateStorageDisplay()` nur eine **milde** Warnung ab `pct > 80`:
- `⚠ Speicher fast voll. Bitte JSON exportieren oder Rohdaten komprimieren.`

Diese Warnung ist rein UI-basiert (5-MB-Annahme) und nicht identisch mit dem harten Notfall-Alert.

### 3.3 Konsistenz Anzeige vs. harte Warnung

- Bei ~1.8 MB und 5 MB Limit (~36 %) sollte die prozentuale Anzeige **keine** „fast voll“-Warnung rendern.
- Wenn dennoch der harte Notfall-Text erschien, stammt das sehr wahrscheinlich aus dem `save()`-catch (oder dem Komprimierungs-Flow nach `save() === false`).

## 4. Storage Diagnostics

### 4.1 Größenberechnung

- `getByteSize(value)` nutzt primär `new Blob([payload]).size` (payload = String oder JSON-stringified Objekt).
- Fallback im catch: `String(...).length * 2` (grob UTF-16-nah).

### 4.2 Gesamt- und Teilgrößen

- `getRoadtripStorageReport(targetState)`:
  - `totalBytes` aus `JSON.stringify(base)`.
  - `areas` nur über feste Keyliste:
    - `projects`, `features`, `notes`, `chats`, `importVersions`, `analyses`, `appVersions`, `imports`.
  - sortiert absteigend nach Bytegröße.

### 4.3 5-MB-Annahme

- `updateStorageDisplay()` setzt `limitBytes = 5 * 1024 * 1024` fix.
- Diese Annahme beeinflusst **Anzeige/Bar/Warntext**, nicht die technische Save-Entscheidung selbst.

### 4.4 Aussagekraft bei 1.8 MB

- Diagnostisch wirkt 1.8 MB als „nicht nahe am 5-MB-Limit“.
- Trotzdem kann `setItem` fehlschlagen (Browser-/Origin-Sonderfälle, ggf. restriktiver Kontext, mögliche Quota-Fragmentierung, private browsing semantics).
- Deshalb: Anzeige „niedrig“ und Save-Fehler können gleichzeitig auftreten.

## 5. Raw Data Compression

### 5.1 Was komprimiert wird

`compactCloneData(target)` läuft rekursiv über Objekte/Arrays und ersetzt große Strings durch Platzhaltertexte mit Timestamp/Länge.

Regeln:
- bekannte Rohdaten-Keys (`rawHtml`, `fullHtml`, `sourceHtml`, `html`, `rawCode`, `sourceCode`, `rawPrompt`, `rawResponse`, `responseText`, `rawAnalysis`, `analysisText`, `largeText`, `fullText`) nur wenn > 2000 Zeichen.
- `code`/`prompt` als „maybe large“ ab > 8000 Zeichen.
- `rawReportText`/`rawHandoffText` nur wenn > 100 KB.
- `handoffHistory` wird auf letzte 3 Einträge gekürzt.

### 5.2 Destruktivität

- `exportCompactJson()` komprimiert nur einen Clone → nicht-destruktiv.
- `compactRoadtripRawData()` komprimiert **echten State `S`** nach Confirm → destruktiv im Arbeitsspeicher (aber bewusst bestätigt).

### 5.3 Vorherige Absicherung

- Es gibt Confirm mit Vorher/Nachher/Ersparnis.
- Keine harte Pflicht zum Export vor Komprimierung, aber bei anschließendem Save-Fehler wird Notfall-Export aktiv angeboten.

### 5.4 Warum im Beispiel nur ~34 KB Ersparnis plausibel ist

Plausible Ursachen in der aktuellen Logik:
- Größte Felder (`features`, `importVersions`) bestehen evtl. primär aus strukturierten Objekten statt extrem langer Raw-Strings.
- `rawReportText`/`rawHandoffText` werden erst >100 KB pro Feld angefasst.
- Viele potenziell große Texte liegen ggf. knapp unter den Schwellwerten.
- Damit können nur wenige Felder `fieldsTouched` erhalten, wodurch Ersparnis klein bleibt.

### 5.5 Save nach Komprimierung und Fehlerfall

- `compactRoadtripRawData()` ruft nach Mutation explizit `save()` auf.
- Bei `save() === false` wird sofort mit Warn-Alert + Confirm Notfall-Export geführt.

## 6. Largest Data Areas

Auf Basis der Diagnose-Logik werden als Top-Bereiche typischerweise sichtbar:
- `features`
- `importVersions`
- `chats`
- `analyses`
- `notes`

### 6.1 Spezifische riskante Felder

Langfristig risikobehaftet:
- `importVersions[].rawAnalysisText` (ungekürzte Import-Rohtexte können stark wachsen)
- `chats[].rawReportText`, `chats[].rawHandoffText` (nur ab 100 KB pro Feld komprimierbar)
- Chat-nahe Historien/Prompt-/Response-Felder (je nach tatsächlicher Struktur/Use)
- `learningMeta.notes` (pro Eintrag klein, in Masse relevant)

Geringeres Risiko kurzfristig:
- `notes` klassisch (wenn textlich moderat)
- reine Metadatenfelder/Flags

## 7. Comparison With Daily Log

**Daily Log source was not available in this Codex workspace.**

Daher kein belastbarer Codevergleich aus erster Hand möglich. Die Aussagen aus der Claude-Voranalyse (IndexedDB + localStorage-Fallback + Backup/Recovery-Layer) konnten hier nicht unabhängig im Daily-Log-Quellcode verifiziert werden.

## 8. Risk Assessment

### 8.1 Kurzfristiges Risiko

- **Mittel**: Daten sind im RAM vorhanden, aber lokales Persistieren kann punktuell fehlschlagen.
- Notfall-Export ist vorhanden, aber Alarmtext kann Nutzer verunsichern.

### 8.2 Mittelfristiges Risiko

- **Erhöht**: stetiges Wachstum von `importVersions`, `features`-Metadaten, Chats und Rohtexten erhöht Persistenzdruck.
- Ohne differenzierte Fehlerdiagnose bleibt Ursache bei Save-Fehlern unklar.

### 8.3 Risiko durch localStorage-only

- **Strukturell erhöht**: single storage backend, browserabhängige Quotas/Policies, synchrones API-Verhalten, keine robuste Mehrschicht-Recovery.

### 8.4 Risiko durch raw Import-Versionen

- **Hoch**: `rawAnalysisText` kann langfristig dominant werden; Komprimierung greift nur regelbasiert und manuell.

### 8.5 Risiko durch Chat-/Learning-Daten

- **Mittel bis hoch** (nutzungsabhängig): insbesondere ungekürzte Raw-/Prompt-/Response-Segmente und lange Verlaufshistorien.

## 9. Recommended Minimal Patch

**Nicht implementiert – nur Plan.**

Empfohlener kleiner Patch (ohne Architekturbruch):

1. **Fehlerklassifikation in `save()` verfeinern**
   - klar unterscheiden: quota-exceeded vs. verify-failed vs. parse-failed vs. unknown-save-error.
   - message mapping in nutzerverständliche Kategorien.

2. **`_lastSaveError` im UI sichtbar machen**
   - persistente, nicht-blockierende Warnleiste im Settings-/Storage-Bereich.
   - Anzeige von Typ + Timestamp + nächster Aktion (z. B. Notfall-Export).

3. **Alert-Spam begrenzen**
   - einmalige Warnung pro Fehlerklasse innerhalb eines Cooldowns.
   - weitere Fehler nur UI-Badge/Inline-Status, nicht jedes Mal `alert()`.

4. **Paniktext entschärfen und präzisieren**
   - nicht pauschal „Speicher voll“, wenn Fehlerursache unklar.
   - bei echter quota-Klassifikation weiter klar zu Notfall-Export leiten.

5. **Keine automatische Löschung**
   - ausschließlich Nutzerentscheidungen (Export, manuelle Komprimierung).

6. **Speicherdiagnose textlich ergänzen**
   - Hinweis, dass 5 MB nur grobe Anzeige ist und browserabhängig abweichen kann.

## 10. IndexedDB Recommendation

**Entscheidung: D) Kombination – kleiner Fix jetzt, IndexedDB später.**

Begründung:
- Ein kurzfristiger UX-/Diagnose-Fix reduziert Fehlalarme und verbessert Recovery sofort mit kleinem Risiko.
- Eine saubere IndexedDB-Migration ist kein Mini-Patch, sondern eigener Sprint (Datenmodell, Migration, Fallback, Tests, Recovery-Konzept).

## 11. Proposed Codex Patch Prompt

```md
Du arbeitest im Roadtrip-Repository (Single-File-App in index.html).

## Problem
Nutzer sehen teils die harte Warnung „Browser-Speicher voll … Notfall-Export“, obwohl die Storage-Diagnose nur ~1.8 MB zeigt. Die aktuelle Save-Fehlerbehandlung ist zu grob und `_lastSaveError` ist nicht sichtbar im UI.

## Relevante Funktionen
- save()
- updateStorageDisplay()
- getRoadtripStorageReport()
- compactRoadtripRawData()
- render-Bereich „Daten & Speicher“ (Settings)

## Gewünschte Änderungen (minimaler Patch)
1. In save() Save-Fehler genauer klassifizieren:
   - quota-exceeded
   - write-verify-failed
   - invalid-json-after-write
   - save-failed-unknown
2. `_lastSaveError` und `_lastSaveErrorAt` im State pflegen.
3. Sichtbare, nicht-blockierende UI-Anzeige für letzten Save-Fehler im Storage-Bereich.
4. Harte Panik-Alert nur für echte quota-exceeded-Fälle.
5. Für andere Fehler: weniger alarmistischer Text + Empfehlung Notfall-Export.
6. Alert-Spam vermeiden (Cooldown oder once-per-error-type), aber UI-Status stets aktualisieren.
7. Storage-Diagnosetext ergänzen: 5MB ist nur grobe Anzeige, Browser-Quotas variieren.

## Nicht-tun-Regeln
- Keine Änderung an Gist-/Trello-/Import-/Handoff-/Learning-/Momentum-Logik.
- Keine Datenmodell-Migration.
- Keine automatische Datenlöschung.
- Kein IndexedDB in diesem Patch.

## Akzeptanzkriterien
- Bei normalem Save keine Warnung, `_lastSaveError` wird geleert.
- Bei künstlich provoziertem quota-Fehler erscheint Notfall-Export-Warnung weiterhin klar.
- Bei nicht-quota Save-Fehlern erscheint eine präzise, weniger panische Warnung.
- Letzter Save-Fehler ist im UI sichtbar (inkl. Zeitstempel).
- Wiederholte Fehler führen nicht zu Alert-Spam.
- Bestehende Funktionen bleiben unverändert nutzbar.

## Testprotokoll
- Manuelles Durchklicken: Settings-Inputs, Feature-Änderung, Chat-Änderung -> Save ok.
- Simulierter Save-Fehlerpfad (temporär/mock) -> richtige Klassifikation + UI-Anzeige.
- compactRoadtripRawData() mit anschließendem Save-Fehler -> Recovery-Hinweis konsistent.
- Storage-Anzeige weiterhin funktionsfähig.

## JS-Syntaxcheck
- Führe nach Patch einen JS-Syntaxcheck aus (z. B. Node parse check auf das Script bzw. projectübliche Prüfung).
- Keine weiteren Refactors.
```
