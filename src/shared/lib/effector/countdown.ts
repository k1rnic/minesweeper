import { createEvent, createStore, Event, Unit } from 'effector';

type CreateCountdownStoreProps = {
  initial: number;
  increment?: Event<void>;
  decrement?: Event<void>;
  reset?: Unit<unknown>[];
};

export const createCountdownStore = ({
  initial,
  increment = createEvent(),
  decrement = createEvent(),
  reset = [],
}: CreateCountdownStoreProps) => {
  const $countdown = createStore(initial)
    .on(increment, (count) => Math.min(initial, count + 1))
    .on(decrement, (count) => Math.max(0, count - 1))
    .reset(reset);

  return { $countdown, increment, decrement };
};
