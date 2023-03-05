import { createCountdownStore } from '@/shared/lib/effector';
import { createEvent, createStore } from 'effector';
import {
  generateBoard,
  generateBombs,
  isHidden,
  isRevealedOrBomb,
  isTouched,
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

const $board = createStore<IBoard>([])
  .on(generate, () => generateBoard(BOARD_SIZE))
  .on(revealCell, (state, cell) => {
    const board = isTouched(state)
      ? state
      : generateBombs(state, BOMB_COUNT, cell);

    revealCellsDeep(board, cell);
    return structuredClone(board);
  })
  .on(revealAllBombs, revealBombs)
  .on(markCell.filter({ fn: isHidden }), (state, cell) => {
    const board = structuredClone(state);
    board[cell.row][cell.col].state = toggleFlaggedState(cell.state);

    return board;
  });

const $touched = $board.map(isTouched);

const $isAllRevealed = $board.map((board) =>
  board.every((row) => row.every(isRevealedOrBomb)),
);

export {
  $board,
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
