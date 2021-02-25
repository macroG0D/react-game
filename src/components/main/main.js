import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './main.scss';

export default class Main extends Component {
  render() {
    const mainHeader = 'rock - paper - scissors - lizard - spock';
    const subheader = 'an online game that may help solve disputes or take decisions';
    const btnLabel = 'Play';
    return (
      <div className="container">
        <div className="main">
          <div className="center-content">
            <h1>{mainHeader}</h1>
            <span className="subheader">{subheader}</span>
            <Link to="game">
              <button className="btn-main">{btnLabel}</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
