import { Box } from '@/shared/ui/box';
import { useStore } from 'effector-react';
import { $lines } from '../model';
import { BoardLine } from './board-line';

export const Board = () => {
  const lines = useStore($lines);

  return (
    <Box display="flex" flexDirection="column">
      {lines.map((cells, idx) => (
        <BoardLine key={idx} cells={cells} />
      ))}
    </Box>
  );
};
