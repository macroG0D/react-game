import React, { Component } from 'react';
import './name-input.scss';

export default class NameInput extends Component {
  constructor() {
    super();
    this.inputpageLabel = 'Please enter your nickname';
  }

  state = {
    currentPlayerName: '',
  };

  checkIfNameIsCorrect = (e) => {
    const nameInputField = document.querySelector('input');
    const { value } = nameInputField;
    const textLabel = document.querySelector('h3');
    if (value.length < 3) {
      nameInputField.classList.add('wrong');
    } else {
      textLabel.textContent = this.inputpageLabel;
      nameInputField.classList.remove('wrong');
      this.setState({
        currentPlayerName: e.target.value,
      });
    }
  };

  submitName = (e) => {
    e.preventDefault();
    const nameInputField = document.querySelector('input');
    const textLabel = document.querySelector('h3');
    const { value } = nameInputField;
    if (value.length >= 3) {
      const { currentPlayerName } = this.state;
      this.props.addCurrentPlayerName(currentPlayerName);
      this.setState({
        currentPlayerName: '',
      });
    } else {
      textLabel.textContent = 'Nickname should contain at least 3 symbols';
      this.checkIfNameIsCorrect();
    }
  };
  render() {
    return (
      <form className="name-input-wrapper" onSubmit={this.submitName}>
        <h3 className="name-input-wrapper__text-label">
          {this.inputpageLabel}
        </h3>
        <input
          className="name-input-wrapper__input-name"
          type="text"
          maxLength="18"
          placeholder="Nickname"
          onChange={this.checkIfNameIsCorrect}
        ></input>
        <button type="submit" className="submit-name">
          Enter
        </button>
      </form>
    );
  }
}
