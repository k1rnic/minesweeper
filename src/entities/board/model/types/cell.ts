import { CellStates } from './cell-state';

export interface ICell {
  row: number;
  col: number;
  state: CellStates;
}
