import { boardModel } from '@/entities/board';
import { timerModel } from '@/entities/timer';
import { createEvent, sample } from 'effector';

export const start = createEvent();

sample({
  clock: start,
  target: [boardModel.generate, timerModel.start],
});
