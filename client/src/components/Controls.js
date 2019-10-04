import React from 'react';

const Controls = ({
  generation,
  speed,
  start,
  stop,
  faster,
  slower,
  reset,
  random
}) => (
  <div className="controls">
    <h3>Controls</h3>
    <button onClick={start}>start</button>
    <button onClick={stop}>stop</button>
    <button onClick={faster}>faster</button>
    <button onClick={slower}>slower</button>
    <button onClick={reset}>reset</button>
    <button onClick={random}>random</button>
    <span>
      Generation: {generation}
      <br />
      Speed: {speed}ms
    </span>
  </div>
);

export default Controls;
