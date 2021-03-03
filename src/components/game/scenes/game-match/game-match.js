import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Player from '../../player/player';
import ShowMovesHistory from './showMovesHistory';

import { WEAPONS, getWeaponImage, usersDB } from '../../../../static/global';
import GameSounds from '../../audio/audio';

import profileDefaultPic from '../../../../assets/ingame-assets/profile-pic.svg';

import './game-match.scss';

export default class GameMatch extends Component {
  constructor() {
    super();
    this.players = [];
  }

  state = {
    isStarted: false,
    currentPlayerName: null,
    players: [],
    defeatedPlayers: [],
    matchHistory: [],
    round: 0,
    countdown: null,
    counter: null,
  };

  setCurrentPlayerName = () => {
    this.setState({
      currentPlayerName: this.props.currentPlayerName,
    });
  };

  newGame = () => {
    const { isStarted } = this.state;
    this.setCurrentPlayerName();
    if (!isStarted) {
      // if started === true check in LS
      this.setState({
        isStarted: true,
      });
      this.createPlayers();
    } else {
      const emptyPlayers = [];
      this.setState({
        isStarted: false,
        currentPlayerName: null,
        countdown: null,
        counter: null,
        defeatedPlayers: [],
        matchHistory: [],
        players: emptyPlayers,
        round: 0,
      });
    }
  };

  generateUsersList = () => {
    const { totalPlayers, realPlayers } = this.props;
    const usedIndexes = [];
    const usersList = [];
    for (let i = 0; i < totalPlayers - realPlayers; i += 1) {
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
      players: [],
      name: this.props.currentPlayerName,
      pic: undefined,
      isNPC: false,
      isCurrentPlayer: true,
    };
  };

  createPlayers = () => {
    const usersList = this.generateUsersList();
    usersList.forEach((user) => {
      const { name, pic, isNPC, isCurrentPlayer } = user;
      this.players.push(new Player(name, pic, isNPC, isCurrentPlayer));
    });
  };

  opponentCard = ({ name, pic }) => {
    return (
      <div key={name} id={name} className="opponent-card">
        <h3>{name}</h3>
        <div className="opponent-card__image-wrapper">
          <img className="opponent-card__image" src={pic} alt="opponent"></img>
        </div>

        <div className="moves-history">
          <ShowMovesHistory
            playerName={name}
            playerMoves={this.getPlayerMoves(name)}
          />
        </div>
      </div>
    );
  };

  getPlayerMoves = (name) => {
    const { isStarted, players } = this.state;
    if (isStarted && players.length > 0) {
      const playerID = players.findIndex((player) => player.name === name);
      return playerID > -1 ? players[playerID].movesHistory : false;
    }
  };

  setPlayerWeapons = () => {
    return WEAPONS.map((weapon) => {
      const { title, image, key } = weapon;
      return (
        <div key={title} id={title} className="weapon-card">
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

  checkIfPlayerIsStillAlive = () => {
    const { defeatedPlayers } = this.state;
    return defeatedPlayers.some((player) => {
      return player.isCurrentPlayer === true;
    });
  };

  playerMakeMove = (weaponTitle) => {
    const userCards = document.querySelectorAll('.weapon-card');

    const usedWeapon = WEAPONS.find((weapon) => weapon.title === weaponTitle);
    const currentPlayer = this.getCurrentPlayer();
    if (
      !currentPlayer.didLastMove &&
      !currentPlayer.isDead &&
      !currentPlayer.isNPC
    ) {
      // cant make many moves in one turn
      GameSounds.playSound('did-move', this.props.soundsOn);
      currentPlayer.didLastMove = true;
      currentPlayer.updateHistory(usedWeapon);
      userCards.forEach((userCard) => {
        if (userCard.id !== weaponTitle) {
          userCard.classList.add('not-active');
        }
      });
    }
  };

  getCurrentPlayer = () => {
    return this.players.find((player) => player.isCurrentPlayer);
  };

  npcsMakeMove = () => {
    const activeNPCplayers = this.players.filter(
      (player) => !player.isDead && player.isNPC
    );
    activeNPCplayers.forEach((npc) => npc.autoMove());
  };

  checkSetResults = () => {
    let currentRound = this.state.round;
    this.setState({
      round: (currentRound += 1),
    });
    const temporaryDefeatedPlayers = [];

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
        if (!otherplayer.didLastMove) return; // prevent check defaulty-defeated afk player
        const opponentAttackWith =
          otherplayer.movesHistory[otherplayer.movesHistory.length - 1].title;
        if (weaknesses.indexOf(opponentAttackWith) !== -1) {
          player.isDead = true;
        }
      });
    });
    activePlayers.forEach((player) => {
      if (player.isDead) {
        temporaryDefeatedPlayers.push(player);
      }
    });
    const stillAlive = activePlayers.filter((player) => {
      return !player.isDead ? player : false;
    });
    this.roundResult(stillAlive, temporaryDefeatedPlayers);
  };

