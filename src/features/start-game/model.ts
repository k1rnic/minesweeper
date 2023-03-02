import { boardModel } from '@/entities/board';
import { createEvent, sample } from 'effector';

export const start = createEvent();

sample({
  clock: start,
  target: boardModel.generate,
});
