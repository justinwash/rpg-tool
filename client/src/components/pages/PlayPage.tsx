import React, { createRef, useEffect } from 'react';
import playArea from '../pixi/playArea';
import useWindowDimensions from '../../utilities/window';
import {Switch, Route } from 'react-router';

import OuterSidebar from '../interface/OuterSidebar';
import InnerSidebar from '../interface/InnerSidebar';
import Toolbox from '../interface/Toolbox';
import TestLink from '../interface/TestLink';

const PlayPage = (props: {}) => {
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
    <div style={{ width: '100vw' }} className='Play'>
      <Switch>
          <Route path='/link'>
            <TestLink />
          </Route>
      </Switch>
      <OuterSidebar width={outerSidebarWidth} />
      <InnerSidebar width={innerSidebarWidth} />
      <Toolbox sidebarWidth={innerSidebarWidth + outerSidebarWidth} />
      <div style={{ overflow: 'auto' }} ref={canvasRef} />
    </div>
  );
};

export default PlayPage;
