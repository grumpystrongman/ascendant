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
    this.bg2=this.add.image(805,455,'prologueBg').setAlpha(.18).setBlendMode('ADD');
    this.tweens.add({targets:this.bg2,x:790,y:440,alpha:.08,duration:6000,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    for(let i=0;i<35;i++){
      const p=this.add.circle(Phaser.Math.Between(0,1600),Phaser.Math.Between(0,900),Phaser.Math.Between(1,4),0xffe0a1,Phaser.Math.FloatBetween(.08,.3));
      this.tweens.add({targets:p,x:p.x+Phaser.Math.Between(30,160),y:p.y-Phaser.Math.Between(10,80),duration:Phaser.Math.Between(5000,12000),repeat:-1,yoyo:true});
    }
    this.showStep();
    this.cameras.main.fadeIn(600,0,0,0);
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
  panel(){const r=this.add.rectangle(800,680,1370,330,0x09111f,.88).setStrokeStyle(2,0xb1c9e8,.22);this.stepObjects.push(r)}
  showNarration(title,text){
    this.panel();
    this.stepObjects.push(
      this.add.text(145,565,'PROLOGUE · THE AGE OF BROKEN ROADS',{fontFamily:'Arial',fontSize:'16px',fontStyle:'bold',letterSpacing:4,color:'#7de4d8'}),
      this.add.text(145,607,title,{fontFamily:'Georgia',fontSize:'50px',fontStyle:'bold',color:'#fff0bf'}),
      this.add.text(145,675,text,{fontFamily:'Georgia',fontSize:'25px',lineSpacing:9,color:'#d9e0ee',wordWrap:{width:1110}})
    );
    this.nextButton('CONTINUE');
  }
  showCompanion(id){
    discover(id);
    const c=COMPANIONS[id];
    const portrait=this.add.image(430,485,c.portrait).setScale(.78);portrait.x=120;portrait.alpha=0;
    this.tweens.add({targets:portrait,x:430,alpha:1,duration:650,ease:'Cubic.out'});
    this.panel();
    this.stepObjects.push(
      portrait,
      this.add.text(720,555,'THE WAYFARERS',{fontFamily:'Arial',fontSize:'16px',fontStyle:'bold',letterSpacing:5,color:'#7de4d8'}),
      this.add.text(720,595,c.name,{fontFamily:'Georgia',fontSize:'48px',fontStyle:'bold',color:'#fff0bf'}),
      this.add.text(720,650,c.title,{fontFamily:'Arial',fontSize:'19px',fontStyle:'bold',color:'#c2b4ff'}),
      this.add.text(720,695,c.intro,{fontFamily:'Georgia',fontSize:'22px',lineSpacing:6,color:'#dce4f1',wordWrap:{width:690}}),
      this.add.text(720,810,c.line,{fontFamily:'Georgia',fontSize:'19px',fontStyle:'italic',color:'#f5cf80',wordWrap:{width:690}})
    );
    this.nextButton('MEET '+c.name.split(' ')[0].toUpperCase());
  }
  showDialogue(id,text){
    const c=COMPANIONS[id];
    const portrait=this.add.image(330,510,c.portrait).setScale(.68);
    this.tweens.add({targets:portrait,y:500,duration:2500,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    this.panel();
    this.stepObjects.push(
      portrait,
      this.add.text(645,585,c.name,{fontFamily:'Georgia',fontSize:'38px',fontStyle:'bold',color:'#fff0bf'}),
      this.add.text(645,650,text,{fontFamily:'Georgia',fontSize:'29px',fontStyle:'italic',lineSpacing:10,color:'#e9eef8',wordWrap:{width:720}})
    );
    this.nextButton('CONTINUE');
  }
  showSpark(){
    this.panel();
    this.stepObjects.push(
      this.add.text(145,565,'CHOOSE THE FIRST SPARK',{fontFamily:'Georgia',fontSize:'46px',fontStyle:'bold',color:'#fff0bf'}),
      this.add.text(145,625,'Do one small thing in the real world. When you return, choose what you did. The Heart will know the difference between intention and action.',{fontFamily:'Georgia',fontSize:'23px',lineSpacing:8,color:'#dce4f1',wordWrap:{width:1260}})
    );
    const choices=[['DRINK WATER','water'],['ONE DELIBERATE BREATH','breath'],['MOVE FOR ONE MINUTE','move'],['WRITE ONE INTENTION','intention']];
    choices.forEach(([label,value],i)=>{
      const x=340+(i%2)*620,y=740+Math.floor(i/2)*72;
      const r=this.add.rectangle(x,y,540,52,0x15243d,.94).setStrokeStyle(2,0x76ddcf,.45).setInteractive({useHandCursor:true});
      const t=this.add.text(x,y,label,{fontFamily:'Arial',fontSize:'18px',fontStyle:'bold',color:'#f7f2db'}).setOrigin(.5);
      r.on('pointerover',()=>r.setFillStyle(0x244266,.98)).on('pointerout',()=>r.setFillStyle(0x15243d,.94)).on('pointerdown',()=>this.spark(value));
      this.stepObjects.push(r,t);
    });
  }
  spark(value){
    patch({firstSpark:value,prologue:11,heart:28,screen:'adventure'});
    const core=this.add.circle(800,390,50,0x78ffe4,.85).setBlendMode('ADD');
    this.tweens.add({targets:core,scale:14,alpha:0,duration:1200,ease:'Cubic.out'});
    this.cameras.main.flash(700,190,255,225);this.cameras.main.shake(500,.006);
    this.time.delayedCall(1050,()=>this.scene.start('Adventure'));
  }
  nextButton(label){
    const btn=this.add.rectangle(1320,825,250,54,0xf1bf62).setStrokeStyle(2,0xffe4a3).setInteractive({useHandCursor:true});
    const t=this.add.text(1320,825,label,{fontFamily:'Arial',fontSize:'16px',fontStyle:'bold',color:'#25190c'}).setOrigin(.5);
    btn.on('pointerdown',()=>{patch({prologue:Math.min(10,state.prologue+1)});this.showStep()});
    this.stepObjects.push(btn,t);
  }
}
