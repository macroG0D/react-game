
import Rock from '../assets/ingame-assets/rock.png';
import Scissors from '../assets/ingame-assets/scissors.png';
import Paper from '../assets/ingame-assets/paper.png';
import Lizard from '../assets/ingame-assets/lizard.png';
import Spock from '../assets/ingame-assets/spock.png';

export const SAFEZONE = 200;

export const WEAPONS = [
  {
    title: 'rock',
    image: Rock,
    weaknesses: ['paper', 'spock'],
    key: 'r',
  },
  {
    title: 'scissors',
    image: Scissors,
    weaknesses: ['rock', 'spock'],
    key: 's',
  },
  {
    title: 'paper',
    image: Paper,
    weaknesses: ['scissors', 'lizard'],
    key: 'p',
  },
  {
    title: 'lizard',
    image: Lizard,
    weaknesses: ['rock', 'scissors'],
    key: 'l',
  },
  {
    title: 'spock',
    image: Spock,
    weaknesses: ['paper', 'lizard'],
    key: 'y',
  },
];

export const WEAPONSIMAGES = {Rock, Scissors, Paper, Lizard, Spock}
