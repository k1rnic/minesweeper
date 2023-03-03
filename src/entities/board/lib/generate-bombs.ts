import { BOARD_SIZE } from '../model/constants';
import { CellStates, CellValues, IBoard, ICell } from '../model/types';

type Position = [row: number, col: number];

const isBomb = (board: IBoard, [row, col]: Position) =>
  board[row]?.cells[col]?.value === CellValues.Bomb;

const t = (cell: ICell): Position => [cell.row - 1, cell.col];
const b = (cell: ICell): Position => [cell.row + 1, cell.col];
const l = (cell: ICell): Position => [cell.row, cell.col - 1];
const lt = (cell: ICell): Position => [cell.row - 1, cell.col - 1];
const lb = (cell: ICell): Position => [cell.row + 1, cell.col - 1];
const r = (cell: ICell): Position => [cell.row, cell.col + 1];
const rt = (cell: ICell): Position => [cell.row - 1, cell.col + 1];
const rb = (cell: ICell): Position => [cell.row + 1, cell.col + 1];

const countNeighboringBombs = (board: IBoard, cell: ICell) =>
  [
    isBomb(board, t(cell)),
    isBomb(board, b(cell)),
    isBomb(board, l(cell)),
    isBomb(board, lt(cell)),
    isBomb(board, lb(cell)),
    isBomb(board, r(cell)),
    isBomb(board, rt(cell)),
    isBomb(board, rb(cell)),
  ].filter((state) => state).length;

export const generateBombs = (board: IBoard, bombCount: number) => {
  const boardWithBombs = structuredClone(board);

  let bombPlaced = 0;

  while (bombPlaced < bombCount) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);

    const cellState = boardWithBombs[row].cells[col].state;
    const cellValue = boardWithBombs[row].cells[col].value;

    if (cellState !== CellStates.Revealed && cellValue !== CellValues.Bomb) {
      boardWithBombs[row].cells[col].value = CellValues.Bomb;
      bombPlaced++;
    }
  }

  boardWithBombs.forEach((line) =>
    line.cells.forEach((cell) => {
      if (cell.value === CellValues.Empty) {
        cell.neighboringBombs = countNeighboringBombs(boardWithBombs, cell);
        cell.value = cell.neighboringBombs
          ? CellValues.BombsAround
          : CellValues.Empty;
      }
    }),
  );

  return boardWithBombs;
};
