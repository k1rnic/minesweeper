import { CellStates, CellValues, IBoard, ICell } from '../model/types';
import { getNeighbors } from './neighbors';

export const revealCellsDeep = (
  board: IBoard,
  cell: ICell | null,
  depth = 0,
) => {
  if (cell?.state === CellStates.Hidden) {
    board[cell.row][cell.col].state = CellStates.Revealed;

    if (cell.value === CellValues.Empty && cell.neighborBombs === 0) {
      getNeighbors(board, cell)
        .filter(
          (neighbor) =>
            neighbor?.state === CellStates.Hidden &&
            neighbor?.value === CellValues.Empty,
        )
        .map((neighbor) => revealCellsDeep(board, neighbor, depth + 1));
    }
  }
};

export const revealBombs = (board: IBoard) => {
  return board.map((line) =>
    line.map((cell) => {
      if (cell.value === CellValues.Bomb) {
        return { ...cell, state: CellStates.Revealed };
        // if (cell.state === CellStates.Revealed) {
        //   return { ...cell, state: CellStates.Detonated };
        // }

        // switch (cell.state) {
        //   case CellStates.Flagged:
        //     return { ...cell, state: CellStates.Defused };
        // }
      }
      return cell;
    }),
  );
};
