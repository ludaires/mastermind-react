import GameActionsTypes from '../types';
import { getGame, guess, restart } from '../../actions';
import service from '../../services';

describe('actions test suit', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  test('GameActionTypes is an object', () => {
    expect(GameActionsTypes).toBeInstanceOf(Object);
    expect(GameActionsTypes.GUESS).toBeDefined();
    expect(GameActionsTypes.GET).toBeDefined();
    expect(GameActionsTypes.RESTART).toBeDefined();
  });

  test('actions to contain get game action', () => {
    expect(getGame).toBeInstanceOf(Function);
  });

  test('actions to contain guess action', () => {
    expect(guess).toBeInstanceOf(Function);
  });

  test('actions to contain restart action', () => {
    expect(restart).toBeInstanceOf(Function);
  });

  test('getGame action dispatches get game', (done) => {
    getGame()(dispatch).then(async () => {
      expect(dispatch).toHaveBeenCalledWith({ type: GameActionsTypes.GET, payload: await service.getGame() });
      done();
    });
  });

  test('restart action dispatches restart game', (done) => {
    restart()(dispatch).then(async () => {
      expect(dispatch).toHaveBeenCalledWith({ type: GameActionsTypes.RESTART, payload: await service.getGame() });
      done();
    });
  });

  test('guess action dispatches guess numbers', (done) => {
    guess([1,2,3,4])(dispatch).then(async () => {
      expect(dispatch).toHaveBeenCalledWith({ type: GameActionsTypes.GUESS, payload: await service.getGame() });
      done();
    });
  });
});
