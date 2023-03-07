import { isEmpty } from '@/entities/board/lib';
import { Sprite, useSprite } from '@/shared/ui/sprite';
import { memo, MouseEventHandler, useMemo } from 'react';
import { CellStates, ICell } from '../model';

enum CellSpritePositions {
  Hidden = 1,
  Empty = 2,
  Flagged = 3,
  Unknown = 4,
  Bomb = 6,
  Detonated = 7,
  Defused = 8,
}

export type CellProps = ICell & {
  onCellClick: (cell: ICell) => void;
  onCellRightClick: (cell: ICell) => void;
  onCellPress: (cell: ICell, pressed: boolean) => void;
};

export const Cell = memo(
  ({ onCellClick, onCellRightClick, onCellPress, ...cell }: CellProps) => {
    const spriteLine = cell.revealed && cell.neighborBombs ? 4 : 3;

    const spritePosition = useMemo(() => {
      if (cell.revealed) {
        if (cell.neighborBombs) {
          return cell.neighborBombs;
        }

        switch (cell.state) {
          case CellStates.Defused:
            return CellSpritePositions.Defused;
          case CellStates.Detonated:
            return CellSpritePositions.Detonated;
        }

        return isEmpty(cell)
          ? CellSpritePositions.Empty
          : CellSpritePositions.Bomb;
      }

      switch (cell.state) {
        case CellStates.Flagged:
          return CellSpritePositions.Flagged;
        case CellStates.Unknown:
          return CellSpritePositions.Unknown;
      }

      return CellSpritePositions.Hidden;
    }, [cell]);

    const sprite = useSprite(spriteLine, spritePosition);

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
      onCellClick(cell);
    };

    const handleRightClick: MouseEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      onCellRightClick(cell);
    };

    return (
      <Sprite
        {...sprite}
        onClick={handleClick}
        onMouseDown={() => onCellPress(cell, true)}
        onMouseUp={() => onCellPress(cell, false)}
        onContextMenu={handleRightClick}
      />
    );
  },
);
