import gameCountSound from '../../../assets/ingame-assets/rock-paper-schissors-lizard-spock.mp3';
import winSound from '../../../assets/ingame-assets/winner.mp3';
import didMove from '../../../assets/ingame-assets/did-move.mp3';

export default class GameSounds {
  static async playSound (type) {
    const audio = new Audio();
    if (type === 'countdown') {audio.src = gameCountSound};
    if (type === 'win') {audio.src = winSound};
    if (type === 'did-move') {audio.src = didMove};
    await audio.play();
  }
}