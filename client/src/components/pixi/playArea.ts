import * as PIXI from 'pixi.js-legacy';
import { Viewport } from 'pixi-viewport';
import * as TWEEN from '@tweenjs/tween.js';
import { createCharacterTokens } from './tokens';
import { createMap } from './map';

const app = new PIXI.Application({ backgroundColor: 0x1099bb });

app.ticker.add((delta) => {
  TWEEN.update();
});

export const playArea = new PIXI.Container();
playArea.sortableChildren = true;

const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,

  interaction: app.renderer.plugins.interaction,
});

viewport.addChild(playArea);

viewport.drag().pinch().wheel().decelerate({
  friction: 0.75,
});

app.stage.addChild(viewport);

document.body.appendChild(app.view);

createMap(playArea);
createCharacterTokens(playArea);

export default app;
