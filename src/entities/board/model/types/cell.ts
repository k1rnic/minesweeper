export interface ICell {
  row: number;
  col: number;
  state: CellStates;
  value: CellValues;
  neighboringBombs: number;
}

export enum CellStates {
  Hidden,
  Revealed,
  Flagged,
  Unknown,
  Detonated,
  Defused,
}

export enum CellValues {
  Empty,
  Bomb,
}
