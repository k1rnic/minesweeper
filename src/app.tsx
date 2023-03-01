import { Board } from '@/entities/board';
import { GamePanel } from '@/widgets/game-panel';

export const App = () => {
  return (
    <>
      <GamePanel />
      <Board />
    </>
  );
};
