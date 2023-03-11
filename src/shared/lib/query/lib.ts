import { ComposeFn } from './model';

const or: ComposeFn =
  (...conditionFns) =>
  (entry) =>
    conditionFns.some((query) => query(entry));

const and: ComposeFn =
  (...conditionFns) =>
  (entry) =>
    conditionFns.every((query) => query(entry));

export const query = { or, and };

export default query;
