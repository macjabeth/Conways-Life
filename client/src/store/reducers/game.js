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
  clickable: true,
  generation: 0,
  grid: Array(25 * 25).fill(false),
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
        draft.clickable = true;
        draft.generation = 0;
        draft.grid = Array(25 * 25).fill(false);
        draft.running = false;
        draft.speed = 0;
        return;
    case TOGGLE_CELL:
      draft.grid[action.payload] = !draft.grid[action.payload];
      return;
    default:
      return;
  }
}, initialState);
