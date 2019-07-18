import produce from 'immer';

import {
  GAME_START,
  GAME_STOP,
  GAME_FASTER,
  GAME_SLOWER,
  GAME_RESET,
  TOGGLE_CELL,
  APPLY_LIFECYCLE
} from '../constants';

const initialState = {
  clickable: true,
  generation: 0,
  grid: Array(25 * 25).fill(false),
  running: false,
  speed: 1000,
  timer: null
};

export const gameReducer = produce((draft, action) => {
  switch (action.type) {
    case GAME_START:
      draft.running = true;
      draft.timer = setInterval(() => {
        console.log('tick');
      }, draft.speed);
      draft.clickable = false;
      return;
    case GAME_STOP:
      clearInterval(draft.timer);
      draft.timer = null;
      draft.running = false;
      return;
    case GAME_FASTER:
      draft.speed -= 50;
      if (draft.speed < 200) draft.speed = 200;
      return;
    case GAME_SLOWER:
      draft.speed += 50;
      if (draft.speed > 1000) draft.speed = 1000;
      return;
    case GAME_RESET:
        draft.clickable = true;
        draft.generation = 0;
        draft.grid = Array(25 * 25).fill(false);
        draft.running = false;
        draft.speed = 1000;
        clearInterval(draft.timer);
        draft.timer = null;
        return;
    case TOGGLE_CELL:
      draft.grid[action.payload] = !draft.grid[action.payload];
      return;
    case APPLY_LIFECYCLE:
      localStorage.setItem('generate', false);
      draft.generation++;
      for (let i = 0; i < draft.grid.length; i++)
        draft.grid[i] = lifecycle(draft.grid, i);
      return;
    default:
      return;
  }
}, initialState);

function lifecycle(grid, idx) {
  const state = [
    grid[idx-25], // top
    grid[idx+25], // bottom
    grid[idx-1],  // left
    grid[idx+1],  // right
    grid[idx-26], // top left
    grid[idx-24], // top right
    grid[idx+24], // bottom left
    grid[idx+26]  // bottom right
  ];

  const alive = state.reduce((acc, cur) => cur ? acc + 1 : acc, 0);

  if (grid[idx] && (alive < 2 || alive >= 4)) {
    return false;
  } else if (!grid[idx] && alive === 3) {
    return true;
  }
}
