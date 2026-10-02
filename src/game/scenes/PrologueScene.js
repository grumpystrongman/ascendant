import Phaser from 'phaser';
import { PROLOGUE, COMPANIONS } from '../lore.js';
import { state, patch, discover } from '../state.js';
import { preloadArt,addBackdrop,addPortrait,addParticles } from '../art.js';
import { audio } from '../audio.js';

export class PrologueScene extends Phaser.Scene{
  constructor(){super('Prologue')}
  preload(){preloadArt(this)}
  create(){
    addBackdrop(this,'prologue');
    this.add.rectangle(800,450,1600,900,0x030712,.16);
    addParticles(this,'gold',28);
    this.stepObjects=[];
    this.showStep();
    this.cameras.main.fadeIn(450,0,0,0);
  }
  clearStep(){
    this.stepObjects.forEach(o=>o?.destroy?.());
    this.stepObjects=[];
  }
  keep(...objects){this.stepObjects.push(...objects);return objects}
  showStep(){
    this.clearStep();
    const step=PROLOGUE[state.prologue]||PROLOGUE.at(-1);
    if(step.kind==='companion')this.showCompanion(step.who);
    else if(step.kind==='dialogue')this.showDialogue(step.who,step.text);
    else if(step.kind==='spark')this.showSpark();
    else this.showNarration(step.title,step.text);
  }
  cinematicPanel(x=800,y=655,w=1370,h=380){
    const shadow=this.add.rectangle(x+8,y+12,w,h,0x000000,.30);
    const box=this.add.rectangle(x,y,w,h,0x07101f,.94).setStrokeStyle(2,0xe1c36f,.24);
    this.keep(shadow,box);
    return {left:x-w/2,right:x+w/2,top:y-h/2,bottom:y+h/2};
  }
  showNarration(title,text){
    const b=this.cinematicPanel(800,675,1370,350);
    this.keep(
      this.add.text(b.left+45,b.top+34,'PROLOGUE · THE AGE OF BROKEN ROADS',{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',letterSpacing:5,color:'#78dfd2'}),
      this.add.text(b.left+45,b.top+74,title,{fontFamily:'Georgia',fontSize:'48px',fontStyle:'bold',color:'#fff0bf'}),
      this.add.text(b.left+45,b.top+145,text,{fontFamily:'Georgia',fontSize:'23px',lineSpacing:8,color:'#dce5f2',wordWrap:{width:1080}})
    );
    this.nextButton(1340,b.bottom-44,'CONTINUE');
  }
  showCompanion(id){
    discover(id);
    const c=COMPANIONS[id];
    const veil=this.add.rectangle(800,450,1600,900,0x02050b,.22);
    const portrait=addPortrait(this,id,330,445,710);
    portrait.x=-80;portrait.alpha=0;
    this.tweens.add({targets:portrait,x:330,alpha:1,duration:700,ease:'Cubic.out'});
    this.tweens.add({targets:portrait,y:435,duration:2700,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    const glow=this.add.circle(330,430,190,c.accent,.09).setBlendMode('ADD');
    this.tweens.add({targets:glow,scale:1.18,alpha:.03,duration:2300,yoyo:true,repeat:-1});

    const shadow=this.add.rectangle(1108,536,805,580,0x000000,.28);
    const panel=this.add.rectangle(1100,528,805,580,0x07101f,.94).setStrokeStyle(2,0xdcc16e,.34);
    const divider=this.add.rectangle(750,535,2,500,0xffffff,.08);

    const label=this.add.text(780,278,'THE WAYFARERS',{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',letterSpacing:5,color:'#78dfd2'});
    const name=this.add.text(780,318,c.name,{fontFamily:'Georgia',fontSize:'52px',fontStyle:'bold',color:'#fff0bf'});
    const title=this.add.text(780,380,c.title,{fontFamily:'Georgia',fontSize:'21px',color:'#bba9ff'});
    const rule=this.add.rectangle(780,420,590,2,0xd6b766,.35).setOrigin(0,.5);
    const intro=this.add.text(780,448,c.intro,{fontFamily:'Georgia',fontSize:'21px',lineSpacing:7,color:'#e1e7f1',wordWrap:{width:595}});
    const quoteBox=this.add.rectangle(1080,660,615,105,0x0c2737,.96).setStrokeStyle(1,0x6fe1d4,.65);
    const quote=this.add.text(810,630,c.line,{fontFamily:'Georgia',fontSize:'19px',fontStyle:'italic',color:'#f2d07c',wordWrap:{width:520}});
    this.keep(veil,portrait,glow,shadow,panel,divider,label,name,title,rule,intro,quoteBox,quote);
    this.nextButton(1310,782,'CONTINUE');
  }
  showDialogue(id,text){
    const c=COMPANIONS[id];
    const portrait=addPortrait(this,id,315,465,650);
    portrait.alpha=.9;
    this.tweens.add({targets:portrait,y:455,duration:2400,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    const b=this.cinematicPanel(1040,665,900,320);
    this.keep(
      portrait,
      this.add.text(655,b.top+42,c.name.toUpperCase(),{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'}),
      this.add.text(655,b.top+82,text,{fontFamily:'Georgia',fontSize:'29px',fontStyle:'italic',lineSpacing:10,color:'#fff0bf',wordWrap:{width:720}})
    );
    this.nextButton(1315,b.bottom-44,'CONTINUE');
  }
  showSpark(){
    addBackdrop(this,'spark',.96);
    const overlay=this.add.rectangle(800,450,1600,900,0x030712,.14);
    const core=this.add.circle(800,420,96,0x76e4d7,.18).setBlendMode('ADD');
    this.tweens.add({targets:core,scale:1.8,alpha:.04,duration:2200,yoyo:true,repeat:-1,ease:'Sine.inOut'});

    const b=this.cinematicPanel(800,680,1320,320);
    const heading=this.add.text(b.left+40,b.top+30,'CHOOSE THE FIRST SPARK',{fontFamily:'Georgia',fontSize:'44px',fontStyle:'bold',color:'#fff0bf'});
    const body=this.add.text(b.left+40,b.top+88,'Do one small thing in the real world. Return when it is done. The Heart does not respond to promises — only to motion.',{fontFamily:'Georgia',fontSize:'21px',lineSpacing:7,color:'#dce5f2',wordWrap:{width:1200}});
    this.keep(overlay,core,heading,body);

    const choices=[['DRINK WATER','water'],['ONE DELIBERATE BREATH','breath'],['MOVE FOR ONE MINUTE','move'],['WRITE ONE INTENTION','intention']];
    choices.forEach(([label,value],i)=>{
      const col=i%2,row=Math.floor(i/2),x=460+col*680,y=708+row*68;
      const bg=this.add.rectangle(x,y,590,48,0x11243b,.96).setStrokeStyle(1,0x78dfd2,.55).setInteractive({useHandCursor:true});
      const tx=this.add.text(x,y,label,{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',letterSpacing:.8,color:'#f5f1e5'}).setOrigin(.5);
      bg.on('pointerover',()=>bg.setFillStyle(0x21425d,.98)).on('pointerout',()=>bg.setFillStyle(0x11243b,.96)).on('pointerdown',()=>this.spark(value));
      this.keep(bg,tx);
    });
  }
  spark(value){
    audio.awaken();
    patch({firstSpark:value,prologue:11,heart:28,screen:'hub'});
    const flash=this.add.circle(800,420,70,0x9affea,.95).setBlendMode('ADD');
    this.tweens.add({targets:flash,scale:18,alpha:0,duration:1200,ease:'Cubic.out'});
    this.cameras.main.flash(600,210,255,235);
    this.cameras.main.shake(520,.006);
    for(let i=0;i<34;i++){
      const angle=Phaser.Math.FloatBetween(0,Math.PI*2),dist=Phaser.Math.Between(100,430);
      const p=this.add.circle(800,420,Phaser.Math.Between(2,6),0xffe5a3,.85).setBlendMode('ADD');
      this.tweens.add({targets:p,x:800+Math.cos(angle)*dist,y:420+Math.sin(angle)*dist,alpha:0,duration:Phaser.Math.Between(600,1200),ease:'Cubic.out'});
    }
    this.time.delayedCall(1150,()=>this.scene.start('Hub'));
  }
  nextButton(x,y,label){
    const glow=this.add.rectangle(x,y,250,58,0xf0c36b,.08);
    const btn=this.add.rectangle(x,y,230,50,0xefbd5f,1).setStrokeStyle(2,0xffe4a0,.9).setInteractive({useHandCursor:true});
    const tx=this.add.text(x,y,label,{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',letterSpacing:.7,color:'#25190d'}).setOrigin(.5);
    btn.on('pointerover',()=>this.tweens.add({targets:[btn,tx,glow],scale:1.03,duration:90}))
      .on('pointerout',()=>this.tweens.add({targets:[btn,tx,glow],scale:1,duration:90}))
      .on('pointerdown',()=>{audio.click();patch({prologue:Math.min(10,state.prologue+1)});this.showStep()});
    this.keep(glow,btn,tx);
  }
}
