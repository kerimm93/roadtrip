# Handoff — Cleanup-Workbench update-existing-Bridge

- Branchname: `sprint/cleanup-workbench-update-existing-bridge`
- Ausgangscommit: `6449c6c34b5049a6ad57bcee2cc4cc41f694be2d`
- Arbeitsstand vor Commit: Änderungen in `index.html`, `DECISIONS.md`, `docs/ARCHITECTURE.md`; neu `tests/cleanup-workbench-update-existing-bridge.test.js` und dieses Handoff.
- Repository-Gate: `git merge-base --is-ancestor 6449c6c34b5049a6ad57bcee2cc4cc41f694be2d HEAD` bestand auf HEAD `6449c6c34b5049a6ad57bcee2cc4cc41f694be2d`.

## Wiederverwendete bestehende Funktionen

Gelesen und wiederverwendet beziehungsweise eng erweitert: `normalizeCleanupWorkbenchRunRecord`, `normalizeCleanupWorkbenchProposal`, `createCleanupWorkbenchRunFromReview`, `hydrateCleanupReviewFromWorkbenchRun`, `openCleanupWorkbenchRun`, `getActiveCleanupWorkbenchRun`, `getCleanupWorkbenchCase`, `setCleanupWorkbenchCaseStatus`, `completeCleanupWorkbenchRun`, `reopenCleanupWorkbenchRun`, `buildCleanupReviewMainChatClarificationPrompt`, `getCleanupReviewMainChatDecisionScope`, `buildMainChatDecisionContext`, `parseStrictCleanupDecisionJson`, `validateMainChatDecisionPayload`, `normalizeMainChatDecisionPayload`, `buildMainChatDecisionPreview`, `checkCleanupMainChatReturnJson`, `invalidateCleanupMainChatDecisionPreview`, `getCleanupMainChatFieldApplicability`, `getCleanupProposalLosslessFieldBlocks`, `buildCleanupMainChatUpdateBatch`, `reviewSelectedCleanupMainChatUpdates`, `cancelCleanupMainChatPendingBatch`, `checkCleanupMainChatBatchDrift`, `getCleanupMainChatProtectedStateDiffs`, `commitCleanupMainChatUpdateBatch`, `confirmCleanupMainChatPendingBatch`, `saveAsync`.

## Neue Helper

- `normalizeCleanupWorkbenchMainChatDecision`
- `normalizeCleanupWorkbenchMainChatApplication`
- `getCleanupWorkbenchProposalStrictFeatureId`
- `getCleanupWorkbenchStrictFeatureBinding`
- `getCleanupWorkbenchMainChatDecisionScope`
- `getCleanupWorkbenchUpdateEligibility`
- `buildCleanupWorkbenchPersistedMainChatPreview`
- `persistCleanupWorkbenchMainChatDecisions`
- kleine JSON-Vergleichshelper `stableCleanupJson` / `cleanupDeepEqual`

## Datenmodell und Trust Boundary

Workbench-Cases erhalten additiv `mainChatDecision` und `mainChatApplication`. Fresh Cleanup-Modell-JSON bleibt untrusted und kann weder Case-IDs noch Runtimeflags noch Decision/Application-Felder setzen. Hauptchat-JSON wird strikt geparst, validiert und normalisiert; gespeichert wird nur die bekannte Entscheidungsteilmenge mit lokalem `validatedAt`. Unbekannte Application-Werte normalisieren konservativ zu `invalid` und sperren Apply.

## Anwendbarkeitsregel

Anwendbar ist ausschließlich ein aktiver Run im aktuellen Projekt, Case-Status `reviewed`, Application exakt `null`, gespeicherte normalisierte Entscheidung `roadtrip-mainchat-decisions-v1` mit `decision: update-existing`, geschlossene Projekt-/Case-/Feature-ID-Bindung, existierendes Feature im Projekt, mindestens eine echte Änderung an `title`, `description` oder `category`, keine geänderten preview-only/verbotenen Felder und bestandene CSV-/Lossless-Guards. `open`, `rejected`, `deferred`, mutationsfreie Hauptchat-Entscheidungen, Dedupe, Create, Promotion, Split, bereits angewendete Cases und invalid Applications sind gesperrt.

## Preview, Drift, Commit und Rollback

