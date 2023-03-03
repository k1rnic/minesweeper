import { CellStates, CellValues, IBoard, ICell } from '../model/types';

export const generateBoard = (size: number): IBoard => {
  const board = Array.from({ length: size }, (_, rowIdx) => ({
    index: rowIdx,
    cells: Array.from(
      { length: size },
      (_, colIdx): ICell => ({
        row: rowIdx,
        col: colIdx,
        state: CellStates.Hidden,
        value: CellValues.Empty,
        neighboringBombs: 0,
      }),
    ),
  }));

  return board;
};
