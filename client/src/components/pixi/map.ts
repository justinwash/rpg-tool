import { realpath } from 'fs';
import * as PIXI from 'pixi.js-legacy';
import client from '../../client';
import { cleanJsonString } from '../../utilities/json';

const defaultMapImage = PIXI.Texture.from('assets/placeholders/maps/test_map.png');
let map = new PIXI.Sprite(defaultMapImage);

export const createMap = (playArea: PIXI.Container) => {
  map.scale.set(1);

  map.x = 0;
  map.y = 0;

  map.zIndex = 0;

  playArea.addChild(map);

  client.addEventListener('message', (event) => {
    let message = JSON.parse(event.data);
    if (cleanJsonString(message.channel) !== 'map') return;

    let newMapImage = PIXI.Texture.from(cleanJsonString(message.message));
    let newMap = new PIXI.Sprite(newMapImage);

    newMap.scale.set(1);

    newMap.x = 0;
    newMap.y = 0;

    newMap.zIndex = 0;

    playArea.removeChild(map);
    playArea.addChild(newMap);
  });
};

export const drawLine = (playArea: PIXI.Container) => {
  const myLine = new PIXI.Graphics();

  myLine.lineStyle(2, 0xFFFFFF, 1);
  myLine.moveTo(0, 0);
  myLine.lineTo(100, 200);
  myLine.lineTo(200, 200);
  myLine.lineTo(240, 100);

  myLine.position.x = 50;
  myLine.position.y = 50;

  playArea.addChild(myLine);
}