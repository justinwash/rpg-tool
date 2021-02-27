import React from 'react';
import playArea from './pixi/playArea';

const App = () => {
  const canvasRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    canvasRef?.current?.appendChild(playArea.view);

    return () => {
      playArea.stop();
    };
  }, [canvasRef, playArea]);

  return <div ref={canvasRef} />;
};

export default App;
