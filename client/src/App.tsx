import React, { useEffect, useState } from 'react';
import { Spinner } from './components/ui/Spinner';
import useWindowDimensions from './utilities/window';

export const App = () => {
  const [wasm, setWasm] = useState<null | typeof import('wasm')>(null);
  const { width, height } = useWindowDimensions();
  const outerSidebarWidth = 80;
  const innerSidebarWidth = 400;

  useEffect(() => {
    import('wasm').then((wasm) => {
      setWasm(wasm);
      wasm.create_canvas();
    });
  }, []);

  useEffect(() => {
    if (wasm) {
      wasm.resize_canvas(width - innerSidebarWidth - outerSidebarWidth, height);
    } else console.log('no canvas to resize :(');
  }, [wasm, width, height]);

  if (wasm) {
    return (
      <div className='App' style={{ display: 'flex' }}>
        <div
          id='placeholder-outer-sidebar'
          style={{
            background: '#444',
            width: `${outerSidebarWidth}px`,
            height: '100vh',
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
          }}
        >
          chat and event log and stuff
        </div>
      </div>
    );
  } else return <Spinner />;
};

export default App;
