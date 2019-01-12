import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';


const App = () => (
  <div>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LandingPage}
        />  
        <Route render={() => <h1>4O4</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
