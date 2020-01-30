import service from '../services';
import { GameStatus } from '../services/game';
import GameActionsTypes from './types';

export const getGame = () => async (dispatch) => {
  let game = await service.getGame();
  if (game.status === GameStatus.NOT_STARTED) {
    game = await service.restart();
  }

  dispatch({
    type: GameActionsTypes.GET,
    payload: game,
  });
};

export const guess = (numbers) => async (dispatch) => {
  const game = await service.guess(numbers);
  dispatch({
    type: GameActionsTypes.GUESS,
    payload: game
  });
};

export const restart = () => async (dispatch) => {
  const game = await service.restart();
  dispatch({
    type: GameActionsTypes.RESTART,
    payload: game
  });
};

