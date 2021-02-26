import React, { Component } from 'react';
import { SAFEZONE, MARGIN } from '../../static/constans';

import './play.scss';

export default class Play extends Component {

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
      <div className="play">
        <canvas
          id="canvas"
        ></canvas>
      </div>
    );
  }
}
