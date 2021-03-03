
import Rock from '../assets/ingame-assets/rock.png';
import Scissors from '../assets/ingame-assets/scissors.png';
import Paper from '../assets/ingame-assets/paper.png';
import Lizard from '../assets/ingame-assets/lizard.png';
import Spock from '../assets/ingame-assets/spock.png';

import sheldonUserPic from '../assets/users-pics/sheldon.png';
import leonardUserPic from '../assets/users-pics/leonard.png';
import rajeshUserPic from '../assets/users-pics/rajesh.png';
import howardUserPic from '../assets/users-pics/howard.png';
import pennyUserPic from '../assets/users-pics/penny.png';

export const SAFEZONE = 200;

export const WEAPONS = [
  {
    title: 'rock',
    image: Rock,
    weaknesses: ['paper', 'spock'],
    key: 'r',
  },
  {
    title: 'paper',
    image: Paper,
    weaknesses: ['scissors', 'lizard'],
    key: 'p',
  },
  {
    title: 'scissors',
    image: Scissors,
    weaknesses: ['rock', 'spock'],
    key: 's',
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

export const getWeaponImage = (move) => {
  const { title } = move;

  if (title === 'rock') {
    return Rock;
  }
  if (title === 'scissors') {
    return Scissors;
  }
  if (title === 'paper') {
    return Paper;
  }
  if (title === 'lizard') {
    return Lizard;
  }
  if (title === 'spock') {
    return Spock;
  } else {
    return undefined;
  }
};

export const usersDB = [
  {
    name: 'Sheldon',
    pic: sheldonUserPic,
  },
  {
    name: 'Leonard',
    pic: leonardUserPic,
  },
  {
    name: 'Koothrappali',
    pic: rajeshUserPic,
  },
  {
    name: 'Howard',
    pic: howardUserPic,
  },
  {
    name: 'Penny',
    pic: pennyUserPic,
  },
];

export const WEAPONSIMAGES = {Rock, Scissors, Paper, Lizard, Spock}
