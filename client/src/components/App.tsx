import React from 'react';
import { Router, Switch, Route }  from 'react-router';
import { createBrowserHistory } from 'history';

import AuthProvider from './contexts/AuthProvider';
import PlayPage from './pages/PlayPage';
import TestLink from './interface/TestLink';

const history = createBrowserHistory();

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <Route exact path='/'>
            <PlayPage />
          </Route>
          <Route exact path='/link'>
            <TestLink />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
