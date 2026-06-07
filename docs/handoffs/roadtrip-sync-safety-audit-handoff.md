# Roadtrip Sync Safety Audit – Handoff

> **Datum:** 7. Juni 2026
> **Branch:** `work`
> **Auftrag:** Docs-only-Audit der Roadtrip-Synchronisationslogik im Vergleich zur Daily-Log-Sync-Referenz.

## Ergebnis

Erstellt wurde ein detaillierter Auditbericht:

- `docs/audits/roadtrip-sync-safety-audit.md`

Zusätzlich wurde dieses kurze Handoff angelegt:

- `docs/handoffs/roadtrip-sync-safety-audit-handoff.md`

## Analysierter Scope

- IndexedDB-first-/localStorage-Fallback-Persistenz
- verschlüsselter Full-State-Gist
- Legacy-Klartext-Migration
- normaler Read-Merge-Write-Sync
- direkter Remote-Overwrite
- Fingerprint-/Dirty-/Empty-State-Logik
- Whole-entity-Merge nach ID/Timestamp
- Tombstones und Feature-Papierkorb
- JSON Export/Import/Replace
- strukturiertes ZIP Backup/Restore
- Full-/Compact-/Raw-Notfallexporte
- unverschlüsselter Raw-Backup-Gist
- Statusmeldungen, Confirm-Gates und Recovery-Semantik
- Vergleich mit `docs/reference/daily-log-sync-reference.md`

## Kernrisiken

### P0

1. `gistPush()` überschreibt Remote ohne vorheriges Remote-Read, Revision-Gate oder Empty-State-Block.
2. `gistSync()` besitzt zwischen GET und PATCH keinen ETag-/Revision-/CAS-Schutz; ein paralleles Gerät kann ungesehen überschrieben werden.

### P1

1. Kein Remote-Readback und keine entschlüsselte Hash-/Inhaltsverifikation nach PATCH.
2. Whole-entity-LWW nach Timestamp ohne Sync-Konflikt-UI oder Drei-Wege-Basis.
3. Runtime-Rollback im normalen Sync greift nur für explizit mit `cloud-write:` markierte Fehler; andere Write-Phase-Fehler können einen veränderten Merge-State hinterlassen.
4. Sync-/Import-Erfolg wird vor bestätigtem IndexedDB-Commit gemeldet.
5. Remote-/Importvalidierung prüft weder vollständiges Schema noch Referenzen oder unterstützte Versionen.
6. Raw-Gist schreibt Notes und Analysen unverschlüsselt.

### P2

1. Keine automatischen Snapshots vor Force Push, JSON Replace oder ZIP Replace.
2. Tombstones werden nach 90 Tagen ohne Geräte-/Revision-Acknowledgement gepruned.
3. Kein getrenntes Gist-Restore, keine Snapshot-Historie und kein selektiver Entity-Restore.

## Positive Befunde

- Normaler Sync liest Remote vor einem möglichen Write.
- Frischer/leerer lokaler State übernimmt datenhaltiges Remote im Standardflow.
- Haupt-Gist ist AES-GCM-verschlüsselt; Passphrase ist ein Write-Gate.
- Globaler Fingerprint ignoriert reine Sync-Zeitmarker und erkennt No-Op.
- Tombstones werden lokal/remote vereinigt und auf alle synchronisierten Entitätsarrays angewandt.
- Projektlöschung tombstoned auch die verknüpften Kernentitäten.
- ZIP besitzt Manifest, Pflichtdateien, Count-Checks, Preview und Confirm.
- Remote Overwrite ist sichtbar in einer Danger-Zone getrennt.
- Für den Haupt-Gist wurde kein Auto-Push gefunden; damit besteht das Daily-Log-Auto-Push-Risiko in Roadtrip derzeit nicht.

## Wichtigste Daily-Log-Prinzipien für Roadtrip

1. Safe Sync als Read → Validate → Merge → Write → Readback → Persisted.
2. Empty-State-Guard beibehalten und von lokalem Load-Fehler unterscheiden.
3. Push-Marker/Runtime-State bei jeder Write-Fehlerklasse sauber rollbacken.
4. Automatischer Snapshot vor destruktiven Aktionen.
5. Strukturierter Sync-Return und phasenbasierte Statusmeldungen.
6. Revision/ETag/CAS gegen Parallelgeräte.
7. Tombstone-Pruning nicht allein zeitbasiert.
8. Konflikte fachlich pro Entität/Feld behandeln statt „mehr Objekte gewinnt“.

## Empfohlene Fix-Sprint-Reihenfolge

1. **Sprint A:** strukturierte Sync-Ergebnisse und vollständige Write-Fehler-/Rollback-Semantik.
2. **Sprint B:** Remote-Readback und Write-Verifikation.
3. **Sprint C:** Force Push mit Remote-Preflight, Empty-State-Gate und Snapshot.
4. **Sprint D:** optimistic concurrency für normalen Sync.
5. **Sprint E:** awaitbarer lokaler Persistenzabschluss für Sync/Replace.
6. **Sprint F:** versionierter Schema-/Referenzvalidator.
7. **Sprint G:** automatische Pre-Destruction-Snapshots.
8. **Sprint H:** entitätsspezifische Konflikt-Preview.
9. **Sprint I:** Tombstone-Lebenszyklus und Restore-Vertrag.
10. **Sprint J:** verschlüsselter/geschlossener Raw-Backup-Recovery-Pfad.

## Offene Fragen

- Welche historischen Remote-/Backup-Versionen existieren real?
- Welche Felder aktualisieren `updatedAt` in allen Schreibpfaden zuverlässig?
- Welche Beziehungen sind harte Invarianten für Projekte, Features, Notes, Chats/Sprints/Handoffs und Analysen?
- Welche Revisionstechnik ist für GitHub Gists verbindlich vorgesehen?
- Soll selektiver JSON-Import Tombstones immer übernehmen?
- Wie lange bleiben reale Geräte/Backups offline?
- Soll ein Remote-Write mit fehlgeschlagenem Readback als `unknown` behandelt werden?

## Bewusste Nicht-Umsetzungen

- keine Änderung an `index.html`
- keine Änderung an State-Schema, Config-Keys, Persistenz, Migration, Gist-Algorithmus, Verschlüsselung, Tombstones, JSON/ZIP oder Trello
- keine Remote-/Gist-Aufrufe
- keine Runtime-Sync-Tests
- kein Refactor und kein Bugfix

## Merge-Einschätzung

**Merge-fähig als Docs-only-Audit.** Der Bericht beschreibt Risiken und Sprintvorschläge, verändert aber keinerlei Produktivverhalten. Vor einem späteren Code-Sprint müssen die Schutzlisten in `AGENTS.md`, `DECISIONS.md` und `docs/ARCHITECTURE.md` erneut geprüft und die jeweilige Vertragsentscheidung eng festgelegt werden.
