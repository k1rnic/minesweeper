import { ScoreBoard } from '@/shared/ui/score-board';
import { useStore } from 'effector-react';
import { $bombsCount } from '../model';

export const BombCounter = () => {
  const bombsCount = useStore($bombsCount);

  return <ScoreBoard value={bombsCount} />;
};