  roundResult = (stillAlive, temporaryDefeatedPlayers) => {
    if (stillAlive.length === 0) {
      // if no survivals
      this.setState({
        lastRoundResults: 'Draw, start over',
      });
      this.players.forEach((player) => {
        if (player.didLastMove) {
          player.didLastMove = false;
          player.isDead = false;
        } else if (!player.didLastMove) {
          this.updateDefeatedPlayersList([this.getCurrentPlayer()]);
        }
      });
      this.startNewSet();
    } else if (stillAlive.length > 1) {
      this.updateDefeatedPlayersList(temporaryDefeatedPlayers);
      this.setState({
        lastRoundResults: 'New round',
      });
      stillAlive.forEach((player) => {
        player.didLastMove = false;
      });
      this.startNewSet();
    } else {
      this.updateDefeatedPlayersList(temporaryDefeatedPlayers);
      GameSounds.playSound('win', this.props.soundsOn);
      this.setState({
        lastRoundResults: `${stillAlive[0].name} won!`,
        gameFinished: true,
      });
    }

    if (!this.state.gameFinished) {
      const userCards = document.querySelectorAll('.weapon-card');
      userCards.forEach((userCard) => {
        userCard.classList.remove('not-active');
      });
    }

    this.setState({
      players: this.players,
    });

    this.checkAsDefeated();
  };

  updateDefeatedPlayersList = (temporaryDefeatedPlayers) => {
    const updatedDefeatedPlayers = [
      ...this.state.defeatedPlayers,
      ...temporaryDefeatedPlayers,
    ];
    this.setState({
      defeatedPlayers: updatedDefeatedPlayers,
    });
  };

  checkAsDefeated = () => {
    this.state.defeatedPlayers.forEach((defeatedPlayer) => {
      if (defeatedPlayer.isCurrentPlayer) {
        const currentPlayerTable = document.querySelector('.game-match__table');
        if (!currentPlayerTable.classList.contains('not-active'))
          currentPlayerTable.classList.add('not-active');
      } else {
        const lostNPCcard = document.getElementById(defeatedPlayer.name);
        if (!lostNPCcard.classList.contains('not-active'))
          lostNPCcard.classList.add('not-active');
      }
    });
  };

  updateNPCImage = (setDefaultPic) => {
    const opponentsCards = document.querySelectorAll('.opponent-card__image');
    if (opponentsCards.length === 0) return;
    this.players.forEach((player, i) => {
      if (!setDefaultPic) {
        if (player.isCurrentPlayer) return;
        opponentsCards[i].src = player.pic;
      } else {
        if (player.isCurrentPlayer || player.isDead) return;
        const lastMove = player.movesHistory[player.movesHistory.length - 1];
        opponentsCards[i].src = getWeaponImage(lastMove);
      }
    });
  };

  showNPCProfileImage = () => {
    const opponentsCards = document.querySelectorAll('.opponent-card__image');
    if (opponentsCards.length === 0) return;
    this.players.forEach((player, i) => {
      if (player.isCurrentPlayer) return;
      opponentsCards[i].src = player.pic;
    });
  };

  setCurrentPlayerOnTable = () => {
    const { currentPlayerName } = this.state;
    return (
      <div className="game-match__table">
        <div className="playerWeapons-wrapper">{this.setPlayerWeapons()}</div>
        <div className="current-player-label-wrapper">
          <h3 className="current-player-label-wrapper__title">
            {currentPlayerName}
          </h3>
          <div className="moves-history">
            <ShowMovesHistory
              playerName={currentPlayerName}
              playerMoves={this.getPlayerMoves(currentPlayerName)}
            />
          </div>
        </div>
      </div>
    );
  };

