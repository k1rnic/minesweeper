import { CellStates, CellValues, IBoard, ICell } from '../model/types';
import { isRevealed } from './cell-state';
import { getNeighbors } from './neighbors';

export const revealCellsDeep = (board: IBoard, cell: ICell | null) => {
  if (cell && !isRevealed(cell) && cell.state === CellStates.Default) {
    board[cell.row][cell.col].revealed = true;

    if (cell.value === CellValues.Empty && cell.neighborBombs === 0) {
      getNeighbors(board, cell)
        .filter(
          (neighbor) =>
            !isRevealed(neighbor) && neighbor?.value === CellValues.Empty,
        )
        .map((neighbor) => revealCellsDeep(board, neighbor));
    }
  }
};

export const revealBombs = (board: IBoard) => {
  return board.map((line) =>
    line.map((cell) => {
      if (cell.value === CellValues.Bomb) {
        if (isRevealed(cell)) {
          return { ...cell, state: CellStates.Detonated };
        }

        if (cell.state === CellStates.Flagged) {
          return { ...cell, state: CellStates.Defused, revealed: true };
        }

        return { ...cell, revealed: true };
      }
      return cell;
    }),
  );
};
