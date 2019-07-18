import React from 'react';

const Cell = ({ cell, state, clickable, toggleCell }) => {
  return (
    <div
      className={state ? 'alive' : 'dead'}
      onClick={() => toggleCell(cell)}
    />
  );
};

export default Cell;
