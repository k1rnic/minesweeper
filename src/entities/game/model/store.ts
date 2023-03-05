import { createEvent, createStore, restore } from 'effector';
import { GameStates } from './types';

const changeGameState = createEvent<GameStates>();
const makeMove = createEvent<boolean>();

const $gameState = restore(changeGameState, null);
const $movePressed = createStore(false).on(makeMove, (_, state) => state);

export { $gameState, $movePressed, changeGameState, makeMove };
