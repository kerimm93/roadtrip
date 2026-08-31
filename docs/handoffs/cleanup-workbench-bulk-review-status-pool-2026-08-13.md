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

## Review-Nachziehpatch vom 14.08.2026

Geändert wurden ausschließlich `normalizeCleanupWorkbenchMainChatApplication`, die Status-/Pool-Revalidation in `commitCleanupMainChatUpdateBatch`, `getCleanupStatusPoolEligibility`, `validateCleanupStatusPoolDecisionPayload`, `persistCleanupStatusPoolDecisions` und die fokussierten Regressionstests. Trashed Features sind nun bei Import, Preview/Eligibility, Batch und Commit-Revalidation geschlossen gesperrt. Status-/Pool-Applications gelten nur noch mit dem vollständigen exakten Pool-/Status-Nachweis als angewendet. Sämtliche Hauptchat-Intents außerhalb der zentralen mutationsfreien Allowlist blockieren den Übergang; damit bleiben insbesondere `promote-existing`, Split, Create und Duplicate-Intents nicht ausführbar. Fachlich identische Decision-Reimports sind echte No-ops ohne Zeitstempeländerung oder Save; tatsächlich geänderte Teilantworten bleiben atomar speicherbar.

Die beiden ursprünglichen P2-Funde (Trash-Eligibility und unvollständige Application-Nachweise) sind damit programmatisch geschlossen. Der Patch soll vor Merge erneut reviewed werden; der natürliche Realbrowser-Test bleibt offen.

## Legacy-Case-Nachziehpatch vom 14.08.2026

Ursache des bestätigten P2-Fehlers war die asymmetrische Verwendung eines normalisierten aktiven Runs zur Review-Validierung und eines rohen Candidate-Records zum Schreiben: Ein vom Normalisierer synthetisierter Legacy-Case konnte im rohen `reviewState.cases` fehlen. `applyCleanupWorkbenchReviewStatusBatch` normalisiert den geklonten Ziel-Run nun vollständig, setzt ihn an derselben Analysis-Position ein und mutiert erst danach Case-/Run-Felder. Der exakte rohe `previousState` bleibt ausschließliches Rollbackziel.

Die Review-Protected-State-Prüfung normalisiert den Ziel-Run im Before- und After-Vergleich in dieselbe kanonische Form und neutralisiert anschließend nur ausgewählte Case-`status`/`updatedAt` sowie Run-`updatedAt`; fremder State bleibt strukturell geschützt. Der Regressionstest deckt einen direkt in `S.analyses` angelegten Partial-Run ohne persistierten Case, genau einen Save, kanonische Persistenz, geschützte Features/fremde Analyse/Queue/Trash/Tombstones und einen bytegleichen Rollback auf den rohen Legacy-State ab.

`persistCleanupStatusPoolDecisions` wurde read-only auf denselben Fall geprüft und nicht geändert: Fehlt der persistierte Case, normalisiert er zu `open` und scheitert bereits an der zwingenden `reviewed`-Eligibility. Ist ein Case `reviewed` und damit importfähig, existiert sein roher Case-Eintrag bereits als Schreibziel. Ein vorsorglicher Umbau wäre daher außerhalb dieses bestätigten Fehlers gewesen.

Mergeeinschätzung bleibt: technisch für den letzten kumulierten Sprintchat-Review bereit, noch nicht mergen; natürlicher Realbrowser-Test weiterhin offen.

## Kumulativer Protected-State-/Preview-Nachziehpatch vom 14.08.2026

`getCleanupMainChatProtectedStateDiffs` kanonisiert jetzt ausschließlich Vergleichskopien des Ziel-Workbench-Runs deterministisch über `canonicalizeCleanupWorkbenchRunForProtectedComparison`. Dadurch zählen additive Legacy-Defaults wie fehlendes `statusPoolDecision: null` oder die Migration einer validen Alt-Application zu `applicationType: update-existing` nicht als fachliche Mutation. Die Allowlist bleibt unverändert eng; der Test weist weiterhin einen Protected-State-Fehler bei einer echten Änderung von `run.result.summary` nach. Der rohe `previousState` bleibt Rollbackziel, einschließlich eines Savefehler-Tests auf dem alten Run-Shape.

Eine tatsächliche Änderung der Status-/Pool-Auswahl verwirft nun sofort den eingefrorenen `pendingBatch`; identisches erneutes Setzen behält ihn. Nach erfolgreichem Status-/Pool-Commit werden Status-/Pool- und MainChat-Preview aus demselben frisch normalisierten persistenten Run neu aufgebaut, beide UI-Auswahlen geleert und beide Pending-Batches verworfen. Der Rebuild ist read-only und erzeugt keinen zweiten Save; ein anderer `update-existing`-Case bleibt danach anwendbar, während der angewendete Status-Case gesperrt ist.

Der Regressionstest deckt Status-/Pool-Commit und anschließenden `update-existing`-Commit auf einem Legacy-Run mit fehlendem `statusPoolDecision`-Property an einem anderen Case und einer validen Alt-Application ohne `applicationType` ab. Mergeeinschätzung: technisch bereit für den verlangten vollständigen kumulativen Review, weiterhin nicht automatisch mergen; natürlicher Realbrowser-Test offen.

## Pre-Decision-/Prompt-Nachziehpatch vom 14.08.2026

Der Status-/Pool-Workflow trennt jetzt `getCleanupStatusPoolDecisionCandidateEligibility` (Entscheidung anforderbar, ohne persistierte Decision) von der weiterhin finalen `getCleanupStatusPoolEligibility` (Apply-fähig, mit valider persistierter Decision und Live-Transition). Requestable sind ausschließlich aktive, menschlich bestätigte, strikt gebundene `match-existing`-/`update-existing`-Cases ohne Trash, Application oder konkurrierenden mutierenden Hauptchat-Intent und mit `planned/planned` oder `planned/selected-for-sprint`; Confidence ist kein Gate.

`buildCleanupStatusPoolDecisionPrompt` nimmt ausschließlich diese requestable Cases auf und gibt Projekt-/Run-/Case-/Featurebindung, Titel, Proposaltyp, aktuellen Pool/Status, informativen Reviewstatus/Confidence, Änderungshinweis, Evidenz und Proposal-Kontext aus. Der geschlossene Rückgabevertrag bleibt `roadtrip-status-pool-decisions-v1` mit ausschließlich `confirm-implemented` nach `implemented/confirmed`; Teilantworten dürfen nicht bestätigte Cases auslassen. Prompt, Ausgabe und Kandidatenliste sind UI-lokal/read-only, erzeugen weder Save noch Decision, Batch oder Featuremutation und werden bei Hydration/Clear zurückgesetzt.

Der Fresh-Case-Test belegt Sichtbarkeit als `requestable:true` und `selectable:false`, mutations-/savefreie Promptgenerierung für beide erlaubten Ausgangsstatus sowie geschlossene Pre-Decision-Guards. Der bestehende End-to-End-Test importiert danach die strukturierte Rückgabe, hält Features bis zum finalen Confirm geplant und verwendet unverändert Frozen-Batch, Drift, Protected State, Single-save und Rollback. Mergeeinschätzung: bereit für den letzten kumulativen Sprintchat-Review, noch nicht mergen; danach bleibt ausschließlich der natürliche Realbrowser-Abnahmelauf offen.
