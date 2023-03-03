import { boardModel } from '@/entities/board';
import { gameModel } from '@/entities/game';
import { timerModel } from '@/entities/timer';
import { createEvent, sample } from 'effector';

export const start = createEvent();

sample({
  clock: start,
  target: [boardModel.generate, timerModel.start],
});

sample({
  clock: start,
  fn: () => gameModel.GameStates.Start,
  target: [gameModel.changeGameState],
});
