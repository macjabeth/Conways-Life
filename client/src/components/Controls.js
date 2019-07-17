import React from 'react';
import { useStateValue } from 'react-conflux';
import { gameContext } from '../store/contexts';

import {
  GAME_START,
  GAME_STOP,
  GAME_FASTER,
  GAME_SLOWER,
  GAME_RESET
} from '../store/constants';

const Controls = () => {
  const [state, dispatch] = useStateValue(gameContext);
  const { generation } = state;
  return (
    <div className="controls">
      <h3>Controls</h3>
      <button onClick={() => dispatch({ type: GAME_START })}>start</button>
      <button onClick={() => dispatch({ type: GAME_STOP })}>stop</button>
      <button onClick={() => dispatch({ type: GAME_FASTER })}>faster</button>
      <button onClick={() => dispatch({ type: GAME_SLOWER })}>slower</button>
      <button onClick={() => dispatch({ type: GAME_RESET })}>reset</button>
      <span>Generation: {generation}</span>
    </div>
  );
};

export default Controls;
