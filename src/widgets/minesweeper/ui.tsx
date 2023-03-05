import { Board, BombCounter } from '@/entities/board';
import { GameController } from '@/entities/game';
import { Timer } from '@/entities/timer';

import { Box } from '@/shared/ui/box';
import { useState } from 'react';
import { createMinesweeperStore } from './model';

export const MineSweeper = () => {
  const [store] = useState(createMinesweeperStore);

  return (
    <Box display="inline-flex" flexDirection="column" bg="#BDBDBD" p={2}>
      <Box
        p={2}
        display="flex"
        bg="#C0C0C0"
        alignItems="center"
        justifyContent="space-between"
      >
        <BombCounter store={store.boardStore} />
        <GameController store={store.gameStore} />
        <Timer store={store.timerStore} />
      </Box>
      <Board store={store.boardStore} />
    </Box>
  );
};
