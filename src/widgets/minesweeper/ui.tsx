import { Board, BombCounter } from '@/entities/board';
import { GameController } from '@/entities/game';
import { Timer } from '@/entities/timer';

import { Box } from '@/shared/ui/box';

export const MineSweeper = () => (
  <Box display="inline-flex" flexDirection="column" bg="#BDBDBD" p={2}>
    <Box
      p={2}
      display="flex"
      bg="#C0C0C0"
      alignItems="center"
      justifyContent="space-between"
    >
      <BombCounter />
      <GameController />
      <Timer />
    </Box>
    <Board />
  </Box>
);
