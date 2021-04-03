import { useState } from 'react';
import { enableDoodling, resetTokens, disableDoodling } from '../pixi/map';
import { playArea, setIsMapDraggable } from '../pixi/playArea';
import { createCharacterTokens } from '../pixi/tokens';

export const Toolbox = (props: { sidebarWidth: number }) => {
  const [pressedButtons, setPressedButtons] = useState<Array<string>>([]);
  const DRAW_BUTTON = 'draw';
  const ARROW_BUTTON = 'arrow';
  const RESET_BUTTON = 'reset';
  const ADD_BUTTON = 'add';

  const setToggleState = (buttonName: string) => {
    pressedButtons.includes(buttonName) ? 
      setPressedButtons(pressedButtons.filter(button => button != buttonName)) :
      setPressedButtons(pressedButtons => [...pressedButtons, buttonName])
  }

  const createToolboxButton = (buttonName: string, image: string, onClick: () => any, isToggle: boolean) => (
    <button
      onClick={() => {
        isToggle && setToggleState(buttonName);
        onClick();
      }}
      className={['button', pressedButtons.includes(buttonName) ? '__enabled' : ''].join(' ')}
    >
      <span>{buttonName}</span>
    </button>
  );

  return (
    <div
      id='placeholder-toolbox'
      className='toolbox__play'
      style={{
        top: `1vh`,
        left: `${props.sidebarWidth}px`,
        position: 'absolute',
        backgroundColor: '#fff8e7',
      }}
    >
      {createToolboxButton(DRAW_BUTTON, '', handleDrawButtonClick(pressedButtons.includes(DRAW_BUTTON)), true)}
      {createToolboxButton(ARROW_BUTTON, '', () => {}, false)}
      {createToolboxButton(RESET_BUTTON, '', handleResetButtonClick(), false)}
      {createToolboxButton(ADD_BUTTON, '', handleAddButtonClick(), false)}
    </div>
  );
};

const handleDrawButtonClick = (isEnabled: boolean) => () => {
  if (!isEnabled) {
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
