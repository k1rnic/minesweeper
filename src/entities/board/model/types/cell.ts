export interface ICell {
  row: number;
  col: number;
  state: CellStates;
  value: CellValues;
  revealed?: boolean;
  neighborBombs: number;
}

export enum CellStates {
  Default,
  Flagged,
  Unknown,
  Detonated,
  Defused,
}

export enum CellValues {
  Empty,
  Bomb,
}
