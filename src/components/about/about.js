import React, { Component } from 'react';

import rulesPic from '../../assets/nongame-assets/rules.jpg';

import './about.scss';

export default class Main extends Component {
  rules = [
    'Scissors cuts Paper',
    'Paper covers Rock',
    'Rock crushes Lizard',
    'Lizard poisons Spock',
    'Spock smashes Scissors',
    'Scissors decapitates Lizard',
    'Lizard eats Paper',
    'Paper disproves Spock',
    'Spock vaporizes Rock',
    '(and as it always has) Rock crushes Scissors',
  ];

  renderRules = () => {
    return this.rules.map((string, i) => {
      return (
        <p key={i} className="rules-text">
          {string}
        </p>
      );
    });
  };

  playerSize = () => {
    return {
      frameWidth: 406,
      frameHeight: 228,
    };
  };

  render() {
    const videoLink = 'https://www.youtube.com/embed/Kov2G0GouBw?start=38';
    const { frameWidth, frameHeight } = this.playerSize();
    const about =
      'The game is an expansion on the game Rock, Paper, Scissors. Each player picks a variable and reveals it at the same time. The winner is the one who defeats the others. In a tie, the process is repeated until a winner is found.';
    const rules = this.renderRules();

    return (
      <div className="container">
        <div className="about">
          <div className="left-half">
            <h2>{about}</h2>
            <div className="rules-text-wrapper">{rules}</div>
          </div>
          <div className="right-half">
            <iframe
              className="videoPlayer"
              title="game rules by Sheldon"
              width={frameWidth}
              height={frameHeight}
              src={videoLink}
            ></iframe>
            <div className="descr-wrapper">
              <p className="descr-wrapper__bold">Rock Paper Scissors Lizard Spock</p>
              <p className="descr-wrapper__regular">The Big Bang Theory</p>
            </div>
            <img className="game-rules-pic" src={rulesPic} alt="Game rules"></img>
          </div>
        </div>
      </div>
    );
  }
}
