import { CellStates } from '@/entities/board/model';

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
