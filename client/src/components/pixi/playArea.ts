import * as PIXI from 'pixi.js-legacy';

const playArea = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(playArea.view);

createMap();

function createMap() {
  const texture = PIXI.Texture.from('/test_map.png');
  const map = new PIXI.Sprite(texture)

  map.interactive = true;
  map.buttonMode = true;
  map.anchor.set(0.5)
  map.scale.set(1);

  map
    .on('pointerdown', (event: any) => onDragStart(event, map))
    .on('pointerup', () => onDragEnd(map))
    .on('pointerupoutside', () => onDragEnd(map))
    .on('pointermove', () => onDragMove(map));

  map.x = 0;
  map.y = 0;

  playArea.stage.addChild(map);
}

function onDragStart(event: any, map: any) {
  map.data = event.data;
  map.dragging = true;
}

function onDragEnd(map: any) {
  map.alpha = 1;
  map.dragging = false;
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
