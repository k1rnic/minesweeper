import { GameStatusButton } from '@/entities/game';
import { MineCounter } from '@/entities/mine';
import { Timer } from '@/entities/timer';

export const GamePanel = () => {
  return (
    <>
      <MineCounter />
      <GameStatusButton />
      <Timer />
    </>
  );
};
