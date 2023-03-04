export interface ICell {
  row: number;
  col: number;
  state: CellStates;
  value: CellValues;
  neighborBombs: number;
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
