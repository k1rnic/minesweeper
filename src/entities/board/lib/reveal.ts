import { CellStates, CellValues, IBoard, ICell } from '../model/types';
import { getNeighbors } from './neighbors';

export const revealCellsDeep = (
  board: IBoard,
  cell: ICell | null,
  depth = 0,
) => {
  if (cell && !cell.revealed) {
    board[cell.row][cell.col].revealed = true;

    if (cell.value === CellValues.Empty && cell.neighborBombs === 0) {
      getNeighbors(board, cell)
        .filter(
          (neighbor) =>
            !neighbor?.revealed && neighbor?.value === CellValues.Empty,
        )
        .map((neighbor) => revealCellsDeep(board, neighbor, depth + 1));
    }
  }
};

export const revealBombs = (board: IBoard) => {
  return board.map((line) =>
    line.map((cell) => {
      if (cell.value === CellValues.Bomb) {
        if (cell.revealed) {
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
