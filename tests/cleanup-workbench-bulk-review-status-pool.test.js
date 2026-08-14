const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync('index.html', 'utf8');
const scripts = []; let m; const re = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;
while ((m = re.exec(html)) !== null) scripts.push(m[1]);
const testCode = String.raw`
(async function(){
  S = defaultState(); let saves = 0; saveAsync = async () => { saves++; }; save = () => {};
  renderView = function(){}; alert = function(message){ throw new Error(String(message)); }; confirm = () => true; window.confirm = confirm;
  ui.cleanupReview = { proposals: [], projectId: 'p1', incomingFeatures: [], rawAnalysisJson: '', mode: 'import-cleanup', summary: '', openQuestions: [], visible: true, activeRunId: '', workbenchStatusFilter: 'all', workbenchSelectedCaseIds: [], statusPoolSelectedCaseIds: [] };
  S.projects.push({ id: 'p1', title: 'P1' }, { id: 'p2', title: 'P2' });
  S.features.push(ensureFeatureDefaults({ id:'f1', projectId:'p1', title:'One', description:'D1', category:'Sonstiges', priority:'hoch', pool:'planned', status:'planned', reviewStatus:'reviewed', updatedAt:'f1-base', trello:{ cardId:'keep' } }));
  S.features.push(ensureFeatureDefaults({ id:'f2', projectId:'p1', title:'Two', description:'D2', category:'Sonstiges', priority:'mittel', pool:'planned', status:'selected-for-sprint', reviewStatus:'needs-review', updatedAt:'f2-base' }));
  const run = createCleanupWorkbenchRunFromReview({summary:'s'}, [
    {type:'match-existing', targetFeatureId:'f1', resolvedTitle:'One', confidence:'hoch'},
    {type:'update-existing', targetFeatureId:'f2', resolvedTitle:'Two', confidence:'mittel'}
  ], []);
  hydrateCleanupReviewFromWorkbenchRun(run); const ids = run.result.proposals.map(p => p.caseId);
  const featureBeforeReview = JSON.stringify(S.features), rootsBefore = JSON.stringify({queues:S.mainChatQueue, trash:S.trash, deletedIds:S.deletedIds});
  saves=0; await applyCleanupWorkbenchReviewStatusBatch([ids[0]], 'reviewed');
  assert.strictEqual(getActiveCleanupWorkbenchRun().reviewState.cases[ids[0]].status, 'reviewed'); assert.strictEqual(saves,1); assert.strictEqual(JSON.stringify(S.features), featureBeforeReview); assert.strictEqual(JSON.stringify({queues:S.mainChatQueue,trash:S.trash,deletedIds:S.deletedIds}),rootsBefore);
  await applyCleanupWorkbenchReviewStatusBatch([ids[0]], 'open'); assert.strictEqual(getActiveCleanupWorkbenchRun().reviewState.cases[ids[0]].status,'open');
  await applyCleanupWorkbenchReviewStatusBatch([ids[0]], 'rejected'); assert.strictEqual(getActiveCleanupWorkbenchRun().reviewState.cases[ids[0]].status,'rejected');
  await applyCleanupWorkbenchReviewStatusBatch([ids[0]], 'deferred'); assert.strictEqual(getActiveCleanupWorkbenchRun().reviewState.cases[ids[0]].status,'deferred');
  await applyCleanupWorkbenchReviewStatusBatch(ids, 'reviewed'); assert.strictEqual(getCleanupWorkbenchProgress(getActiveCleanupWorkbenchRun()).reviewed,2);
  ui.cleanupReview.workbenchSelectedCaseIds=ids.slice(); clearCleanupWorkbenchReviewSelection(); assert.deepStrictEqual(ui.cleanupReview.workbenchSelectedCaseIds,[]);
  const completed=getActiveCleanupWorkbenchRun(); completed.reviewState.runStatus='completed'; upsertCleanupWorkbenchRun(completed); let blocked=false; try{await applyCleanupWorkbenchReviewStatusBatch([ids[0]],'open')}catch(e){blocked=true} assert(blocked); completed.reviewState.runStatus='active'; upsertCleanupWorkbenchRun(completed); hydrateCleanupReviewFromWorkbenchRun(completed);
  const payload={schemaVersion:CLEANUP_STATUS_POOL_DECISION_SCHEMA_VERSION,projectId:'p1',runId:completed.id,decisions:ids.map((caseId,i)=>({caseId,featureId:'f'+(i+1),decision:'confirm-implemented',fromPool:'planned',fromStatus:i?'selected-for-sprint':'planned',toPool:'implemented',toStatus:'confirmed',summary:'Evidence reviewed'}))};
  assert(validateCleanupStatusPoolDecisionPayload(payload).valid); saves=0; const statusPreview=await persistCleanupStatusPoolDecisions(payload); assert.strictEqual(saves,1); assert.strictEqual(S.features[0].pool,'planned','decision import is mutation-free');
  statusPreview.selectedCaseIds=ids.slice(); const batch=buildCleanupStatusPoolTransitionBatch(statusPreview); assert(batch.valid,batch.errors.join('\n')); assert(Object.isFrozen(batch));
  const frozen=JSON.stringify(batch); statusPreview.selectedCaseIds=[]; assert.strictEqual(JSON.stringify(batch),frozen);
  const beforeCommit=JSON.parse(JSON.stringify(S)); saves=0; await commitCleanupMainChatUpdateBatch(statusPreview,batch); assert.strictEqual(saves,1);
  assert.strictEqual(S.features[0].pool,'implemented'); assert.strictEqual(S.features[0].status,'confirmed'); assert.strictEqual(S.features[1].pool,'implemented'); assert.strictEqual(S.features[1].status,'confirmed');
  ['title','description','category','priority','reviewStatus','trello'].forEach(field=>assert.deepStrictEqual(S.features[0][field],beforeCommit.features[0][field],field+' protected'));
  const applied=getActiveCleanupWorkbenchRun(); ids.forEach(id=>{const app=applied.reviewState.cases[id].mainChatApplication; assert.strictEqual(app.applicationType,'status-pool-transition'); assert.deepStrictEqual(app.changedFields.map(c=>c.field),['pool','status']);});
  assert.strictEqual(normalizeCleanupWorkbenchMainChatApplication({status:'applied',caseId:'x',featureId:'f1',appliedAt:new Date().toISOString(),batchId:'b',changedFields:[{field:'title',oldValue:'a',newValue:'b'}]},'x','f1').applicationType,'update-existing');
  assert.strictEqual(normalizeCleanupWorkbenchMainChatApplication({status:'applied',applicationType:'unknown',caseId:'x',featureId:'f1',appliedAt:new Date().toISOString(),batchId:'b',changedFields:[{field:'pool',oldValue:'planned',newValue:'implemented'}]},'x','f1').status,'invalid');
  const bad=Object.assign({},payload,{schemaVersion:'bad'}); assert(!validateCleanupStatusPoolDecisionPayload(bad).valid);
  assert(!isAllowedCleanupStatusPoolTransition('planned','idea','implemented','confirmed')); assert(!isAllowedCleanupStatusPoolTransition('implemented','detected','implemented','confirmed')); assert(!isAllowedCleanupStatusPoolTransition('planned','planned','implemented','detected'));
  // Save failure rolls the whole review batch back.
  const rollbackRun=getActiveCleanupWorkbenchRun(); rollbackRun.reviewState.cases[ids[0]].mainChatApplication=null; upsertCleanupWorkbenchRun(rollbackRun); hydrateCleanupReviewFromWorkbenchRun(rollbackRun); const rollbackBefore=JSON.stringify(S); saveAsync=async()=>{throw new Error('save fail')}; alert=()=>{}; const ok=await applyCleanupWorkbenchReviewStatusBatch([ids[0]],'open'); assert.strictEqual(ok,false); assert.strictEqual(JSON.stringify(S),rollbackBefore);
})().then(()=>console.log('cleanup workbench bulk review/status-pool tests OK')).catch(err=>{console.error(err);process.exit(1)});`;
const context={console,assert,process,localStorage:{getItem(){return null},setItem(){},removeItem(){}},document:{addEventListener(){},querySelectorAll(){return[]},querySelector(){return null},getElementById(){return null},body:{classList:{toggle(){}}}},window:{},navigator:{clipboard:{writeText(){return Promise.resolve()}}},Blob:function(){},URL:{createObjectURL(){return''},revokeObjectURL(){}},alert(){},confirm(){return true},setTimeout(fn){if(typeof fn==='function')fn();return 1},clearTimeout(){},crypto:{getRandomValues(a){a[0]=123;return a}}}; context.window=context;
vm.createContext(context); const app=scripts.join('\n').replace('      init();','      // init disabled'); const combined=app.replace(/\n\s*\}\)\(\);\s*$/, '\n'+testCode+'\n    })();');
vm.runInContext(combined,context,{timeout:10000});
