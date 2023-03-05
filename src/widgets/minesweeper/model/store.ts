import { boardModel } from '@/entities/board';
import { gameModel } from '@/entities/game';
import { timerModel } from '@/entities/timer';
import { playModel } from '@/features/play';
import { sample } from 'effector';

sample({
  clock: playModel.start,
  target: [timerModel.reset, boardModel.generate],
});

sample({
  clock: playModel.start,
  fn: () => gameModel.GameStates.Play,
  target: gameModel.changeGameState,
});

sample({
  source: boardModel.$touched,
  filter: (touched) => touched,
  target: timerModel.start,
});

const hiddenCellClick = sample({
  clock: boardModel.clickCell,
  source: gameModel.$gameState,
  filter: (gameStatus, { revealed, state }) =>
    gameStatus === gameModel.GameStates.Play &&
    state === boardModel.CellStates.Default &&
    !revealed,
  fn: (_, cell) => cell,
});

hiddenCellClick.watch((cell) => {
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

sample({
  clock: boardModel.markCell,
  source: boardModel.$bombsCount,
  filter: (count, cell) =>
    cell.state !== boardModel.CellStates.Default &&
    count < boardModel.BOMB_COUNT,
  target: boardModel.incrementBombCount,
});

sample({
  clock: boardModel.markCell,
  source: boardModel.$bombsCount,
  filter: (count, cell) =>
    cell.state === boardModel.CellStates.Default && count > 0,
  target: boardModel.decrementBombCount,
});

sample({
  source: [gameModel.$gameState, boardModel.$cellPressed] as const,
  filter: ([gameState]) => gameState === gameModel.GameStates.Play,
  fn: ([_, pressState]) => pressState,
  target: gameModel.makeMove,
});
