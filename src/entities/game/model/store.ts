import { createEvent, createStore, restore } from 'effector';
import { GameStates } from './types';

const start = createEvent();
const stop = createEvent();

const changeGameState = createEvent<GameStates>();
const makeMove = createEvent<boolean>();

const $gameState = restore(changeGameState, null);
const $movePressed = createStore(false).on(makeMove, (_, state) => state);

export { $gameState, $movePressed, start, stop, changeGameState, makeMove };
