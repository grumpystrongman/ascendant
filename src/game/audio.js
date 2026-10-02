let ctx;
function getCtx(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();return ctx}
function tone(freq,dur=.18,type='sine',gain=.045,delay=0){
  try{const c=getCtx();const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,c.currentTime+delay);g.gain.linearRampToValueAtTime(gain,c.currentTime+delay+.015);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+delay+dur);o.connect(g);g.connect(c.destination);o.start(c.currentTime+delay);o.stop(c.currentTime+delay+dur+.03)}catch{}
}
export const audio={
  awaken(){tone(220,.6,'sine',.04);tone(330,.7,'sine',.04,.08);tone(494,.9,'sine',.035,.16)},
  click(){tone(520,.09,'triangle',.025)},
  chime(){tone(660,.25,'sine',.04);tone(880,.35,'sine',.035,.08)},
  slash(){tone(180,.12,'sawtooth',.035);tone(90,.2,'square',.02,.07)},
  victory(){tone(392,.35,'triangle',.035);tone(523,.4,'triangle',.035,.1);tone(659,.5,'triangle',.035,.2)}
};
