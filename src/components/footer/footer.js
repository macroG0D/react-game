import React, { Component } from 'react';
import './footer.scss';

import rssLogo from '../../assets/nongame-assets/rss-logo.svg';
import ydLogo from '../../assets/nongame-assets/yemDigital-logo.svg';

export default class Footer extends Component {
  render() {
    const copyrightText = 'rock - paper - scissors - lizard - spock @ 2021';
    return (
      <div className="footer">
        <span className="footer__info"> {copyrightText} </span>
        <div className="logo-secondary">
          <a
            href="https://academy.yem.digital"
            className="partner-logos"
            target="_blank"
            rel="noreferrer"
          >
            <img src={ydLogo} alt="logo"></img>
          </a>
          <a
            href="https://rs.school/react/"
            className="partner-logos"
            target="_blank"
            rel="noreferrer"
          >
            <img src={rssLogo} alt="logo"></img>
          </a>
        </div>
        <span className="footer__info">
          Created by
          <a
            href="https://github.com/macroG0D"
            target="_blank"
            rel="noreferrer"
          >
            TonYem
          </a>
        </span>
      </div>
    );
  }
}
