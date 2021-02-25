import React, { Component } from 'react';
import { SAFEZONE, MARGIN, DARKER_BLUE } from '../../static/constans';

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

  drawCanvas = () => {
    const { width, height } = this.state;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = DARKER_BLUE;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  componentDidMount() {
    this.updateCanvasSize();
    window.addEventListener('resize', () => this.updateCanvasSize());
  }
  componentDidUpdate() {
    this.drawCanvas();
  }

  render() {
    return (
      <div className="game">
        <canvas
          id="canvas"
        ></canvas>
      </div>
    );
  }
}
