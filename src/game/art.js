import Phaser from 'phaser';
import { PRODUCTION_ART } from './production-art.js';

export function preloadArt(scene){
  scene.load.setCORS('anonymous');

  if(!scene.textures.exists('productionBoard')) scene.load.image('productionBoard',PRODUCTION_ART.board);
  if(!scene.textures.exists('kaiaIntro')) scene.load.image('kaiaIntro',PRODUCTION_ART.kaiaIntro);
  if(!scene.textures.exists('kaiaKey')) scene.load.image('kaiaKey',PRODUCTION_ART.kaiaKey);
  if(!scene.textures.exists('skyshipSunset')) scene.load.image('skyshipSunset',PRODUCTION_ART.skyshipSunset);

  const loadSvg=(key,path,w=1600,h=900)=>{if(!scene.textures.exists(key))scene.load.svg(key,path,{width:w,height:h})};
  loadSvg('artSpark','./art/spark-chamber.svg');
  loadSvg('wraith','./art/wraith.svg',500,600);
}
export function defineFrames(scene){
  const t=scene.textures.get('productionBoard');
  if(!t||t.key==='__MISSING')return false;
  for(const [name,[x,y,w,h]] of Object.entries(PRODUCTION_ART.frames)){
    const key='prod_'+name;
    if(!t.has(key))t.add(key,0,x,y,w,h);
  }
  return true;
}
export function addBackdrop(scene,frame='title',alpha=1){
  defineFrames(scene);
  if(frame==='spark') return scene.add.image(800,450,'artSpark').setDisplaySize(1600,900).setAlpha(alpha);
  const key='prod_'+frame;
  const texture=scene.textures.get('productionBoard');
  if(texture?.has?.(key)){
    return scene.add.image(800,450,'productionBoard',key).setDisplaySize(1600,900).setAlpha(alpha);
  }
  return scene.add.image(800,450,'skyshipSunset').setDisplaySize(1600,900).setAlpha(alpha);
}
export function addPortrait(scene,id,x,y,height=620){
  defineFrames(scene);
  if(id==='kaia'&&scene.textures.exists('kaiaKey')){
    const img=scene.add.image(x,y,'kaiaKey');
    img.setScale(height/img.height);
    return img;
  }
  const frameMap={milo:'prod_miloPortrait',seren:'prod_serenPortrait',kaia:'prod_kaiaPortrait'};
  const frame=frameMap[id];
  if(frame&&scene.textures.get('productionBoard')?.has?.(frame)){
    const img=scene.add.image(x,y,'productionBoard',frame);
    img.setScale(height/img.height);
    return img;
  }
  const fallback=scene.add.rectangle(x,y,height*.58,height,0x182238,.9).setStrokeStyle(2,0xd4b76c,.35);
  return fallback;
}
export function addParticles(scene,kind='gold',count=42){
  const color=kind==='teal'?0x78f1df:0xffdfa3;
  for(let i=0;i<count;i++){
    const p=scene.add.circle(
      Phaser.Math.Between(0,1600),Phaser.Math.Between(0,900),Phaser.Math.Between(1,3),
      color,Phaser.Math.FloatBetween(.08,.34)
    ).setBlendMode('ADD');
    scene.tweens.add({
      targets:p,
      y:p.y-Phaser.Math.Between(90,280),
      x:p.x+Phaser.Math.Between(-60,80),
      alpha:0,
      duration:Phaser.Math.Between(5000,12000),
      repeat:-1,
      onRepeat:()=>{p.y=940;p.x=Phaser.Math.Between(0,1600);p.alpha=Phaser.Math.FloatBetween(.08,.34)}
    });
  }
}
