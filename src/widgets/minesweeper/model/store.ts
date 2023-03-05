import { boardModel, canToggleFlaggedState } from '@/entities/board';
import { gameModel } from '@/entities/game';
import { timerModel } from '@/entities/timer';

import { sample, split } from 'effector';

sample({
  clock: gameModel.start,
  target: [timerModel.reset, boardModel.generate],
});

sample({
  clock: gameModel.start,
  fn: () => gameModel.GameStates.Play,
  target: gameModel.changeGameState,
});

sample({
  source: boardModel.$touched,
  filter: (touched) => touched,
  target: timerModel.start,
});

const cellClick = sample({
  clock: boardModel.clickCell,
  source: gameModel.$gameState,
  filter: (gameStatus, { revealed, state }) =>
    gameStatus === gameModel.GameStates.Play &&
    state === boardModel.CellStates.Default &&
    !revealed,
  fn: (_, cell) => cell,
});

cellClick.watch((cell) => {
  boardModel.revealCell(cell);
  if (cell.value === boardModel.CellValues.Bomb) {
    boardModel.revealAllBombs();
    gameModel.changeGameState(gameModel.GameStates.Lose);
    timerModel.stop();
  }
});

sample({
  clock: boardModel.$isAllRevealed,
  filter: (revealed) => revealed,
  fn: () => gameModel.GameStates.Win,
  target: [gameModel.changeGameState, timerModel.stop],
});

const cellRightClick = sample({
  clock: boardModel.rightClickCell,
  source: [gameModel.$gameState, boardModel.$bombsCount] as const,
  filter: ([gameState, count], cell) =>
    gameState === gameModel.GameStates.Play &&
    canToggleFlaggedState(cell.state, count),
  fn: (_, cell) => cell,
});

sample({
  clock: cellRightClick,
  target: boardModel.markCell,
});

split({
  source: cellRightClick,
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
  source: [gameModel.$gameState, boardModel.$cellPressed] as const,
  filter: ([gameState]) => gameState === gameModel.GameStates.Play,
  fn: ([_, pressState]) => pressState,
  target: gameModel.makeMove,
});
