import { CellStates, CellValues, ICell } from '../model';

export const isRevealed = (cell: ICell | null) =>
  cell?.state === CellStates.Revealed;

export const isBomb = (cell: ICell | null) => cell?.value === CellValues.Bomb;
