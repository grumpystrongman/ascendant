export const C={navy:0x07101f,navy2:0x0e1b31,gold:0xefbd5f,gold2:0xffe09a,teal:0x78dfd2,violet:0xb8a6ff,cream:'#fff0bf',text:'#e5ebf5',muted:'#aebbd0'};
export function panel(scene,x,y,w,h,alpha=.92){
  scene.add.rectangle(x+8,y+10,w,h,0x000000,.28);
  return scene.add.rectangle(x,y,w,h,C.navy,alpha).setStrokeStyle(2,0xd5c27a,.28);
}
export function goldButton(scene,x,y,w,label,fn){
  const bg=scene.add.rectangle(x,y,w,54,C.gold,1).setStrokeStyle(2,C.gold2,.85).setInteractive({useHandCursor:true});
  const tx=scene.add.text(x,y,label,{fontFamily:'Arial',fontSize:'16px',fontStyle:'bold',letterSpacing:.7,color:'#25190d'}).setOrigin(.5);
  bg.on('pointerover',()=>scene.tweens.add({targets:[bg,tx],scale:1.035,duration:100}))
    .on('pointerout',()=>scene.tweens.add({targets:[bg,tx],scale:1,duration:100}))
    .on('pointerdown',fn);
  return [bg,tx];
}
export function ghostButton(scene,x,y,w,label,fn,active=false){
  const bg=scene.add.rectangle(x,y,w,46,active?0x294b65:0x102039,.94).setStrokeStyle(1,active?C.teal:0x7790aa,.45).setInteractive({useHandCursor:true});
  const tx=scene.add.text(x,y,label,{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:active?'#ffffff':'#c8d2e1'}).setOrigin(.5);
  bg.on('pointerdown',fn);
  return [bg,tx];
}
export function topBar(scene,state,title,subtitle=''){
  scene.add.rectangle(800,48,1540,76,0x050b16,.88).setStrokeStyle(1,0xffffff,.12);
  scene.add.text(50,25,title.toUpperCase(),{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
  if(subtitle) scene.add.text(50,48,subtitle,{fontFamily:'Georgia',fontSize:'22px',fontStyle:'bold',color:'#fff0bf'});
  scene.add.text(1510,38,`LV ${state.level}    HEART ${state.heart}%    ✦ ${state.shards}    ◉ ${state.coins}`,{fontFamily:'Arial',fontSize:'15px',fontStyle:'bold',color:'#edf2fb'}).setOrigin(1,.5);
}
export function nav(scene,current){
  const items=[['Hub','SHIP'],['World','WORLD'],['Adventure','QUESTS'],['Party','PARTY'],['Codex','CODEX']];
  const bg=scene.add.rectangle(800,858,720,62,0x050b16,.94).setStrokeStyle(1,0xcbd7e8,.18);
  items.forEach(([key,label],i)=>{
    const x=512+i*144;
    const active=current===key;
    const r=scene.add.rectangle(x,858,132,48,active?0x243c60:0x000000,active?.95:.01).setInteractive({useHandCursor:true});
    scene.add.text(x,858,label,{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',letterSpacing:1.1,color:active?'#fff0bf':'#b8c3d6'}).setOrigin(.5);
    if(!active) r.on('pointerdown',()=>scene.scene.start(key));
  });
  return bg;
}
export function heading(scene,x,y,eyebrow,title,body,width=620){
  scene.add.text(x,y,eyebrow.toUpperCase(),{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',letterSpacing:4,color:'#78dfd2'});
  scene.add.text(x,y+34,title,{fontFamily:'Georgia',fontSize:'42px',fontStyle:'bold',color:'#fff0bf'});
  if(body) scene.add.text(x,y+92,body,{fontFamily:'Georgia',fontSize:'19px',lineSpacing:6,color:'#d8e1ef',wordWrap:{width}});
}
