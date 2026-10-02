import Phaser from 'phaser';
import { state, beginQuest, completeQuest, scaleQuest } from '../state.js';
import { preloadArt,addBackdrop,addParticles } from '../art.js';
import { audio } from '../audio.js';

export class AdventureScene extends Phaser.Scene{
  constructor(){super('Adventure')}
  preload(){preloadArt(this)}
  create(){
    addBackdrop(this,'quest');
    addParticles(this,'gold',12);
    const q=this.currentQuest();
    this.overlayState(q);

    this.hotspot(625,715,460,90,()=>{
      audio.awaken();
      if(!state.activeQuest)beginQuest(q.id);
      else {
        const result=completeQuest(state.activeQuest.id);
        if(result)this.scene.start('Battle',{result});
      }
      this.scene.restart();
    });
    this.hotspot(1060,715,350,90,()=>{scaleQuest(q.id);audio.click();this.scene.restart()});

    this.hotspot(90,50,170,80,()=>this.scene.start('Hub'));
    this.cameras.main.fadeIn(420,0,0,0);
  }
  currentQuest(){
    if(state.activeQuest){
      const q=state.quests.find(x=>x.id===state.activeQuest.id);
      if(q&&!q.done)return q;
    }
    return state.quests.find(x=>!x.done)||state.quests[0];
  }
  overlayState(q){
    this.add.rectangle(1395,50,300,48,0x06101d,.82).setStrokeStyle(1,0xffd77a,.2);
    this.add.text(1270,38,`LV ${state.level}`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(1350,38,`◉ ${state.coins}`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#f2d07a'});
    this.add.text(1440,38,`✦ ${state.shards}`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#b8a8ff'});

    const panel=this.add.rectangle(810,458,1010,360,0x07101f,.86).setStrokeStyle(2,0xd7b968,.30);
    this.add.text(430,315,q.title,{fontFamily:'Georgia',fontSize:'45px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(430,382,`${q.stat}    ~${q.minutes} min    +${q.xp} XP`,{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:'#86e2d8'});
    this.add.text(430,438,q.scaled?q.tiny:q.reality,{fontFamily:'Georgia',fontSize:'25px',lineSpacing:8,color:'#f1f3f8',wordWrap:{width:760}});
    const label=state.activeQuest?'I DID IT — STRIKE':'START QUEST';
    this.add.text(625,715,label,{fontFamily:'Arial',fontSize:'19px',fontStyle:'bold',color:'#25190d'}).setOrigin(.5);
    if(state.activeQuest){
      this.add.text(430,555,'Quest in progress. When the real-world action is complete, return and strike.',{fontFamily:'Georgia',fontSize:'17px',fontStyle:'italic',color:'#f2cd78',wordWrap:{width:760}});
    }
  }
  hotspot(x,y,w,h,fn){
    const r=this.add.rectangle(x,y,w,h,0xffd36f,.001).setInteractive({useHandCursor:true});
    r.on('pointerover',()=>r.setFillStyle(0xffd36f,.08))
      .on('pointerout',()=>r.setFillStyle(0xffd36f,.001))
      .on('pointerdown',fn);
  }
}
