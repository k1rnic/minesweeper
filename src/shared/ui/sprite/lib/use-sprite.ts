import { useMemo } from 'react';
import { SPRITES } from '../model';

export const useSprite = (row: number, pos: number) => {
  return useMemo(() => {
    const spriteRow = SPRITES[Math.max(row - 1, 0)];
    const x = (spriteRow.width + 1) * Math.max(pos - 1, 0);
    return { x, ...spriteRow };
  }, [row, pos]);
};
