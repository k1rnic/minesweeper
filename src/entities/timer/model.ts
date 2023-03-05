import { createEvent, createStore } from 'effector';

interface Timer {
  elapsed: number;
  intervalId: NodeJS.Timer | null;
}

const clearIntervalId = (intervalId: NodeJS.Timer | null) => {
  if (intervalId) {
    intervalId && clearInterval(intervalId);
  }
};

export const createTimerStore = () => {
  const start = createEvent();
  const stop = createEvent();
  const tick = createEvent();
  const reset = createEvent();

  const $timer = createStore<Timer>({ elapsed: 0, intervalId: null })
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

  return { $elapsed, start, stop, reset };
};

export type TimerStore = ReturnType<typeof createTimerStore>;
