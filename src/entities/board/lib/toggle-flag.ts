import { BOMB_COUNT, CellStates } from '../model';

export const toggleFlaggedState = (state: CellStates) => {
  switch (state) {
    case CellStates.Default:
      return CellStates.Flagged;
    case CellStates.Flagged:
      return CellStates.Unknown;
    case CellStates.Unknown:
      return CellStates.Default;
    default:
      return CellStates.Default;
  }
};

export const canToggleFlaggedState = (state: CellStates, bombCount: number) => {
  switch (state) {
    case CellStates.Default:
      bombCount > 0;
    case CellStates.Flagged:
      bombCount < BOMB_COUNT;
    default:
      return true;
  }
};
