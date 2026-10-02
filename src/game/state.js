import { QUESTS } from './lore.js';
const KEY='ascendant-v2';
const fresh=()=>({
  version:2,prologue:0,screen:'title',energy:'normal',heart:8,level:1,xp:0,nextXp:100,coins:0,shards:0,
  quests:QUESTS.map(q=>({...q,done:false,scaled:false})),
  enemy:{drift:50,wraith:120},knownCompanions:[],firstSpark:null
});
export let state=load();
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));return s?.version===2?{...fresh(),...s}:fresh()}catch{return fresh()}}
export function save(){localStorage.setItem(KEY,JSON.stringify(state))}
export function reset(){state=fresh();save()}
export function patch(values){Object.assign(state,values);save()}
export function discover(id){if(!state.knownCompanions.includes(id)){state.knownCompanions.push(id);save()}}
export function completeQuest(id){
  const q=state.quests.find(x=>x.id===id); if(!q||q.done)return null;
  q.done=true;
  const damage=Math.round(16+q.xp*.55);
  state.enemy[q.target]=Math.max(0,state.enemy[q.target]-damage);
  state.xp+=q.xp; state.coins+=Math.round(q.xp*.32); state.heart=Math.min(100,state.heart+Math.round(q.xp*.16));
  if(state.xp>=state.nextXp){state.xp-=state.nextXp;state.level++;state.nextXp=Math.round(state.nextXp*1.3)}
  save();
  return {q,damage,target:q.target,hp:state.enemy[q.target]};
}
export function scaleQuest(id){const q=state.quests.find(x=>x.id===id);if(!q)return;q.scaled=true;q.minutes=Math.max(1,Math.round(q.minutes*.35));save()}
