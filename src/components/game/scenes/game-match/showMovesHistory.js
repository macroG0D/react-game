import React, { Component } from 'react';

export default class ShowMovesHistory extends Component {
  render() {
    if (!this.props.playerMoves) return false;
    const playerName = this.props.playerName;
    const movesList = this.props.playerMoves.map((move, index) => {
      return (
        <img
          key={`${index + 1}_${playerName}-${move.title}`}
          className="moves-history__images"
          src={move.image}
          alt={move.title}
        />
      );
    });
    return <React.Fragment>{movesList}</React.Fragment>;
  }
}
