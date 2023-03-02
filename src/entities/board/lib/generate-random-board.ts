import { CellStates, IBoard } from '../model/types';

export const generateRandomBoard = (size: number): IBoard =>
  Array.from({ length: size }, (_, rowIdx) => ({
    index: rowIdx,
    cells: Array.from({ length: size }, (_, colIdx) => ({
      row: rowIdx,
      col: colIdx,
      state: CellStates.Hidden,
    })),
  }));
