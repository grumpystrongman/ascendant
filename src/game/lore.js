export const WORLD={
  age:'The Age of Broken Roads',
  premise:`Long ago, the Roads were living currents between intention and possibility. Cities sailed them. Pilgrims crossed impossible distances in a single night. Then came the Quiet: a slow catastrophe that taught abandoned intentions to become hungry things. The Roads fractured, sky-realms drifted apart, and old Roadships went dark.`,
  wayfarer:`The Wayfarer is one of the last Roadships. Beneath its timber decks sleeps a machine older than any kingdom aboard it: the Crystal Heart. It does not burn fuel. It wakes when intention becomes action.`,
  player:`The Heart answers you because you act. That makes you a Sparkbearer — not a chosen savior, but someone able to turn ordinary real-world movement into power the Roads can recognize.`,
  quiet:`The Quiet is not a person. It is pressure: delay, exhaustion, fear, and abandoned possibility given shape. Its creatures grow in the space between wanting and doing.`
};

export const COMPANIONS={
  kaia:{name:'Kaia Vale',title:'Pathfinder of the Living Map',portrait:'kaia',accent:0x73e2d4,bond:0,
    intro:`Kaia is the Wayfarer's acting navigator. She trusts evidence, routes, and people who show up. The parchment wrapped around her left arm is alive; it redraws itself every time a real choice changes what is possible.`,
    line:`“I don't need a prophecy. Give me one real step and I can find us a road.”`,
    banter:['You move, I map. Simple deal.','That route did not exist yesterday. You made it exist.','A smaller step is still a step. Maps care about direction, not pride.']},
  milo:{name:'Milo Renn',title:'Scout, Salvager, Professional Bad Influence',portrait:'milo',accent:0xf2bd6a,bond:0,
    intro:`Milo grew up in floating salvage colonies and can open almost anything except a serious conversation. His tiny shapeshifting spirit, Flick, steals buttons, keys, and occasionally critical magical components.`,
    line:`“For the record, I had a plan. It just became more exciting than expected.”`,
    banter:['I found three shortcuts. Two are probably safe.','Flick says that counts. Flick is rarely an authority, but still.','Do the tiny version. We can be dramatic afterward.']},
  seren:{name:'Seren Ash',title:'Echo Mage of Unfinished Things',portrait:'seren',accent:0xb8a6ff,bond:0,
    intro:`Seren hears emotional residue the way others hear music. Unfinished promises and abandoned ambitions leave echoes. The Crystal Heart carries an echo older than any Road still remembered.`,
    line:`“The Heart is not asking whether you're ready. It's listening for whether you move.”`,
    banter:['The echo changed. Something you finished is quieter now.','You do not have to feel brave before courage counts.','The Heart is brighter when you keep promises to yourself.']}
};

export const PROLOGUE=[
  {kind:'narration',title:'THE AGE OF BROKEN ROADS',text:WORLD.premise},
  {kind:'narration',title:'THE LAST ROADSHIP',text:WORLD.wayfarer},
  {kind:'companion',who:'kaia'},
  {kind:'companion',who:'milo'},
  {kind:'companion',who:'seren'},
  {kind:'narration',title:'SILENT DRIFT',text:`Three days after taking you aboard, every Road around the Wayfarer vanishes at once. The sails lose their light. Kaia's living map turns blank. Something below the cloud deck begins pulling the ship down.`},
  {kind:'dialogue',who:'kaia',text:`“Altitude's collapsing. Milo, port wing. Seren — tell me the Heart isn't dead.”`},
  {kind:'dialogue',who:'milo',text:`“Good news: the port wing is still attached. Bad news: apparently that was the good news.”`},
  {kind:'dialogue',who:'seren',text:`“The Heart is alive. Barely. But it isn't answering us.”`},
  {kind:'narration',title:'THE FIRST SPARK',text:`Then the crystal answers a presence it has never known before: yours. Not because you are special. Because, at this exact moment, you can choose one small action and make it real.`},
  {kind:'spark'}
];

export const QUESTS=[
  {id:'road',title:'Open the Road',kind:'MAIN',stat:'Focus',reality:'Spend 20 focused minutes on the action that most moves your primary goal.',tiny:'Open the work and stay with it for 2 minutes.',minutes:20,xp:35,target:'wraith'},
  {id:'ridge',title:'Walk the Amber Ridge',kind:'SIDE',stat:'Vitality',reality:'Move your body for 15 minutes in a way that fits today.',tiny:'Stand and move for 60 seconds.',minutes:15,xp:28,target:'drift'},
  {id:'signal',title:'Signal the Fellowship',kind:'SIDE',stat:'Connection',reality:'Reach out to one person you value.',tiny:'Send one warm sentence.',minutes:5,xp:20,target:'drift'},
  {id:'spark',title:'Bank a Small Spark',kind:'MICRO',stat:'Courage',reality:'Do one tiny reset: water, breath, movement, or a written intention.',tiny:'One deliberate breath counts.',minutes:2,xp:14,target:'drift'},
  {id:'door',title:'Face the Unfinished Door',kind:'HIGH STAKES',stat:'Courage',reality:'Do the task you have been avoiding most.',tiny:'Name it and write the very next action.',minutes:35,xp:65,target:'wraith'}
];

export const ROOMS=[
  {id:'bridge',name:'Navigation Bridge',desc:'Kaia keeps the living map here. Routes bloom across glass and brass.'},
  {id:'commons',name:'Wayfarer Commons',desc:'Meals, arguments, bad jokes, and the place the crew becomes a family.'},
  {id:'heart',name:'Crystal Heart',desc:'The engine beneath the ship. It remembers every action that woke it.'},
  {id:'workshop',name:'Milo’s Workshop',desc:'Half salvage bay, half disaster. New relic functions are restored here.'},
  {id:'archive',name:'Echo Archive',desc:'Seren stores recovered memories and unfinished histories.'}
];

export const REGIONS=[
  {id:'amber',name:'The Amber Highlands',tag:'REGION I',desc:'Golden ridges, living ruins, and the first broken Road.',unlocked:true},
  {id:'lumen',name:'Lumenwood',tag:'REGION II',desc:'A luminous forest growing around suspended ruins.',unlocked:false},
  {id:'glass',name:'The Glass Expanse',tag:'REGION III',desc:'A desert of mirrored stone where abandoned futures appear at dusk.',unlocked:false},
  {id:'crown',name:'The Crown Above',tag:'REGION IV',desc:'A drifting citadel wrapped around the remains of an ancient Road gate.',unlocked:false}
];

export const CODEX=[
  ['THE ROADS',WORLD.premise],
  ['THE WAYFARER',WORLD.wayfarer],
  ['SPARKBEARERS',WORLD.player],
  ['THE QUIET',WORLD.quiet],
  ['THE AMBER HIGHLANDS','The Highlands were once a crossroads of five Roads. Their ruins still rearrange when the Crystal Heart wakes nearby.'],
  ['DRIFTLINGS','Small creatures of friction and interruption. Individually annoying. In groups, they can derail an entire expedition.'],
  ['THE HESITATION WRAITH','A larger creature of the Quiet. It feeds on decisions left untouched and becomes less coherent when decisive action is taken.']
];
