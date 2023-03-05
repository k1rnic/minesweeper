import { Box } from '@/shared/ui/box';
import { useStore } from 'effector-react';
import { $board } from '../model';
import { BoardLine } from './board-line';

export const Board = () => {
  const board = useStore($board);

  return (
    <Box display="flex" flexDirection="column">
      {board.map((cells, idx) => (
        <BoardLine key={idx} cells={cells} />
      ))}
    </Box>
  );
};
