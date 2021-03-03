import * as PIXI from 'pixi.js-legacy';
import { Viewport } from 'pixi-viewport';
import client from '../../client';
import * as TWEEN from '@tweenjs/tween.js';
import { cleanJsonString } from '../../utilities/json';

export const tokens: Record<string, PIXI.Sprite> = {};

export const createCharacterTokens = (viewport: Viewport) => {
  const icon = [
    { name: 'swords', texture: PIXI.Texture.from('assets/placeholders/icons/swords.png') },
    { name: 'shield', texture: PIXI.Texture.from('assets/placeholders/icons/shield.png') },
    { name: 'helmet', texture: PIXI.Texture.from('assets/placeholders/icons/helmet.png') },
    { name: 'wand', texture: PIXI.Texture.from('assets/placeholders/icons/wand.png') },
    { name: 'hammer', texture: PIXI.Texture.from('assets/placeholders/icons/hammer.png') },
    { name: 'axe', texture: PIXI.Texture.from('assets/placeholders/icons/axe.png') },
  ];

  icon.forEach((icon) => {
    const token = new PIXI.Sprite(icon.texture);
    token.name = icon.name;

    token.interactive = true;
    token.buttonMode = true;

    token.x = Math.floor(Math.random() * 1000);
    token.y = Math.floor(Math.random() * 1000);

    token.anchor.set(0.5);
    token.scale.set(0.25);

    tokens[token.name] = token;
    viewport.addChild(token);

    token
      .on('pointerdown', (event: any) => onDragStart(event, token))
      .on('pointerup', () => onDragEnd(token))
      .on('pointerupoutside', () => onDragEnd(token))
      .on('pointermove', () => onDragMove(token));

    const onDragStart = (event: any, token: any) => {
      event.stopPropagation();
      token.data = event.data;
      token.alpha = 0.5;
      token.dragging = true;
    };

    const onDragEnd = (token: any) => {
      token.alpha = 1;
      token.dragging = false;
      token.data = null;
      sendTokenUpdate(token);
    };

    let tick = 0;
    const onDragMove = (token: any) => {
      if (token.dragging) {
        const newPosition = token.data.getLocalPosition(token.parent);
        token.x = Math.floor(newPosition.x);
        token.y = Math.floor(newPosition.y);
        tick++;
        if (tick === 0 || tick % 25 === 0) {
          sendTokenUpdate(token);
        }
      }
    };
  });

  const sendTokenUpdate = (token: any) => {
    client.send(
      JSON.stringify({
        client_id: 1234,
        username: process.env.REACT_APP_USERNAME, // do this better
        channel: 'token',
        timestamp: Date.now(),
        token_id: token.name,
        token_position: {
          x: token.x,
          y: token.y,
        },
      })
    );
  };

  client.addEventListener('open', () => {
    Object.keys(tokens).forEach((tokenName) => {
      sendTokenUpdate(tokens[tokenName]);
    });
  });

  client.addEventListener('message', (event: any) => {
    let message = JSON.parse(event.data);
    if (cleanJsonString(message.channel) !== 'token') return;

    if ((tokens[cleanJsonString(message.token_id)] as any).dragging) return;
    new TWEEN.Tween(tokens[cleanJsonString(message.token_id)])
      .to({ x: message.token_position.x, y: message.token_position.y }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  });
};
