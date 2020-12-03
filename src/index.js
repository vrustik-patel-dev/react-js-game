import React from 'react';
import ReactDOM from 'react-dom';

import Welcomescreen from './Pages/welcome/welcome';
import Game from './Pages/game';
import './Csss/main.css'

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Welcomescreen} />
      <Route path="/game" component={Game} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
