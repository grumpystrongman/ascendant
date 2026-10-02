import { QUESTS } from './lore.js';
const KEY='ascendant-v3';
const fresh=()=>({
  version:3,prologue:0,screen:'title',energy:'normal',heart:8,level:1,xp:0,nextXp:100,coins:0,shards:0,
  quests:QUESTS.map(q=>({...q,done:false,scaled:false})),
  enemy:{drift:50,wraith:120},knownCompanions:[],firstSpark:null,activeQuest:null,
  unlockedRegions:['amber'],unlockedRooms:['bridge','commons','heart'],completed:0,
  bonds:{kaia:0,milo:0,seren:0},journal:[]
});
export let state=load();
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));return s?.version===3?{...fresh(),...s}:fresh()}catch{return fresh()}}
export function save(){localStorage.setItem(KEY,JSON.stringify(state))}
export function reset(){state=fresh();save()}
export function patch(values){Object.assign(state,values);save()}
export function discover(id){if(!state.knownCompanions.includes(id)){state.knownCompanions.push(id);save()}}
export function setEnergy(value){state.energy=value;save()}
export function beginQuest(id){const q=state.quests.find(x=>x.id===id);if(!q||q.done)return;state.activeQuest={id,startedAt:Date.now()};save()}
export function abandonQuest(){state.activeQuest=null;save()}
export function scaleQuest(id){const q=state.quests.find(x=>x.id===id);if(!q)return;q.scaled=true;q.minutes=Math.max(1,Math.round(q.minutes*.35));save()}
export function completeQuest(id){
  const q=state.quests.find(x=>x.id===id);if(!q||q.done)return null;
  q.done=true;state.activeQuest=null;state.completed++;
  const damage=Math.round(16+q.xp*.55+(q.kind==='HIGH STAKES'?10:0));
  state.enemy[q.target]=Math.max(0,state.enemy[q.target]-damage);
  state.xp+=q.xp;state.coins+=Math.round(q.xp*.32);state.heart=Math.min(100,state.heart+Math.round(q.xp*.16));
  state.shards+=q.kind==='HIGH STAKES'?1:0;
  state.bonds.kaia=Math.min(100,state.bonds.kaia+2);state.bonds.milo=Math.min(100,state.bonds.milo+1);state.bonds.seren=Math.min(100,state.bonds.seren+2);
  state.journal.unshift({at:Date.now(),title:q.title,text:`${q.title} weakened the ${q.target==='wraith'?'Hesitation Wraith':'Driftlings'} by ${damage}.`});
  if(state.xp>=state.nextXp){state.xp-=state.nextXp;state.level++;state.nextXp=Math.round(state.nextXp*1.3);state.shards++}
  if(state.completed>=3 && !state.unlockedRooms.includes('workshop'))state.unlockedRooms.push('workshop');
  if(state.completed>=5 && !state.unlockedRooms.includes('archive'))state.unlockedRooms.push('archive');
  save();return {q,damage,target:q.target,hp:state.enemy[q.target]};
}
