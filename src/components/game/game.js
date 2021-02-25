import React, { Component } from 'react';

import './game.scss';

export default class Game extends Component {
  render() {
    const game = 'Game';
    return (
      <div className="game">
        <div className="center-content">
          <h1>{game}</h1>
        </div>
      </div>
    );
  }
}
