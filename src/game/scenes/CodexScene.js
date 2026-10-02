import Phaser from 'phaser';
import { state } from '../state.js';
import { CODEX } from '../lore.js';
import { preloadArt,defineFrames,addBackdrop } from '../art.js';
import { panel,topBar,nav } from '../ui.js';
import { audio } from '../audio.js';

export class CodexScene extends Phaser.Scene{
  constructor(){super('Codex')}
  preload(){preloadArt(this)}
  create(){
    defineFrames(this);addBackdrop(this,'prologue');this.add.rectangle(800,450,1600,900,0x02050c,.72);
    topBar(this,state,'THE LIVING CHRONICLE','Recovered history, creatures, relics, and roads');nav(this,'Codex');
    panel(this,800,455,1390,650,.94);
    this.add.text(145,160,'ARCHIVE INDEX',{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
    let y=205;
    CODEX.forEach(([title,text],i)=>{
      const t=this.add.text(145,y,title,{fontFamily:'Georgia',fontSize:'19px',fontStyle:'bold',color:i===0?'#fff0bf':'#aebcd0'}).setInteractive({useHandCursor:true});
      t.on('pointerdown',()=>{audio.click();this.showEntry(title,text)});
      y+=62;
    });
    this.add.rectangle(490,470,2,540,0xffffff,.08);
    this.entryTitle=this.add.text(555,190,CODEX[0][0],{fontFamily:'Georgia',fontSize:'42px',fontStyle:'bold',color:'#fff0bf'});
    this.entryText=this.add.text(555,265,CODEX[0][1],{fontFamily:'Georgia',fontSize:'22px',lineSpacing:9,color:'#d8e1ef',wordWrap:{width:810}});
    this.add.text(555,690,'CAPTAIN’S LOG',{fontFamily:'Arial',fontSize:'12px',fontStyle:'bold',letterSpacing:3,color:'#78dfd2'});
    const log=state.journal.slice(0,3).map(x=>'✦ '+x.text).join('\n\n')||'No entries yet. The Chronicle waits for your first completed Road.';
    this.add.text(555,725,log,{fontFamily:'Arial',fontSize:'13px',lineSpacing:5,color:'#aebbd0',wordWrap:{width:800}});
  }
  showEntry(title,text){this.entryTitle.setText(title);this.entryText.setText(text)}
}
