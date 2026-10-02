import Phaser from 'phaser';
import { state } from '../state.js';
import { COMPANIONS } from '../lore.js';
import { preloadArt,defineFrames,addBackdrop,addPortrait } from '../art.js';
import { panel,topBar,nav } from '../ui.js';
import { audio } from '../audio.js';

export class PartyScene extends Phaser.Scene{
  constructor(){super('Party')}
  preload(){preloadArt(this)}
  create(data={}){
    defineFrames(this);addBackdrop(this,'ship');this.add.rectangle(800,450,1600,900,0x030712,.62);
    topBar(this,state,'THE WAYFARERS','Trust changes what the party can do');nav(this,'Party');
    const ids=['kaia','milo','seren'];let focus=data.focus||'kaia';
    ids.forEach((id,i)=>{
      const c=COMPANIONS[id],x=260+i*540;
      panel(this,x,455,455,650,.92);
      const p=addPortrait(this,id,x,325,420);p.setAlpha(.96);
      this.add.text(x,570,c.name,{fontFamily:'Georgia',fontSize:'30px',fontStyle:'bold',color:'#fff0bf'}).setOrigin(.5);
      this.add.text(x,605,c.title,{fontFamily:'Arial',fontSize:'12px',fontStyle:'bold',color:'#bcaaff',wordWrap:{width:360},align:'center'}).setOrigin(.5);
      this.add.text(x,650,c.intro,{fontFamily:'Georgia',fontSize:'15px',lineSpacing:5,color:'#cbd6e6',wordWrap:{width:370},align:'center'}).setOrigin(.5);
      const bond=state.bonds[id]||0;
      this.add.rectangle(x,765,310,8,0x121b2a);this.add.rectangle(x-155,765,310*(bond/100),8,c.accent).setOrigin(0,.5);
      this.add.text(x,790,`BOND ${bond}% · click for banter`,{fontFamily:'Arial',fontSize:'11px',fontStyle:'bold',color:'#93a2b8'}).setOrigin(.5);
      p.setInteractive({useHandCursor:true}).on('pointerdown',()=>{audio.click();const line=Phaser.Utils.Array.GetRandom(c.banter);this.say(c,line)});
    });
    this.cameras.main.fadeIn(350,0,0,0);
  }
  say(c,line){
    panel(this,800,740,920,160,.97);
    this.add.text(390,695,c.name.toUpperCase(),{fontFamily:'Arial',fontSize:'12px',fontStyle:'bold',letterSpacing:3,color:'#78dfd2'});
    this.add.text(390,730,line,{fontFamily:'Georgia',fontSize:'23px',fontStyle:'italic',color:'#fff0bf',wordWrap:{width:800}});
  }
}
