import { createEvent, restore } from 'effector';
import { GameStates } from './types';

const changeGameState = createEvent<GameStates>();

const $gameState = restore(changeGameState, null);

export { $gameState, changeGameState };
