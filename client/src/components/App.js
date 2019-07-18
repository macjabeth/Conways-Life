import React, { Fragment, useState, useEffect } from 'react';

import Grid from './Grid';
import Controls from './Controls';

const initialState = {
  clickable: true,
  generation: 0,
  grid: Array(25 * 25).fill(false),
  running: false,
  speed: 250
};

const App = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (state.running) {
      let timer = setTimeout(() => {
        setState({
          ...state,
          generation: state.generation + 1,
          grid: state.grid.map((_, idx, grid) => lifecycle(grid, idx))
        });
      }, state.speed);
      return () => clearInterval(timer);
    }
  }, [state]);

  const start = () => {
    if (state.running) return;
    setState({ ...state, running: true, clickable: false });
  };

  const stop = () => {
    if (!state.running) return;
    setState({ ...state, timer: null, running: false });
  };

  const faster = () => {
    let speed = state.speed - 50;
    if (speed < 50) speed = 50;
    setState({ ...state, speed });
  };

  const slower = () => {
    let speed = state.speed + 50;
    if (speed > 1000) speed = 1000;
    setState({ ...state, speed });
  };

  const reset = () => {
    setState(initialState);
  };

  const toggleCell = idx => {
    if (!state.clickable) return;
    const grid = state.grid;
    grid[idx] = !grid[idx];
    setState({ ...state, grid });
  };

  return (
    <Fragment>
      <Grid
        grid={state.grid}
        clickable={state.clickable}
        toggleCell={toggleCell}
      />
      <Controls
        generation={state.generation}
        speed={state.speed}
        start={start}
        stop={stop}
        faster={faster}
        slower={slower}
        reset={reset}
      />
    </Fragment>
  );
};

function lifecycle(grid, idx) {
  const state = [
    grid[idx - 25], // top
    grid[idx + 25], // bottom
    grid[idx - 1],  // left
    grid[idx + 1],  // right
    grid[idx - 26], // top left
    grid[idx - 24], // top right
    grid[idx + 24], // bottom left
    grid[idx + 26]  // bottom right
  ];

  let alive = 0;
  for (const cell of state) {
    if (cell) alive++;
  }

  if (grid[idx] && (alive < 2 || alive > 3)) {
    return false;
  } else if (!grid[idx] && alive === 3) {
    return true;
  }

  return grid[idx];
}

export default App;
