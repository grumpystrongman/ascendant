import Phaser from 'phaser';
import { PROLOGUE, COMPANIONS } from '../lore.js';
import { state, patch, discover } from '../state.js';

export class PrologueScene extends Phaser.Scene{
  constructor(){super('Prologue')}
  preload(){
    this.load.svg('prologueBg','./art/prologue.svg',{width:1600,height:900});
    this.load.svg('kaia','./art/kaia.svg',{width:700,height:900});
    this.load.svg('milo','./art/milo.svg',{width:700,height:900});
    this.load.svg('seren','./art/seren.svg',{width:700,height:900});
  }
  create(){
    this.bg=this.add.image(800,450,'prologueBg');
    this.bg2=this.add.image(815,445,'prologueBg').setAlpha(.10).setBlendMode('ADD');
    this.tweens.add({targets:this.bg2,x:785,y:460,alpha:.04,duration:6500,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    for(let i=0;i<28;i++){
      const p=this.add.circle(Phaser.Math.Between(0,1600),Phaser.Math.Between(0,900),Phaser.Math.Between(1,3),0xffdf9c,Phaser.Math.FloatBetween(.08,.28));
      this.tweens.add({targets:p,x:p.x+Phaser.Math.Between(40,150),y:p.y-Phaser.Math.Between(12,70),duration:Phaser.Math.Between(6000,13000),repeat:-1,yoyo:true});
    }
    this.showStep();
    this.cameras.main.fadeIn(500,0,0,0);
  }
  clearStep(){this.stepObjects?.forEach(o=>o.destroy());this.stepObjects=[]}
  showStep(){
    this.clearStep();
    const step=PROLOGUE[state.prologue]||PROLOGUE.at(-1);
    if(step.kind==='companion')this.showCompanion(step.who);
    else if(step.kind==='dialogue')this.showDialogue(step.who,step.text);
    else if(step.kind==='spark')this.showSpark();
    else this.showNarration(step.title,step.text);
  }
  basePanel(height=330,y=690){
    const shadow=this.add.rectangle(808,y+10,1375,height,0x000000,.28);
    const panel=this.add.rectangle(800,y,1375,height,0x08111f,.94).setStrokeStyle(2,0xc6d9ee,.20);
    this.stepObjects.push(shadow,panel);
    return {left:112,right:1488,top:y-height/2,bottom:y+height/2};
  }
  showNarration(title,text){
    const b=this.basePanel(325,690);
    const eyebrow=this.add.text(b.left+35,b.top+28,'PROLOGUE · THE AGE OF BROKEN ROADS',{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',letterSpacing:4,color:'#75dfd3'});
    const heading=this.add.text(b.left+35,b.top+65,title,{fontFamily:'Georgia',fontSize:'46px',fontStyle:'bold',color:'#fff0bf'});
    const body=this.add.text(b.left+35,b.top+128,text,{fontFamily:'Georgia',fontSize:'22px',lineSpacing:7,color:'#dce4f1',wordWrap:{width:1120}});
    this.stepObjects.push(eyebrow,heading,body);
    this.nextButton('CONTINUE',1360,b.bottom-42);
  }
  showCompanion(id){
    discover(id);
    const c=COMPANIONS[id];
    const b=this.basePanel(360,690);

    const portraitShadow=this.add.ellipse(360,790,360,48,0x000000,.22);
    const portrait=this.add.image(355,440,c.portrait).setScale(.58);
    portrait.x=80; portrait.alpha=0;
    this.tweens.add({targets:portrait,x:355,alpha:1,duration:620,ease:'Cubic.out'});
    this.tweens.add({targets:portrait,y:432,duration:2800,yoyo:true,repeat:-1,ease:'Sine.inOut'});

    const divider=this.add.rectangle(610,690,2,300,0xffffff,.08);
    const eyebrow=this.add.text(660,b.top+30,'THE WAYFARERS',{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',letterSpacing:5,color:'#75dfd3'});
    const name=this.add.text(660,b.top+62,c.name,{fontFamily:'Georgia',fontSize:'44px',fontStyle:'bold',color:'#fff0bf'});
    const title=this.add.text(660,b.top+112,c.title.toUpperCase(),{fontFamily:'Arial',fontSize:'16px',fontStyle:'bold',letterSpacing:1.2,color:'#c9b7ff'});
    const intro=this.add.text(660,b.top+152,c.intro,{fontFamily:'Georgia',fontSize:'20px',lineSpacing:6,color:'#dde5f0',wordWrap:{width:715}});
    const quoteRule=this.add.rectangle(660,b.bottom-86,520,2,0xf1c66c,.35).setOrigin(0,.5);
    const quote=this.add.text(660,b.bottom-73,c.line,{fontFamily:'Georgia',fontSize:'18px',fontStyle:'italic',color:'#f2cc74',wordWrap:{width:560}});

    this.stepObjects.push(portraitShadow,portrait,divider,eyebrow,name,title,intro,quoteRule,quote);
    this.nextButton('CONTINUE',1350,b.bottom-44);
  }
  showDialogue(id,text){
    const c=COMPANIONS[id];
    const b=this.basePanel(330,690);
    const portrait=this.add.image(360,455,c.portrait).setScale(.50);
    this.tweens.add({targets:portrait,y:447,duration:2500,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    const divider=this.add.rectangle(595,690,2,270,0xffffff,.08);
    const who=this.add.text(650,b.top+55,c.name,{fontFamily:'Georgia',fontSize:'38px',fontStyle:'bold',color:'#fff0bf'});
    const body=this.add.text(650,b.top+115,text,{fontFamily:'Georgia',fontSize:'25px',fontStyle:'italic',lineSpacing:9,color:'#e9eef8',wordWrap:{width:690}});
    this.stepObjects.push(portrait,divider,who,body);
    this.nextButton('CONTINUE',1350,b.bottom-44);
  }
  showSpark(){
    const b=this.basePanel(340,690);
    const heading=this.add.text(b.left+25,b.top+28,'CHOOSE THE FIRST SPARK',{fontFamily:'Georgia',fontSize:'42px',fontStyle:'bold',color:'#fff0bf'});
    const body=this.add.text(b.left+25,b.top+80,'Do one small thing in the real world. When you return, choose what you did. The Heart will know the difference between intention and action.',{fontFamily:'Georgia',fontSize:'20px',lineSpacing:6,color:'#dce4f1',wordWrap:{width:1270}});
    this.stepObjects.push(heading,body);

    const choices=[
      ['DRINK WATER','water'],
      ['ONE DELIBERATE BREATH','breath'],
      ['MOVE FOR ONE MINUTE','move'],
      ['WRITE ONE INTENTION','intention']
    ];
    choices.forEach(([label,value],i)=>{
      const col=i%2,row=Math.floor(i/2);
      const x=400+col*760, y=b.top+184+row*70;
      const bg=this.add.rectangle(x,y,650,50,0x13233d,.97).setStrokeStyle(2,0x74ded2,.42).setInteractive({useHandCursor:true});
      const t=this.add.text(x,y,label,{fontFamily:'Arial',fontSize:'16px',fontStyle:'bold',letterSpacing:.5,color:'#f8f2dc'}).setOrigin(.5);
      bg.on('pointerover',()=>{bg.setFillStyle(0x203b5e,.98);this.tweens.add({targets:[bg,t],scale:1.015,duration:100})})
        .on('pointerout',()=>{bg.setFillStyle(0x13233d,.97);this.tweens.add({targets:[bg,t],scale:1,duration:100})})
        .on('pointerdown',()=>this.spark(value));
      this.stepObjects.push(bg,t);
    });
  }
  spark(value){
    patch({firstSpark:value,prologue:11,heart:28,screen:'adventure'});
    const core=this.add.circle(800,395,48,0x78ffe4,.88).setBlendMode('ADD');
    this.tweens.add({targets:core,scale:15,alpha:0,duration:1150,ease:'Cubic.out'});
    this.cameras.main.flash(650,190,255,225); this.cameras.main.shake(420,.005);
    this.time.delayedCall(1000,()=>this.scene.start('Adventure'));
  }
  nextButton(label,x,y){
    const btn=this.add.rectangle(x,y,220,48,0xefbd5f,1).setStrokeStyle(2,0xffe0a0).setInteractive({useHandCursor:true});
    const t=this.add.text(x,y,label,{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',letterSpacing:.6,color:'#25190d'}).setOrigin(.5);
    btn.on('pointerover',()=>this.tweens.add({targets:[btn,t],scale:1.03,duration:90}))
      .on('pointerout',()=>this.tweens.add({targets:[btn,t],scale:1,duration:90}))
      .on('pointerdown',()=>{patch({prologue:Math.min(10,state.prologue+1)});this.showStep()});
    this.stepObjects.push(btn,t);
  }
}
