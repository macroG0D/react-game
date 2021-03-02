import gameCountSound from '../../../assets/ingame-assets/rock-paper-schissors-lizard-spock.mp3';
import winSound from '../../../assets/ingame-assets/winner.mp3';
import didMove from '../../../assets/ingame-assets/did-move.mp3';
import backgroundMusic from '../../../assets/ingame-assets/bg-music.mp3';

export default class GameSounds {
  static async playSound(type) {
    const audio = new Audio();
    if (type === 'countdown') {
      audio.src = gameCountSound;
      audio.volume = 0.2;
    }
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

  static backgroundMusic = () => {
    const bgAudio = new Audio();
    bgAudio.loop = true;
    bgAudio.src = backgroundMusic;
    bgAudio.volume = 0.05;
    bgAudio.play();
  };
}