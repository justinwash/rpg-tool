import * as PIXI from 'pixi.js-legacy';
import socket from '../../socket';
import { cleanJsonString } from '../../utilities/json';
import { clearAllTokens } from './tokens';
import { playArea, viewport } from './playArea';

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

export const doodle = () => {
  let line = new PIXI.Graphics();
  line.lineStyle(5, 0xffffff, 1);
  playArea.addChild(line);

  let points: any = [];
  let mouse: any = { x: 0, y: 0 };

  viewport.on('mousemove', (e) => {
    mouse = { x: e.data.getLocalPosition(viewport).x, y: e.data.getLocalPosition(viewport).y };
  });

  viewport.on(
    'mousedown',
    (e: any) => {
      viewport.on('mousemove', onPaint, false);
      points.push({ x: e.data.getLocalPosition(viewport).x, y: e.data.getLocalPosition(viewport).y });
      mouse = { x: e.data.getLocalPosition(viewport).x, y: e.data.getLocalPosition(viewport).y };
      onPaint();
    },
    false
  );

  viewport.on(
    'mouseup',
    function () {
      viewport.off('mousemove');
      viewport.on('mousemove', (e) => {
        mouse = { x: e.data.getLocalPosition(viewport).x, y: e.data.getLocalPosition(viewport).y };
      });
      onPaint();
      previousDoodle = null;
      // remove points
      points = [];
    },
    false
  );

  viewport.on('touchmove', (e) => {
    mouse = { x: e.data.getLocalPosition(viewport).x, y: e.data.getLocalPosition(viewport).y };
  });

  viewport.on(
    'touchstart',
    (e: any) => {
      viewport.on('touchmove', onPaint, false);
      points.push({ x: e.data.getLocalPosition(viewport).x, y: e.data.getLocalPosition(viewport).y });
      mouse = { x: e.data.getLocalPosition(viewport).x, y: e.data.getLocalPosition(viewport).y };
      onPaint();
    },
    false
  );

  viewport.on(
    'touchend',
    function () {
      viewport.off('touchmove');
      viewport.on('touchmove', (e) => {
        mouse = { x: e.data.getLocalPosition(viewport).x, y: e.data.getLocalPosition(viewport).y };
      });
      onPaint();
      previousDoodle = null;
      // remove points
      points = [];
    },
    false
  );

  let previousDoodle: any = null;

  const onPaint = () => {
    if (previousDoodle !== null) {
      playArea.removeChild(previousDoodle);
    }
    points.push({ x: mouse.x, y: mouse.y });

    let currentDoodle = new PIXI.Graphics();
    currentDoodle.lineStyle(4, 0x000000, 1);
    currentDoodle.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < points.length - 2; i++) {
      const xMidPoint = (points[i].x + points[i + 1].x) / 2;
      const yMidPoint = (points[i].y + points[i + 1].y) / 2;

      currentDoodle.quadraticCurveTo(points[i].x, points[i].y, xMidPoint, yMidPoint);
    }

    try {
      currentDoodle.quadraticCurveTo(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);

      playArea.addChild(currentDoodle);
      previousDoodle = currentDoodle;
    } catch (error) {
      console.log(`failed to draw: ${error}`);
    }
  };
};
