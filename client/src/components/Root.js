import React from 'react';
import { StateProvider } from 'react-conflux';
import { gameReducer } from '../store/reducers';
import { gameContext } from '../store/contexts';

import Grid from './Grid';
import Controls from './Controls';

const Root = () => {
  return (
    <StateProvider reducer={gameReducer} stateContext={gameContext}>
      <Grid />
      <Controls />
    </StateProvider>
  );
};

export default Root;
