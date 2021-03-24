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

const mutateMouseFromEvent = (mouse: { x: number, y: number }, event: any) => {

  if (mouse && event) {
    mouse.x = typeof event.offsetX !== 'undefined' ? event.offsetX : event.layerX;
    mouse.y = typeof event.offsetY !== 'undefined' ? event.offsetY : event.layerY;
  }
}

export const doodle = () => {

  // var renderer = PIXI.autoDetectRenderer({ antialias: true, width: 1000, height: 1000 });
  let renderer = PIXI.autoDetectRenderer({ antialias: true, width: playArea.width, height: playArea.height });
  // document.body.appendChild(renderer.view);

  // for debugging ease
  let localPlay = playArea;

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(playArea);
  }

  requestAnimationFrame(animate);

  let line = new PIXI.Graphics();
  line.lineStyle(5, 0xFFFFFF, 1);
  playArea.addChild(line);

  let points: any = [];
  let mouse: any = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e: any) => mutateMouseFromEvent(mouse, e), false);

  window.addEventListener('mousedown', (e: any) => {

    window.addEventListener('mousemove', onPaint, false);
    mutateMouseFromEvent(mouse, e);
    points.push({ x: mouse.x, y: mouse.y });
    onPaint();

  }, false);

  window.addEventListener('mouseup', function () {

    window.removeEventListener('mousemove', onPaint, false);
    onPaint();
    previousDoodle = null;
    // remove points 
    points = [];
  }, false);

  // Handle Touch Events
  window.addEventListener('touchmove', function (e) {

    e.preventDefault();
    mouse.x = e.changedTouches[0].pageX;
    mouse.y = e.changedTouches[0].pageY;

  }, false);

  window.addEventListener('touchstart', function (e) {

    e.preventDefault();
    mouse.x = e.changedTouches[0].pageX;
    mouse.y = e.changedTouches[0].pageY;
    window.addEventListener('touchmove', onPaint, false);

  }, false);

  window.addEventListener('touchend', function () {

    window.removeEventListener('touchmove', onPaint, false);
    onPaint();
    previousDoodle = null;
    points = [];

  }, false);

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

      currentDoodle.quadraticCurveTo(
        points[i - 1].x,
        points[i - 1].y,
        points[i].x,
        points[i].y
      );

      playArea.addChild(currentDoodle);
      previousDoodle = currentDoodle;

    } catch(error) {

      console.log(`failed to draw: ${error}`);
    }
  }
}
