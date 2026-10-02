import Phaser from 'phaser';
import { state } from '../state.js';
import { COMPANIONS } from '../lore.js';
import { preloadArt,defineFrames,addBackdrop,addPortrait,addParticles } from '../art.js';
import { panel,goldButton } from '../ui.js';
import { audio } from '../audio.js';

export class BattleScene extends Phaser.Scene{
  constructor(){super('Battle')}
  preload(){preloadArt(this)}
  create(data={}){
    defineFrames(this);addBackdrop(this,'battle');this.add.rectangle(800,450,1600,900,0x03050b,.20);addParticles(this,'gold',34);
    const result=data.result||{q:{title:'A Real Action',xp:0},damage:0,target:'wraith',hp:state.enemy.wraith};
    this.result=result;
    this.add.text(800,62,'REAL ACTION → WORLD CHANGE',{fontFamily:'Arial',fontSize:'16px',fontStyle:'bold',letterSpacing:5,color:'#8ff0dd',stroke:'#02040a',strokeThickness:5}).setOrigin(.5);
    this.add.text(800,100,result.q.title,{fontFamily:'Georgia',fontSize:'42px',fontStyle:'bold',color:'#fff0bf',stroke:'#02040a',strokeThickness:6}).setOrigin(.5);
    const enemy=this.add.circle(1090,385,118,0x563f77,.28).setBlendMode('ADD');
    this.tweens.add({targets:enemy,scale:1.25,alpha:.08,duration:1400,yoyo:true,repeat:-1});
    this.time.delayedCall(320,()=>this.attack(result));
    panel(this,800,718,1360,250,.91);
    this.add.text(170,626,'THE WAYFARERS',{fontFamily:'Arial',fontSize:'12px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
    ['kaia','milo','seren'].forEach((id,i)=>{
      const c=COMPANIONS[id],x=260+i*230;
      const p=addPortrait(this,id,x,705,205);p.setAlpha(.95);
      this.add.text(x,806,c.name.split(' ')[0],{fontFamily:'Georgia',fontSize:'16px',fontStyle:'bold',color:'#fff0bf'}).setOrigin(.5);
    });
    this.status=this.add.text(850,650,'The Heart gathers the force of what you finished…',{fontFamily:'Georgia',fontSize:'22px',fontStyle:'italic',color:'#dce5f2',wordWrap:{width:600}});
    this.stats=this.add.text(850,728,'',{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',color:'#f2c66f',wordWrap:{width:570}});
    this.continueButton=null;
  }
  attack(result){
    audio.slash();this.cameras.main.shake(420,.013);this.cameras.main.flash(170,255,225,145);
    for(let i=0;i<4;i++){
      const slash=this.add.rectangle(1070+i*18,390-i*18,560,12,0xfff0b5,.9).setRotation(-.58+(.06*i)).setBlendMode('ADD');
      this.tweens.add({targets:slash,scaleX:.04,alpha:0,duration:430+i*80,onComplete:()=>slash.destroy()});
    }
    const dmg=this.add.text(1125,330,`-${result.damage}`,{fontFamily:'Arial',fontSize:'82px',fontStyle:'bold',color:'#ff8c85',stroke:'#341218',strokeThickness:9}).setOrigin(.5);
    this.tweens.add({targets:dmg,y:245,alpha:0,duration:1250,ease:'Cubic.out'});
    this.time.delayedCall(800,()=>this.resolve(result));
  }
  resolve(result){
    const defeated=result.hp<=0; if(defeated)audio.victory(); else audio.chime();
    this.status.setText(defeated?`The ${result.target==='wraith'?'Hesitation Wraith':'Driftlings'} breaks apart. A section of the Road clears.`:`The enemy recoils. The Road brightens where your action landed.`);
    this.stats.setText(`+${result.q.xp} XP    ◉ +${Math.round(result.q.xp*.32)}    HEART ${state.heart}%    ENEMY HP ${result.hp}`);
    goldButton(this,1260,784,260,defeated?'RETURN VICTORIOUS':'CONTINUE THE ROAD',()=>this.scene.start('Adventure'));
  }
}
