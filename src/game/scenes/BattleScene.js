import Phaser from 'phaser';
import { state } from '../state.js';
import { preloadArt,addBackdrop,addParticles } from '../art.js';
import { audio } from '../audio.js';

export class BattleScene extends Phaser.Scene{
  constructor(){super('Battle')}
  preload(){preloadArt(this)}
  create(data={}){
    this.result=data.result||{q:{title:'A Real Action',xp:0},damage:0,target:'wraith',hp:state.enemy.wraith};
    addBackdrop(this,'battle');
    addParticles(this,'gold',22);

    this.add.text(800,82,this.result.q.title,{fontFamily:'Georgia',fontSize:'34px',fontStyle:'bold',color:'#fff0bf',stroke:'#02040a',strokeThickness:7}).setOrigin(.5);
    this.time.delayedCall(380,()=>this.attack());
    this.cameras.main.fadeIn(320,0,0,0);
  }
  attack(){
    audio.slash();
    this.cameras.main.shake(500,.012);
    this.cameras.main.flash(170,255,225,150);
    for(let i=0;i<5;i++){
      const slash=this.add.rectangle(920+i*35,430-i*22,620,11,0xffefb0,.92).setRotation(-.55+i*.05).setBlendMode('ADD');
      this.tweens.add({targets:slash,scaleX:.03,alpha:0,duration:430+i*65,onComplete:()=>slash.destroy()});
    }
    const dmg=this.add.text(1080,310,`-${this.result.damage}`,{fontFamily:'Arial',fontSize:'96px',fontStyle:'bold',color:'#ff8c85',stroke:'#311017',strokeThickness:10}).setOrigin(.5);
    this.tweens.add({targets:dmg,y:230,alpha:0,duration:1250,ease:'Cubic.out'});
    this.time.delayedCall(1050,()=>this.victory());
  }
  victory(){
    audio.victory();
    this.children.removeAll(true);
    addBackdrop(this,'victory');
    addParticles(this,'gold',28);

    this.add.rectangle(1230,465,560,430,0x07101f,.84).setStrokeStyle(2,0xe0be68,.36);
    this.add.text(995,310,'QUEST COMPLETE',{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
    this.add.text(995,345,this.result.q.title,{fontFamily:'Georgia',fontSize:'34px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(995,405,`✓ Real-world action logged\n✓ ${this.result.target==='wraith'?'Hesitation Wraith':'Driftlings'} weakened\n✓ Crystal Heart restored`,{fontFamily:'Georgia',fontSize:'19px',lineSpacing:10,color:'#dce5f2'});
    this.add.text(995,535,`+${this.result.q.xp} XP    ◉ +${Math.round(this.result.q.xp*.32)}    HEART ${state.heart}%`,{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',color:'#f2c66f'});
    const btn=this.add.rectangle(1250,690,300,62,0xefbd5f,1).setStrokeStyle(2,0xffe3a1,.8).setInteractive({useHandCursor:true});
    this.add.text(1250,690,'CONTINUE',{fontFamily:'Arial',fontSize:'17px',fontStyle:'bold',color:'#25190d'}).setOrigin(.5);
    btn.on('pointerdown',()=>{audio.click();this.scene.start('Hub')});
  }
}
