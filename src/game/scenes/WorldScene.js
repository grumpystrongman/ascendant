import Phaser from 'phaser';
import { state } from '../state.js';
import { preloadArt,addBackdrop,addParticles } from '../art.js';
import { audio } from '../audio.js';

export class WorldScene extends Phaser.Scene{
  constructor(){super('World')}
  preload(){preloadArt(this)}
  create(){
    addBackdrop(this,'world');
    addParticles(this,'teal',16);
    this.dynamicPill();

    this.hotspot(430,495,420,120,()=>this.scene.start('Adventure',{region:'amber'}));
    this.hotspot(430,315,390,105,()=>this.locked('Frostspire Peaks'));
    this.hotspot(1180,515,400,110,()=>this.locked('Verdant Expanse'));
    this.hotspot(1320,300,430,110,()=>this.locked('The Hollow Expanse'));
    this.hotspot(1240,690,420,110,()=>this.locked('The Silent Rift'));

    this.hotspot(350,835,165,90,()=>{});
    this.hotspot(585,835,165,90,()=>this.scene.start('Hub'));
    this.hotspot(810,835,165,90,()=>this.scene.start('Party'));
    this.hotspot(1030,835,165,90,()=>this.scene.start('Codex'));
    this.hotspot(1250,835,165,90,()=>this.scene.start('Adventure'));

    this.cameras.main.fadeIn(420,0,0,0);
  }
  dynamicPill(){
    this.add.rectangle(1390,50,320,48,0x06101d,.80).setStrokeStyle(1,0xffd77a,.22);
    this.add.text(1250,38,`LV ${state.level}`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(1330,38,`◉ ${state.coins}`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#f2d07a'});
    this.add.text(1430,38,`✦ ${state.shards}`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#b8a8ff'});
  }
  hotspot(x,y,w,h,fn){
    const r=this.add.rectangle(x,y,w,h,0xffd36f,.001).setInteractive({useHandCursor:true});
    r.on('pointerover',()=>r.setFillStyle(0xffd36f,.08))
      .on('pointerout',()=>r.setFillStyle(0xffd36f,.001))
      .on('pointerdown',()=>{audio.click();fn()});
  }
  locked(name){
    const shade=this.add.rectangle(800,450,1600,900,0x02050b,.64).setInteractive();
    const panel=this.add.rectangle(800,470,720,280,0x07101f,.97).setStrokeStyle(2,0xdcc16e,.35);
    const title=this.add.text(800,395,name,{fontFamily:'Georgia',fontSize:'38px',fontStyle:'bold',color:'#fff0bf'}).setOrigin(.5);
    const body=this.add.text(800,465,'This Road has not awakened yet. Restore more of the Wayfarer and advance the Amber Highlands to reveal it.',{fontFamily:'Georgia',fontSize:'20px',align:'center',lineSpacing:8,color:'#dce4f1',wordWrap:{width:590}}).setOrigin(.5);
    const close=this.add.text(800,570,'RETURN TO MAP',{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:'#25190d',backgroundColor:'#efbd5f',padding:{x:24,y:11}}).setOrigin(.5).setInteractive({useHandCursor:true});
    close.on('pointerdown',()=>{shade.destroy();panel.destroy();title.destroy();body.destroy();close.destroy()});
  }
}
