import Phaser from 'phaser';
import { state } from '../state.js';
import { preloadArt,addBackdrop,addParticles } from '../art.js';
import { audio } from '../audio.js';

export class HubScene extends Phaser.Scene{
  constructor(){super('Hub')}
  preload(){preloadArt(this)}
  create(){
    addBackdrop(this,'ship');
    addParticles(this,'gold',18);

    const glow=this.add.circle(825,285,92,0x77e7ff,.12).setBlendMode('ADD');
    this.tweens.add({targets:glow,scale:{from:.92,to:1.28},alpha:{from:.05,to:.18},duration:2200,yoyo:true,repeat:-1,ease:'Sine.inOut'});

    this.dynamicPill();

    this.hotspot(320,470,330,250,()=>this.scene.start('Party',{focus:'kaia'}));
    this.hotspot(1330,470,330,240,()=>this.scene.start('Codex'));
    this.hotspot(1310,665,360,220,()=>this.scene.start('Party',{focus:'milo'}));
    this.hotspot(825,300,320,320,()=>this.heartPopup());

    this.hotspot(300,835,170,90,()=>this.scene.start('World'));
    this.hotspot(535,835,170,90,()=>{});
    this.hotspot(770,835,170,90,()=>this.scene.start('Party'));
    this.hotspot(1010,835,170,90,()=>this.scene.start('Codex'));
    this.hotspot(1245,835,170,90,()=>this.scene.start('Adventure'));

    this.cameras.main.fadeIn(450,0,0,0);
  }
  dynamicPill(){
    this.add.rectangle(1385,42,335,52,0x06101d,.82).setStrokeStyle(1,0xffd77a,.24);
    this.add.text(1235,29,`LV ${state.level}`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(1310,29,`HEART ${state.heart}%`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#82e8df'});
    this.add.text(1430,29,`◉ ${state.coins}   ✦ ${state.shards}`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#edf3fb'});
  }
  hotspot(x,y,w,h,fn){
    const r=this.add.rectangle(x,y,w,h,0xffd36f,.001).setInteractive({useHandCursor:true});
    r.on('pointerover',()=>r.setFillStyle(0xffd36f,.08))
      .on('pointerout',()=>r.setFillStyle(0xffd36f,.001))
      .on('pointerdown',()=>{audio.click();fn()});
    return r;
  }
  heartPopup(){
    audio.awaken();
    const shade=this.add.rectangle(800,450,1600,900,0x02050b,.70).setInteractive();
    const panel=this.add.rectangle(800,465,780,350,0x07101f,.97).setStrokeStyle(2,0x85e5dc,.5);
    const title=this.add.text(455,350,'THE CRYSTAL HEART',{fontFamily:'Georgia',fontSize:'42px',fontStyle:'bold',color:'#fff0bf'});
    const body=this.add.text(455,420,`Awakening: ${state.heart}%\n\nEvery completed real-world quest restores the Heart. At higher restoration levels, the Wayfarer remembers sealed rooms, lost systems, and new Roads.`,{fontFamily:'Georgia',fontSize:'21px',lineSpacing:8,color:'#dce5f2',wordWrap:{width:690}});
    const close=this.add.text(800,585,'RETURN TO DECK',{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',color:'#25190d',backgroundColor:'#efbd5f',padding:{x:26,y:12}}).setOrigin(.5).setInteractive({useHandCursor:true});
    close.on('pointerdown',()=>{shade.destroy();panel.destroy();title.destroy();body.destroy();close.destroy()});
  }
}
