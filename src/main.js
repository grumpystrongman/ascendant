import Phaser from 'phaser';
import './styles.css';
import { TitleScene } from './game/scenes/TitleScene.js';
import { PrologueScene } from './game/scenes/PrologueScene.js';
import { AdventureScene } from './game/scenes/AdventureScene.js';

const config={
  type:Phaser.AUTO,
  parent:'game-root',
  width:1600,
  height:900,
  backgroundColor:'#070b14',
  scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
  render:{antialias:true,pixelArt:false},
  scene:[TitleScene,PrologueScene,AdventureScene]
};
new Phaser.Game(config);
