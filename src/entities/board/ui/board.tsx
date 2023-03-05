import { Box } from '@/shared/ui/box';
import { useStore } from 'effector-react';
import { useCallback } from 'react';
import { BoardStore, ICell } from '../model';

import { BoardLine } from './board-line';

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
    <Box display="flex" flexDirection="column">
      {board.map((cells, idx) => (
        <BoardLine
          key={idx}
          cells={cells}
          onCellClick={handleClick}
          onCellRightClick={handleRightClick}
          onCellPress={handleCellPress}
        />
      ))}
    </Box>
  );
};
