import { createRef, useEffect } from 'react';
import playArea from './pixi/playArea';

import useWindowDimensions from '../utilities/window';
import OuterSidebar from './interface/OuterSidebar';
import InnerSidebar from './interface/InnerSidebar';

const App = () => {
  const canvasRef = createRef<HTMLDivElement>();

  useEffect(() => {
    canvasRef?.current?.appendChild(playArea.view);
  }, [canvasRef]);

  const { width, height } = useWindowDimensions();
  const outerSidebarWidth = 80;
  const innerSidebarWidth = 400;

  useEffect(() => {
    if (playArea && canvasRef.current) {
      playArea.renderer.resize(
        width - outerSidebarWidth - innerSidebarWidth,
        height
      );
    }
  }, [canvasRef, width, height]);

  return (
    <div style={{ width: '100vw' }} className='App'>
      <OuterSidebar width={outerSidebarWidth} />
      <InnerSidebar width={innerSidebarWidth} />

      {/* render play are in this div. figure out how to get this into a component */}
      <div style={{ overflow: 'auto' }} ref={canvasRef} />
    </div>
  );
};

export default App;
