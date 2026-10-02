import Phaser from 'phaser';
import { state } from '../state.js';
import { ROOMS,COMPANIONS } from '../lore.js';
import { preloadArt,defineFrames,addBackdrop,addPortrait,addParticles } from '../art.js';
import { panel,goldButton,topBar,nav,heading } from '../ui.js';
import { audio } from '../audio.js';

export class HubScene extends Phaser.Scene{
  constructor(){super('Hub')}
  preload(){preloadArt(this)}
  create(){
    defineFrames(this);addBackdrop(this,'ship');this.add.rectangle(800,450,1600,900,0x050812,.26);addParticles(this,'gold',26);
    topBar(this,state,'THE WAYFARER','A home that remembers what you restore');nav(this,'Hub');
    const core=this.add.circle(807,520,64,0x76ead9,.20).setBlendMode('ADD');
    this.tweens.add({targets:core,scale:1.55,alpha:.04,duration:2200,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    panel(this,1265,360,560,520,.88);
    heading(this,1020,145,'GROWING HOME','The Wayfarer',`The Crystal Heart is awake at ${state.heart}%. Every real action restores more of the ship — and reveals more of what it used to be.`,465);
    this.add.text(1020,305,'RESTORED SPACES',{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',letterSpacing:3,color:'#78dfd2'});
    let y=340;
    ROOMS.forEach(r=>{
      const unlocked=state.unlockedRooms.includes(r.id);
      const row=this.add.rectangle(1260,y,470,58,unlocked?0x132943:0x111723,unlocked?.92:.72).setStrokeStyle(1,unlocked?0x84d9d0:0x667080,.32);
      this.add.text(1045,y-10,unlocked?r.name:'SEALED · '+r.name,{fontFamily:'Georgia',fontSize:'18px',fontStyle:'bold',color:unlocked?'#fff0bf':'#758095'});
      this.add.text(1045,y+13,unlocked?r.desc:'The Heart has not remembered this room yet.',{fontFamily:'Arial',fontSize:'11px',color:unlocked?'#b8c6d9':'#646d7a',wordWrap:{width:400}});
      if(unlocked)row.setInteractive({useHandCursor:true}).on('pointerdown',()=>{audio.click();this.showRoom(r)});
      y+=68;
    });
    goldButton(this,1260,700,330,'OPEN THE LIVING MAP',()=>{audio.chime();this.scene.start('World')});
    this.add.text(110,685,'THE WAYFARERS',{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
    ['kaia','milo','seren'].forEach((id,i)=>{
      const c=COMPANIONS[id],x=175+i*245;
      const p=addPortrait(this,id,x,755,235);p.setAlpha(.92).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('Party',{focus:id}));
      this.add.text(x,815,c.name.split(' ')[0],{fontFamily:'Georgia',fontSize:'18px',fontStyle:'bold',color:'#fff0bf'}).setOrigin(.5);
    });
    this.cameras.main.fadeIn(500,0,0,0);
  }
  showRoom(room){
    const o=this.add.rectangle(800,450,1600,900,0x02050b,.72).setInteractive();
    panel(this,800,450,760,360,.97);
    this.add.text(470,315,room.name.toUpperCase(),{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
    this.add.text(470,355,room.name,{fontFamily:'Georgia',fontSize:'40px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(470,420,room.desc,{fontFamily:'Georgia',fontSize:'22px',lineSpacing:7,color:'#dbe4f2',wordWrap:{width:650}});
    goldButton(this,800,555,220,'RETURN TO DECK',()=>{audio.click();this.scene.restart()});
  }
}
