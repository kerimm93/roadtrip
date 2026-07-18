# Audit · Analyse-/Cleanup-Realbetrieb vom 18.07.2026

## Zweck und Testkontext

Dieser Audit dokumentiert den im Auftrag berichteten Realbetrieb des aktuellen
Roadtrip-Analysepfads. Er ist ein fachlicher Realtestbericht, kein neuer
Produktsprint und keine Implementierungsbehauptung über nicht getestete Pfade.
Implementierungsclaims in den Kern-Dokumenten wurden zusätzlich gegen `index.html`
geprüft.

Testprojekt:

- Projekt: FIAE-RPG
- Roadtrip-`projectId`: `p_l2uhjme5`
- CSV-Features: 65
- `implemented`: 29
- `planned`: 36

## Kurzfazit / Freigabe

Roadtrip ist für mutationsfreie Analyse, lokale Validierung und Preview
**eingeschränkt freigegeben**. Der Ablauf ist noch nicht als dauerhaft
wiederaufnehmbarer, zeitsparender Cleanup-Arbeitsprozess freigegeben.

## Testkette

Der getestete Ablauf umfasste:

1. reguläre Analyse,
2. manuelle Syntaxreparatur der Modellantwort,
3. Transformation,
4. Cleanup-Import,
5. Dedupe-Rückgabe und lokale Preview,
6. Hauptchat-Rückgabe und lokale Preview,
7. finaler Feature-CSV-Export.

## Bestätigte Schutzmechanismen

Im Realbetrieb wurde bestätigt:

- Alle 65 bestehenden Feature-IDs wurden genau einmal gebunden.
- Es wurden keine bestehenden IDs erfunden, ausgelassen oder doppelt gebunden.
- Ungültige Modellantworten wurden nicht als Cleanup-Ergebnis übernommen.
- Eine fremde beziehungsweise unzulässige `canonicalFeatureId` wurde lokal abgelehnt.
- Bestehende Featurebeschreibungen blieben im CSV-Transformationskontext geschützt.
- Die strukturierte Dedupe-Rückgabe und lokale Preview blieben vollständig
  mutationsfrei.
- Aus `roadtrip-dedupe-decisions-v1` gab es keine Merge-, Archivierungs-, Lösch-,
  Duplicate-Markierungs-, Status-, Pool- oder sonstige Apply-Mutation. Der
  separate direkte Cleanup-Review-Papierkorbpfad wurde damit nicht als neuer
  Dedupe-Apply-Vertrag freigegeben.
- Der finale Feature-CSV-Export war bytegleich zum Ausgangsexport.

## Befunde

### B-001 — JSON-Vertrag verhindert Modell-Escapingfehler nicht

Die reguläre Analyseantwort enthielt in einem JSON-String ein HTML-Fragment mit
nicht maskierten Anführungszeichen, z. B. `class="qs mt-ihk-box"`. Dadurch war
die Modellantwort unparsebar. Ein Prompt mit der Forderung „ausschließlich
gültiges JSON“ ist keine technische Garantie; lokale Validierung bleibt zwingend.

### B-002 — Escape-Fehler wiederholte sich im Transformationschat

Auch nach manueller Syntaxreparatur konnte der nächste Modellschritt denselben
Fehler erneut einführen. Ein zusätzlicher Modell-Transformationsschritt ist daher
kein verlässlicher JSON-Reparaturmechanismus.

### B-003 — Parsefehler-UX war fachlich irreführend

Bei unparsebarem JSON erschien sinngemäß eine Meldung wie „Keine Vorschläge oder
openQuestions gefunden“, obwohl tatsächlich ein JSON-Parsefehler vorlag.
Ungültiges JSON und gültiges JSON mit leerem Ergebnis müssen künftig klar getrennt
dargestellt werden. Dieser Audit dokumentiert die Lücke; er implementiert den Fix
nicht.

### B-004 — Dedupe-Modell erfand unbelegte Zielbeschreibung

Bei einer `merge-manually`-Empfehlung formulierte das Modell eine lange
`canonicalDescription`, deren Details nicht vollständig aus dem bereitgestellten
Paartext belegt waren. Die lokale strukturierte Dedupe-Preview verhinderte eine
Mutation. `roadtrip-dedupe-decisions-v1` bleibt Preview-only; ein späterer
strukturierter Dedupe-Apply braucht einen eigenen atomaren Vertrag und gehört nicht
in die nächste Workbench-Arbeit.

