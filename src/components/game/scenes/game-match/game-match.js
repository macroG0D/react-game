import React, { Component } from 'react';

import rock from '../../../../assets/ingame-assets/rock.png';
import scissors from '../../../../assets/ingame-assets/scissors.png';
import paper from '../../../../assets/ingame-assets/paper.png';
import lizard from '../../../../assets/ingame-assets/lizard.png';
import spock from '../../../../assets/ingame-assets/spock.png';

// import { Link } from 'react-router-dom';

import './game-match.scss';

export default class GameMatch extends Component {
  weapons = [
    {
      title: 'rock',
      image: rock,
      key: 'r',
    },
    {
      title: 'scissors',
      image: scissors,
      key: 's',
    },
    {
      title: 'paper',
      image: paper,
      key: 'p',
    },
    {
      title: 'lizard',
      image: lizard,
      key: 'l',
    },
    {
      title: 'spock',
      image: spock,
      key: 'y',
    },
  ];

  attack = (title, key) => {
    const playeroptions = document.querySelectorAll('.weapon-card');
    playeroptions.forEach((el) => {
      if (el.title !== title) {
        el.classList.add('diactivate');
      }
    })

    // console.log(title, key);
    // console.log(this);
  }

  setPlayerWeapons = () => {
    return this.weapons.map((weapon) => {
      const {title, image, key} = weapon;
      return (
        <div key={title} title={title} className="weapon-card">
          <img
            className="weapon-card__image"
            onClick={() => this.attack(title, key)}
            src={image}
            alt={title}
          ></img>
          <h2>{key}</h2>
        </div>
      );
    });
  };

  setPlayerTable = () => {
    return (
      <div className="game-match__table">
        <div className="playerWeapons-wrapper">{this.setPlayerWeapons()}</div>
      </div>
    );
  };

  render() {
    return <div className="game-match">{this.setPlayerTable()}</div>;
  }
}
