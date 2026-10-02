import Phaser from 'phaser';
import { state, completeQuest, scaleQuest } from '../state.js';
import { COMPANIONS } from '../lore.js';

export class AdventureScene extends Phaser.Scene{
  constructor(){super('Adventure')}
  preload(){
    this.load.svg('amber','./art/amber-highlands.svg',{width:1600,height:900});
    this.load.svg('kaia','./art/kaia.svg',{width:700,height:900});
    this.load.svg('milo','./art/milo.svg',{width:700,height:900});
    this.load.svg('seren','./art/seren.svg',{width:700,height:900});
    this.load.svg('wraith','./art/wraith.svg',{width:500,height:600});
  }
  create(){
    this.add.image(800,450,'amber');
    this.addClouds();
    const w=this.add.image(1250,475,'wraith').setScale(.63).setAlpha(.8);
    this.tweens.add({targets:w,y:455,alpha:.95,duration:2600,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    this.makeHud();this.showQuestRail();
    this.cameras.main.fadeIn(700,0,0,0);
  }
  addClouds(){
    for(let i=0;i<8;i++){
      const c=this.add.ellipse(Phaser.Math.Between(-100,1700),Phaser.Math.Between(100,700),Phaser.Math.Between(250,550),Phaser.Math.Between(45,100),0xf5f6ff,Phaser.Math.FloatBetween(.035,.1));
      this.tweens.add({targets:c,x:c.x+Phaser.Math.Between(180,420),duration:Phaser.Math.Between(12000,25000),yoyo:true,repeat:-1});
    }
  }
  makeHud(){
    this.add.rectangle(800,55,1550,86,0x07101f,.84).setStrokeStyle(1,0xbfdfff,.16);
    this.add.text(60,29,'AMBER HIGHLANDS',{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',letterSpacing:4,color:'#75dfd2'});
    this.add.text(60,53,`Sparkbearer · Level ${state.level}`,{fontFamily:'Georgia',fontSize:'27px',fontStyle:'bold',color:'#fff1c3'});
    this.add.text(1260,39,`HEART ${state.heart}%   ✦ ${state.shards}   ◉ ${state.coins}`,{fontFamily:'Arial',fontSize:'17px',fontStyle:'bold',color:'#e9edf8'});
    this.add.rectangle(1300,72,230,8,0x16243b);
    this.add.rectangle(1185,72,230*(state.heart/100),8,0x77e2d5).setOrigin(0,.5);
  }
  showQuestRail(){
    this.add.rectangle(280,485,500,730,0x07101f,.86).setStrokeStyle(1,0x9fc7e6,.2);
    this.add.text(65,147,'TODAY’S ROAD',{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',letterSpacing:4,color:'#75dfd2'});
    this.add.text(65,178,'Actions become attacks',{fontFamily:'Georgia',fontSize:'33px',fontStyle:'bold',color:'#fff1c3'});
    this.add.text(65,220,'Choose something real. When you finish it, return here and strike.',{fontFamily:'Georgia',fontSize:'18px',color:'#cbd6e8',wordWrap:{width:420}});
    let y=295;
    state.quests.filter(q=>!q.done).slice(0,4).forEach(q=>{
      this.add.rectangle(280,y,430,120,0x10203a,.95).setStrokeStyle(1,q.kind==='HIGH STAKES'?0xf0b85f:0x5f85ad,.45);
      this.add.text(85,y-44,q.kind,{fontFamily:'Arial',fontSize:'11px',fontStyle:'bold',letterSpacing:2,color:q.kind==='HIGH STAKES'?'#f2bf68':'#7ce1d4'});
      this.add.text(85,y-23,q.title,{fontFamily:'Georgia',fontSize:'22px',fontStyle:'bold',color:'#f7f0d4'});
      this.add.text(85,y+8,q.scaled?q.tiny:q.reality,{fontFamily:'Arial',fontSize:'13px',color:'#b9c4d7',wordWrap:{width:315}});
      this.add.text(85,y+40,`~${q.minutes} min · +${q.xp} XP`,{fontFamily:'Arial',fontSize:'12px',fontStyle:'bold',color:'#e8bd67'});
      const strike=this.add.text(432,y+34,'STRIKE',{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#21180c',backgroundColor:'#efbc5f',padding:{x:12,y:7}}).setInteractive({useHandCursor:true});
      strike.on('pointerdown',()=>this.resolveQuest(q.id));
      const small=this.add.text(428,y-40,'make smaller',{fontFamily:'Arial',fontSize:'11px',color:'#bcd0e7'}).setInteractive({useHandCursor:true});
      small.on('pointerdown',()=>{scaleQuest(q.id);this.scene.restart()});
      y+=138;
    });
    this.add.text(610,690,'THE HESITATION WRAITH',{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',letterSpacing:3,color:'#d1bdff'});
    this.add.text(610,720,'It grows wherever decisions remain untouched.',{fontFamily:'Georgia',fontSize:'25px',fontStyle:'italic',color:'#e8e2f5'});
    this.add.text(610,765,`WRAITH ${state.enemy.wraith}/120     DRIFTLINGS ${state.enemy.drift}/50`,{fontFamily:'Arial',fontSize:'16px',fontStyle:'bold',color:'#ffb6ae'});
  }
  resolveQuest(id){
    const result=completeQuest(id);if(!result)return;
    this.cameras.main.shake(420,.011);this.cameras.main.flash(250,255,220,130);
    const slash=this.add.rectangle(1200,450,520,20,0xfff0bb,.95).setRotation(-.42).setBlendMode('ADD');
    this.tweens.add({targets:slash,scaleX:.05,alpha:0,duration:500,onComplete:()=>slash.destroy()});
    const dmg=this.add.text(1190,360,`-${result.damage}`,{fontFamily:'Arial',fontSize:'68px',fontStyle:'bold',color:'#ff8c85',stroke:'#42181a',strokeThickness:8}).setOrigin(.5);
    this.tweens.add({targets:dmg,y:300,alpha:0,duration:1100,onComplete:()=>{dmg.destroy();this.showPartyReaction(result)}});
  }
  showPartyReaction(result){
    this.add.rectangle(800,450,1600,900,0x030712,.72).setInteractive();
    this.add.rectangle(800,660,1400,340,0x07101f,.95).setStrokeStyle(2,0xe4c06b,.25);
    ['kaia','milo','seren'].forEach((id,i)=>{
      const p=this.add.image(270+i*280,535,id).setScale(.32).setCrop(0,0,700,650);
      this.tweens.add({targets:p,y:520,duration:1000+i*170,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    });
    this.add.text(740,530,'REAL ACTION → WORLD CHANGE',{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',letterSpacing:4,color:'#7de2d6'});
    this.add.text(740,570,result.q.title,{fontFamily:'Georgia',fontSize:'38px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(740,622,`${result.damage} damage. The Crystal Heart answers. The Road becomes a little more real.`,{fontFamily:'Georgia',fontSize:'23px',color:'#dce5f2',wordWrap:{width:700}});
    this.add.text(740,692,COMPANIONS.kaia.line,{fontFamily:'Georgia',fontSize:'18px',fontStyle:'italic',color:'#f1c76d',wordWrap:{width:690}});
    const cont=this.add.text(1250,790,'CONTINUE',{fontFamily:'Arial',fontSize:'17px',fontStyle:'bold',color:'#21180c',backgroundColor:'#efbc5f',padding:{x:22,y:12}}).setInteractive({useHandCursor:true});
    cont.on('pointerdown',()=>this.scene.restart());
  }
}
