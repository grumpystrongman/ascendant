import Phaser from 'phaser';
import { state, reset } from '../state.js';

export class TitleScene extends Phaser.Scene{
  constructor(){super('Title')}
  preload(){this.load.svg('title','./art/title.svg',{width:1600,height:900})}
  create(){
    this.add.image(800,450,'title');
    const glow=this.add.circle(805,560,110,0x86f5e2,.13).setBlendMode('ADD');
    this.tweens.add({targets:glow,scale:1.35,alpha:.03,duration:3000,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    for(let i=0;i<50;i++){
      const s=this.add.circle(Phaser.Math.Between(0,1600),Phaser.Math.Between(0,900),Phaser.Math.Between(1,3),0xffffff,Phaser.Math.FloatBetween(.15,.65));
      this.tweens.add({targets:s,y:s.y-Phaser.Math.Between(80,240),x:s.x+Phaser.Math.Between(-30,30),alpha:0,duration:Phaser.Math.Between(5000,11000),repeat:-1,onRepeat:()=>{s.y=920;s.x=Phaser.Math.Between(0,1600);s.alpha=Phaser.Math.FloatBetween(.15,.65)}})
    }
    const title=this.add.text(800,180,'ASCENDANT',{fontFamily:'Georgia',fontSize:'108px',fontStyle:'bold',color:'#fff2c0',stroke:'#251c37',strokeThickness:8}).setOrigin(.5);
    this.tweens.add({targets:title,letterSpacing:8,duration:2500,ease:'Sine.out'});
    this.add.text(800,267,'THE REAL-LIFE RPG',{fontFamily:'Arial',fontSize:'21px',fontStyle:'bold',letterSpacing:9,color:'#8ff0dd'}).setOrigin(.5);
    this.add.text(800,650,'The Roads are broken. The Wayfarer is dying.\nOne real action can wake the world again.',{fontFamily:'Georgia',fontSize:'29px',align:'center',lineSpacing:10,color:'#e9edf8',stroke:'#050814',strokeThickness:5}).setOrigin(.5);
    this.makeButton(800,760,state.prologue>0?'CONTINUE THE JOURNEY':'ENTER THE PROLOGUE',()=>this.scene.start(state.prologue>=11?'Adventure':'Prologue'));
    if(state.prologue>0)this.add.text(800,820,'New Journey',{fontFamily:'Arial',fontSize:'16px',color:'#b8c2d9'}).setOrigin(.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>{reset();this.scene.restart()});
    this.cameras.main.fadeIn(1200,0,0,0);
  }
  makeButton(x,y,text,fn){
    const bg=this.add.rectangle(x,y,360,66,0xf0bf61,1).setStrokeStyle(2,0xffe7a6).setInteractive({useHandCursor:true});
    const t=this.add.text(x,y,text,{fontFamily:'Arial',fontSize:'20px',fontStyle:'bold',color:'#21170c'}).setOrigin(.5);
    bg.on('pointerover',()=>this.tweens.add({targets:[bg,t],scale:1.04,duration:120}))
      .on('pointerout',()=>this.tweens.add({targets:[bg,t],scale:1,duration:120}))
      .on('pointerdown',fn);
  }
}
