import produce from 'immer';

import {
  GAME_START,
  GAME_STOP,
  GAME_FASTER,
  GAME_SLOWER,
  GAME_RESET,
  TOGGLE_CELL
} from '../constants';

const initialState = {
  grid: Array(25 * 25).fill(false),
  clickable: true,
  running: false,
  speed: 0
};

export const gameReducer = produce((draft, action) => {
  switch (action.type) {
    case GAME_START:
      draft.running = true;
      draft.clickable = false;
      return;
    case GAME_STOP:
      draft.running = false;
      return;
    case GAME_FASTER:
      draft.speed++;
      return;
    case GAME_SLOWER:
      draft.speed--;
      return;
    case GAME_RESET:
      draft = initialState;
      return;
    case TOGGLE_CELL:
      draft.grid = Array(25 * 25).fill(false);
      draft.clickable = true;
      draft.running = false;
      draft.speed = 0;
      return;
    default:
      return;
  }
}, initialState);
