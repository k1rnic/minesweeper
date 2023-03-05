import { boardModel } from '@/entities/board';
import { gameModel } from '@/entities/game';
import { createEvent } from 'effector';

const start = createEvent();
const stop = createEvent();

start.watch(() => {
  boardModel.generate();
  gameModel.changeGameState(gameModel.GameStates.Start);
});

export { start, stop };
