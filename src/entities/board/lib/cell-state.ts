import { CellStates, CellValues, ICell } from '../model/types';

export const isRevealed = (cell: ICell | null) => !!cell?.revealed;

export const isHidden = (cell: ICell | null) => !cell?.revealed;

export const isDefault = (cell: ICell | null) =>
  cell?.state === CellStates.Default;

export const isEmpty = (cell: ICell | null) => cell?.value === CellValues.Empty;

export const isBomb = (cell: ICell | null) => cell?.value === CellValues.Bomb;

export const isFlagged = (cell: ICell | null) =>
  cell?.state === CellStates.Flagged;

export const isRevealedOrBomb = (cell: ICell | null) =>
  isRevealed(cell) ? isEmpty(cell) : isBomb(cell);
