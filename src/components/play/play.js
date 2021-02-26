import React, { Component } from 'react';

import GameContainer from '../game/game-container'

import './play.scss';

export default class Play extends Component {
  render() {
    return (
      <div className="play">
        <GameContainer />
      </div>
    );
  }
}
