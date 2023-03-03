import { Sprite, useSprite } from '@/shared/ui/sprite';
import { memo, MouseEventHandler, useMemo } from 'react';
import { CellStates, CellValues, clickCell, ICell, pressCell } from '../model';

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
    neighboringBombs,
    onClick,
    ...spriteProps
  }: CellProps) => {
    const spriteLine =
      state === CellStates.Revealed && neighboringBombs ? 4 : 3;

    const spritePosition = useMemo(() => {
      switch (state) {
        case CellStates.Revealed: {
          if (neighboringBombs) {
            return neighboringBombs;
          }
          return value === CellValues.Empty
            ? CellSpritePositions.Empty
            : CellSpritePositions.Bomb;
        }
        case CellStates.Hidden:
          return CellSpritePositions.Hidden;
        case CellStates.Flagged:
          return CellSpritePositions.Flagged;
        case CellStates.Unknown:
          return CellSpritePositions.Unknown;
        case CellStates.Detonated:
          return CellSpritePositions.Detonated;
        case CellStates.Defused:
          return CellSpritePositions.Defused;
      }
    }, [state, value, neighboringBombs]);

    const sprite = useSprite(spriteLine, spritePosition);

    const getCellInfo = () => ({ row, col, value, state, neighboringBombs });

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
      clickCell(getCellInfo());
      onClick?.(e);
    };

    const handlePress = () => {
      pressCell(getCellInfo());
    };

    return (
      <Sprite
        {...sprite}
        {...spriteProps}
        onClick={handleClick}
        onKeyDown={handlePress}
      />
    );
  },
);
