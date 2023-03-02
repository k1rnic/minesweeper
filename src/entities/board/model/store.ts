import { createEvent, createStore } from 'effector';
import { generateRandomBoard } from '../lib';
import { BOARD_SIZE } from './constants';
import { IBoard } from './types';

export const generate = createEvent();

export const $board = createStore<IBoard>([]).on(generate, () =>
  generateRandomBoard(BOARD_SIZE),
);
