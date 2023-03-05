import { Board, BombCounter } from '@/entities/board';
import { GameController } from '@/entities/game';
import { Timer } from '@/entities/timer';

import { shadows } from '@/shared/lib/theme';
import { Box } from '@/shared/ui/box';
import { useState } from 'react';
import styled from 'styled-components';
import { createMinesweeperStore } from './model';

const Container = styled(Box)`
  display: inline-flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  background-color: #c0c0c0;
  ${shadows.outer}
`;

const Toolbar = styled(Box)`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #c0c0c0;
  ${shadows.inner}
`;

export const MineSweeper = () => {
  const [store] = useState(createMinesweeperStore);

  return (
    <Container>
      <Toolbar>
        <BombCounter store={store.boardStore} />
        <GameController store={store.gameStore} />
        <Timer store={store.timerStore} />
      </Toolbar>
      <Board store={store.boardStore} />
    </Container>
  );
};
