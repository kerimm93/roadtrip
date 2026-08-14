# Handoff — Cleanup-Workbench Bulk-Review & Status-/Pool-Aktualisierung

- Branch: `sprint/cleanup-workbench-bulk-review-status-pool`
- Geändert: `index.html`, `DECISIONS.md`, `docs/ARCHITECTURE.md`, `tests/cleanup-workbench-p1-review.test.js`
- Neu: `tests/cleanup-workbench-bulk-review-status-pool.test.js`, dieses Handoff

## Umsetzung

Bulk-Review besitzt eine rein lokale, von Apply getrennte Case-Auswahl, direkte Aktionen und eine Bulk-Leiste. Einzel- und Bulkaktionen laufen durch `applyCleanupWorkbenchReviewStatusBatch`: vollständige Live-Guards, Candidate-State, Protected-State-Prüfung, ein `saveAsync`, kompletter Rollback und anschließende Hydration. Auswahl wird bei Filter-, Run-, Projekt-, Review- und Clear-Wechsel geleert.

Der neue Decision-Vertrag ist `roadtrip-status-pool-decisions-v1`. Die exakte Matrix ist `planned/planned → implemented/confirmed` und `planned/selected-for-sprint → implemented/confirmed`; zulässig sind nur `match-existing`/`update-existing` mit eindeutiger bestehender Featurebindung und bestätigtem Case. `reviewStatus` bleibt unverändert. Historisches `promote-existing` bleibt nicht ausführbar.

`mainChatApplication` trägt `applicationType: update-existing|status-pool-transition`; valide Altanwendungen ohne Typ werden nur bei reinen `title`/`description`/`category`-Änderungen kompatibel gelesen. Status-/Pool-Batches werden tief eingefroren und binden Run-, Case-, Decision-, Application- und Featurebaselines. Der bestehende Commitkern akzeptiert die neue `mutationClass`, prüft Drift/Allowlist/Protected State, schreibt Feature und Application im selben Kandidaten-State, speichert genau einmal und rollt vollständig zurück.

## Nicht umgesetzt / Risiken

Kein Legacy-/Stale-, Create-, Dedupe-, Split-, Lösch-, Archiv-, allgemeiner Statuseditor-, Trello-, Gist-/Merge- oder Persistenzumbau. Whole-Record-Mehrgerätekonflikte bleiben offen. Ein instrumentierter Browser-Smoke wurde mangels vorhandenem Browser-Harness nicht ausgeführt; natürlicher Realbrowser-Test bleibt Produktgate.

## Mergeeinschätzung

Nach grünen Pflichtchecks technisch bereit für den nachgelagerten natürlichen Realbrowser-Abnahmesprint; Browserfreigabe selbst bleibt offen.
