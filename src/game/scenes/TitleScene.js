import Phaser from 'phaser';
import { state, reset } from '../state.js';
import { preloadArt,addBackdrop,addParticles } from '../art.js';
import { audio } from '../audio.js';

export class TitleScene extends Phaser.Scene{
  constructor(){super('Title')}
  preload(){preloadArt(this)}
  create(){
    addBackdrop(this,'title');
    addParticles(this,'gold',28);

    const vignette=this.add.rectangle(800,450,1600,900,0x02050c,.10);
    const newJourney=this.hotspot(350,560,390,72,()=>{
      reset();audio.awaken();this.scene.start('Prologue');
    });
    const continueBtn=this.hotspot(350,648,390,58,()=>{
      audio.awaken();
      this.scene.start(state.prologue>=11?'Hub':'Prologue');
    });
    this.hotspot(350,730,390,58,()=>this.popup('SETTINGS','Audio and accessibility controls are being moved into the in-world system menu. For now, your campaign saves automatically on this device.'));
    this.hotspot(350,810,390,58,()=>this.popup('CREDITS','Ascendant is being built as a living real-life RPG with Phaser, original game systems, generated production art, and your campaign state at the center.'));

    if(!state.prologue){
      continueBtn.setAlpha(.03);
    }
    this.add.text(1510,860,'v0.4 production-art pass',{
      fontFamily:'Arial',fontSize:'11px',color:'#dfe7f5',backgroundColor:'#07101faa',padding:{x:8,y:5}
    }).setOrigin(1,1);

    this.cameras.main.fadeIn(650,0,0,0);
  }
  hotspot(x,y,w,h,fn){
    const r=this.add.rectangle(x,y,w,h,0xffd36f,.001).setInteractive({useHandCursor:true});
    r.on('pointerover',()=>r.setFillStyle(0xffd36f,.10))
      .on('pointerout',()=>r.setFillStyle(0xffd36f,.001))
      .on('pointerdown',()=>{audio.click();fn()});
    return r;
  }
  popup(title,text){
    const shade=this.add.rectangle(800,450,1600,900,0x02050b,.74).setInteractive();
    const panel=this.add.rectangle(800,470,760,340,0x07101f,.97).setStrokeStyle(2,0xe2c36f,.42);
    const h=this.add.text(470,360,title,{fontFamily:'Georgia',fontSize:'40px',fontStyle:'bold',color:'#fff0bf'});
    const b=this.add.text(470,430,text,{fontFamily:'Georgia',fontSize:'21px',lineSpacing:8,color:'#dce4f1',wordWrap:{width:650}});
    const close=this.add.text(800,590,'CLOSE',{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',color:'#25190d',backgroundColor:'#efbd5f',padding:{x:28,y:12}}).setOrigin(.5).setInteractive({useHandCursor:true});
    close.on('pointerdown',()=>{shade.destroy();panel.destroy();h.destroy();b.destroy();close.destroy()});
  }
}
