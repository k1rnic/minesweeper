import { CellStates, IBoard, ICell } from '../model/types';
import {
  isBomb,
  isDefault,
  isEmpty,
  isFlagged,
  isHidden,
  isRevealed,
} from './cell-state';
import { getNeighbors } from './neighbors';

export const revealCellsDeep = (board: IBoard, cell: ICell | null) => {
  if (cell && isHidden(cell) && isDefault(cell)) {
    board[cell.row][cell.col].revealed = true;

    if (isEmpty(cell) && cell.neighborBombs === 0) {
      getNeighbors(board, cell)
        .filter(isHidden)
        .map((neighbor) => revealCellsDeep(board, neighbor));
    }
  }
};

export const revealBombs = (board: IBoard) => {
  return board.map((line) =>
    line.map((cell) => {
      if (isBomb(cell)) {
        if (isRevealed(cell)) {
          return { ...cell, state: CellStates.Detonated };
        }

        if (isFlagged(cell)) {
          return { ...cell, state: CellStates.Defused, revealed: true };
        }

        return { ...cell, revealed: true };
      }
      return cell;
    }),
  );
};
