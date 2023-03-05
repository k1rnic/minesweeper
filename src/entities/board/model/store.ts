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

export const createBoardStore = () => {
  const generate = createEvent();
  const clickCell = createEvent<ICell>();
  const rightClickCell = createEvent<ICell>();
  const revealCell = createEvent<ICell>();

  const revealAllBombs = createEvent();

  const pressCell = createEvent<boolean>();

  const $cellPressed = createStore<boolean>(false).on(
    pressCell,
    (_, state) => state,
  );

  const markCell = createEvent<ICell>();

  const {
    $countdown: $bombsCount,
    increment: incrementBombCount,
    decrement: decrementBombCount,
  } = createCountdownStore({ initial: BOMB_COUNT, reset: [generate] });

  const initialBoard = generateBoard(BOARD_SIZE);

  const $board = createStore<IBoard>(initialBoard)
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
    })
    .reset(generate);

  const $touched = $board.map(isTouched);

  const $isAllRevealed = $board.map((board) =>
    board.every((row) => row.every(isRevealedOrBomb)),
  );

  return {
    $board,
    $touched,
    $bombsCount,
    $isAllRevealed,
    $cellPressed,
    generate,
    clickCell,
    rightClickCell,
    pressCell,
    revealCell,
    revealAllBombs,
    markCell,
    incrementBombCount,
    decrementBombCount,
  };
};

export type BoardStore = ReturnType<typeof createBoardStore>;
