import { createEvent, createStore } from 'effector';
import {
  generateBoard,
  generateBombs,
  revealBombs,
  revealCellsDeep,
  toggleFlaggedState,
} from '../lib';
import { BOARD_SIZE, BOMB_COUNT } from './constants';
import { CellValues, IBoard, ICell } from './types';

const generate = createEvent();
const clickCell = createEvent<ICell>();
const revealCell = createEvent<ICell>();

const revealAllBombs = createEvent();

const $touched = createStore(false)
  .on(revealCell, () => true)
  .reset(generate);

const toggleCellPress = createEvent<boolean>();
const $cellPressed = createStore<boolean>(false).on(
  toggleCellPress,
  (_, pressState) => pressState,
);

const markCell = createEvent<ICell>();
const incrementBombCount = createEvent();
const decrementBombCount = createEvent();

const $bombsCount = createStore(BOMB_COUNT)
  .on(incrementBombCount, (count) => Math.min(BOMB_COUNT, count + 1))
  .on(decrementBombCount, (count) => Math.max(0, count - 1))
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
  }))
  .on(markCell, (state, cell) => {
    if (cell.revealed) {
      return state;
    }

    const lines = structuredClone(state.lines);
    lines[cell.row][cell.col].state = toggleFlaggedState(cell.state);

    return { ...state, lines };
  });

const $lines = $board.map(({ lines }) => lines);

const $isAllRevealed = $board.map(({ lines }) =>
  lines.every((row) =>
    row.every((cell) =>
      cell.revealed
        ? cell.value === CellValues.Empty
        : cell.value === CellValues.Bomb,
    ),
  ),
);

export {
  $lines,
  $touched,
  $bombsCount,
  $isAllRevealed,
  $cellPressed,
  generate,
  clickCell,
  toggleCellPress,
  revealCell,
  revealAllBombs,
  markCell,
  incrementBombCount,
  decrementBombCount,
};
