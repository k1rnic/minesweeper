import {
  boardModel,
  canToggleFlaggedState,
  getNeighborBombs,
  getNeighborFlagged,
  getNeighborHidden,
  isBomb,
  isDefault,
  isFlagged,
  isHidden,
  isRevealed,
} from '@/entities/board';
import { gameModel, isPlaying } from '@/entities/game';
import { timerModel } from '@/entities/timer';
import query from '@/shared/lib/query';

import { sample, split } from 'effector';

export const createMinesweeperStore = () => {
  const boardStore = boardModel.createBoardStore();
  const gameStore = gameModel.createGameStore();
  const timerStore = timerModel.createTimerStore();

  sample({
    source: boardStore.$touched,
    filter: (touched) => touched,
    target: [gameStore.play, timerStore.start],
  });

  sample({
    clock: [gameStore.win, gameStore.lose],
    target: timerStore.stop,
  });

  sample({
    clock: gameStore.restart,
    target: [timerStore.reset, boardStore.generate],
  });

  sample({
    clock: boardStore.$isAllRevealed,
    filter: (revealed) => revealed,
    target: gameStore.win,
  });

  const clickCell = sample({
    clock: boardStore.clickCell,
    source: gameStore.$gameState,
    filter: isPlaying,
    fn: (_, cell) => cell,
  });

  sample({
    clock: clickCell,
    source: boardStore.$board,
    filter: (board, cell) => {
      if (isRevealed(cell)) {
        const neighborBombsCount = getNeighborBombs(board, cell).length;
        const neighborFlaggedCount = getNeighborFlagged(board, cell).length;
        const neighborHiddenCount = getNeighborHidden(board, cell).length;

        if (
          neighborHiddenCount &&
          neighborBombsCount &&
          neighborBombsCount === neighborFlaggedCount
        ) {
          return true;
        }
      }

      return false;
    },
    fn: (board, cell) =>
      getNeighborHidden(board, cell)
        .filter((cell) => !query.and(isFlagged, isBomb)(cell))
        .forEach((neighbor) => {
          boardStore.revealCell(neighbor!);
        }),
  });

  sample({
    clock: clickCell,
    filter: query.and(isDefault, isHidden),
    target: boardStore.revealCell,
  });

  sample({
    source: boardStore.revealCell,
    filter: isBomb,
    target: [gameStore.lose, boardStore.revealAllBombs],
  });

  const toggleCellFlag = sample({
    clock: boardStore.rightClickCell,
    source: [gameStore.$gameState, boardStore.$bombsCount] as const,
    filter: ([gameState, count], cell) =>
      isPlaying(gameState) && canToggleFlaggedState(cell.state, count),
    fn: (_, cell) => cell,
  });

  sample({
    clock: toggleCellFlag,
    target: boardStore.markCell,
  });

  split({
    source: toggleCellFlag,
    match: {
      increment: isFlagged,
      decrement: isDefault,
    },
    cases: {
      increment: boardStore.incrementBombCount,
      decrement: boardStore.decrementBombCount,
    },
  });

  sample({
    clock: boardStore.pressCell,
    source: gameStore.$gameState,
    filter: isPlaying,
    fn: (_, pressState) => pressState,
    target: gameStore.movePress,
  });

  return { boardStore, timerStore, gameStore };
};
