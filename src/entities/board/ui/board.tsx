import { shadows } from '@/shared/lib/theme';
import { Box } from '@/shared/ui/box';
import { useStore } from 'effector-react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { BoardStore, ICell } from '../model';

import { BoardLine } from './board-line';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  ${shadows.inner}
`;

type BoardProps = {
  store: BoardStore;
};

export const Board = ({ store }: BoardProps) => {
  const board = useStore(store.$board);

  const handleClick = useCallback((cell: ICell) => {
    store.clickCell(cell);
  }, []);

  const handleRightClick = useCallback((cell: ICell) => {
    store.rightClickCell(cell);
  }, []);

  const handleCellPress = useCallback((_: ICell, pressed: boolean) => {
    store.pressCell(pressed);
  }, []);

  return (
    <Container>
      {board.map((cells, idx) => (
        <BoardLine
          key={idx}
          cells={cells}
          onCellClick={handleClick}
          onCellRightClick={handleRightClick}
          onCellPress={handleCellPress}
        />
      ))}
    </Container>
  );
};
