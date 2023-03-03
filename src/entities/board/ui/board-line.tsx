import { Box } from '@/shared/ui/box';
import { memo } from 'react';
import { ICell } from '../model';
import { Cell } from './cell';

export type BoardLineProps = {
  cells: ICell[];
};

export const BoardLine = memo(({ cells }: BoardLineProps) => {
  return (
    <Box display="inline-flex">
      {cells.map((cell) => (
        <Cell key={`${cell.row}-${cell.col}`} {...cell} />
      ))}
    </Box>
  );
});
