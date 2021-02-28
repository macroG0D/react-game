import React, { Component } from 'react';

import Player from '../../player/player';

import { WEAPONS, getWeaponImage, usersDB } from '../../../../static/global';

import profileDefaultPic from '../../../../assets/ingame-assets/profile-pic.svg';

import './game-match.scss';

export default class GameMatch extends Component {
  constructor() {
    super();
    this.totalPlayers = 3;
    this.realPlayersCount = 1;
    this.status = {
      isStarted: false,
      isFinished: false,
    };
    this.players = [];
    this.activePlayers = 0;
  }

  state = {
    currentPlayerName: null,
    countdown: null,
    counter: null,
  };

  setCurrentPlayerName = () => {
    this.setState({
      currentPlayerName: this.props.currentPlayerName,
    });
  };

  newGame = () => {
    const { status } = this;
    this.setCurrentPlayerName();
    if (!status.isStarted) { // if started === true check in LS
      this.isStarted = true;
      this.createPlayers();
    }
    return this.updateGameTable();
  };

  generateUsersList = (totalPlayersCount) => {
    const usedIndexes = [];
    const usersList = [];
    for (let i = 0; i < totalPlayersCount - this.realPlayersCount; i += 1) {
      const randomUserIndex = Math.floor(Math.random() * usersDB.length);
      if (usedIndexes.indexOf(randomUserIndex) === -1) {
        usedIndexes.push(randomUserIndex);
        usersList.push(usersDB[randomUserIndex]);
      } else {
        i -= 1;
      }
      usersList[i].isNPC = true;
      usersList[i].isCurrentPlayer = false;
    }
    usersList.push(this.currentPlayerObject());
    return usersList;
  };

  currentPlayerObject = () => {
    return {
      name: this.props.currentPlayerName,
      pic: undefined,
      isNPC: false,
      isCurrentPlayer: true,
    };
  };

  createPlayers = () => {
    const usersList = this.generateUsersList(this.totalPlayers);
    usersList.forEach((user) => {
      const { name, pic, isNPC, isCurrentPlayer } = user;
      this.players.push(new Player(name, pic, isNPC, isCurrentPlayer));
    });
  };

  oponentCard = ({ name, pic }) => {
    return (
      <div key={name} className="opponent-card">
        <h3>{name}</h3>
        <img className="opponent-card__image" src={pic} alt="opponent"></img>
        {/* <div className="moves-history">{this.updatePlayerMoves()}</div> */}
      </div>
    );
  };

  setPlayerWeapons = () => {
    return WEAPONS.map((weapon) => {
      const { title, image, key } = weapon;
      return (
        <div key={title} title={title} className="weapon-card">
          <img
            className="weapon-card__image"
            onClick={() => this.playerMakeMove(title)}
            src={image}
            alt={title}
          ></img>
          <h2>{key}</h2>
        </div>
      );
    });
  };

  playerMakeMove = (weaponTitle) => {
    const usedWeapon = WEAPONS.find((weapon) => weapon.title === weaponTitle);
    const currentPlayer = this.players.find((player) => player.isCurrentPlayer);
    if (!currentPlayer.didLastMove && !currentPlayer.isDead) {
      // cant make many moves in one turn
      currentPlayer.didLastMove = true;
      currentPlayer.updateHistory(usedWeapon);
    }
    return;
  };

  npcsMakeMove = () => {
    const activeNPCplayers = this.players.filter(
      (player) => !player.isDead && player.isNPC
    );
    activeNPCplayers.forEach((npc) => npc.autoMove());
  };

  checkSetResults = () => {
    console.log('results:');
    console.log(this.players);
    const activePlayers = this.players.filter((player) => !player.isDead);
    activePlayers.forEach((player, i) => {
      if (!player.didLastMove) {
        player.isDead = true;
        return;
      }
      const { movesHistory } = player;
      const weaknesses = movesHistory[movesHistory.length - 1].weaknesses;
      activePlayers.forEach((otherplayer, j) => {
        if (i === j) return; // prevent selfcheck
        if (!otherplayer.didLastMove) return;
        const opponentAttackWith =
          otherplayer.movesHistory[otherplayer.movesHistory.length - 1].title;
        if (weaknesses.indexOf(opponentAttackWith) !== -1) {
          player.isDead = true;
        }
      });
    });
    activePlayers.forEach((player) => {
      console.log(
        player.name,
        ' last move',
        player.movesHistory[player.movesHistory.length - 1]
      );
      if (player.isDead) {
        console.log(player.name, ' is defeated!');
      }
    });
  };

  setCurrentPlayerOnTable = () => {
    return (
      <div className="game-match__table">
        <div className="playerWeapons-wrapper">{this.setPlayerWeapons()}</div>
        <div className="current-player-label-wrapper">
          <h1>{this.state.currentPlayerName}</h1>
        </div>
      </div>
    );
  };

  setOpponentsOnTable = () => {
    return this.players.map((player) => {
      if (player.isCurrentPlayer) return false;
      if (!player.pic) player.pic = profileDefaultPic;
      this.activePlayers += 1;
      return this.oponentCard(player);
    });
  };

  updateGameTable = () => {};

  componentDidMount() {
    this.setCurrentPlayerName();
    this.newGame();
    this.startNewSet();
  }

  startNewSet = () => {
    this.npcsMakeMove();
    this.wait(2000)
      .then(() => {
        this.setState({
          countdown: 5,
          counter: 0,
        });
        return this.wait();
      })
      .then(() => {
        this.setState({
          countdown: 4,
          counter: 1,
        });
        return this.wait();
      })
      .then(() => {
        this.setState({
          countdown: 3,
          counter: 2,
        });
        return this.wait();
      })
      .then(() => {
        this.setState({
          countdown: 2,
          counter: 3,
        });
        return this.wait();
      })
      .then(() => {
        this.setState({
          countdown: 1,
          counter: 4,
        });
        return this.wait();
      })
      .then(() => {
        this.checkSetResults();
        this.setState({
          countdown: 0,
          counter: '',
        });
      });
  };

  wait(ms = 500) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  counterWeaponsName = () => {
    const { counter } = this.state;
    if (typeof counter === 'number') {
      return WEAPONS[counter].title;
    }
    return;
  };

  countDownLabel = () => {
    const { countdown } = this.state;
    if (!isNaN(countdown) && countdown > 0) return countdown;
    if (countdown === 0) return 'Results';
    return 'Prepare';
  };

  render() {
    return (
      <div className="game-match">
        <div className="opponents">{this.setOpponentsOnTable()}</div>
        <div className="countdown-wrapper">
          <span className="countdown-wrapper__counter">
            {this.countDownLabel()}
          </span>
          <div className="countdown-wrapper__text-label">
            {this.counterWeaponsName()}
          </div>
        </div>
        {this.setCurrentPlayerOnTable()}
      </div>
    );
  }
}
