import { Box } from '@/shared/ui/box';
import { memo } from 'react';
import { ICell } from '../model';
import { Cell, CellProps } from './cell';

export type BoardLineProps = {
  cells: ICell[];
} & PrefixProps<CellProps, 'on'>;

export const BoardLine = memo(({ cells, ...props }: BoardLineProps) => (
  <Box display="inline-flex">
    {cells.map((cell) => (
      <Cell key={`${cell.row}-${cell.col}`} {...cell} {...props} />
    ))}
  </Box>
));
