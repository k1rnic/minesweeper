import { CellStates, CellValues, IBoard, ICell } from '../model/types';

export const generateBoard = (size: number): IBoard => {
  const board = Array.from({ length: size }, (_, rowIdx) =>
    Array.from(
      { length: size },
      (_, colIdx): ICell => ({
        row: rowIdx,
        col: colIdx,
        state: CellStates.Default,
        value: CellValues.Empty,
        neighborBombs: 0,
      }),
    ),
  );

  return board;
};
