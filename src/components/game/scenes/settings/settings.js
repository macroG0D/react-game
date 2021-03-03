import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './settings.scss';

export default class Settings extends Component {
  constructor() {
    super();
    this.inputpageLabel = 'Change nickname';
  }

  state = {
    currentPlayerName: '',
    opponentsNumber: 3,
    sounds: true,
    music: false,
  };

  rangeResult = () => {
    const opponentsNumber = document.querySelector('.opponentsNumber').value;
    this.setState({
      opponentsNumber: opponentsNumber,
    });
    this.props.totalPlayers(opponentsNumber);
  };

  soundCheck = () => {
    const sound = document.querySelector('.soundCheck').checked;
    this.setState({
      sounds: sound,
    });
    this.props.onSoundSettingChange(sound);
  };
  musicCheck = () => {
    const music = document.querySelector('.musicCheck').checked;
    this.setState({
      music: music,
    });
    this.props.onMusicSettingChange(music);
  };

  setDefaultValues = () => {
    let currentSettingsState = {
      currentPlayerName: '',
      opponentsNumber: 3,
      sounds: true,
      music: false,
    };
    if (!this.props.currentSettingsState) {
      const LS = window.localStorage;
      let storedGameData = LS.getItem('rpsls-data');
      this.storedSettings = JSON.parse(storedGameData);
      currentSettingsState = this.storedSettings;
    } else {
      currentSettingsState = this.props.currentSettingsState;
    }
    const { players, music, sounds } = currentSettingsState;
    this.setState({
      opponentsNumber: +players -1,
      sounds: sounds,
      music: music,
    });
  };

  componentDidMount = () => {
    this.setDefaultValues();
  };

  refreshPage = () =>{
    window.location.replace('/play');
 }

  render() {
    const { opponentsNumber, music, sounds } = this.state;
    return (
      <div className="global-settings-wrapper">
        <div className="settings-wrapper">
          <div className="audio-checkbox">
            <span className="settings-label">Sounds</span>
            <input
              onChange={this.soundCheck}
              className="soundCheck"
              type="checkbox"
              checked={sounds}
            ></input>
          </div>

          <div className="audio-checkbox">
            <span className="settings-label">Music</span>
            <input
              onChange={this.musicCheck}
              className="musicCheck"
              type="checkbox"
              checked={music}
            ></input>
          </div>

          <hr></hr>
          <div className="settings-wrapper">
            <span className="settings-label">Number of Opponents</span>
            <input
              onChange={this.rangeResult}
              type="range"
              min="1"
              max="4"
              value={opponentsNumber}
              className="opponentsNumber"
            />
            {opponentsNumber}
          </div>

          <hr></hr>

          <div className="settings-wrapper">
            <form className="name-input-wrapper" onSubmit={this.submitName}>
              <span className="settings-label">{this.inputpageLabel}</span>
              <input
                className="name-input-wrapper__input-name"
                type="text"
                maxLength="18"
                placeholder="Nickname"
                onChange={this.checkIfNameIsCorrect}
              ></input>
              <button type="submit" className="submit-name">
                Save settings
              </button>
            </form>
          </div>

          <hr></hr>

          <button className="btn-reset-score">Reset score table</button>
          <button onClick={this.refreshPage} className="submit-back">Back</button>
        </div>
      </div>
    );
  }
}
