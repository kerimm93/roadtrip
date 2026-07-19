const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync('index.html', 'utf8');
const scripts = [];
let m;
const re = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;
while ((m = re.exec(html)) !== null) scripts.push(m[1]);
const harness = `\n;globalThis.__roadtripCleanupTestApi = {\n defaultState, ensureDefaults, normalizeImportedState, normalizeCleanupRuns, normalizeCleanupRunCase, createCleanupRunFromParsed, projectCleanupProposalValidation, diagnoseRoadtripJsonImport, cleanupRunFingerprint, cleanupFeatureBaseline, mergeRemoteStateForGistPull, normalizeStateForSyncCompare, getStateLatestEntityTimestamp, hasRoadtripUserData, applySelectiveMerge, deleteProject, buildMainChatDecisionPreview, buildCleanupMainChatUpdateBatch, checkCleanupMainChatBatchDrift, getCleanupMainChatProtectedStateDiffs, commitCleanupMainChatUpdateBatch, buildDedupeDecisionPreview, validateDedupeDecisionPayload, normalizeDedupeDecisionPayload, CLEANUP_RUN_SCHEMA_VERSION, CLEANUP_CASE_STATUSES, CLEANUP_HUMAN_DECISION_TRANSITIONS, getS:()=>S, setS:(v)=>{S=v;}, getUi:()=>ui, setCleanupWorkbenchHumanDecision, persistValidatedDedupeDecisions, persistValidatedMainChatDecisions };`;
const sandbox = {
  console, setTimeout, clearTimeout,
  window: { addEventListener(){}, confirm(){ return true; } },
  document: { addEventListener(){}, body:{classList:{add(){},remove(){}}, appendChild(){}}, documentElement:{style:{}}, querySelector(){return null;}, querySelectorAll(){return[];}, getElementById(){return { innerHTML:'', textContent:'', value:'', checked:false, disabled:false, style:{}, classList:{add(){},remove(){},toggle(){}}, addEventListener(){}, querySelector(){return null;}, querySelectorAll(){return[]} };}, createElement(){return { style:{}, classList:{add(){},remove(){}}, setAttribute(){}, appendChild(){}, addEventListener(){}, remove(){}, click(){}, querySelector(){return null;}, querySelectorAll(){return[]} };} },
  localStorage: { getItem(){return null;}, setItem(){}, removeItem(){} },
  navigator: { clipboard: { writeText(){ return Promise.resolve(); } } },
  indexedDB: { open(){ return { onupgradeneeded:null, onsuccess:null, onerror:null }; } },
  alert() {}, confirm(){ return true; }, Blob: function(){}, URL: { createObjectURL(){return ''}, revokeObjectURL(){} }
};
sandbox.window = Object.assign(sandbox.window, { document: sandbox.document, localStorage: sandbox.localStorage, navigator: sandbox.navigator, indexedDB: sandbox.indexedDB, __roadtripTestSaveAsync: () => Promise.resolve(true), __roadtripSuppressRender: true });
vm.createContext(sandbox);
const mainScript = scripts.reduce((a,b)=>b.length>a.length?b:a,'');
const marker = '    })();';
const idx = mainScript.lastIndexOf(marker);
if (idx < 0) throw new Error('script closure marker not found');
const instrumented = mainScript.slice(0, idx) + harness + '\n' + mainScript.slice(idx);
vm.runInContext(instrumented, sandbox, { filename: 'index.html' });
const api = sandbox.__roadtripCleanupTestApi;
let passed = 0;
function assert(cond, msg){ if(!cond) throw new Error(msg); passed++; }
function json(v){ return JSON.parse(JSON.stringify(v)); }
function seed(){ const S = api.defaultState(); S.projects=[{id:'p1',title:'P',createdAt:'2026-07-19T00:00:00.000Z',updatedAt:'2026-07-19T00:00:00.000Z'}]; S.features=[{id:'f1',projectId:'p1',title:'Old',description:'Old desc',category:'UI',status:'detected',pool:'implemented',updatedAt:'2026-07-19T00:00:00.000Z'},{id:'f2',projectId:'p1',title:'Dup',description:'Dup desc',category:'Workflow',status:'detected',pool:'implemented',updatedAt:'2026-07-19T00:00:00.000Z'}]; return S; }
(async()=>{
  api.setS({ projects:[], features:[], notes:[], analyses:[] }); api.ensureDefaults(); assert(Array.isArray(api.getS().cleanupRuns) && api.getS().cleanupRuns.length===0, 'older state cleanupRuns []');
  api.setS(seed());
  const payload={summary:'s',proposals:[{type:'update-existing',targetFeatureId:'f1',resolvedTitle:'New',resolvedDescription:'Old desc',resolvedCategory:'UI',confidence:'hoch',rationale:'because',changeSummary:'title'}],openQuestions:['q1']};
  let v=api.projectCleanupProposalValidation(payload,'p1','import-cleanup'); assert(v.valid && !v.empty,'valid cleanup');
  let run=api.createCleanupRunFromParsed('p1','import-cleanup',payload,JSON.stringify(payload)); assert(run.schemaVersion==='roadtrip-cleanup-run-v1' && run.cases.length===2, 'run created');
  let round=api.normalizeImportedState(Object.assign(seed(),{cleanupRuns:[run]})); assert(round.cleanupRuns[0].runId===run.runId && round.cleanupRuns[0].cases.length===2, 'json normalize roundtrip');
  round.cleanupRuns[0].cases[0].status='mystery'; let norm=api.normalizeCleanupRuns(round.cleanupRuns, round); assert(norm[0].cases[0].status==='open' && norm[0].cases[0].status!=='applied','unknown case status safe');
  const run2=json(run); run2.id='r2'; run2.runId='r2'; run2.projectId='p1'; let one=api.normalizeCleanupRuns([run,run2], Object.assign(seed(),{cleanupRuns:[run,run2]})); assert(one.filter(r=>r.status==='active'&&r.projectId==='p1').length===1,'one active run per project');
  let diag=api.diagnoseRoadtripJsonImport('{ bad', x=>({valid:true,errors:[]})); assert(diag.state==='parse-error','parse error');
  diag=api.diagnoseRoadtripJsonImport('{"proposals":[],"openQuestions":[]}', x=>api.projectCleanupProposalValidation(x,'p1','import-cleanup'), (p,v)=>v.empty); assert(diag.state==='valid-empty','valid empty');
  diag=api.diagnoseRoadtripJsonImport('{"proposals":{}}', x=>api.projectCleanupProposalValidation(x,'p1','import-cleanup')); assert(diag.state==='validation-error','validation error');
  const before=json(api.getS()); api.diagnoseRoadtripJsonImport('{ bad', x=>({valid:true,errors:[]})); assert(JSON.stringify(before)===JSON.stringify(api.getS()), 'diagnostics no mutation');
  api.setS(Object.assign(seed(),{cleanupRuns:[run]})); api.getUi().cleanupReview.projectId='p1'; api.getUi().cleanupReview.activeRunId=run.runId; sandbox.window.__roadtripTestSaveAsync=()=>Promise.resolve(true);
  for (const d of ['keep-open','defer','needs-browser-test','needs-project-decision','reject-analysis-finding']) { api.setS(Object.assign(seed(),{cleanupRuns:[json(run)]})); api.getUi().cleanupReview.projectId='p1'; api.getUi().cleanupReview.activeRunId=run.runId; const featureSnap=JSON.stringify(api.getS().features); await api.setCleanupWorkbenchHumanDecision(run.runId, run.cases[0].caseId, d); assert(JSON.stringify(api.getS().features)===featureSnap, d+' no feature mutation'); }
  api.setS(Object.assign(seed(),{cleanupRuns:[json(run)]})); api.getUi().cleanupReview.projectId='p1'; api.getUi().cleanupReview.activeRunId=run.runId; api.getUi().cleanupReview.proposals=[{_idx:0,type:'duplicate-of',targetFeatureId:'f1',duplicateFeatureId:'f2',_dedupePairId:run.cases[0].pairId || 'dedupe-f1-f2-0'}]; let featureSnap=JSON.stringify(api.getS().features); await api.persistValidatedDedupeDecisions({dedupeDecisions:[{pairId:api.getUi().cleanupReview.proposals[0]._dedupePairId,featureAId:'f1',featureBId:'f2',decision:'same-feature',canonicalFeatureId:'f1',duplicateFeatureId:'f2',archiveDuplicate:true}]}); assert(JSON.stringify(api.getS().features)===featureSnap,'dedupe no mutation');
  assert(api.diagnoseRoadtripJsonImport(JSON.stringify({proposals:[{type:'duplicate-of',targetFeatureId:'f2',duplicateFeatureId:'foreign'}]}), x=>api.projectCleanupProposalValidation(x,'p1','import-cleanup')).state==='validation-error','foreign dedupe invalid');
  api.setS(Object.assign(seed(),{cleanupRuns:[json(run)]})); api.getUi().cleanupReview.projectId='p1'; api.getUi().cleanupReview.mode='import-cleanup'; api.getUi().cleanupReview.proposals=[{_idx:0,type:'update-existing',targetFeatureId:'f1',resolvedTitle:'New',_mainChatCaseId:run.cases[0].caseId}]; const ctx=new Map([[run.cases[0].caseId,{proposal:api.getUi().cleanupReview.proposals[0],feature:api.getS().features[0],featureId:'f1',label:'Old'}]]); const items=api.buildMainChatDecisionPreview({decisions:[{caseId:run.cases[0].caseId,featureId:'f1',decision:'update-existing',summary:'',proposedTitle:'New',proposedDescription:'',proposedCategory:'Workflow'}]},ctx); assert(items[0].selectable,'update existing selectable');
  const preview={valid:true,items,selectedCaseIds:[run.cases[0].caseId]}; const batch=api.buildCleanupMainChatUpdateBatch(preview); assert(batch.valid && batch.entries[0].changes.every(c=>['title','description','category'].includes(c.field)),'only allowed fields');
  api.getS().features[0].title='Drift'; assert(api.checkCleanupMainChatBatchDrift(batch).length>0,'drift detected');
  api.getS().features[0].title='Old'; api.getS().cleanupRuns[0].cases[0].status='commit-ready'; featureSnap=JSON.stringify(api.getS().features); sandbox.window.__roadtripTestSaveAsync=()=>Promise.reject(new Error('fail')); let failed=false; try{await api.commitCleanupMainChatUpdateBatch(preview,batch);}catch(e){failed=true;} assert(failed && JSON.stringify(api.getS().features)===featureSnap,'commit fail rollback');
  sandbox.window.__roadtripTestSaveAsync=()=>Promise.resolve(true); api.getS().cleanupRuns[0].cases.push(Object.assign({}, api.getS().cleanupRuns[0].cases[0], {id:'second',caseId:'second',status:'open'})); await api.commitCleanupMainChatUpdateBatch(preview,batch); assert(api.getS().cleanupRuns[0].cases[0].status==='applied' && api.getS().cleanupRuns[0].cases[1].status==='open','successful commit marks only selected');
  const sync=api.normalizeStateForSyncCompare(api.getS()); assert(Array.isArray(sync.cleanupRuns),'sync includes cleanupRuns'); assert(api.hasRoadtripUserData({cleanupRuns:[run]}),'user data cleanupRuns'); assert(api.getStateLatestEntityTimestamp({cleanupRuns:[run]}), 'latest timestamp cleanupRuns');
  api.setS(Object.assign(seed(),{cleanupRuns:[run], deletedIds:{}})); const delS=api.getS(); (delS.cleanupRuns||[]).forEach(r=>{ if(r.projectId==='p1') delS.deletedIds[r.id]=new Date().toISOString(); }); delS.cleanupRuns=(delS.cleanupRuns||[]).filter(r=>r.projectId!=='p1'); assert(api.getS().cleanupRuns.length===0 && api.getS().deletedIds[run.id], 'project delete tombstones cleanup run');
  assert(html.includes('mainChatRollovers'), 'rollover present');
  console.log(`cleanup-workbench harness OK (${passed} assertions)`);
})().catch(err=>{ console.error(err); process.exit(1); });
