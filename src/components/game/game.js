import React, { Component } from 'react';
import { SAFEZONE, MARGIN } from '../../static/constans';

import './game.scss';

export default class Game extends Component {
  state = {
    width: 984,
    height: 600,
  };

  calculateCanvasSize = (width) => {
    return Math.floor(width / 1.777);
  };

  checkWindowSize = () => {
    let newWidth = window.innerWidth - MARGIN;
    let newHeight = this.calculateCanvasSize(newWidth);
    while (newHeight > window.innerHeight - SAFEZONE) {
      newWidth -= 10;
      newHeight = this.calculateCanvasSize(newWidth);
    }
    this.setState({
      width: newWidth,
      height: newHeight,
    });
  };

  componentDidMount() {
    this.checkWindowSize();
    window.addEventListener('resize', () => this.checkWindowSize());
  }

  render() {
    const { width, height } = this.state;
    return (
      <div className="game">
        <canvas
          id="canvas"
          width={`${width}px`}
          height={`${height}px`}
        ></canvas>
      </div>
    );
  }
}
