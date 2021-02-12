import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Home from './pages/Home';
import listMovies from './pages/listMovies.js';
import NoMatch from './pages/NoMatch.js';
import listShows from './pages/listShows.js';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/listMovies" component={listMovies} />
          <Route exact path="/listShows" component={listShows}/>
          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
