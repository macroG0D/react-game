import React, { Component } from 'react';

import Header from '../header';
import Footer from '../footer';
import Main from '../main';
import About from '../about';
import Play from '../play';

import './app.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Route path="/" component={Main} exact />
          <Route path="/about" component={About} />
          <Route path="/play" component={Play} />
          <Footer />
        </div>
      </Router>
    );
  }
}
