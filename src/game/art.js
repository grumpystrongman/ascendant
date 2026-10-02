export const ATLAS={w:640,h:360,frames:{
  title:[0,0,213,120], prologue:[213,0,213,120], kaia:[426,0,92,120],
  milo:[0,120,92,120], seren:[213,120,92,120], world:[426,120,214,120],
  ship:[0,240,213,120], spark:[213,240,213,120], battle:[426,240,214,120]
}};
export function preloadArt(scene){
  if(!scene.textures.exists('ascendantArt')) scene.load.image('ascendantArt','./art/ascendant-atlas.jpg');
}
export function defineFrames(scene){
  const t=scene.textures.get('ascendantArt');
  if(!t || t.key==='__MISSING') return false;
  for(const [name,[x,y,w,h]] of Object.entries(ATLAS.frames)){
    if(!t.has(name)) t.add(name,0,x,y,w,h);
  }
  return true;
}
export function addBackdrop(scene,frame='title',alpha=1){
  const img=scene.add.image(800,450,'ascendantArt',frame).setDisplaySize(1600,900).setAlpha(alpha);
  return img;
}
export function addPortrait(scene,id,x,y,height=620){
  const img=scene.add.image(x,y,'ascendantArt',id);
  const scale=height/img.height;
  img.setScale(scale);
  return img;
}
export function addParticles(scene,kind='gold',count=42){
  const color=kind==='teal'?0x78f1df:0xffdfa3;
  for(let i=0;i<count;i++){
    const p=scene.add.circle(Phaser.Math.Between(0,1600),Phaser.Math.Between(0,900),Phaser.Math.Between(1,3),color,Phaser.Math.FloatBetween(.08,.34));
    scene.tweens.add({targets:p,y:p.y-Phaser.Math.Between(90,280),x:p.x+Phaser.Math.Between(-60,80),alpha:0,duration:Phaser.Math.Between(5000,12000),repeat:-1,onRepeat:()=>{p.y=940;p.x=Phaser.Math.Between(0,1600);p.alpha=Phaser.Math.FloatBetween(.08,.34)}});
  }
}
