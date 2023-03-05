import { Sprite, useSprite } from '@/shared/ui/sprite';
import { memo, MouseEventHandler, useMemo } from 'react';
import {
  CellStates,
  CellValues,
  clickCell,
  ICell,
  markCell,
  toggleCellPress,
} from '../model';

enum CellSpritePositions {
  Hidden = 1,
  Empty = 2,
  Flagged = 3,
  Unknown = 4,
  Bomb = 6,
  Detonated = 7,
  Defused = 8,
}

export type CellProps = ICell & PrefixProps<JSX.IntrinsicElements['div'], 'on'>;

export const Cell = memo(
  ({
    row,
    col,
    value,
    state,
    revealed,
    neighborBombs,
    onClick,
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
      clickCell(getCellInfo());
      onClick?.(e);
    };

    const togglePress = (state: boolean) => {
      toggleCellPress(state);
    };

    const handleRightClick: MouseEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      markCell(getCellInfo());
    };

    return (
      <Sprite
        {...sprite}
        {...spriteProps}
        onClick={handleClick}
        onMouseDown={() => togglePress(true)}
        onMouseUp={() => togglePress(false)}
        onContextMenu={handleRightClick}
      />
    );
  },
);
