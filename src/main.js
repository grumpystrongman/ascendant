import Phaser from 'phaser';
import './styles.css';
import { TitleScene } from './game/scenes/TitleScene.js';
import { PrologueScene } from './game/scenes/PrologueScene.js';
import { HubScene } from './game/scenes/HubScene.js';
import { WorldScene } from './game/scenes/WorldScene.js';
import { AdventureScene } from './game/scenes/AdventureScene.js';
import { BattleScene } from './game/scenes/BattleScene.js';
import { PartyScene } from './game/scenes/PartyScene.js';
import { CodexScene } from './game/scenes/CodexScene.js';

const config={
  type:Phaser.AUTO,
  parent:'game-root',
  width:1600,
  height:900,
  backgroundColor:'#050812',
  scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
  render:{antialias:true,pixelArt:false,roundPixels:false},
  input:{activePointers:2},
  scene:[TitleScene,PrologueScene,HubScene,WorldScene,AdventureScene,BattleScene,PartyScene,CodexScene]
};

new Phaser.Game(config);
