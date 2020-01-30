import GameService, { MAX_ATTEMPTS } from '../game'
import { GameStatus } from '../game'
import Fixed from '../generators/fixed';


describe('game service test suit', () => {
  const generator =  new Fixed([0,0,0,0]);
  let service = new GameService(generator);

  beforeEach(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  test('GameService is an object', () => {
    expect(service).toBeInstanceOf(Object);

  });

  test('GameService to contain getGame method', () => {
    expect(service.getGame).toBeInstanceOf(Function);
  });

  test('GameService to contain guess method', () => {
    expect(service.guess).toBeInstanceOf(Function);
  });

  test('GameService to contain restart method', () => {
    expect(service.restart).toBeInstanceOf(Function);
  });

  test('GameService to fetch secret codes', async () => {
    const game = await service.restart();
    expect(game.secret).toEqual([0,0,0,0])
  });

  test('GameService allows to guess a correct number and its correct location', async () => {
    const game = await service.restart().then(_ => service.guess([0,0,0,1]));
    const expected = {
      attempts: 1,
      history: [{
        correctDigits: 4,
        correctLocations: 3,
        message: 'The player had guessed a correct number and its correct location',
        numbers: [0,0,0,1]
      }],
      secret: [0,0,0,0],
      status: 'started',
      win: false,
    };
    expect(game).toEqual(expected);
  });

  test('GameService allows to guess an incorrect number', async () => {
    let game = await service.restart().then(_ => service.guess([1,1,1,1]));
    const expected = {
      attempts: 1,
      history: [{
        correctDigits: 0,
        correctLocations: 0,
        message: 'The player’s guess was incorrect',
        numbers: [1,1,1,1]
      }],
      secret: [0,0,0,0],
      status: 'started',
      win: false,
    };
    expect(game).toEqual(expected);
  });

  test('GameService allows to guess a correct number', async () => {
    const custom = new GameService(new Fixed([1,2,3,4]));
    const game = await custom.restart().then(_ => custom.guess([4,5,6,7]));
    const expected = {
      attempts: 1,
      history: [{
        correctDigits: 1,
        correctLocations: 0,
        message: 'The player had guessed a correct number',
        numbers: [4,5,6,7]
      }],
      secret: [1,2,3,4],
      status: 'started',
      win: false,
    };
    expect(game).toEqual(expected);
  });

  test('GameService should game over after max attempts', async () => {
    await service.restart().then(async () => {
      let game;
      // Guess 10 times
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        game = await service.guess([0,0,0,1]);
      }

      expect(game.win).toEqual(false);
      expect(game.attempts).toEqual(MAX_ATTEMPTS);
      expect(game.status).toEqual(GameStatus.ENDED);

      await expect(service.guess([0,0,0,1])).rejects.toThrowError(Error);
    });
  });

  test('GameService should end with right guess', async () => {
    await service.restart(async() => {
      const game = await service.guess([0,0,0,0]);
      expect(game.status).toEqual(GameStatus.ENDED);
      expect(game.win).toEqual(true);
    });
  });

  test('GameService should restart', async () => {
    const game = await service.restart(async() => {
      const game = await service.guess([0,0,0,0]);
      expect(game.status).toEqual(GameStatus.ENDED);

      await expect(service.guess([0,0,0,1])).rejects.toThrowError(Error);
    });


    await service.restart();
    service.getGame().then((game) => {
      expect(game.status).toEqual(GameStatus.STARTED);
    });
  });
});
