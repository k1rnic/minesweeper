import { Box } from '@/shared/ui/box';
import { useStore } from 'effector-react';
import { $lines, CellValues } from '../model';
import { BoardLine } from './board-line';

export const Board = () => {
  const lines = useStore($lines);

  // console.table(
  //   lines.map((line) =>
  //     line.map(({ value }) => (value === CellValues.Empty ? '' : 'x')),
  //   ),
  // );

  return (
    <Box display="flex" flexDirection="column">
      {lines.map((cells, idx) => (
        <BoardLine key={idx} cells={cells} />
      ))}
    </Box>
  );
};
