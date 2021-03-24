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

export const justanosViewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,

  interaction: app.renderer.plugins.interaction,
});

justanosViewport.addChild(playArea);

justanosViewport.drag().pinch().wheel().decelerate({
  friction: 0.75,
});

app.stage.addChild(justanosViewport);

document.body.appendChild(app.view);

createMap(playArea);
createCharacterTokens(playArea);

export const setIsMapDraggable = (draggable: boolean) => {
  draggable ? justanosViewport.plugins.resume('drag') : justanosViewport.plugins.pause('drag');
}

export default app;
