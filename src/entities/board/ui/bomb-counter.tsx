import { ScoreBoard } from '@/shared/ui/score-board';
import { useStore } from 'effector-react';
import { BoardStore } from '../model';

type BombCounterProps = {
  store: BoardStore;
};

export const BombCounter = ({ store }: BombCounterProps) => {
  const bombsCount = useStore(store.$bombsCount);

  return <ScoreBoard value={bombsCount} />;
};
