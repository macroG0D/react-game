import React, { Component } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/nongame-assets/logo.svg';

export default class Header extends Component {
  getUrl = () => {
    const arr = window.location.href.split('/');
    return arr;
  }

  checkIfOk = () => {
    const currentURL = this.getUrl();
    if (!currentURL.includes('play')) {
      return <Link to="play">play</Link>
    } else {
      return 'play';
    }
  }

  render() {
    return (
      <div className="header">
        <Link to="/" className="logo">
          <img src={logo} alt="logo"></img>
        </Link>
        <ul className="nav-menu">
          <li className="list-item">
            <Link to="about">about</Link>
          </li>
          <li className="list-item">
            {this.checkIfOk()}
          </li>
        </ul>
      </div>
    );
  }
}
