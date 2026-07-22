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

  function makePayload(extra){
    return { schemaVersion: CLEANUP_MAINCHAT_DECISION_SCHEMA_VERSION, projectId: 'p1', decisions: [Object.assign({ caseId, featureId: 'f1', decision: 'update-existing', summary: 'ok', proposedTitle: 'Another title', proposedDescription: '', proposedCategory: '', proposedStatus: '', proposedPool: '', canonicalFeatureId: '', splitProposal: null, openQuestion: '' }, extra || {})] };
  }
  ['splitProposal','canonicalFeatureId','proposedStatus','proposedPool','openQuestion'].forEach(field => {
    const cloneRun = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
    cloneRun.reviewState.cases[caseId].mainChatApplication = null;
    const value = field === 'splitProposal' ? {} : (field === 'canonicalFeatureId' ? 'f1' : 'blocked');
    cloneRun.reviewState.cases[caseId].mainChatDecision = normalizeCleanupWorkbenchMainChatDecision(Object.assign({}, makePayload({ [field]: value }).decisions[0], { schemaVersion: CLEANUP_MAINCHAT_DECISION_SCHEMA_VERSION, projectId: 'p1', validatedAt: new Date().toISOString() }), cloneRun, caseId, 'f1');
    assert.strictEqual(getCleanupWorkbenchUpdateEligibility(cloneRun, caseId).eligible, false, field + ' blocks update-existing');
  });
  const forgedRun = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  forgedRun.reviewState.cases[caseId].mainChatApplication = null;
  forgedRun.reviewState.cases[caseId].mainChatDecision = normalizeCleanupWorkbenchMainChatDecision(Object.assign({}, makePayload().decisions[0], { schemaVersion: CLEANUP_MAINCHAT_DECISION_SCHEMA_VERSION, projectId: 'p1', validatedAt: new Date().toISOString() }), forgedRun, caseId, 'f1');
  upsertCleanupWorkbenchRun(forgedRun);
  const forgedPreview = buildCleanupWorkbenchPersistedMainChatPreview(normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id)));
  forgedPreview.items[0].selectable = true;
  forgedPreview.items[0].proposedFields.splitProposal = {};
  forgedPreview.selectedCaseIds = [caseId];
  assert(!buildCleanupMainChatUpdateBatch(forgedPreview).valid, 'forged selectable splitProposal blocked at batch');
  const runA = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  const previewA = buildCleanupWorkbenchPersistedMainChatPreview(runA);
  const runB = createCleanupWorkbenchRunFromReview({ summary: 'b' }, [{ type: 'update-existing', targetFeatureId: 'f1', resolvedTitle: 'Old', confidence: 'hoch' }], []);
  runB.result.proposals[0].caseId = caseId;
  runB.reviewState.cases = { [caseId]: { status: 'reviewed', updatedAt: '', mainChatDecision: runA.reviewState.cases[caseId].mainChatDecision, mainChatApplication: null, dedupeDecision: null } };
  upsertCleanupWorkbenchRun(runB);
  ui.cleanupReview.activeRunId = runB.id;
  hydrateCleanupReviewFromWorkbenchRun(runB);
  previewA.selectedCaseIds = [caseId];
  assert(!buildCleanupMainChatUpdateBatch(previewA).valid, 'preview origin run A rejected when active run B');
  ui.cleanupReview.activeRunId = run.id;
  hydrateCleanupReviewFromWorkbenchRun(findCleanupWorkbenchRun(run.id));
  const legacyBefore = JSON.parse(JSON.stringify(S));
  const legacyAfter = JSON.parse(JSON.stringify(S));
  legacyAfter.analyses.push({ id: 'foreign-analysis' });
  assert(getCleanupMainChatProtectedStateDiffs(legacyBefore, legacyAfter, { entries: [] }).some(e => e.includes('analyses') || e.includes('State-Feld analyses')), 'legacy analyses mutation protected');
  const wbBatchForDiff = buildCleanupMainChatUpdateBatch(buildCleanupWorkbenchPersistedMainChatPreview(normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id))));
  const wbBefore = JSON.parse(JSON.stringify(S));
  const wbAfterForeign = JSON.parse(JSON.stringify(S));
  wbAfterForeign.analyses.push({ id: 'another-analysis' });
  assert(getCleanupMainChatProtectedStateDiffs(wbBefore, wbAfterForeign, Object.assign({}, wbBatchForDiff, { origin: { runId: run.id, projectId: 'p1', runStatus: 'active', runUpdatedAt: normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id)).updatedAt } })).length, 'workbench foreign analysis mutation protected');
  const wbAfterSource = JSON.parse(JSON.stringify(S));
  const target = wbAfterSource.analyses.find(a => a.id === run.id);
  target.source.createdFrom = 'tampered';
  assert(getCleanupMainChatProtectedStateDiffs(wbBefore, wbAfterSource, Object.assign({}, wbBatchForDiff, { origin: { runId: run.id, projectId: 'p1', runStatus: 'active', runUpdatedAt: normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id)).updatedAt } })).length, 'workbench source mutation protected');
  const withoutValidatedAt = Object.assign({}, makePayload().decisions[0], { schemaVersion: CLEANUP_MAINCHAT_DECISION_SCHEMA_VERSION, projectId: 'p1' });
  assert.strictEqual(normalizeCleanupWorkbenchMainChatDecision(withoutValidatedAt, normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id)), caseId, 'f1'), null, 'missing validatedAt invalid');
  assert.strictEqual(normalizeCleanupWorkbenchMainChatApplication({ status: 'applied', caseId, featureId: 'f1', appliedAt: new Date().toISOString(), batchId: 'b', changedFields: [{ field: 'title', oldValue: 'a', newValue: 'b' }] }, caseId, '').status, 'invalid', 'application without expected binding invalid');

  const importRollbackBefore = JSON.stringify(S);
  const savedSaveAsync = saveAsync;
  saveAsync = async function(){ throw new Error('import save fail'); };
  const rollbackPayload = makePayload({ proposedTitle: 'Rollback title' });
  const rollbackValidation = validateMainChatDecisionPayload(rollbackPayload);
  try { await persistCleanupWorkbenchMainChatDecisions(normalizeMainChatDecisionPayload(rollbackPayload), rollbackValidation.context); assert.fail('import save failure expected'); } catch (err) { assert(String(err.message).includes('import save fail')); }
  assert.strictEqual(JSON.stringify(S), importRollbackBefore, 'decision import rollback byte-equal');
  saveAsync = savedSaveAsync;

  const commitRollbackRun = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  commitRollbackRun.reviewState.cases[caseId].mainChatApplication = null;
  commitRollbackRun.reviewState.cases[caseId].mainChatDecision = normalizeCleanupWorkbenchMainChatDecision(Object.assign({}, makePayload({ proposedTitle: 'Commit rollback title' }).decisions[0], { schemaVersion: CLEANUP_MAINCHAT_DECISION_SCHEMA_VERSION, projectId: 'p1', validatedAt: new Date().toISOString() }), commitRollbackRun, caseId, 'f1');
  upsertCleanupWorkbenchRun(commitRollbackRun);
  const rollbackPreview = buildCleanupWorkbenchPersistedMainChatPreview(normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id)));
  rollbackPreview.selectedCaseIds = [caseId];
  const rollbackBatch = buildCleanupMainChatUpdateBatch(rollbackPreview);
  assert(rollbackBatch.valid, rollbackBatch.errors.join('\n'));
  const commitRollbackBefore = JSON.stringify(S);
  saveAsync = async function(){ throw new Error('commit save fail'); };
  try { await commitCleanupMainChatUpdateBatch(rollbackPreview, rollbackBatch); assert.fail('commit save failure expected'); } catch (err) { assert(String(err.message).includes('commit save fail')); }
  assert.strictEqual(JSON.stringify(S), commitRollbackBefore, 'feature commit rollback byte-equal');
  saveAsync = savedSaveAsync;

  const hydrationRun = normalizeCleanupWorkbenchRunRecord(findCleanupWorkbenchRun(run.id));
  ui.cleanupReview.mainChatDecisionPreview = null;
  hydrateCleanupReviewFromWorkbenchRun(JSON.parse(JSON.stringify(hydrationRun)));
  assert(ui.cleanupReview.mainChatDecisionPreview && ui.cleanupReview.mainChatDecisionPreview.items.length, 'hydration rebuilds persisted preview');
  const appliedItem = buildCleanupWorkbenchPersistedMainChatPreview(reloaded).items.find(i => i.caseId === caseId);
  assert(appliedItem.consumed, 'applied case consumed');
  assert(renderCleanupDecisionResult({ valid: true, items: [appliedItem], selectedCaseIds: [] }, 'main').includes(live.reviewState.cases[caseId].mainChatApplication.appliedAt), 'renders real application appliedAt');

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
