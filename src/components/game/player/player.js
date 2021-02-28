import { WEAPONS } from '../../../static/global';

export default class Player {
  constructor(name, pic = undefined, isNPC = false, isCurrentPlayer) {
    this.name = name;
    this.pic = pic;
    this.isNPC = isNPC;
    this.isCurrentPlayer = isCurrentPlayer;
    this.isDead = false;
    this.movesHistory = [];
    this.didLastMove = false;
  }

  autoMove = () => {
    const randomPick = Math.floor(Math.random() * 5);
    this.didLastMove = true;
    this.updateHistory(WEAPONS[randomPick]);
  };

  updateName = () => {};

  updatePic = () => {};

  updateHistory = (move) => {
    this.movesHistory.push(move);
  };
}
