import React, { Component } from 'react';
import { SAFEZONE, MARGIN } from '../../static/constans';

import './game.scss';

export default class Game extends Component {
  state = {
    width: 984,
    height: 600,
  };

  calculateNewCanvasSize = (width) => {
    return Math.floor(width / 1.777);
  };

  updateCanvasSize = () => {
    let newWidth = window.innerWidth - MARGIN;
    let newHeight = this.calculateNewCanvasSize(newWidth);
    while (newHeight > window.innerHeight - SAFEZONE) {
      newWidth -= 10;
      newHeight = this.calculateNewCanvasSize(newWidth);
    }
    this.setState({
      width: newWidth,
      height: newHeight,
    });
  };

  componentDidMount() {
    this.updateCanvasSize();
    window.addEventListener('resize', () => this.updateCanvasSize());
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
