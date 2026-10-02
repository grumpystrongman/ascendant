import Phaser from 'phaser';
import { state, beginQuest, completeQuest, scaleQuest, setEnergy } from '../state.js';
import { COMPANIONS } from '../lore.js';
import { preloadArt,defineFrames,addParticles,addPortrait } from '../art.js';
import { panel,goldButton,ghostButton,topBar,nav } from '../ui.js';
import { audio } from '../audio.js';

export class AdventureScene extends Phaser.Scene{
  constructor(){super('Adventure')}
  preload(){
    preloadArt(this);
    this.load.svg('amber','./art/amber-highlands.svg',{width:1600,height:900});
    this.load.svg('wraith','./art/wraith.svg',{width:500,height:600});
  }
  create(){
    defineFrames(this);
    this.add.image(800,450,'amber');
    this.add.rectangle(800,450,1600,900,0x07101b,.16);
    this.addClouds();addParticles(this,'gold',24);
    const w=this.add.image(1210,395,'wraith').setScale(.72).setAlpha(.82);
    this.tweens.add({targets:w,y:370,angle:2,alpha:.96,duration:2600,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    const aura=this.add.circle(1210,400,165,0x8f73d9,.12).setBlendMode('ADD');
    this.tweens.add({targets:aura,scale:1.25,alpha:.035,duration:1900,yoyo:true,repeat:-1});
    topBar(this,state,'THE AMBER HIGHLANDS','First Road · the Wraith Gate');nav(this,'Adventure');
    this.makeStoryPanel();
    this.makeEnergy();
    this.makeQuestDeck();
    if(state.activeQuest)this.makeActiveQuest();
    this.cameras.main.fadeIn(450,0,0,0);
  }
  addClouds(){
    for(let i=0;i<7;i++){
      const c=this.add.ellipse(Phaser.Math.Between(-100,1700),Phaser.Math.Between(80,650),Phaser.Math.Between(260,560),Phaser.Math.Between(45,105),0xf4f7ff,Phaser.Math.FloatBetween(.025,.075));
      this.tweens.add({targets:c,x:c.x+Phaser.Math.Between(180,430),duration:Phaser.Math.Between(14000,26000),yoyo:true,repeat:-1});
    }
  }
  makeStoryPanel(){
    panel(this,360,300,620,350,.84);
    this.add.text(90,155,'CURRENT STORY BEAT',{fontFamily:'Arial',fontSize:'12px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
    this.add.text(90,190,'The Wraith Gate',{fontFamily:'Georgia',fontSize:'40px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(90,250,`The living map has found the first broken Road. The Hesitation Wraith is wrapped around its gate, feeding on unfinished choices. Every real action makes its shape less stable.`,{fontFamily:'Georgia',fontSize:'19px',lineSpacing:7,color:'#dce4f1',wordWrap:{width:520}});
    this.add.text(90,390,`WRAITH  ${state.enemy.wraith}/120     DRIFTLINGS  ${state.enemy.drift}/50`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#ffaaa6'});
    const hp=this.add.rectangle(90,425,430,10,0x101724).setOrigin(0,.5);
    this.add.rectangle(90,425,430*(state.enemy.wraith/120),10,0xc36c85).setOrigin(0,.5);
    const speaker=COMPANIONS.seren;
    this.add.text(90,460,speaker.banter[Math.min(speaker.banter.length-1,state.completed%3)],{fontFamily:'Georgia',fontSize:'16px',fontStyle:'italic',color:'#d6c6ff',wordWrap:{width:500}});
  }
  makeEnergy(){
    panel(this,1265,150,480,150,.86);
    this.add.text(1050,105,'HOW MUCH DO YOU HAVE TODAY?',{fontFamily:'Arial',fontSize:'11px',fontStyle:'bold',letterSpacing:3,color:'#78dfd2'});
    ['low','normal','high'].forEach((e,i)=>{
      ghostButton(this,1105+i*160,165,140,e.toUpperCase(),()=>{audio.click();setEnergy(e);this.scene.restart()},state.energy===e);
    });
  }
  displayFor(q){
    if(q.scaled||state.energy==='low')return {text:q.tiny,min:Math.max(1,Math.round(q.minutes*.35))};
    if(state.energy==='high')return {text:q.reality,min:Math.max(q.minutes,Math.round(q.minutes*1.15))};
    return {text:q.reality,min:q.minutes};
  }
  makeQuestDeck(){
    this.add.text(90,570,'TODAY’S ROAD',{fontFamily:'Arial',fontSize:'12px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
    this.add.text(90,602,'Choose the next real action',{fontFamily:'Georgia',fontSize:'29px',fontStyle:'bold',color:'#fff0bf'});
    const qs=state.quests.filter(q=>!q.done).slice(0,4);
    qs.forEach((q,i)=>{
      const x=250+i*350,y=724;
      const high=q.kind==='HIGH STAKES';
      const plaque=this.add.rectangle(x,y,315,165,high?0x39283a:0x0d1d33,.94).setStrokeStyle(2,high?0xe0ad61:0x6689a7,.48).setInteractive({useHandCursor:true});
      this.add.text(x-135,y-62,q.kind,{fontFamily:'Arial',fontSize:'10px',fontStyle:'bold',letterSpacing:2,color:high?'#f2bd68':'#7ce1d4'});
      this.add.text(x-135,y-37,q.title,{fontFamily:'Georgia',fontSize:'22px',fontStyle:'bold',color:'#fff0bf',wordWrap:{width:265}});
      const d=this.displayFor(q);
      this.add.text(x-135,y+12,d.text,{fontFamily:'Arial',fontSize:'12px',color:'#bac5d5',wordWrap:{width:260}});
      this.add.text(x-135,y+57,`~${d.min} min   +${q.xp} XP   ${q.stat}`,{fontFamily:'Arial',fontSize:'11px',fontStyle:'bold',color:'#e7bd68'});
      plaque.on('pointerover',()=>this.tweens.add({targets:plaque,scale:1.025,duration:90}))
        .on('pointerout',()=>this.tweens.add({targets:plaque,scale:1,duration:90}))
        .on('pointerdown',()=>{audio.click();this.openQuest(q)});
    });
    if(!qs.length){
      panel(this,800,720,720,170,.92);
      this.add.text(800,690,'THE ROAD IS CLEAR FOR TODAY',{fontFamily:'Georgia',fontSize:'30px',fontStyle:'bold',color:'#fff0bf'}).setOrigin(.5);
      this.add.text(800,735,'Return to the Wayfarer. Your crew has noticed what changed.',{fontFamily:'Georgia',fontSize:'18px',color:'#cbd6e6'}).setOrigin(.5);
      goldButton(this,800,790,260,'RETURN TO SHIP',()=>this.scene.start('Hub'));
    }
  }
  makeActiveQuest(){
    const q=state.quests.find(x=>x.id===state.activeQuest.id);if(!q||q.done)return;
    panel(this,1235,420,560,250,.94);
    this.add.text(995,325,'QUEST IN PROGRESS',{fontFamily:'Arial',fontSize:'12px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
    this.add.text(995,360,q.title,{fontFamily:'Georgia',fontSize:'30px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(995,410,(q.scaled||state.energy==='low')?q.tiny:q.reality,{fontFamily:'Georgia',fontSize:'17px',lineSpacing:6,color:'#d8e2ef',wordWrap:{width:470}});
    this.timerText=this.add.text(995,478,'',{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:'#e8c46c'});
    this.time.addEvent({delay:1000,loop:true,callback:()=>this.updateTimer()});this.updateTimer();
    goldButton(this,1235,550,330,'I DID IT — STRIKE',()=>this.finishQuest(q));
  }
  updateTimer(){
    if(!this.timerText||!state.activeQuest)return;
    const sec=Math.floor((Date.now()-state.activeQuest.startedAt)/1000),m=Math.floor(sec/60),s=String(sec%60).padStart(2,'0');
    this.timerText.setText(`Road time  ${m}:${s}   ·   honor system`);
  }
  openQuest(q){
    const shade=this.add.rectangle(800,450,1600,900,0x01040a,.78).setInteractive();
    panel(this,800,450,900,510,.98);
    const d=this.displayFor(q);
    this.add.text(400,255,q.kind+' · '+q.stat.toUpperCase(),{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',letterSpacing:3,color:'#78dfd2'});
    this.add.text(400,300,q.title,{fontFamily:'Georgia',fontSize:'44px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(400,375,d.text,{fontFamily:'Georgia',fontSize:'22px',lineSpacing:8,color:'#dce4f1',wordWrap:{width:780}});
    this.add.text(400,470,`~${d.min} minutes     +${q.xp} XP     attacks the ${q.target==='wraith'?'Hesitation Wraith':'Driftlings'}`,{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:'#e8c46c'});
    goldButton(this,610,590,330,'BEGIN QUEST',()=>{audio.awaken();beginQuest(q.id);this.scene.restart()});
    ghostButton(this,1000,590,300,'MAKE IT SMALLER',()=>{scaleQuest(q.id);audio.click();this.scene.restart()});
    this.add.text(800,665,'ESC / click outside to return',{fontFamily:'Arial',fontSize:'12px',color:'#8290a5'}).setOrigin(.5);
    shade.on('pointerdown',()=>this.scene.restart());
  }
  finishQuest(q){
    const result=completeQuest(q.id);if(!result)return;
    audio.awaken();this.scene.start('Battle',{result});
  }
}
