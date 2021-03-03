import * as PIXI from 'pixi.js-legacy';
import { Viewport } from 'pixi-viewport';

export const createMap = (viewport: Viewport) => {
  const texture = PIXI.Texture.from('assets/placeholders/maps/test_map.png');
  const map = new PIXI.Sprite(texture);

  map.scale.set(1);

  map.x = 0;
  map.y = 0;

  viewport.addChild(map);
};
