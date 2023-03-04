import { IBoard, ICell } from '../model/types';
import { isBomb, isRevealed } from './cell-state';

type Position = [row: number, col: number];

const NEIGHBOR_POS: Position[] = [
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, 0],
  [1, -1],
  [1, 1],
];

const getNeighborCell = (
  board: IBoard,
  cell: ICell,
  [row, col]: Position,
): ICell | null => board[cell.row + row]?.[cell.col + col];

const getNeighbors = (board: IBoard, cell: ICell) =>
  NEIGHBOR_POS.map((pos) => getNeighborCell(board, cell, pos));

const getNeighborRevealed = (board: IBoard, cell: ICell) =>
  getNeighbors(board, cell).filter(isRevealed);

const getNeighborBombs = (board: IBoard, cell: ICell) =>
  getNeighbors(board, cell).filter(isBomb);

const isNeighborTo = (board: IBoard, source: ICell, target: ICell) =>
  getNeighbors(board, source).some(
    (maybeNeighbor) =>
      maybeNeighbor?.col === target.col && maybeNeighbor?.row === target.row,
  );

export { getNeighbors, getNeighborRevealed, getNeighborBombs, isNeighborTo };
