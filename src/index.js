import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Welcomescreen from './Pages/welcome/welcome';
import Game from './Pages/game';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
