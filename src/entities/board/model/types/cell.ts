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
  Pressed,
}

export enum CellValues {
  Empty,
  BombsAround,
  MarkedAsBomb,
  Unknown,
  UnknownPressed,
  Bomb,
  Detonated,
  Defused,
}
