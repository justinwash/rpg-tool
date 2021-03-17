import React from 'react';

import AuthProvider from './contexts/AuthProvider';
import PlayPage from './pages/PlayPage';

const App = () => {
  return (
    <AuthProvider>
      <PlayPage />
    </AuthProvider>
  );
};

export default App;
