import Phaser from 'phaser';

export function preloadArt(scene){
  const loadSvg=(key,path,w=1600,h=900)=>{if(!scene.textures.exists(key))scene.load.svg(key,path,{width:w,height:h})};
  loadSvg('artTitle','./art/title.svg');
  loadSvg('artPrologue','./art/prologue.svg');
  loadSvg('artWorld','./art/world-map.svg');
  loadSvg('artShip','./art/ship-interior.svg');
  loadSvg('artSpark','./art/spark-chamber.svg');
  loadSvg('artBattle','./art/battle-arena.svg');
  loadSvg('kaia','./art/kaia.svg',700,900);
  loadSvg('milo','./art/milo.svg',700,900);
  loadSvg('seren','./art/seren.svg',700,900);
  loadSvg('wraith','./art/wraith.svg',500,600);
}
export function defineFrames(){return true}
export function addBackdrop(scene,frame='title',alpha=1){
  const map={title:'artTitle',prologue:'artPrologue',world:'artWorld',ship:'artShip',spark:'artSpark',battle:'artBattle'};
  return scene.add.image(800,450,map[frame]||'artTitle').setDisplaySize(1600,900).setAlpha(alpha);
}
export function addPortrait(scene,id,x,y,height=620){
  const img=scene.add.image(x,y,id);
  img.setScale(height/img.height);
  return img;
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
