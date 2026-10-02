import Phaser from 'phaser';
import { state } from '../state.js';
import { COMPANIONS } from '../lore.js';
import { preloadArt,addBackdrop } from '../art.js';
import { audio } from '../audio.js';

export class PartyScene extends Phaser.Scene{
  constructor(){super('Party')}
  preload(){preloadArt(this)}
  create(){
    addBackdrop(this,'party');
    this.dynamicPill();

    this.card(1135,820,155,245,'kaia');
    this.card(1290,820,155,245,'milo');
    this.card(1450,820,155,245,'seren');

    this.hotspot(110,55,170,85,()=>this.scene.start('Hub'));
    this.cameras.main.fadeIn(350,0,0,0);
  }
  dynamicPill(){
    this.add.rectangle(1440,45,255,48,0x06101d,.82).setStrokeStyle(1,0xffd77a,.2);
    this.add.text(1340,33,`LV ${state.level}`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(1415,33,`HEART ${state.heart}%`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#82e8df'});
  }
  card(x,y,w,h,id){
    const r=this.add.rectangle(x,y,w,h,0xffd36f,.001).setInteractive({useHandCursor:true});
    r.on('pointerover',()=>r.setFillStyle(COMPANIONS[id].accent,.09))
      .on('pointerout',()=>r.setFillStyle(0xffd36f,.001))
      .on('pointerdown',()=>{audio.click();this.banter(id)});
  }
  hotspot(x,y,w,h,fn){
    const r=this.add.rectangle(x,y,w,h,0xffd36f,.001).setInteractive({useHandCursor:true});
    r.on('pointerdown',fn);
  }
  banter(id){
    const c=COMPANIONS[id];
    const shade=this.add.rectangle(800,450,1600,900,0x02050b,.70).setInteractive();
    const panel=this.add.rectangle(800,525,900,300,0x07101f,.97).setStrokeStyle(2,c.accent,.45);
    const name=this.add.text(405,420,c.name,{fontFamily:'Georgia',fontSize:'38px',fontStyle:'bold',color:'#fff0bf'});
    const line=Phaser.Utils.Array.GetRandom(c.banter);
    const text=this.add.text(405,485,line,{fontFamily:'Georgia',fontSize:'25px',fontStyle:'italic',lineSpacing:8,color:'#dce5f2',wordWrap:{width:760}});
    const bond=this.add.text(405,620,`BOND ${state.bonds[id]||0}%`,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',letterSpacing:3,color:'#f2c66f'});
    const close=this.add.text(1160,650,'CLOSE',{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:'#25190d',backgroundColor:'#efbd5f',padding:{x:22,y:10}}).setInteractive({useHandCursor:true});
    close.on('pointerdown',()=>{shade.destroy();panel.destroy();name.destroy();text.destroy();bond.destroy();close.destroy()});
  }
}
