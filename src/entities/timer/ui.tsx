import { ScoreBoard } from '@/shared/ui/score-board';
import { useStore } from 'effector-react';
import { TimerStore } from './model';

type TimerProps = {
  store: TimerStore;
};

export const Timer = ({ store }: TimerProps) => {
  const time = useStore(store.$elapsed);

  return <ScoreBoard value={time} />;
};
