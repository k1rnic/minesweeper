import { boardModel } from '@/entities/board';
import { gameModel } from '@/entities/game';
import { createEvent } from 'effector';

export const start = createEvent();

start.watch(() => {
  boardModel.generate();
  gameModel.changeGameState(gameModel.GameStates.Start);
});
