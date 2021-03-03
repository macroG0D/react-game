// import gameCountSound from '../../../assets/ingame-assets/rock-paper-schissors-lizard-spock.mp3';
import rockSound from '../../../assets/ingame-assets/rock.mp3';
import paperSound from '../../../assets/ingame-assets/paper.mp3';
import schissorsSound from '../../../assets/ingame-assets/schissors.mp3';
import lizardSound from '../../../assets/ingame-assets/lizard.mp3';
import spockSound from '../../../assets/ingame-assets/spock.mp3';
import winSound from '../../../assets/ingame-assets/winner.mp3';
import didMove from '../../../assets/ingame-assets/did-move.mp3';

export default class GameSounds {
  static async playSound(type, soundsOn = true) {
    if (!soundsOn) return;
    const audio = new Audio();
    if (type === 'win') {
      audio.src = winSound;
      audio.volume = 0.1;
    }
    if (type === 'did-move') {
      audio.src = didMove;
      audio.volume = 0.3;
    }
    await audio.play();
  }

  static async countDownSound(word, soundsOn = true) {
    if (!soundsOn) return;
    const audio = new Audio();
    audio.volume = 0.2;
    if (word === 'rock') {
      audio.src = `${rockSound}`;
    }
    if (word === 'paper') {
      audio.src = `${paperSound}`;
    }
    if (word === 'schissors') {
      audio.src = `${schissorsSound}`;
    }
    if (word === 'lizard') {
      audio.src = `${lizardSound}`;
    }
    if (word === 'spock') {
      audio.src = `${spockSound}`;
    }
    await audio.play();
  }
}
