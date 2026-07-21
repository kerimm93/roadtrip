const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const scripts = [];
let m;
const re = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;
while ((m = re.exec(html)) !== null) scripts.push(m[1]);

const testCode = `
(function(){
  S = defaultState();
  let saveCalls = 0;
  save = function(){ saveCalls += 1; }; renderView = function(){};
  ui.cleanupReview = { proposals: [], projectId: 'p1', incomingFeatures: [], rawAnalysisJson: '', mode: 'csv-comparison-transform', summary: '', openQuestions: [], visible: true, activeRunId: '', workbenchStatusFilter: 'all' };
  S.projects.push({ id: 'p1', title: 'P', status: 'aktiv', updatedAt: '' });
  S.features.push({ id: 'f1', projectId: 'p1', title: 'F1', description: 'A', category: 'Sonstiges', status: 'implemented', pool: 'implemented' });
  S.features.push({ id: 'f2', projectId: 'p1', title: 'F2', description: 'B', category: 'Sonstiges', status: 'implemented', pool: 'implemented' });
  const proposals = [
    { type: 'match-existing', targetFeatureId: 'f1', resolvedTitle: 'A', confidence: 'hoch' },
    { type: 'update-existing', targetFeatureId: 'f1', resolvedTitle: 'B', confidence: 'hoch' },
    { type: 'new-feature', resolvedTitle: 'C', confidence: 'hoch' },
    { type: 'duplicate-of', targetFeatureId: 'f1', duplicateFeatureId: 'f2', resolvedTitle: 'D', confidence: 'hoch' },
    { type: 'probably-stale', targetFeatureId: 'f1', resolvedTitle: 'E', confidence: 'hoch' },
    { type: 'match-existing', targetFeatureId: 'f1', resolvedTitle: 'F', confidence: 'mittel' },
    { type: 'x', resolvedTitle: 'G', confidence: 'hoch' }
  ];
  const run = createCleanupWorkbenchRunFromReview({ summary: 's' }, proposals, ['Frage <unsafe>']);
  assert(run && run.id, 'run created');
  assert(Object.values(run.reviewState.cases).every(c => c.status === 'open' && c.updatedAt === '' && c.mainChatDecision === null && c.dedupeDecision === null), 'defaults');
  const ids = run.result.proposals.map(p => p.caseId);
  const old = normalizeCleanupWorkbenchRunRecord({ id: 'old', type: CLEANUP_WORKBENCH_ANALYSIS_TYPE, projectId: 'p1', source: { cleanupMode: 'csv-comparison-transform' }, result: { proposals: [{ type: 'match-existing', targetFeatureId: 'f1' }] }, reviewState: { cases: {} } });
  assert.strictEqual(Object.values(old.reviewState.cases)[0].status, 'open');
  assert.strictEqual(normalizeCleanupWorkbenchCaseStatus('weird'), 'open');
  assert.strictEqual(normalizeCleanupWorkbenchCaseStatus('keep-open'), 'open');
  assert.strictEqual(normalizeCleanupWorkbenchCaseStatus('needs-browser-test'), 'deferred');
  assert.strictEqual(normalizeCleanupWorkbenchCaseStatus('dedupe-decided'), 'reviewed');
  assert.strictEqual(normalizeCleanupWorkbenchCaseStatus('commit-ready'), 'reviewed');
  assert.strictEqual(normalizeCleanupWorkbenchCaseStatus('applied'), 'reviewed');
  const injected = createCleanupWorkbenchRunFromReview({ summary: 'x' }, [{ type: 'match-existing', caseId: 'evil', pairId: 'bad', _idx: 44, _done: true, status: 'applied', updatedAt: '2026-01-01T00:00:00.000Z', mainChatDecision: {x:1}, targetFeatureId: 'f1' }], []);
  assert.notStrictEqual(injected.result.proposals[0].caseId, 'evil');
  assert.strictEqual(injected.result.proposals[0].pairId, '');
  assert.strictEqual(injected.result.proposals[0]._done, false);
  assert.strictEqual(Object.values(injected.reviewState.cases)[0].status, 'open');
  ui.cleanupReview.activeRunId = run.id;
  hydrateCleanupReviewFromWorkbenchRun(run);
  const beforeFeatures = JSON.stringify(S.features);
  const beforeRuns = S.analyses.length;
  setCleanupWorkbenchCaseStatus(ids[0], 'reviewed');
  assert.strictEqual(JSON.stringify(S.features), beforeFeatures, 'features unchanged');
  assert.strictEqual(S.analyses.length, beforeRuns, 'only existing analysis record');
  const live = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  assert.strictEqual(live.reviewState.cases[ids[0]].status, 'reviewed');
  assert(live.reviewState.cases[ids[0]].updatedAt, 'case updatedAt');
  assert(live.updatedAt, 'run updatedAt');
  const groups = groupCleanupWorkbenchProposals(live.result.proposals);
  const groupedIds = Object.values(groups).flat().map(p => p.caseId);
  assert.deepStrictEqual(new Set(groupedIds), new Set(live.result.proposals.map(p => p.caseId)));
  assert.strictEqual(groupedIds.length, live.result.proposals.length);
  assert(cleanupWorkbenchStatusMatchesFilter('open','all'));
  assert(cleanupWorkbenchStatusMatchesFilter('open','open'));
  assert(cleanupWorkbenchStatusMatchesFilter('reviewed','decided'));
  assert(cleanupWorkbenchStatusMatchesFilter('rejected','decided'));
  assert(!cleanupWorkbenchStatusMatchesFilter('deferred','decided'));
  assert(cleanupWorkbenchStatusMatchesFilter('deferred','deferred'));
  setCleanupWorkbenchCaseStatus(ids[1], 'rejected');
  setCleanupWorkbenchCaseStatus(ids[2], 'deferred');
  const live2 = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  const stats = getCleanupWorkbenchProgress(live2);
  assert.strictEqual(stats.total, 7);
  assert.strictEqual(stats.reviewed, 1);
  assert.strictEqual(stats.rejected, 1);
  assert.strictEqual(stats.deferred, 1);
  assert.strictEqual(stats.decided, 2);
  assert.strictEqual(stats.open, 4);
  assert.strictEqual(stats.openQuestions, 1);
  assert.strictEqual(canCompleteCleanupWorkbenchRun(live2), false);
  live2.result.proposals.forEach(p => { live2.reviewState.cases[p.caseId].status = 'deferred'; });
  assert.strictEqual(canCompleteCleanupWorkbenchRun(live2), true, 'deferred and open questions do not block');
  const empty = normalizeCleanupWorkbenchRunRecord({ id: 'empty', type: CLEANUP_WORKBENCH_ANALYSIS_TYPE, projectId: 'p1', source: {}, result: { proposals: [], openQuestions: [] }, reviewState: { cases: {} } });
  assert.strictEqual(canCompleteCleanupWorkbenchRun(empty), true);
  const activeBefore = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  activeBefore.resumedAt = 'active-resumed';
  activeBefore.updatedAt = 'active-updated';
  upsertCleanupWorkbenchRun(activeBefore);
  const activeSerializedBefore = JSON.stringify(S.analyses);
  saveCalls = 0;
  openCleanupWorkbenchRun(run.id);
  assert.strictEqual(JSON.stringify(S.analyses), activeSerializedBefore, 'active open is read-only');
  const activeAfter = findCleanupWorkbenchRun(run.id);
  assert.strictEqual(activeAfter.updatedAt, 'active-updated');
  assert.strictEqual(activeAfter.resumedAt, 'active-resumed');
  assert.strictEqual(saveCalls, 0);
  assert.strictEqual(ui.cleanupReview.activeRunId, run.id);
  live2.reviewState.cases[ids[0]].status = 'reviewed'; live2.reviewState.cases[ids[0]].updatedAt = '2026-07-21T00:00:00.000Z'; live2.reviewState.runStatus = 'completed'; live2.resumedAt = 'completed-resumed'; live2.updatedAt = 'completed-updated'; live2.completedAt = 'completed-at'; upsertCleanupWorkbenchRun(live2);
  const completedSerializedBefore = JSON.stringify(S.analyses);
  saveCalls = 0;
  openCleanupWorkbenchRun(run.id);
  assert.strictEqual(JSON.stringify(S.analyses), completedSerializedBefore, 'completed open is read-only');
  const completedAfter = findCleanupWorkbenchRun(run.id);
  assert.strictEqual(completedAfter.reviewState.runStatus, 'completed');
  assert.strictEqual(completedAfter.updatedAt, 'completed-updated');
  assert.strictEqual(completedAfter.resumedAt, 'completed-resumed');
  assert.strictEqual(completedAfter.completedAt, 'completed-at');
  assert.strictEqual(saveCalls, 0);
  assert.strictEqual(ui.cleanupReview.activeRunId, run.id);
  ui.cleanupReview.workbenchStatusFilter = 'deferred';
  const renderedQuestions = renderCleanupReviewSection();
  assert(renderedQuestions.includes('Frage &lt;unsafe&gt;'), 'open question text is escaped and visible');
  assert(!renderedQuestions.includes('Frage <unsafe>'), 'raw open question text is not rendered');
  assert(renderedQuestions.includes('Globale offene Fragen bleiben sichtbar'), 'open question section is global');
  saveCalls = 0;
  reopenCleanupWorkbenchRun();
  const reopened = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  assert.strictEqual(reopened.reviewState.runStatus, 'active');
  assert.notStrictEqual(reopened.updatedAt, 'completed-updated');
  assert.notStrictEqual(reopened.resumedAt, 'completed-resumed');
  assert.strictEqual(reopened.reviewState.cases[ids[0]].status, 'reviewed');
  assert.strictEqual(reopened.reviewState.cases[ids[0]].updatedAt, '2026-07-21T00:00:00.000Z');
  assert.strictEqual(saveCalls, 1);
})();
`;

