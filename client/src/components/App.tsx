import React from 'react';
import { Router }  from 'react-router';
import { createBrowserHistory } from 'history';

import AuthProvider from './contexts/AuthProvider';
import PlayPage from './pages/PlayPage';

const history = createBrowserHistory();

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <PlayPage />
      </Router>
    </AuthProvider>
  );
};

export default App;
