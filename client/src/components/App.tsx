import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import AuthProvider from './contexts/AuthProvider';
import PlayPage from './pages/PlayPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';

const history = createBrowserHistory();

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/play'>
            {/* eventually /play/:session-id */}
            <PlayPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
