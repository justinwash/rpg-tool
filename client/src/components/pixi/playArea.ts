import * as PIXI from 'pixi.js-legacy';
import { Viewport } from 'pixi-viewport';
import * as TWEEN from '@tweenjs/tween.js';
import { createCharacterTokens } from './tokens';
import { createMap } from './map';

const playArea = new PIXI.Application({ backgroundColor: 0x1099bb });

playArea.ticker.add((delta) => {
  TWEEN.update();
});

const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,

  interaction: playArea.renderer.plugins.interaction,
});

playArea.stage.addChild(viewport);

viewport.drag().pinch().wheel().decelerate({
  friction: 0.75,
});

document.body.appendChild(playArea.view);

createMap(viewport);
createCharacterTokens(viewport);

export default playArea;
