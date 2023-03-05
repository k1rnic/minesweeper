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
  fn: () => gameModel.GameStates.Start,
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
  filter: (gameStatus, { revealed }) =>
    gameStatus === gameModel.GameStates.Start && !revealed,
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
  clock: boardModel.$isAllCellsOpened,
  fn: () => gameModel.GameStates.Win,
  target: gameModel.changeGameState,
});
