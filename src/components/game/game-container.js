import React, { Component } from 'react';
import { SAFEZONE } from '../../static/global';
import MainMenu from './scenes/main-menu';
import GameMatch from './scenes/game-match';
import NameInput from './scenes/name-input';
import Settings from './scenes/settings';

import backgroundMusic from '../../assets/ingame-assets/bg-music.mp3';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './game-container.scss';

export default class GameContainer extends Component {
  constructor() {
    super();
    this.width = 984;
    this.height = 600;
    this.defaultGameSettings = {
      currentPlayerName: '',
      sounds: true,
      music: false,
      players: 3,
      realPlayer: 1
    };
    this.storedSettings = undefined;
    this.bgMusic = new Audio();
    this.bgMusic.volume = 0.05;
    this.bgMusic.src = backgroundMusic;
  }

  calculateNewCanvasSize = (width) => {
    return Math.floor(width / 1.777);
  };

  calculateCanvasSize = () => {
    let newWidth = window.innerWidth;
    let newHeight = this.calculateNewCanvasSize(newWidth);
    while (newHeight > window.innerHeight - SAFEZONE) {
      newWidth -= 10;
      newHeight = this.calculateNewCanvasSize(newWidth);
    }
    this.width = newWidth;
    this.height = newHeight;
  };

  updateCanvasSize = () => {
    this.calculateCanvasSize();
    const { width, height } = this;
    const gameContainer = document.querySelector('.gameContainer');
    gameContainer.style.width = `${width}px`;
    gameContainer.style.height = `${height}px`;
  };

  state = {
    gameSettings: {},
  };

  updateLocalStorage = (newKeyValue) => {
    const LS = window.localStorage;
    const storedGameData = LS.getItem('rpsls-data');
    const storedGameDataObject = JSON.parse(storedGameData);
    Object.assign(storedGameDataObject, newKeyValue);
    const updatedJSON = JSON.stringify(storedGameDataObject);
    LS.setItem('rpsls-data', updatedJSON);
    this.setState({ gameSettings: storedGameDataObject });
  };

  updateSettingsState = () => {
    const LS = window.localStorage;
    let storedGameData = LS.getItem('rpsls-data');
    if (!storedGameData) {
      storedGameData = JSON.stringify(this.defaultGameSettings);
      LS.setItem('rpsls-data', storedGameData);
    }

    this.setState({ gameSettings: JSON.parse(storedGameData) });
    this.storedSettings = JSON.parse(storedGameData);
  };

  newGame = () => {
    const { currentPlayerName, players, realPlayer, sounds } = this.state.gameSettings;
    if (currentPlayerName) {
      return (
        <GameMatch
          currentPlayerName={currentPlayerName}
          totalPlayers={players}
          realPlayers={realPlayer}
          soundsOn={sounds}
        />
      );
    } else {
      return (
        <NameInput
          addCurrentPlayerName={(name) =>
            this.updateLocalStorage({ currentPlayerName: name })
          }
        />
      );
    }
  };


  settings = () => {

    return (
    <Settings
      totalPlayers={(number) => this.updateLocalStorage({players: +number + 1})}
      addCurrentPlayerName={(name) =>
        this.updateLocalStorage({ currentPlayerName: name })
      }
      onSoundSettingChange={(onoff) =>
        this.updateLocalStorage({ sounds: onoff })
      }
      onMusicSettingChange={(onoff) =>
        this.updateLocalStorage({ music: onoff })
      }
      currentSettingsState={this.storedSettings}
    />
    )
  }

  createGameContainer = () => {
    this.calculateCanvasSize();
    const { width, height } = this;
    return (
      <div
        className="gameContainer"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Router>
          <Route path="/play" component={MainMenu} exact />
          <Route path="/play/newGame" render={this.newGame} exact />
          <Route path="/play/settings" render={this.settings} exact />
        </Router>
      </div>
    );
  };

  componentDidMount() {
    window.addEventListener('resize', () => this.updateCanvasSize());
    this.updateSettingsState();
  }
  componentWillUnmount() {
    this.bgMusic.pause();
  }

  render() {
    const {music} = this.state.gameSettings;
    if (music) this.bgMusic.play();
    return <React.Fragment>{this.createGameContainer()}</React.Fragment>;
  }
}
