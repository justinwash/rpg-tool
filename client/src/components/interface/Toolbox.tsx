import { useState } from 'react';
import { enableDoodling, drawLine, resetTokens, disableDoodling } from '../pixi/map';
import { playArea, setIsMapDraggable } from '../pixi/playArea';
import { createCharacterTokens } from '../pixi/tokens';

export const Toolbox = (props: { sidebarWidth: number }) => {
  const [pressedButton, setPressedButton] = useState('');
  const DRAW_BUTTON = 'draw';
  const ARROW_BUTTON = 'arrow';
  const RESET_BUTTON = 'reset';
  const ADD_BUTTON = 'add';

  return (
    <div
      id='placeholder-toolbox'
      style={{
        width: '30vw',
        top: `1vh`,
        padding: '0.666em',
        left: `${props.sidebarWidth + 25}px`,
        position: 'absolute',
        backgroundColor: '#fff8e7',
        borderRadius: 8,
      }}
    >
      {createToolboxButton(DRAW_BUTTON, '', handleDrawButtonClick(pressedButton === DRAW_BUTTON), pressedButton, setPressedButton)}

      {createToolboxButton(ARROW_BUTTON, '', () => {}, pressedButton, setPressedButton)}

      {createToolboxButton(RESET_BUTTON, '', handleResetButtonClick(), pressedButton, setPressedButton)}
      {createToolboxButton(ADD_BUTTON, '', handleAddButtonClick(), pressedButton, setPressedButton)}
    </div>
  );
};

const createToolboxButton = (buttonName: string, image: string, onClick: () => any, pressedButton: any, setPressedButton: any) => (
  <button
    onClick={() => {
      setPressedButton(pressedButton === buttonName ? '' : buttonName);
      onClick();
    }}
    className={'button'}
    style={{
      boxShadow: pressedButton && pressedButton === buttonName ? '' : '1px 3px 1px #9E9E9E',
    }}
  >
    {buttonName}
  </button>
);

const handleDrawButtonClick = (previouslyActive: boolean) => () => {
  console.log(`Draw is now ${!previouslyActive ? 'active' : 'inactive'}`);

  if (!previouslyActive) {
    setIsMapDraggable(false);
    enableDoodling();
  } else {
    disableDoodling();
    setIsMapDraggable(true);
  }
};

//Currently only removes all tokens. Doesn't 'reset' anything back to an original place.
const handleResetButtonClick = () => () => {
  console.log('Reset button has been clicked');
  resetTokens();
};

//Place holder just to get tokens back in the PlayArea using code that initializes the tokens normally.
const handleAddButtonClick = () => () => {
  createCharacterTokens(playArea);
};

export default Toolbox;
