import { GameStates } from '../model/types';

export const isPlaying = (state: GameStates) =>
  [GameStates.Waiting, GameStates.Playing].includes(state);

export const isFinished = (state: GameStates) =>
  [GameStates.Win, GameStates.Lose].includes(state);
