import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import ArtInfo from './components/ArtInfo/ArtInfo';
import './style.css';


const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LandingPage}
        />
        <Route
          path="/fav"
          component={FavoritesPage}
        />
        <Route
          path="/info"
          component={ArtInfo}
        />
        <Route render={() => <h1>4O4</h1>} />
      </Switch>
    </div>
  </Router>
);

export default App;