import * as PIXI from 'pixi.js-legacy';
import socket from '../../socket';
import { cleanJsonString } from '../../utilities/json';
import { clearAllTokens } from './tokens';
import { playArea } from './playArea';

const defaultMapImage = { name: 'map', texture: PIXI.Texture.from('assets/placeholders/maps/test_map.png') };

let map = new PIXI.Sprite(defaultMapImage.texture);

export const createMap = (playArea: PIXI.Container) => {
  map.scale.set(1);

  map.x = 0;
  map.y = 0;

  map.zIndex = 0;

  map.name = defaultMapImage.name;
  playArea.addChild(map);

  socket.addEventListener('message', (event) => {
    let message = JSON.parse(event.data);
    if (cleanJsonString(message.channel) !== 'map') return;
    console.log(cleanJsonString(message.message));

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

  myLine.lineStyle(2, 0xffffff, 1);
  myLine.moveTo(0, 0);
  myLine.lineTo(100, 200);
  myLine.lineTo(200, 200);
  myLine.lineTo(240, 100);

  myLine.position.x = 50;
  myLine.position.y = 50;

  playArea.addChild(myLine);
};

//currently just clearing all tokens
export const resetTokens = () => {
  clearAllTokens(playArea);
};
