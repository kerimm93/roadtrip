# Persistent Cleanup Workbench Handoff — 2026-07-19

Branch: `sprint/cleanup-workbench-mvp`

## Implemented

- Added `cleanupRuns` as an additive Roadtrip root array using
  `roadtrip-cleanup-run-v1`.
- Added closed run/case/next-action/human-decision enums with defensive
  normalization.
- Added persistent run creation for valid cleanup imports and active-run reuse per
  project.
- Added Workbench rendering in the existing Import/Cleanup area with counters,
  filter, case details, human decisions and run close/reactivate actions.
- Added parse diagnostics for relevant cleanup inputs: parse-error,
  validation-error, valid-empty and valid-content.
- Persisted validated main-chat and Dedupe decisions on matching cases. Dedupe is
  still mutation-free.
- Extended the existing update-existing commit path to mark selected commit-ready
  cases applied in the same save as allowed feature changes.
- Integrated cleanup runs into JSON import/merge, ZIP export/restore, sync compare,
  Gist merge, timestamps, user-data detection, counts and project deletion
  tombstones.

## Data model

Run statuses: `active`, `completed`.

Case statuses: `open`, `reviewed`, `kept-open`, `deferred`,
`browser-test-needed`, `dedupe-decision-recorded`, `not-adopted`, `commit-ready`,
`applied`.

Next actions: `review`, `main-chat-review`, `dedupe-review`, `project-decision`,
`browser-test`, `commit`, `none`.

Human decisions: `keep-open`, `defer`, `needs-browser-test`,
`needs-project-decision`, `reject-analysis-finding`.

Transitions:

- `keep-open` → `kept-open` / `review`
- `defer` → `deferred` / `review`
- `needs-browser-test` → `browser-test-needed` / `browser-test`
- `needs-project-decision` → `kept-open` / `project-decision`
- `reject-analysis-finding` → `not-adopted` / `none`
- valid applicable `update-existing` → `commit-ready` / `commit`
- successful commit → `applied` / `none`

## Checks

To be filled with final command output before merge. Node harness:
`node tests/cleanup-workbench-harness.js`.

## Risks / Open questions

- Gist conflict handling is Run-level Last-write-wins. Parallel edits to different
  cases within the same run can still collide.
- Browser real smoke status must be reported separately; Node harness simulates
  persistence and hard-reload normalization but not IndexedDB reload UI behavior.
- The commit path remains intentionally narrow and must not be treated as a new
  general commit engine.

## Non-implementations

No automatic feature creation, promotion, status/pool mutation, Dedupe merge,
Dedupe archive/delete, structured Duplicate-marking action, Trello refactor,
Rollover fachlogik change, new global navigation, automatic JSON repair or
foreign domain logic was added.

## Merge assessment

Mergeable after the mandatory syntax, harness, diff and smoke checks pass.
