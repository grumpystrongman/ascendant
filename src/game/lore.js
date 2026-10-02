export const WORLD = {
  age: 'The Age of Broken Roads',
  premise: `Long ago, the Roads were more than paths. They were living currents that answered intention — bridges between what people were and what they might become. Then the Quiet came. The Roads fractured. Whole regions drifted apart, and things born from hesitation, exhaustion and abandoned purpose learned to feed in the gaps.`,
  wayfarer: `The Wayfarer is one of the last Roadships: a vessel built around a relic called the Crystal Heart. A Roadship does not burn fuel. It moves when someone aboard turns intention into action. Most of that knowledge has been lost.`,
  player: `You are not a chosen savior. The Heart answered you because you acted when it was easier not to. That makes you a Sparkbearer — someone whose real choices can wake dead Roads.`
};

export const COMPANIONS = {
  kaia: {
    name:'Kaia Vale', title:'Pathfinder of the Living Map', portrait:'kaia',
    intro:`Kaia is the Wayfarer's acting navigator. She trusts routes, evidence and people who show up. The parchment strapped to her arm is alive; its roads redraw themselves whenever a choice changes what is possible.`,
    line:`“I don't need a prophecy. Give me one real step and I can find us a road.”`
  },
  milo: {
    name:'Milo Renn', title:'Scout, Salvager, Professional Bad Influence', portrait:'milo',
    intro:`Milo grew up among floating salvage colonies and can open almost anything except a serious conversation. His companion Flick is a tiny shapeshifting spirit that steals buttons, keys and occasionally important magical components.`,
    line:`“For the record, I had a plan. It just became more exciting than expected.”`
  },
  seren: {
    name:'Seren Ash', title:'Echo Mage of Unfinished Things', portrait:'seren',
    intro:`Seren hears emotional residue the way others hear music. Unfinished promises, avoided conversations and abandoned ambitions leave echoes. She joined the Wayfarer because the Crystal Heart contains an echo older than any living Road.`,
    line:`“The Heart is not asking whether you're ready. It's listening for whether you move.”`
  }
};

export const PROLOGUE = [
  {kind:'narration', title:'THE AGE OF BROKEN ROADS', text:WORLD.premise},
  {kind:'narration', title:'THE LAST ROADSHIP', text:WORLD.wayfarer},
  {kind:'companion', who:'kaia'},
  {kind:'companion', who:'milo'},
  {kind:'companion', who:'seren'},
  {kind:'narration', title:'SILENT DRIFT', text:`Three days after taking you aboard, the Wayfarer loses every Road at once. The sails go dark. The living map turns blank. Below the cloud deck, something enormous begins pulling the ship down.`},
  {kind:'dialogue', who:'kaia', text:`“Altitude's collapsing. Milo, port wing. Seren — tell me the Heart isn't dead.”`},
  {kind:'dialogue', who:'milo', text:`“Good news: the port wing is still attached. Bad news: apparently that was the good news.”`},
  {kind:'dialogue', who:'seren', text:`“The Heart is alive. Barely. But it isn't answering us.”`},
  {kind:'narration', title:'THE FIRST SPARK', text:`Then the crystal answers a presence it has never known before: yours. Not because you are special. Because, at this exact moment, you can choose one small action and make it real.`},
  {kind:'spark'}
];

export const QUESTS = [
  {id:'road', title:'Open the Road', kind:'MAIN', reality:'Spend 20 focused minutes on the action that most moves your primary goal.', tiny:'Open the work and stay with it for 2 minutes.', minutes:20, xp:35, target:'wraith'},
  {id:'ridge', title:'Walk the Amber Ridge', kind:'SIDE', reality:'Move your body for 15 minutes in a way that fits today.', tiny:'Stand and move for 60 seconds.', minutes:15, xp:28, target:'drift'},
  {id:'signal', title:'Signal the Fellowship', kind:'SIDE', reality:'Reach out to one person you value.', tiny:'Send one warm sentence.', minutes:5, xp:20, target:'drift'},
  {id:'door', title:'Face the Unfinished Door', kind:'HIGH STAKES', reality:'Do the task you have been avoiding most.', tiny:'Write the very next action.', minutes:35, xp:65, target:'wraith'}
];
