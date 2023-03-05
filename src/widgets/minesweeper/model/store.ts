import { boardModel } from '@/entities/board';
import { gameModel } from '@/entities/game';
import { timerModel } from '@/entities/timer';
import { startGameModel } from '@/features/start-game';
import { sample } from 'effector';

sample({
  clock: startGameModel.start,
  target: timerModel.reset,
});

sample({
  source: boardModel.$touched,
  filter: (touched) => touched,
  target: timerModel.start,
});

sample({
  clock: boardModel.clickCell,
  source: gameModel.$gameState,
  filter: (gameStatus, { state }) =>
    gameStatus === gameModel.GameStates.Start &&
    state === boardModel.CellStates.Hidden,
  fn: (_, cell) => cell,
  target: boardModel.revealCell,
});

const gameOver = sample({
  clock: boardModel.clickCell,
  filter: ({ value }) => value === boardModel.CellValues.Bomb,
});

gameOver.watch(() => {
  boardModel.revealAllBombs();
  gameModel.changeGameState(gameModel.GameStates.Lose);
  timerModel.stop();
});

sample({
  clock: boardModel.$isAllCellsOpened,
  fn: () => gameModel.GameStates.Win,
  target: gameModel.changeGameState,
});
