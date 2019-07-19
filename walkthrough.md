# Project Walkthrough

With the arrival of React Hooks, the process of creating components and organising your project becomes much more manageable.

Instead of using an extensive third-party library such as Redux or Conflux, I decided to tackle the challenge head-on using pure React.

For this project, we'll be implementing Conway's Game of Life.

We'll be structuring our project like so:

```
src/
   components/
      App.js
      Cell.js
      Controls.js
      Grid.js
   index.js
   reset.css
   styles.css
```

Let's go over our structure from the entry point at `index.js`.

Here we import our stylesheets - first our reset so styles can be the same between browsers. Then we have our main stylesheet where we style the classes we use in our components.

Our app is then rendered with the `App` component. This is the base component that stores and passes down state to its child components - `Grid` and `Controls`.

Our initial state is structured like so:

```js
const initialState = {
  clickable: true,
  generation: 0,
  grid: Array(25 * 25).fill(false),
  running: false,
  speed: 250
};
```

Our `clickable` value determines whether we will allow users to toggle cells alive or dead. As soon as we start the game/lifecycle, this value gets set to false.

Every iteration through the grid increments our `generation` count and applies a lifecycle function to each cell to determine whether it stays dead or comes alive.

Our `grid` is a 25x25 grid stored in a flat array of boolean values. `false` values indicate the cell is dead, `true` values if it is alive.

The `running` variable is how we determine whether to start our lifecycle. The cycle repeats on an interval set to however many milliseconds are assigned to the `speed` value.

Our `lifecycle` helper function itself looks like so:

```js
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
```

Here we are starting by creating an array of neighbouring cells. This is calculated using the passed in grid and index of the current cell we're iterating over. Then we loop through and count how many alive (truthy) cells there are in the collection. With this, we can now calculate some simple rules to determine how each cell in the grid updates.

- If the cell is alive (truthy) and has less than 2 or more than 3 live neighbours, it becomes dead.
- If the cell is dead (falsy) and has exactly three live neighbours, it comes alive.
- Otherwise, we'll return the current state of the cell - this is important since we'd return undefined otherwise.
