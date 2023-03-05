import { createEvent, createStore } from 'effector';
import { isPlaying } from '../lib';
import { GameStates } from './types';

export const createGameStore = () => {
  const restart = createEvent();
  const startPress = createEvent();
  const play = createEvent();
  const win = createEvent();
  const lose = createEvent();

  const movePress = createEvent<boolean>();

  const $gameState = createStore<GameStates>(GameStates.Waiting)
    .on(play, () => GameStates.Playing)
    .on(startPress, () => GameStates.StartPress)
    .on(win, () => GameStates.Win)
    .on(lose, () => GameStates.Lose)
    .reset(restart);

  const $playing = $gameState.map(isPlaying);

  const $movePressed = createStore(false).on(movePress, (_, state) => state);

  return {
    $gameState,
    $movePressed,
    $playing,
    play,
    restart,
    startPress,
    win,
    lose,
    movePress,
  };
};

export type GameStore = ReturnType<typeof createGameStore>;
