import React, { createRef, useEffect } from 'react';
import playArea from './pixi/playArea';

import useWindowDimensions from '../utilities/window';
import OuterSidebar from './interface/OuterSidebar';
import InnerSidebar from './interface/InnerSidebar';
import Toolbox from './interface/Toolbox';
import TestLink from './interface/TestLink';

import AuthProvider from './contexts/AuthProvider';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history'


const App = () => {
  const canvasRef = createRef<HTMLDivElement>();
  const history = createBrowserHistory();

  useEffect(() => {
    canvasRef?.current?.appendChild(playArea.view);
  }, [canvasRef]);

  const { width, height } = useWindowDimensions();
  const outerSidebarWidth = 80;
  const innerSidebarWidth = 400;

  useEffect(() => {
    if (playArea && canvasRef.current) {
      playArea.renderer.resize(width - outerSidebarWidth - innerSidebarWidth, height);
    }
  }, [canvasRef, width, height]);

  return (
    <AuthProvider>
      <Router history={history}>
      <div style={{ width: '100vw' }} className='App'>
          <Switch>
            <Route path='/link'>
              <TestLink />
            </Route>
          </Switch>
        <OuterSidebar width={outerSidebarWidth} />
        <InnerSidebar width={innerSidebarWidth} />
        <Toolbox sidebarWidth={innerSidebarWidth + outerSidebarWidth} />

              {/* render play area in this div. figure out how to get this into a component */}
        <div style={{ overflow: 'auto' }} ref={canvasRef} />
      </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