  setOpponentsOnTable = () => {
    return this.players.map((player) => {
      if (player.isCurrentPlayer) return false;
      if (!player.pic) player.pic = profileDefaultPic;
      return this.opponentCard(player);
    });
  };

  componentDidMount() {
    this.setCurrentPlayerName();
    this.newGame();
    this.startNewSet();
    window.addEventListener('keydown', (e) => this.keyboardControl(e));
  }

  keyboardControl = (e) => {
    switch (e.code) {
      case 'KeyR':
        this.playerMakeMove('rock');
        break;
      case 'KeyP':
        this.playerMakeMove('paper');
        break;
      case 'KeyS':
        this.playerMakeMove('scissors');
        break;
      case 'KeyL':
        this.playerMakeMove('lizard');
        break;
      case 'KeyY':
        this.playerMakeMove('spock');
        break;
      default:
    }
  };

  startNewSet = () => {
    const { soundsOn } = this.props;
    this.wait(3000)
      .then(() => {
        GameSounds.countDownSound('rock', soundsOn);
        this.setState({
          countdown: 5,
          counter: 0,
        });
        this.updateNPCImage(false);
        return this.wait();
      })
      .then(() => {
        GameSounds.countDownSound('paper', soundsOn);
        this.setState({
          countdown: 4,
          counter: 1,
        });
        return this.wait();
      })
      .then(() => {
        GameSounds.countDownSound('schissors', soundsOn);
        this.setState({
          countdown: 3,
          counter: 2,
        });
        return this.wait();
      })
      .then(() => {
        GameSounds.countDownSound('lizard', soundsOn);
        this.setState({
          countdown: 2,
          counter: 3,
        });
        return this.wait();
      })
      .then(() => {
        GameSounds.countDownSound('spock', soundsOn);
        this.setState({
          countdown: 1,
          counter: 4,
        });
        return this.wait();
      })
      .then(() => {
        this.npcsMakeMove();
        this.checkSetResults();
        this.setState({
          countdown: 0,
          counter: '',
        });
        this.updateNPCImage(true);
      })
      .then(() => this.wait(2000))
      .then(() => this.updateNPCImage(true));
  };

  wait(ms = 300) {
    return new Promise((resolve) => {
      this.timeoutid = setTimeout(resolve, ms);
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
    const { countdown, lastRoundResults } = this.state;
    if (!isNaN(countdown) && countdown > 0) return countdown;
    if (countdown === 0) return lastRoundResults;
    return 'Prepare';
  };

  autoPlay = (e) => {
    const autoPlayBtn = e.target;
    const currentPlayer = this.getCurrentPlayer();
    autoPlayBtn.classList.toggle('btn-activated');
    const playerTable = document.querySelector('.game-match__table');
    if (!currentPlayer.isNPC) {
      currentPlayer.isNPC = true;
      playerTable.style.pointerEvents = 'none';
    } else {
      currentPlayer.isNPC = false;
      playerTable.style.pointerEvents = 'initial';
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', (e) => this.keyboardControl(e));
    clearInterval(this.timeoutid);
  }

  render() {
    return (
      <div className="game-match">
        <div className="round-number">
          <span className="round-number__label">round:</span>
          {this.state.round}
        </div>
        <Link to="/play">
          <div
            className="ingame-burger-wrapper"
          >
            <div className="ingame-burger"></div>
          </div>
        </Link>
        <div className="opponents">{this.setOpponentsOnTable()}</div>
        <div className="countdown-wrapper">
          <span className="countdown-wrapper__counter">
            {this.countDownLabel()}
          </span>
          <div className="countdown-wrapper__text-label">
            {this.counterWeaponsName()}
          </div>
        </div>
        {/* <div className="btn btn__restart" onClick={this.newGame}>
          restart
        </div> */}
        <div className="btn btn__autoplay" onClick={(e) => this.autoPlay(e)}>
          autoplay
        </div>
        {this.setCurrentPlayerOnTable()}
      </div>
    );
  }
}
