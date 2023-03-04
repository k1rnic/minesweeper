import { createEvent, createStore } from 'effector';

const start = createEvent();
const stop = createEvent();
const tick = createEvent();
const reset = createEvent();

interface TimerStore {
  elapsed: number;
  intervalId: NodeJS.Timer | null;
}

const clearIntervalId = (intervalId: NodeJS.Timer | null) => {
  if (intervalId) {
    intervalId && clearInterval(intervalId);
  }
};

const $timer = createStore<TimerStore>({ elapsed: 0, intervalId: null })
  .on(start, (state) => {
    clearIntervalId(state.intervalId);
    return { elapsed: 0, intervalId: setInterval(tick, 1000) };
  })
  .on(stop, (state) => {
    clearIntervalId(state.intervalId);
    return { ...state, intervalId: null };
  })
  .on(reset, (state) => {
    clearIntervalId(state.intervalId);
    return { elapsed: 0, intervalId: null };
  })
  .on(tick, (state) => ({ ...state, elapsed: state.elapsed + 1 }));

const $elapsed = $timer.map(({ elapsed }) => elapsed);

export { $elapsed, start, stop, reset };
