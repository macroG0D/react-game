import React, { Component } from 'react';
import { WEAPONSIMAGES } from '../../../../static/global';
import Player from '../../player/player';
import { WEAPONS } from '../../../../static/global';

import profilePic from '../../../../assets/ingame-assets/profile-pic.svg';
import './game-match.scss';

const { Rock, Scissors, Paper, Lizard, Spock } = WEAPONSIMAGES;
export default class GameMatch extends Component {
  constructor() {
    super();
    this.isGameActive = false;
    this.players = [];
    this.activePlayers = 0;
  }

  state = {
    currentPlayerName: '',
  };

  setCurrentPlayerName = () => {
    this.setState({
      currentPlayerName: this.props.currentPlayerName,
    });
  };

  newGame = () => {
    if (!this.isGameActive) {
      this.createPlayers();
      this.isGameActive = true;
    }
    return this.setPlayers();
  };

  createPlayers = () => {
    this.usersList.push({
      name: this.props.currentPlayerName,
      pic: undefined,
      isNPC: false,
      isCurrentPlayer: true,
    });
    this.usersList.forEach((user) => {
      const { name, pic, isNPC, isCurrentPlayer } = user;
      this.players.push(new Player(name, pic, isNPC, isCurrentPlayer));
    });
  };

  setPlayers = () => {
    return this.players.map((player) => {
      if (player.isCurrentPlayer) return false;
      if (!player.pic) player.pic = profilePic;
      this.activePlayers += 1;
      return (
        <div key={player.name} className="opponent-card">
          <h3>{player.name}</h3>
          <img
            className="opponent-card__image"
            src={player.pic}
            alt="opponent"
          ></img>
          <div className="moves-history">{this.updatePlayerMoves()}</div>
        </div>
      );
    });
  };

  checkMoveResults = () => {
    this.players.forEach((player, i) => {
      if (player.isDead) return; // здесь есть проблема — здесь мы упускаем вариант когда за один ход игрок проиграл но и унес кого-то с собой
      if (this.activePlayers === 1) return;
      const { movesHistory } = player;
      const weaknesses = movesHistory[movesHistory.length - 1].weaknesses;
      this.players.forEach((otherplayer, j) => {
        if (i === j) return; // prevent selfcheck
        const opponentAttackWith =
          otherplayer.movesHistory[otherplayer.movesHistory.length - 1].title;
        console.log(otherplayer.movesHistory);
        if (weaknesses.indexOf(opponentAttackWith) !== -1) {
          console.log(`${player.name} defeated`);
          // this.players[i] = null;
          player.isDead = true; // и от сюда та проблема возникает — из за того, что здесь мы говорим что игрок мертв
          this.activePlayers = this.checkActivePlayersCount();
        }
      });
    });
  };

  checkActivePlayersCount = () => {
    let activePlayrs = 0;
    this.players.forEach((player) => {
      if (!player.isDead) activePlayrs += 1;
    });
    return activePlayrs;
  };

  getMovementImage = (move) => {
    const { title } = move;

    if (title === 'rock') {
      return Rock;
    }
    if (title === 'scissors') {
      return Scissors;
    }
    if (title === 'paper') {
      return Paper;
    }
    if (title === 'lizard') {
      return Lizard;
    }
    if (title === 'spock') {
      return Spock;
    } else {
      return undefined;
    }
  };

  playMove = (currentPlayerMove) => {
    const opponentsCards = document.querySelectorAll('.opponent-card__image');
    if (this.activePlayers === 1) return;
    this.players.forEach((player, i) => {
      if (player.isCurrentPlayer) {
        const currentPlayerWeapon = WEAPONS.findIndex((weapon) => weapon.title === currentPlayerMove)
        player.updateHistory(WEAPONS[currentPlayerWeapon])
      } else {
        if (player.isDead) return;
        if (player.isCurrentPlayer) return;
        player.updateHistory(player.autoMove());
        const { movesHistory } = player;
        const lastMove = movesHistory[movesHistory.length - 1];
        opponentsCards[i].src = this.getMovementImage(lastMove);
      }

    });
    this.checkMoveResults();
  };

  updatePlayerMoves = () => {
    let result;
    this.players.forEach((player) => {
      const { movesHistory } = player;
      result = movesHistory.map((playerMove) => {
        return (
          <img
            className="player-move"
            src={() => this.getMovementImage(playerMove.title)}
            alt={playerMove.title}
          ></img>
        );
      });
    });
    return result;
  };

  usersList = [
    {
      name: 'bobo',
      pic: undefined,
      isNPC: true,
      isCurrentPlayer: false,
    },
    {
      name: 'sheldon',
      pic: undefined,
      isNPC: true,
      isCurrentPlayer: false,
    },
  ];

  attack = (title, key) => {
    const playeroptions = document.querySelectorAll('.weapon-card');
    playeroptions.forEach((el) => {
      if (el.title !== title) {
        el.classList.add('diactivate');
      }
    });
  };

  setPlayerWeapons = () => {
    return WEAPONS.map((weapon) => {
      const { title, image, key } = weapon;
      return (
        <div key={title} title={title} className="weapon-card">
          <img
            className="weapon-card__image"
            // onClick={() => this.attack(title, key)}
            onClick={() => this.playMove(title)}
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
        <div className="current-player-label-wrapper">
          <h1>{this.state.currentPlayerName}</h1>
        </div>
      </div>
    );
  };

  setOpponents = () => {
    return this.newGame();
  };

  componentDidMount() {
    this.setCurrentPlayerName();
  }

  render() {
    // console.log(this.state.currentPlayerName);
    return (
      <div className="game-match">
        <div className="opponents">{this.setOpponents()}</div>
        {this.setPlayerTable()}
      </div>
    );
  }
}
