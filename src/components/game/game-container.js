import React, {Component} from 'react';
import { SAFEZONE } from '../../static/constans';

import './game-container.scss'

export default class GameBoard extends Component {

  state = {
    width: 984,
    height: 600,
  };

  calculateNewCanvasSize = (width) => {
    return Math.floor(width / 1.777);
  };

  updateCanvasSize = () => {
    let newWidth = window.innerWidth;
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


  createGameContainer = () => {
    const { width, height } = this.state;
    return <div className="gameContainer" style={{height:`${height}px`, width:`${width}px`}}></div>
  }

  componentDidMount() {
    this.updateCanvasSize();
    window.addEventListener('resize', () => this.updateCanvasSize());
  }
  componentDidUpdate() {
    this.createGameContainer();
  }

  render() {
    return (
      <React.Fragment>
        {this.createGameContainer()}
      </React.Fragment>
    )
  }
}
