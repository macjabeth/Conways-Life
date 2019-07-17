import React from 'react';
import { useStateValue } from 'react-conflux';
import { gameContext } from '../store/contexts';

import Cell from './Cell';

const Grid = () => {
  const [state, dispatch] = useStateValue(gameContext);
  const { grid, clickable } = state;
  return (
    <div className="grid">
      {grid.map((state, idx) => (
        <Cell
          key={idx}
          cell={idx}
          state={state}
          clickable={clickable}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

export default Grid;
