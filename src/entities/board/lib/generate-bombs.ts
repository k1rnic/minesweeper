import { BOARD_SIZE } from '../model/constants';
import { CellValues, IBoard, ICell } from '../model/types';
import { isBomb, isRevealed } from './cell-state';
import { getNeighborBombs, isNeighborTo } from './neighbors';

export const generateBombs = (
  board: IBoard,
  bombCount: number,
  initialCell: ICell,
) => {
  const boardWithBombs = structuredClone(board);

  let bombPlaced = 0;

  while (bombPlaced < bombCount) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);

    const cell = boardWithBombs[row][col];

    const noInitial =
      cell.col !== initialCell.col && cell.row !== initialCell.row;

    const noNeighborRevealed = !isNeighborTo(board, initialCell, cell);

    if (!isRevealed(cell) && !isBomb(cell) && noNeighborRevealed && noInitial) {
      cell.value = CellValues.Bomb;
      bombPlaced++;
    }
  }

  boardWithBombs.forEach((line) =>
    line.forEach((cell) => {
      if (cell.value === CellValues.Empty) {
        cell.neighborBombs = getNeighborBombs(boardWithBombs, cell).length;
      }
    }),
  );

  return boardWithBombs;
};
