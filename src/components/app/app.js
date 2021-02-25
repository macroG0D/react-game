import React, { Component } from 'react';

import Header from '../header';
import Footer from '../footer';
import Main from '../main';
import About from '../about';
import Game from '../game';

import './app.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <div className="container">
            <Route path="/" component={Main} exact />
            <Route path="/about" component={About} />
            <Route path="/game" component={Game} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
