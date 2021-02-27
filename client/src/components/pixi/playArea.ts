import * as PIXI from 'pixi.js-legacy';

const playArea = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(playArea.view);

// create a texture from an image path
const texture = PIXI.Texture.from('/test_map.png');

// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

createMap();

function createMap() {
  // create our little bunny friend..
  const map = new PIXI.Sprite(texture);

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  map.interactive = true;

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  map.buttonMode = true;

  // center the bunny's anchor point
  map.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  map.scale.set(3);

  // setup events for mouse + touch using
  // the pointer events
  map
    .on('pointerdown', (event: any) => onDragStart(event, map))
    .on('pointerup', () => onDragEnd(map))
    .on('pointerupoutside', () => onDragEnd(map))
    .on('pointermove', () => onDragMove(map));

  // For mouse-only events
  // .on('mousedown', onDragStart)
  // .on('mouseup', onDragEnd)
  // .on('mouseupoutside', onDragEnd)
  // .on('mousemove', onDragMove);

  // For touch-only events
  // .on('touchstart', onDragStart)
  // .on('touchend', onDragEnd)
  // .on('touchendoutside', onDragEnd)
  // .on('touchmove', onDragMove);

  // move the sprite to its designated position
  map.x = 0;
  map.y = 0;

  // add it to the stage
  playArea.stage.addChild(map);
}

function onDragStart(event: any, map: any) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  map.data = event.data;
  map.alpha = 0.5;
  map.dragging = true;
}

function onDragEnd(map: any) {
  map.alpha = 1;
  map.dragging = false;
  // set the interaction data to null
  map.data = null;
}

function onDragMove(map: any) {
  if (map.dragging) {
    const newPosition = map.data.getLocalPosition(map.parent);
    map.x = newPosition.x;
    map.y = newPosition.y;
  }
}

export default playArea;
