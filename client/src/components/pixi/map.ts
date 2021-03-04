import * as PIXI from 'pixi.js-legacy';
import { Viewport } from 'pixi-viewport';
import client from '../../client';
import { cleanJsonString } from '../../utilities/json';

const defaultMapImage = PIXI.Texture.from('assets/placeholders/maps/test_map.png');
let map = new PIXI.Sprite(defaultMapImage);

export const createMap = (viewport: Viewport) => {
  map.scale.set(1);

  map.x = 0;
  map.y = 0;

  map.zIndex = 0;

  viewport.addChild(map);

  client.addEventListener('message', (event) => {
    let message = JSON.parse(event.data);
    if (cleanJsonString(message.channel) !== 'map') return;

    let newMapImage = PIXI.Texture.from(cleanJsonString(message.message));
    let newMap = new PIXI.Sprite(newMapImage);

    newMap.scale.set(1);

    newMap.x = 0;
    newMap.y = 0;

    newMap.zIndex = 0;

    viewport.removeChild(map);
    viewport.addChild(newMap);
  });
};
