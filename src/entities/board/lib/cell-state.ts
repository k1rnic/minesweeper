import { CellValues, ICell } from '../model';

export const isRevealed = (cell: ICell | null) => cell?.revealed;

export const isBomb = (cell: ICell | null) => cell?.value === CellValues.Bomb;
