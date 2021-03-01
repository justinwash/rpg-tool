import * as PIXI from 'pixi.js-legacy';
import { Viewport } from 'pixi-viewport';
import client from '../../client';

const playArea = new PIXI.Application({ backgroundColor: 0x1099bb });

const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,

  interaction: playArea.renderer.plugins.interaction,
});

playArea.stage.addChild(viewport);

viewport.drag().pinch().wheel().decelerate({
  friction: 0.75,
});

document.body.appendChild(playArea.view);

createMap();
createCharacterTokens();

function createMap() {
  const texture = PIXI.Texture.from('assets/placeholders/maps/test_map.png');
  const map = new PIXI.Sprite(texture);

  map.scale.set(1);

  map.x = 0;
  map.y = 0;

  viewport.addChild(map);
}

function createCharacterTokens() {
  const textures = [
    PIXI.Texture.from('assets/placeholders/icons/swords.png'),
    PIXI.Texture.from('assets/placeholders/icons/shield.png'),
    PIXI.Texture.from('assets/placeholders/icons/helmet.png'),
    PIXI.Texture.from('assets/placeholders/icons/wand.png'),
    PIXI.Texture.from('assets/placeholders/icons/hammer.png'),
    PIXI.Texture.from('assets/placeholders/icons/axe.png'),
  ];

  textures.forEach((texture) => {
    const token = new PIXI.Sprite(texture);
    token.interactive = true;
    token.buttonMode = true;
    token.x = Math.floor(Math.random() * 1000);
    token.y = Math.floor(Math.random() * 1000);
    token.anchor.set(0.5);
    token.scale.set(0.25);

    token
      .on('pointerdown', (event: any) => onDragStart(event, token))
      .on('pointerup', () => onDragEnd(token))
      .on('pointerupoutside', () => onDragEnd(token))
      .on('pointermove', () => onDragMove(token));

    function onDragStart(event: any, token: any) {
      event.stopPropagation();
      token.data = event.data;
      token.alpha = 0.5;
      token.dragging = true;
    }

    function onDragEnd(token: any) {
      token.alpha = 1;
      token.dragging = false;
      token.data = null;
    }

    function onDragMove(token: any) {
      if (token.dragging) {
        const newPosition = token.data.getLocalPosition(token.parent);
        token.x = newPosition.x;
        token.y = newPosition.y;
      }
    }
    viewport.addChild(token);
  });
}

client.addEventListener('message', (message: any) => {
  if (message?.channel !== 'board') return;
  console.log('got board instruction: ', message?.message);
});

export default playArea;
