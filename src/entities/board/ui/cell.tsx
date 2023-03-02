import { Sprite } from '@/shared/ui/sprite';
import { CellStates, ICell } from '../model';

const CELL_SPRITES_Y = 50;
const CELL_SPRITES_H = 17;
const CELL_SPRITES_W = 17;

const CELL_SPRITES_X = {
  [CellStates.Hidden]: 0,
};

export type CellProps = ICell;

export const Cell = ({ row, col }: CellProps) => {
  return (
    <Sprite
      x={CELL_SPRITES_X[CellStates.Hidden]}
      y={CELL_SPRITES_Y}
      width={CELL_SPRITES_W}
      height={CELL_SPRITES_H}
    />
  );
};
