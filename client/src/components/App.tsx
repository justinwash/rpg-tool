import React, { createRef, useEffect } from 'react';
import playArea from './pixi/playArea';

import useWindowDimensions from '../utilities/window';

const App = () => {
  const canvasRef = createRef<HTMLDivElement>();

  useEffect(() => {
    canvasRef?.current?.appendChild(playArea.view);
    return () => playArea.stop();
  }, []);

  const { width, height } = useWindowDimensions();
  const outerSidebarWidth = 80;
  const innerSidebarWidth = 400;

  useEffect(() => {
    if (playArea && canvasRef.current) {
      playArea.renderer.resize(width - outerSidebarWidth - innerSidebarWidth, height);
    } else {
      console.log('no canvas to resize :(');
    }
  }, [playArea, width, height]);

  return (
    <div style={{ width: '100vw' }} className='App'>
      <div
        id='placeholder-outer-sidebar'
        style={{
          background: '#444',
          width: `${outerSidebarWidth}px`,
          height: '100vh',
          float: 'left',
        }}
      >
        options, user profilepic, etc etc
      </div>
      <div
        id='placeholder-inner-sidebar'
        style={{
          background: '#888',
          width: `${innerSidebarWidth}px`,
          height: '100vh',
          float: 'left',
        }}
      >
        chat and event log and stuff
      </div>
      <div style={{ overflow: 'auto' }} ref={canvasRef} />
    </div>
  );
};

export default App;
