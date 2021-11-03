import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './pages/App';
import Home from './pages/Home/Home';
import CardPage from './pages/Card';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/card"><CardPage /></Route>
          <Route path="/login"><App /></Route>
          <Route path="/signup"><App /></Route>
        </Switch>
      </Router>
    </ThemeProvider>,
  document.getElementById("root")
);