Workbench-Preview wird nach Import aus persistierten `mainChatDecision`-Werten und aktueller Featurebaseline aufgebaut; Auswahl startet leer. Der Batch friert `origin` mit Run-ID/Projekt/Runstatus/`run.updatedAt` und pro Entry Case-Status/`case.updatedAt`/Feature-ID/tiefem Decision-Snapshot/Application-Baseline ein. Drift blockiert Featurebaseline-Änderungen, Run-/Case-Zeitstempel- und Statusdrift, Decision-Drift, gesetzte Applications und Featurebindungsdrift.

Der Commit erweitert den bestehenden Kandidaten-State-Pfad: Featureänderung und Workbench-Anwendungsnachweis werden im selben Kandidaten-State aufgebaut, Protected-State-Allowlist geprüft, `S = candidate` gesetzt und genau einmal `await saveAsync()` ausgeführt. Bei Fehlern wird der vollständige vorherige State restauriert. Case-Status und gespeicherte Entscheidung bleiben unverändert.

## UI-Änderungen

Der Workbench-Bereich kann einen strukturierten Hauptchat-Prompt erzeugen, Rückgabe einfügen/prüfen, persistierte Entscheidungen als `Hauptchat-Entscheidung erforderlich`, `Entscheidung validiert`, `Anwendbar`, `Nicht anwendbar: ...`, `Erfolgreich angewendet ...` beziehungsweise `Anwendungsnachweis ungültig – Anwendung gesperrt` darstellen und anwendbare Cases in den vorhandenen Diff-/Confirm-Pfad geben.

## Persistenz-/Export-/Syncauswirkungen

Keine Änderung an Persistenzarchitektur, ZIP, Gist, Merge, Tombstones oder Projektlöschung. Die neuen Felder liegen in `S.analyses` und reisen dadurch mit JSON-Export, ZIP `analyses.json`, selektivem Merge, Gist-Whole-Record-Merge und Projektlöschung/Tombstones als Teil des bestehenden Analysis-Records. Das bekannte Whole-Record-Mehrgeräterisiko bleibt bestehen.

## Sicherheitsguards / Nicht-Umsetzungen

- Es entstand keine neue Commit-Engine.
- Es entstand kein paralleler Workbench-Apply-Pfad.
- Es wurde keine externe Testprojektlogik übernommen.
- Dedupe blieb mutationsfrei.
- Es wurde keine Create-, Promotion-, Split-, Pool-, Status-, Queue-, Papierkorb- oder Tombstone-Anwendung eingeführt.
- Featureänderung und Workbench-Anwendungsnachweis werden im selben Kandidaten-State und mit genau einem atomaren saveAsync() gespeichert.

Bewusst nicht umgesetzt: keine allgemeine Persistenz-/Sync-/ZIP-/Merge-Refaktorierung, keine Lösung von Whole-Record-Konflikten, kein Dedupe-Apply, kein Create/Promotion/Split/Pool/Status-Pfad.

## Checks

- `node tests/cleanup-workbench-p1-review.test.js` — PASS, bestehende Workbench-P1-Guards grün.
- `node tests/cleanup-workbench-update-existing-bridge.test.js` — PASS, fokussierte Normalisierungs-/Import-/Eligibility-/Batch-/Commit-/Rollback-Regressionen grün.
- `node -e "const fs=require('fs');const vm=require('vm');const c=fs.readFileSync('index.html','utf8');const scripts=[];let m;const re=/<script(?![^>]*src)[^>]*>([\\s\\S]*?)<\\/script>/gi;while((m=re.exec(c))!==null)scripts.push(m[1]);new vm.Script(scripts.join('\\n'));console.log('JS OK');"` — PASS.
- `git diff --check` — PASS.
- `git diff --name-only` / `git diff --stat` — geprüft.
- Browser-Smoke: nicht ausgeführt; in der Umgebung wurde kein Chromium/Chrome und keine vorhandene Playwright-/Puppeteer-Strategie gefunden. Mergeeinschätzung daher höchstens: statisch plausibel, Browser-Merge-Gate offen.

## Risiken und offene Fragen

- Browser-Realabnahme mit DOM-/Chromium-Fluss ist offen.
- Whole-Record-Synckonflikte bleiben bekanntes Risiko.
- Der neue Node-Test deckt die Atomaritäts- und Driftregeln programmatisch ab, ersetzt aber keine echte Reload-/IndexedDB-/localStorage-Browserabnahme.

## Mergeeinschätzung

Statisch plausibel, Browser-Merge-Gate offen.

## Nächster Schritt

Echter Analyse-Durchlauf als kombinierte Realbrowser-, Drift-, Export- und Atomaritätsabnahme auf einem isolierten Testprojekt.
