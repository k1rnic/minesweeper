import { IBoard } from '../model';
import { isRevealed } from './cell-state';

export const isTouched = (board: IBoard) =>
  board.some((row) => row.some(isRevealed));
