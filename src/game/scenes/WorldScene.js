import Phaser from 'phaser';
import { state } from '../state.js';
import { REGIONS } from '../lore.js';
import { preloadArt,defineFrames,addBackdrop,addParticles } from '../art.js';
import { panel,topBar,nav } from '../ui.js';
import { audio } from '../audio.js';

export class WorldScene extends Phaser.Scene{
  constructor(){super('World')}
  preload(){preloadArt(this)}
  create(){
    defineFrames(this);addBackdrop(this,'world');this.add.rectangle(800,450,1600,900,0x06101d,.20);addParticles(this,'teal',30);
    topBar(this,state,'THE LIVING MAP','Roads appear when possibility becomes real');nav(this,'World');
    panel(this,325,460,520,660,.88);
    this.add.text(85,160,'THE BROKEN ROADS',{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
    this.add.text(85,198,'Choose a horizon',{fontFamily:'Georgia',fontSize:'39px',fontStyle:'bold',color:'#fff0bf'});
    this.add.text(85,258,'The map is not geography. It is a record of what the Wayfarer can currently reach.',{fontFamily:'Georgia',fontSize:'18px',lineSpacing:6,color:'#cbd6e6',wordWrap:{width:430}});
    let y=340;
    REGIONS.forEach((r,i)=>{
      const unlocked=state.unlockedRegions.includes(r.id);
      const row=this.add.rectangle(325,y,440,88,unlocked?0x15304b:0x101623,.94).setStrokeStyle(1,unlocked?0xe3c26b:0x667080,.4);
      this.add.text(125,y-28,r.tag,{fontFamily:'Arial',fontSize:'10px',fontStyle:'bold',letterSpacing:2,color:unlocked?'#79dfd2':'#626b79'});
      this.add.text(125,y-7,r.name,{fontFamily:'Georgia',fontSize:'21px',fontStyle:'bold',color:unlocked?'#fff0bf':'#6d7582'});
      this.add.text(125,y+20,r.desc,{fontFamily:'Arial',fontSize:'11px',color:unlocked?'#b8c5d6':'#5d6571',wordWrap:{width:360}});
      if(unlocked) row.setInteractive({useHandCursor:true}).on('pointerdown',()=>{audio.chime();this.scene.start('Adventure',{region:r.id})});
      y+=105;
    });
    const nodes=[
      {x:865,y:650,label:'WAYFARER',active:true},
      {x:1005,y:545,label:'AMBER HIGHLANDS',active:true},
      {x:1190,y:425,label:'LUMENWOOD',active:false},
      {x:1335,y:305,label:'GLASS EXPANSE',active:false}
    ];
    const g=this.add.graphics();g.lineStyle(4,0xffd77c,.45);g.beginPath();g.moveTo(nodes[0].x,nodes[0].y);nodes.slice(1).forEach(n=>g.lineTo(n.x,n.y));g.strokePath();
    nodes.forEach((n,i)=>{
      const ring=this.add.circle(n.x,n.y,n.active?28:21,n.active?0x183c57:0x17202c,.96).setStrokeStyle(3,n.active?0xffd477:0x5d6775,.8);
      if(i===1)ring.setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('Adventure',{region:'amber'}));
      this.add.text(n.x,n.y,i===0?'✦':i===1?'◆':'◇',{fontFamily:'Arial',fontSize:'22px',color:n.active?'#fff0bf':'#738093'}).setOrigin(.5);
      this.add.text(n.x,n.y+39,n.label,{fontFamily:'Arial',fontSize:'11px',fontStyle:'bold',color:n.active?'#f7e9ba':'#758093',backgroundColor:'#08101fcc',padding:{x:7,y:4}}).setOrigin(.5);
      if(n.active)this.tweens.add({targets:ring,scale:1.15,alpha:.7,duration:1500+i*300,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    });
    this.cameras.main.fadeIn(450,0,0,0);
  }
}
