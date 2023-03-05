import { createEvent, createStore } from 'effector';
import {
  generateBoard,
  generateBombs,
  revealBombs,
  revealCellsDeep,
} from '../lib';
import { BOARD_SIZE, BOMB_COUNT } from './constants';
import { CellStates, CellValues, IBoard, ICell } from './types';

const generate = createEvent();
const clickCell = createEvent<ICell>();
const pressCell = createEvent<ICell>();
const revealCell = createEvent<ICell>();
const placeBombs = createEvent();
const revealAllBombs = createEvent();

const $touched = createStore(false)
  .on(revealCell, () => true)
  .reset(generate);

const $board = createStore<{ bombPlaced: boolean; lines: IBoard }>({
  lines: [],
  bombPlaced: false,
})
  .on(generate, () => ({
    bombPlaced: false,
    lines: generateBoard(BOARD_SIZE),
  }))
  .on(revealCell, (state, cell) => {
    const lines = state.bombPlaced
      ? state.lines
      : generateBombs(state.lines, BOMB_COUNT, cell);

    revealCellsDeep(lines, cell);
    return { bombPlaced: true, lines: structuredClone(lines) };
  })
  .on(revealAllBombs, (state) => ({
    ...state,
    lines: revealBombs(state.lines),
  }));

const $lines = $board.map(({ lines }) => lines);
const $bombsCount = createStore(BOMB_COUNT).reset(placeBombs);

const $isAllCellsOpened = $board.map(({ lines }) =>
  lines.every((row) =>
    row.every(
      (cell) =>
        cell.state !== CellStates.Hidden && cell.value !== CellValues.Bomb,
    ),
  ),
);

export {
  $lines,
  $touched,
  $bombsCount,
  $isAllCellsOpened,
  generate,
  clickCell,
  pressCell,
  placeBombs,
  revealCell,
  revealAllBombs,
};
