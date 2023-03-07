import {
  boardModel,
  canToggleFlaggedState,
  isBomb,
  isDefault,
  isFlagged,
  isHidden,
} from '@/entities/board';
import { gameModel, isPlaying } from '@/entities/game';
import { timerModel } from '@/entities/timer';

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

  const clickHiddenCell = sample({
    clock: boardStore.clickCell.filter({
      fn: (cell) => isDefault(cell) && isHidden(cell),
    }),
    source: gameStore.$gameState,
    filter: isPlaying,
    fn: (_, cell) => cell,
    target: boardStore.revealCell,
  });

  sample({
    source: clickHiddenCell,
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
