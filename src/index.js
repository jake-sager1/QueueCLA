import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './pages/App';
import Home from './pages/Home/Home';
import CardPage from './pages/Card';

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/card"><CardPage /></Route>
      </Switch>
    </Router>,
  document.getElementById("root")
);