const context = {
  console, assert,
  localStorage: { getItem(){return null}, setItem(){}, removeItem(){} },
  document: { addEventListener(){}, querySelectorAll(){return []}, querySelector(){return null}, getElementById(){return null}, body: { classList: { toggle(){} } } },
  window: {}, navigator: {}, Blob: function(){}, URL: { createObjectURL(){return ''}, revokeObjectURL(){} },
  alert(){}, confirm(){ return true; }, setTimeout(fn){ if (typeof fn === 'function') fn(); return 1; }, clearTimeout(){},
  crypto: { getRandomValues(arr){ arr[0] = 123456; return arr; } }
};
context.window = context;
vm.createContext(context);
const appScript = scripts.join('\n').replace('      init();', '      // init disabled for node test');
const appScriptWithTests = appScript.replace(/\n\s*\}\)\(\);\s*$/, '\n' + testCode + '\n    })();');
vm.runInContext(appScriptWithTests, context);

const source = scripts.join('\n');
[
  'if (isActiveCleanupWorkbenchRunReview()) return alertCleanupWorkbenchRunLocked();',
  'function queueCleanupProposalForMainChat',
  'function queueCleanupProposalForDedupe',
  'function acceptCleanupProposalAsUpdate',
  'function acceptCleanupProposalAsNew',
  'function markCleanupProposalAsDuplicate',
  'function markCleanupProposalAsReviewed',
  'function ignoreCleanupProposal'
].forEach(needle => assert(source.includes(needle), 'guard present: ' + needle));
assert(!source.includes('data-resume-cleanup-workbench-run'), 'run list no longer uses mutating resume data hook');
assert(source.includes('function openCleanupWorkbenchRun'), 'read-only open path exists');

console.log('cleanup workbench p1 review tests OK');
