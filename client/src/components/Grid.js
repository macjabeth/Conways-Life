import React from 'react';

import Cell from './Cell';

const Grid = ({ toggleCell, grid, clickable }) => (
  <div className="grid">
    {grid.map((state, idx) => (
      <Cell
        key={idx}
        cell={idx}
        state={state}
        clickable={clickable}
        toggleCell={toggleCell}
      />
    ))}
  </div>
);

export default Grid;
