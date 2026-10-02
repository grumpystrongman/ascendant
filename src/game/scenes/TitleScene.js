import Phaser from 'phaser';
import { state, reset } from '../state.js';
import { preloadArt,addBackdrop,addParticles } from '../art.js';
import { audio } from '../audio.js';

export class TitleScene extends Phaser.Scene{
  constructor(){super('Title')}
  preload(){preloadArt(this)}
  create(){
    addBackdrop(this,'title');
    this.add.rectangle(800,450,1600,900,0x040714,.26);
    addParticles(this,'gold',52);

    const halo=this.add.circle(800,430,230,0x79e3d5,.08).setBlendMode('ADD');
    this.tweens.add({targets:halo,scale:{from:.9,to:1.15},alpha:{from:.06,to:.14},duration:3200,yoyo:true,repeat:-1,ease:'Sine.inOut'});

    const crest=this.add.graphics();
    crest.lineStyle(3,0xf2cb76,.62);
    crest.strokeCircle(800,215,44);crest.strokeCircle(800,215,25);
    crest.beginPath();crest.moveTo(800,155);crest.lineTo(800,275);crest.moveTo(740,215);crest.lineTo(860,215);crest.strokePath();
    this.tweens.add({targets:crest,angle:360,duration:40000,repeat:-1});

    const title=this.add.text(800,330,'ASCENDANT',{
      fontFamily:'Georgia',fontSize:'118px',fontStyle:'bold',color:'#fff0bf',
      stroke:'#101226',strokeThickness:10,shadow:{offsetX:0,offsetY:5,color:'#000000',blur:14,fill:true}
    }).setOrigin(.5);
    this.add.text(800,420,'THE REAL-LIFE RPG',{
      fontFamily:'Arial',fontSize:'18px',fontStyle:'bold',letterSpacing:9,color:'#8ff0dd',
      stroke:'#050914',strokeThickness:5
    }).setOrigin(.5);

    this.add.text(800,545,'The Roads were once alive.\nNow they wake only when intention becomes action.',{
      fontFamily:'Georgia',fontSize:'29px',align:'center',lineSpacing:10,color:'#f0f2f8',
      stroke:'#050914',strokeThickness:7
    }).setOrigin(.5);

    this.button(800,690,state.prologue>0?'CONTINUE JOURNEY':'BEGIN THE PROLOGUE',()=>{
      audio.awaken();
      this.cameras.main.fadeOut(260,0,0,0);
      this.time.delayedCall(250,()=>this.scene.start(state.prologue>=11?'Hub':'Prologue'));
    });

    if(state.prologue>0){
      this.add.text(800,760,'NEW JOURNEY',{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',letterSpacing:2,color:'#d0d7e4'})
        .setOrigin(.5).setInteractive({useHandCursor:true})
        .on('pointerdown',()=>{reset();audio.click();this.scene.restart()});
    }

    this.add.text(800,838,'Built around your real actions · progress is saved locally',{
      fontFamily:'Arial',fontSize:'12px',color:'#8593a8'
    }).setOrigin(.5);
    this.cameras.main.fadeIn(900,0,0,0);
  }
  button(x,y,label,fn){
    const glow=this.add.rectangle(x,y,400,74,0xf3c76a,.10);
    const bg=this.add.rectangle(x,y,370,62,0xefbd5f,1).setStrokeStyle(2,0xffe6a5,.9).setInteractive({useHandCursor:true});
    const t=this.add.text(x,y,label,{fontFamily:'Arial',fontSize:'18px',fontStyle:'bold',letterSpacing:.8,color:'#25190d'}).setOrigin(.5);
    bg.on('pointerover',()=>this.tweens.add({targets:[glow,bg,t],scale:1.04,duration:100}))
      .on('pointerout',()=>this.tweens.add({targets:[glow,bg,t],scale:1,duration:100}))
      .on('pointerdown',fn);
  }
}
