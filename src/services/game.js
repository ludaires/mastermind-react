// Effects
import UIfx from "uifx";
import gameOverAudio from '../assets/sounds/game_over.mp3';
import stateClearAudio from '../assets/sounds/stage_clear.mp3';

const GAME_KEY = 'mastermind-game';
export const MAX_ATTEMPTS = 10;

const sfx = {
  GameOverFx: new UIfx(gameOverAudio),
  StageClearFx: new UIfx(stateClearAudio)
};

export const GameStatus = {
  NOT_STARTED: 'not-started',
  STARTED: 'started',
  ENDED: 'finished'
};

class GameService {
  constructor(generator) {
    this.generator = generator;
  }

  async guess(numbers) {
    let game = await this.getGame();
    if (game.status === GameStatus.ENDED) {
      throw new Error('Cannot accept any more guesses: game over.');
    }

    let secret = game.secret;
    game.attempts = game.history.length + 1;
    game.win = secret.join() === numbers.join();
    let row = {
      numbers: numbers,
      correctDigits: secret.filter((value) => numbers.indexOf(value) > -1).length,
      correctLocations: secret.filter((value, index) => numbers[index] === value).length
    };

     if (game.attempts < MAX_ATTEMPTS) {
       if (game.win) {
         row.message = 'You Win!';
         game.status = GameStatus.ENDED;
       } else if (row.correctDigits > 0 && row.correctLocations > 0) {
         row.message = `The player had guessed a correct number and its correct location`;
       } else if (row.correctDigits > 0) {
         row.message = `The player had guessed a correct number`;
       } else {
         row.message = `The player’s guess was incorrect`;
       }
    } else {
       game.status = GameStatus.ENDED;
       row.message = 'Game Over';
    }

    game.history.push(row);
    sessionStorage.setItem(GAME_KEY, JSON.stringify(game));
    this.handleFx(game);

    return game;
  }

  handleFx(game) {
    if (!HTMLMediaElement.prototype.load) {
      return;
    }

    if (game.status !== GameStatus.ENDED) {
      return;
    }

    if (game.status === GameStatus.ENDED) {
      if (game.win) {
        sfx.StageClearFx.play(1);
        sfx.GameOverFx.setVolume(0);

      } else {
        sfx.StageClearFx.setVolume(0);
        sfx.GameOverFx.play(1);
      }
    } else {
      sfx.StageClearFx.setVolume(0);
      sfx.GameOverFx.setVolume(0);
    }
  }

  async restart() {
    await this.clean();
    let secret = await this.generator.secret();
    let game = {
      attempts: 0,
      win: false,
      secret: secret,
      status: GameStatus.STARTED,
      history: [],
    };

    sessionStorage.setItem(GAME_KEY, JSON.stringify(game));
    this.handleFx(game);
    return game;
  }

  async getGame() {
    let game = JSON.parse(sessionStorage.getItem(GAME_KEY));
    if (!game) {
      game = await this.restart();
    }

    return game;
  }

  clean() {
    sessionStorage.removeItem(GAME_KEY);
  }
}

export default GameService;
