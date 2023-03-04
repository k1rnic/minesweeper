import { boardModel } from '@/entities/board';
import { timerModel } from '@/entities/timer';
import { startGameModel } from '@/features/start-game';
import { sample } from 'effector';

sample({
  source: boardModel.$touched,
  filter: (touched) => touched,
  target: [timerModel.start],
});

sample({
  clock: startGameModel.start,
  target: timerModel.reset,
});

sample({
  clock: boardModel.clickCell,
  filter: ({ state }) => state === boardModel.CellStates.Hidden,
  target: boardModel.revealCell,
});
