import { ScoreBoard } from '@/shared/ui/score-board';
import { useStore } from 'effector-react';
import { $elapsed } from './model';

export const Timer = () => {
  const time = useStore($elapsed);

  return <ScoreBoard value={time} />;
};