### B-005 — Hauptchat vermischte Open Question und Dedupe

Ein Fall ohne `featureId` erhielt eine Dedupe-artige Entscheidung und eine fremde
`canonicalFeatureId`. Die lokale Validierung lehnte dies korrekt ab. Für Fälle
ohne `featureId` dürfen keine persistierbaren Featurefelder oder fremde
kanonische Featurebindungen entstehen.

### B-006 — Zentrale Produktlücke: Cleanup ist nur temporäre Preview

Der Analyseimport erzeugte zahlreiche Reviewfälle. Hauptchat- und Dedupe-Antworten
konnten sicher validiert und angezeigt werden, aber der Arbeitsstand ist derzeit
überwiegend temporär und nicht als dauerhaft wiederaufnehmbarer Cleanup-Run
organisiert.

Nach einem 10–20-minütigen Abgleich fehlen als dauerhafter zusammenhängender
Arbeitsstand insbesondere:

- persistenter Analyse-/Cleanup-Run,
- Baseline und Herkunft,
- Fallstatus,
- menschliche Reviewentscheidung,
- nächste Aktion,
- Wiederaufnahme nach Hard Reload,
- nachvollziehbarer Abschluss nicht-mutierender Entscheidungen.

### B-007 — Kein natürlicher `update-existing`-Fall im Realtest

Im FIAE-RPG-Durchlauf entstand kein natürlicher reversibler `update-existing`-Fall.
Deshalb wurden der neue Confirm-/Commit-Pfad, Driftprüfung, Hard-Reload-Persistenz
und Batchatomarität in diesem Durchlauf nicht künstlich erzwungen.

Aktueller Status des Confirm-/Commit-Pfads:

- code-seitig implementiert,
- statisch geprüft,
- auf validierte Hauptchat-Entscheidungen vom Typ `update-existing` begrenzt,
- erlaubte Zielbereiche: `title`, `description`, `category`,
- `roadtrip-dedupe-decisions-v1` bleibt Preview-only,
- echter natürlicher Browser-Realnachweis für Commit, Drift und Atomarität steht
  noch aus.

## Offene Nachweise

Nicht als bestanden behaupten:

- natürlicher Browser-Realnachweis für `update-existing`-Commit,
- Driftprüfung im echten Browserbetrieb,
- Hard-Reload-Persistenz eines Commit- oder Workbench-Laufs,
- Batchatomarität unter natürlichen Fehler-/Driftbedingungen,
- dauerhaft wiederaufnehmbarer Cleanup-Arbeitsprozess.

## Aktuelle Produktlücke

Die zentrale Lücke ist nicht die lokale Validierung oder mutationsfreie Preview,
sondern der fehlende persistente Arbeitsstand für Cleanup-Runs und
Reviewentscheidungen. Der aktuelle Zustand ist überwiegend Textarea-/Runtime-/UI-
State und reicht nicht für einen zeitsparenden, unterbrechbaren Reviewprozess.

## Empfohlene nächste Produktpriorität

Nächster Produktsprint: **Persistente Cleanup-Workbench & bestätigte
Review-Entscheidungen**.

Zielrichtung:

- Analyse-/Cleanup-Läufe dauerhaft speichern,
- denselben Lauf nach Reload wiederherstellen,
- pro Fall Baseline, Analysegrund, menschliche Entscheidung, Status und nächste
  Aktion anzeigen,
- nicht-mutierende Entscheidungen dauerhaft speichern,
- klare Filter und Zähler nach Fallstatus,
- JSON-Parsefehler klar von einem gültigen leeren Ergebnis trennen,
- validierte `update-existing`-Fälle ausschließlich an den bestehenden Diff-/
  Confirm-/Commitpfad übergeben,
- die strukturierte Dedupe-Rückgabe weiterhin mutationsfrei halten.

## Bewusst getrennte spätere Mutationspfade

Nicht Teil der nächsten Workbench-Arbeit:

- neuer automatischer Dedupe-Merge,
- Archivierung oder Löschung,
- automatische Status-/Pool-Promotion,
- Feature-Neuanlage aus Analysebefunden,
- unstrukturiertes Voll-Auditlog,
- neuer paralleler `update-existing`-Commitmechanismus.
