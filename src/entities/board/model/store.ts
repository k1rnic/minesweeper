import { createEvent, createStore, sample } from 'effector';
import { generateBoard, generateBombs } from '../lib';
import { BOARD_SIZE, BOMB_COUNT } from './constants';
import { CellStates, IBoard, ICell } from './types';

const generate = createEvent();

const clickCell = createEvent<ICell>();
const pressCell = createEvent<ICell>();
const updateCell = createEvent<ICell>();

const placeBombs = createEvent();

const $board = createStore<IBoard>([])
  .on(generate, () => generateBoard(BOARD_SIZE))
  .on(placeBombs, (state) => generateBombs(state, BOMB_COUNT))
  .on(updateCell, (state, cell) =>
    state.map((line, idx) => {
      if (idx === cell.row) {
        line[cell.col] = cell;
        return structuredClone(line);
      }
      return line;
    }),
  );

const $bombsCount = createStore(BOMB_COUNT).reset(placeBombs);

const $bombsPlaced = createStore(false)
  .on(placeBombs, () => true)
  .reset(generate);

sample({
  clock: clickCell,
  source: $bombsPlaced,
  filter: (bombsPlaced) => !bombsPlaced,
  target: placeBombs,
});

sample({
  clock: clickCell,
  filter: ({ state }) => state === CellStates.Hidden,
  fn: (cell) => ({ ...cell, state: CellStates.Revealed }),
  target: updateCell,
});

export { $board, $bombsCount, generate, clickCell, pressCell };
