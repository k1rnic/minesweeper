import { Box } from '@/shared/ui/box';
import { memo } from 'react';
import { IBoardLine } from '../model';
import { Cell } from './cell';

export type BoardLineProps = IBoardLine;

export const BoardLine = memo(({ cells }: BoardLineProps) => {
  return (
    <Box display="inline-flex">
      {cells.map((cell) => (
        <Cell key={`${cell.row}-${cell.col}`} {...cell} />
      ))}
    </Box>
  );
});
