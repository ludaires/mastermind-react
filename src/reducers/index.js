import GameActionsTypes from '../actions/types';
import { GameStatus } from '../services/game';

export const INITIAL_STATE = {
  game: {
    attempts: 0,
    win: false,
    secret: [],
    status: GameStatus.NOT_STARTED,
    history: [],
  },
};

const rootReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GameActionsTypes.GET:
      return {
        ...state,
        game: payload
      };
    case GameActionsTypes.GUESS:
      return {
        ...state,
        game: payload
      };
    case GameActionsTypes.RESTART:
      return {
        ...state,
        game: payload
      };
    default:
      return state;
  }
};

export default rootReducer;
