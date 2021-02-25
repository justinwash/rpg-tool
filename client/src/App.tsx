import React, { useEffect, useState } from 'react';
import { Spinner } from './components/ui/Spinner';

export const App = () => {
  const [wasm, setWasm] = useState<any>(null);

  useEffect(() => {
    import('wasm').then((m) => {
      setWasm(m);
    });
  }, []);

  if (wasm) {
    return (
      <div className='App'>
        add_two_ints(2, 2) = {wasm.add_two_ints(2, 2)}
        <br />
        fib(27) = {wasm.fib(27)}
        <div id='replace'>
          <img src='./logo192.png' alt='logo' />
        </div>
        {wasm.replace_element()}
      </div>
    );
  } else return <Spinner />;
};

export default App;
