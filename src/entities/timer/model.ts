import { createEvent, createStore } from 'effector';

const start = createEvent();
const stop = createEvent();
const tick = createEvent();

const $timer = createStore<{
  elapsed: number;
  intervalId: NodeJS.Timer | null;
}>({
  elapsed: 0,
  intervalId: null,
})
  .on(start, (state) => {
    if (state.intervalId) {
      clearInterval(state.intervalId);
    }
    return { elapsed: 0, intervalId: setInterval(tick, 1000) };
  })
  .on(stop, (state) => {
    if (state.intervalId) {
      clearInterval(state.intervalId);
    }
    return { ...state, intervalId: null };
  })
  .on(tick, (state) => ({ ...state, elapsed: state.elapsed + 1 }));

const $elapsed = $timer.map(({ elapsed }) => elapsed);

export { $elapsed, start, stop };
