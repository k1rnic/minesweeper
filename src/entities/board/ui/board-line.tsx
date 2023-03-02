import { Box } from '@/shared/ui/box';
import { IBoardLine } from '../model';
import { Cell } from './cell';

export type BoardLineProps = IBoardLine;

export const BoardLine = ({ cells }: BoardLineProps) => {
  return (
    <Box display="inline-flex">
      {cells.map(({ row, col, state }) => (
        <Cell key={`${row}-${col}`} state={state} row={row} col={col} />
      ))}
    </Box>
  );
};
