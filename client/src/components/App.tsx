import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import AuthProvider from './contexts/AuthProvider';
import PlayPage from './pages/PlayPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import RegistrationPage from './pages/RegistrationPage';

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
            <PlayPage />
          </Route>
          <Route exact path='/registration'>
            <RegistrationPage />
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
