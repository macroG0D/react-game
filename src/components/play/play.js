import React, { Component } from 'react';

import GameBoard from '../game/game-container'

import './play.scss';

export default class Play extends Component {
  render() {
    return (
      <div className="play">
        <GameBoard />
      </div>
    );
  }
}
