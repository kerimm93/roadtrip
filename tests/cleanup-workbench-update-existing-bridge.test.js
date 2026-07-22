const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const scripts = [];
let m;
const re = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;
while ((m = re.exec(html)) !== null) scripts.push(m[1]);

const testCode = String.raw`
(async function(){
  S = defaultState();
  let saveCalls = 0;
  save = function(){ saveCalls += 1; };
  saveAsync = async function(){ saveCalls += 1; };
  renderView = function(){};
  alert = function(msg){ throw new Error('unexpected alert: ' + msg); };
  confirm = function(){ return true; };
  window.confirm = confirm;
  ui.cleanupReview = { proposals: [], projectId: 'p1', incomingFeatures: [], rawAnalysisJson: '', mode: 'import-cleanup', summary: '', openQuestions: [], clarificationPrompt: '', mainChatReturnJson: '', mainChatDecisionPreview: null, dedupePrompt: '', dedupeReturnJson: '', dedupeDecisionPreview: null, visible: true, activeRunId: '', workbenchStatusFilter: 'all' };
  S.projects.push({ id: 'p1', title: 'P1' }, { id: 'p2', title: 'P2' });
  S.features.push({ id: 'f1', projectId: 'p1', title: 'Old', description: 'Long old description', category: 'Sonstiges', status: 'implemented', pool: 'implemented', trelloCardId: 't1', updatedAt: 'base' });
  S.features.push({ id: 'f2', projectId: 'p1', title: 'Second', description: 'Second desc', category: 'Sonstiges', status: 'implemented', pool: 'implemented', updatedAt: 'base2' });
  const run = createCleanupWorkbenchRunFromReview({ summary: 's' }, [
    { type: 'update-existing', targetFeatureId: 'f1', resolvedTitle: 'Old', resolvedDescription: 'Long old description', resolvedCategory: 'Sonstiges', confidence: 'hoch' },
    { type: 'duplicate-of', targetFeatureId: 'f1', duplicateFeatureId: 'f2', resolvedTitle: 'Dup', confidence: 'hoch' },
    { type: 'new-feature', resolvedTitle: 'New', confidence: 'hoch' },
    { type: 'update-existing', targetFeatureId: 'missing', resolvedTitle: 'By title Old', confidence: 'hoch' }
  ], []);
  ui.cleanupReview.activeRunId = run.id;
  hydrateCleanupReviewFromWorkbenchRun(run);
  const caseId = run.result.proposals[0].caseId;
  const dupCaseId = run.result.proposals[1].caseId;
  assert.strictEqual(getCleanupWorkbenchCase(run, caseId).mainChatDecision, null);
  assert.strictEqual(getCleanupWorkbenchCase(run, caseId).mainChatApplication, null);
  assert.strictEqual(normalizeCleanupWorkbenchMainChatDecision({ schemaVersion: 'bad' }, run, caseId, 'f1'), null);
  assert.strictEqual(normalizeCleanupWorkbenchMainChatApplication({ status: 'x' }, caseId, 'f1').status, 'invalid');
  assert.strictEqual(normalizeCleanupWorkbenchCaseStatus('applied'), 'reviewed');
  assert(!getCleanupWorkbenchUpdateEligibility(normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id)), caseId).eligible, 'reviewed without decision not applicable');
  setCleanupWorkbenchCaseStatus(caseId, 'reviewed');
  const reviewedRun = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  assert(!getCleanupWorkbenchUpdateEligibility(reviewedRun, dupCaseId).eligible, 'dedupe not applicable');
  const badProject = { schemaVersion: CLEANUP_MAINCHAT_DECISION_SCHEMA_VERSION, projectId: 'p2', decisions: [] };
  assert(!validateMainChatDecisionPayload(badProject).valid, 'foreign project rejected');
  const badCase = { schemaVersion: CLEANUP_MAINCHAT_DECISION_SCHEMA_VERSION, projectId: 'p1', decisions: [{ caseId: 'foreign', featureId: 'f1', decision: 'update-existing' }] };
  assert(!validateMainChatDecisionPayload(badCase).valid, 'foreign case rejected');
  const badFeature = { schemaVersion: CLEANUP_MAINCHAT_DECISION_SCHEMA_VERSION, projectId: 'p1', decisions: [{ caseId, featureId: 'f2', decision: 'update-existing' }] };
  assert(!validateMainChatDecisionPayload(badFeature).valid, 'swapped feature rejected');
  const payload = { schemaVersion: CLEANUP_MAINCHAT_DECISION_SCHEMA_VERSION, projectId: 'p1', decisions: [{ caseId, featureId: 'f1', decision: 'update-existing', summary: 'ok', proposedTitle: 'New title', proposedDescription: '', proposedCategory: '', proposedStatus: '', proposedPool: '', canonicalFeatureId: '', splitProposal: null, openQuestion: '', mainChatApplication: { status: 'applied' } }] };
  const validation = validateMainChatDecisionPayload(payload);
  assert(validation.valid, validation.errors.join('\n'));
  let result = await persistCleanupWorkbenchMainChatDecisions(normalizeMainChatDecisionPayload(payload), validation.context);
  assert(result.changed, 'decision saved');
  assert.strictEqual(saveCalls > 0, true, 'save called');
  let live = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  assert(live.reviewState.cases[caseId].mainChatDecision.validatedAt, 'validatedAt set');
  assert.strictEqual(live.reviewState.cases[caseId].mainChatApplication, null, 'model application ignored');
  const savedAt = live.reviewState.cases[caseId].updatedAt;
  const savesAfterImport = saveCalls;
  result = await persistCleanupWorkbenchMainChatDecisions(normalizeMainChatDecisionPayload(payload), validation.context);
  live = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  assert(!result.changed, 'identical reimport no-op');
  assert.strictEqual(saveCalls, savesAfterImport, 'no save on identical reimport');
  assert.strictEqual(live.reviewState.cases[caseId].updatedAt, savedAt, 'no timestamp on identical reimport');
  let eligibility = getCleanupWorkbenchUpdateEligibility(live, caseId);
  assert(eligibility.eligible, eligibility.reason);
  const preview = buildCleanupWorkbenchPersistedMainChatPreview(live);
  assert.deepStrictEqual(preview.selectedCaseIds, []);
  assert(preview.items.find(i => i.caseId === caseId).selectable, 'persisted preview selectable');
  preview.selectedCaseIds = [caseId];
  const batch = buildCleanupMainChatUpdateBatch(preview);
  assert(batch.valid, batch.errors.join('\n'));
  assert(batch.origin && batch.origin.runId === run.id, 'batch origin');
  assert(batch.entries[0].workbenchBaseline.mainChatDecision, 'workbench baseline');
  assert.strictEqual(S.features.find(f => f.id === 'f1').title, 'Old', 'diff does not mutate');
  const before = JSON.stringify(S);
  cancelCleanupMainChatPendingBatch();
  assert.strictEqual(JSON.stringify(S), before, 'diff cancel mutates nothing');
  await commitCleanupMainChatUpdateBatch(preview, batch);
  live = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  const feature = S.features.find(f => f.id === 'f1');
  assert.strictEqual(feature.title, 'New title');
  assert.strictEqual(feature.status, 'implemented');
  assert.strictEqual(feature.pool, 'implemented');
  assert.strictEqual(feature.trelloCardId, 't1');
  assert.strictEqual(live.reviewState.cases[caseId].status, 'reviewed');
  assert.strictEqual(live.reviewState.cases[caseId].mainChatDecision.summary, 'ok');
  assert.strictEqual(live.reviewState.cases[caseId].mainChatApplication.status, 'applied');
  assert.deepStrictEqual(live.reviewState.cases[caseId].mainChatApplication.changedFields, [{ field: 'title', oldValue: 'Old', newValue: 'New title' }]);
  assert(checkCleanupMainChatBatchDrift(batch).length, 'double apply / stale batch blocked');
  const reloaded = normalizeCleanupWorkbenchRunRecord(JSON.parse(JSON.stringify(findCleanupWorkbenchRun(run.id))));
  assert.strictEqual(reloaded.reviewState.cases[caseId].mainChatApplication.status, 'applied', 'reload preserves application');
  assert(!getCleanupWorkbenchUpdateEligibility(reloaded, caseId).eligible, 'applied blocked');
  const badRun = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  badRun.reviewState.cases[caseId].mainChatApplication = { anything: true };
  assert.strictEqual(normalizeCleanupWorkbenchRunRecord(badRun).reviewState.cases[caseId].mainChatApplication.status, 'invalid');
  console.log('cleanup workbench update-existing bridge tests OK');
})().catch(err => { console.error(err); process.exit(1); });
`;

const context = {
  console, assert,
  require,
  setTimeout,
  clearTimeout,
  window: {},
  document: { addEventListener(){}, querySelectorAll(){ return []; }, querySelector(){ return null; }, getElementById(){ return null; }, body: { classList: { toggle(){}, add(){}, remove(){} } } },
  localStorage: { getItem(){ return null; }, setItem(){}, removeItem(){} },
  navigator: { clipboard: { writeText(){ return Promise.resolve(); } } },
  alert(){}, confirm(){ return true; }, Blob: function(){}, URL: { createObjectURL(){return ''}, revokeObjectURL(){} }, crypto: { getRandomValues(arr){ arr[0] = 123456; return arr; } }, process
};
context.window = context;
vm.createContext(context);
const appScript = scripts.join('\n').replace('      init();', '      // init disabled for node test');
const appScriptWithTests = appScript.replace(/\n\s*\}\)\(\);\s*$/, '\n' + testCode + '\n    })();');
vm.runInContext(appScriptWithTests, context, { timeout: 10000 });
