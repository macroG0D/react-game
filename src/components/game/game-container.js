import React, { Component } from 'react';
import { SAFEZONE } from '../../static/global';
import MainMenu from './scenes/main-menu';
import GameMatch from './scenes/game-match';
import GameSounds from './audio/audio';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './game-container.scss';

export default class GameContainer extends Component {
  constructor() {
    super();
    this.width = 984;
    this.height = 600;
  }

  calculateNewCanvasSize = (width) => {
    return Math.floor(width / 1.777);
  };

  calculateCanvasSize = () => {
    let newWidth = window.innerWidth;
    let newHeight = this.calculateNewCanvasSize(newWidth);
    while (newHeight > window.innerHeight - SAFEZONE) {
      newWidth -= 10;
      newHeight = this.calculateNewCanvasSize(newWidth);
    }
    this.width = newWidth;
    this.height = newHeight;
  };

  updateCanvasSize = () => {
    this.calculateCanvasSize();
    const { width, height } = this;
    const gameContainer = document.querySelector('.gameContainer');
    gameContainer.style.width = `${width}px`;
    gameContainer.style.height = `${height}px`;
  };

  createGameContainer = () => {
    this.calculateCanvasSize();
    const { width, height } = this;
    return (
      <div
        className="gameContainer"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Router>
          <Route path="/play" component={MainMenu} exact />
          <Route
            path="/play/newGame"
            render={() => <GameMatch currentPlayerName="TonYem" />}
            exact
          />
        </Router>
      </div>
    );
  };

  componentDidMount() {
    window.addEventListener('resize', () => this.updateCanvasSize());
    GameSounds.backgroundMusic();
  }
  componentWillUnmount() {
  }
  
  render() {
    return <React.Fragment>{this.createGameContainer()}</React.Fragment>;
  }
}
