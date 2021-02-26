import React, { Component } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

import logo from '../../logo.svg';

export default class Header extends Component {
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
            <Link to="play">play</Link>
          </li>
        </ul>
      </div>
    );
  }
}
