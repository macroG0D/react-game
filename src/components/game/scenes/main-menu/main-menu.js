import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './main-menu.scss'

export default class MainMenu extends Component {

  render() {
    return (
      <div className="main-menu">
        <ul className="main-menu__items">
          {/* <Link to="/play/game"><li className="main-menu__item">Continue</li></Link> */}
          <Link to="/play/newgame"><li className="main-menu__item">New Game</li></Link>
          <Link to="/play/settings"><li className="main-menu__item">Settings</li></Link>
        </ul>
      </div>
    )
  }
}