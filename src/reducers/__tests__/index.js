import GameActionsTypes from '../../actions/types';
import reducer from '../../reducers';
import service from '../../services';
import { INITIAL_STATE } from '../../reducers';

describe('game reducer test suit', () => {
  test('rootReducer is a function', () => {
    expect(reducer).toBeInstanceOf(Function);
  });

  test('returns initial state by default', async () => {
    const state = reducer(undefined, {type: 'none'});
    await service.getGame().then((game) => {
      const expectedState = INITIAL_STATE;

      expect(state).toEqual(expectedState);
    });

  });

  test('guess numbers', async () => {
    const action = { type: GameActionsTypes.GUESS };
    const game = await service.restart();
    const initialState = { payload: game };

    const expected = await service.getGame();
    const expectedState = { payload:  expected};

    const state = reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  test('restart', async () => {
    const action = { type: GameActionsTypes.RESTART };
    const initialState = { payload: await service.restart() };
    const expectedState = { payload: await service.getGame() };

    const state = reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
