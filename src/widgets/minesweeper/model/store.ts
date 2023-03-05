import {
  boardModel,
  canToggleFlaggedState,
  isBomb,
  isDefault,
  isHidden,
} from '@/entities/board';
import { gameModel, isPlaying } from '@/entities/game';
import { timerModel } from '@/entities/timer';

import { sample, split } from 'effector';

sample({
  source: boardModel.$touched,
  filter: (touched) => touched,
  target: [gameModel.play, timerModel.start],
});

sample({
  clock: [gameModel.win, gameModel.lose],
  target: timerModel.stop,
});

sample({
  clock: gameModel.restart,
  target: [timerModel.reset, boardModel.generate],
});

sample({
  clock: boardModel.$isAllRevealed,
  filter: (revealed) => revealed,
  target: gameModel.win,
});

const clickHiddenCell = sample({
  clock: boardModel.clickCell.filter({
    fn: (cell) => isDefault(cell) && isHidden(cell),
  }),
  source: gameModel.$gameState,
  filter: isPlaying,
  fn: (_, cell) => cell,
  target: boardModel.revealCell,
});

sample({
  source: clickHiddenCell,
  filter: isBomb,
  target: [gameModel.lose, boardModel.revealAllBombs],
});

const toggleCellFlag = sample({
  clock: boardModel.rightClickCell,
  source: [gameModel.$gameState, boardModel.$bombsCount] as const,
  filter: ([gameState, count], cell) =>
    isPlaying(gameState) && canToggleFlaggedState(cell.state, count),
  fn: (_, cell) => cell,
});

sample({
  clock: toggleCellFlag,
  target: boardModel.markCell,
});

split({
  source: toggleCellFlag,
  match: {
    increment: (cell) => cell.state === boardModel.CellStates.Flagged,
    decrement: (cell) => cell.state === boardModel.CellStates.Default,
  },
  cases: {
    increment: boardModel.incrementBombCount,
    decrement: boardModel.decrementBombCount,
  },
});

sample({
  clock: boardModel.pressCell,
  source: gameModel.$gameState,
  filter: isPlaying,
  fn: (_, pressState) => pressState,
  target: gameModel.movePress,
});
