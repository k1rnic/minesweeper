import { Sprite, useSprite } from '@/shared/ui/sprite';
import { memo, MouseEventHandler, useMemo } from 'react';
import { CellStates, CellValues, clickCell, ICell, pressCell } from '../model';

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
    const spriteRow =
      state === CellStates.Revealed && value === CellValues.BombsAround ? 4 : 3;

    const spriteCol = useMemo(() => {
      if (state === CellStates.Hidden) {
        return 1;
      }

      switch (value) {
        case CellValues.Empty:
          return 2;
        case CellValues.MarkedAsBomb:
          return 3;
        case CellValues.Unknown:
          return 4;
        case CellValues.UnknownPressed:
          return 5;
        case CellValues.Bomb:
          return 6;
        case CellValues.Detonated:
          return 7;
        case CellValues.Defused:
          return 8;
        case CellValues.BombsAround:
          return neighboringBombs;
      }
    }, [state, value, neighboringBombs]);

    const sprite = useSprite(spriteRow, spriteCol);

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
