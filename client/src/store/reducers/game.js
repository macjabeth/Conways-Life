import produce from 'immer';

import {
  GAME_START,
  GAME_STOP,
  GAME_FASTER,
  GAME_SLOWER,
  GAME_RESET
} from '../constants';

const initialState = {
  running: false,
  speed: 0
};

export const gameReducer = produce((draft, action) => {
  switch (action.type) {
    case GAME_START:
      draft.running = true;
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
      draft.speed = 0;
      return;
    default:
      return;
  }
}, initialState);
