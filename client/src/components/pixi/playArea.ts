import * as PIXI from 'pixi.js-legacy';
import { Viewport } from 'pixi-viewport'

const playArea = new PIXI.Application({ backgroundColor: 0x1099bb });

const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: 1000,
    worldHeight: 1000,

    interaction: playArea.renderer.plugins.interaction
})

playArea.stage.addChild(viewport)

viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate({
      friction: .75
    })

document.body.appendChild(playArea.view);

createMap();

function createMap() {
  const texture = PIXI.Texture.from('/test_map.png');
  const map = new PIXI.Sprite(texture)

  map.scale.set(1);

  map.x = 0;
  map.y = 0;

  viewport.addChild(map);
}

export default playArea;
