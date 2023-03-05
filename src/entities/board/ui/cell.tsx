import { Sprite, useSprite } from '@/shared/ui/sprite';
import { memo, MouseEventHandler, useMemo } from 'react';
import { CellStates, CellValues, ICell } from '../model';

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
  ({
    row,
    col,
    value,
    state,
    revealed,
    neighborBombs,
    onCellClick,
    onCellRightClick,
    onCellPress,
    ...spriteProps
  }: CellProps) => {
    const spriteLine = revealed && neighborBombs ? 4 : 3;

    const spritePosition = useMemo(() => {
      if (revealed) {
        if (neighborBombs) {
          return neighborBombs;
        }

        switch (state) {
          case CellStates.Defused:
            return CellSpritePositions.Defused;
          case CellStates.Detonated:
            return CellSpritePositions.Detonated;
        }

        return value === CellValues.Empty
          ? CellSpritePositions.Empty
          : CellSpritePositions.Bomb;
      }

      switch (state) {
        case CellStates.Flagged:
          return CellSpritePositions.Flagged;
        case CellStates.Unknown:
          return CellSpritePositions.Unknown;
      }

      return CellSpritePositions.Hidden;
    }, [state, value, neighborBombs, revealed]);

    const sprite = useSprite(spriteLine, spritePosition);

    const getCellInfo = () => ({
      row,
      col,
      value,
      state,
      neighborBombs,
      revealed,
    });

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
      onCellClick(getCellInfo());
    };

    const handleRightClick: MouseEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      onCellRightClick(getCellInfo());
    };

    return (
      <Sprite
        {...sprite}
        {...spriteProps}
        onClick={handleClick}
        onMouseDown={() => onCellPress(getCellInfo(), true)}
        onMouseUp={() => onCellPress(getCellInfo(), false)}
        onContextMenu={handleRightClick}
      />
    );
  },
);
