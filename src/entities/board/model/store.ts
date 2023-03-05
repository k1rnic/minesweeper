import { createCountdownStore } from '@/shared/lib/effector';
import { createEvent, createStore } from 'effector';
import {
  generateBoard,
  generateBombs,
  isRevealed,
  isRevealedOrBomb,
  revealBombs,
  revealCellsDeep,
  toggleFlaggedState,
} from '../lib';
import { BOARD_SIZE, BOMB_COUNT } from './constants';
import { IBoard, ICell } from './types';

const generate = createEvent();
const clickCell = createEvent<ICell>();
const rightClickCell = createEvent<ICell>();
const revealCell = createEvent<ICell>();

const revealAllBombs = createEvent();

const toggleCellPress = createEvent<boolean>();
const $cellPressed = createStore<boolean>(false).on(
  toggleCellPress,
  (_, pressState) => pressState,
);

const markCell = createEvent<ICell>();

const {
  $countdown: $bombsCount,
  increment: incrementBombCount,
  decrement: decrementBombCount,
} = createCountdownStore({ initial: BOMB_COUNT, reset: [generate] });

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
    if (isRevealed(cell)) {
      return state;
    }

    const lines = structuredClone(state.lines);
    lines[cell.row][cell.col].state = toggleFlaggedState(cell.state);

    return { ...state, lines };
  });

const $lines = $board.map(({ lines }) => lines);

const $touched = $board.map(({ lines }) =>
  lines.some((row) => row.some(isRevealed)),
);

const $isAllRevealed = $board.map(({ lines }) =>
  lines.every((row) => row.every(isRevealedOrBomb)),
);

export {
  $lines,
  $touched,
  $bombsCount,
  $isAllRevealed,
  $cellPressed,
  generate,
  clickCell,
  rightClickCell,
  toggleCellPress,
  revealCell,
  revealAllBombs,
  markCell,
  incrementBombCount,
  decrementBombCount,
};
