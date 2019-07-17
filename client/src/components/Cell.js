import React from 'react';
import { TOGGLE_CELL } from '../store/constants';

const Cell = ({ cell, state, clickable, dispatch }) => {
  return (
    <div
      className={state ? 'alive' : 'dead'}
      onClick={() => {
        if (clickable) {
          dispatch({ type: TOGGLE_CELL, payload: cell });
        }
      }}
    />
  );
};

export default Cell;
