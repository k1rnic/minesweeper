import { Board, BombCounter } from '@/entities/board';
import { GameStateButton } from '@/entities/game';
import { Timer } from '@/entities/timer';
import { withStartGameByClick } from '@/features/start-game';
import { Box } from '@/shared/ui/box';

const GameController = withStartGameByClick(GameStateButton);

export const MineSweeper = () => (
  <Box display="inline-flex" flexDirection="column" bg="#BDBDBD" p={2}>
    <Box
      p={2}
      display="flex"
      bg="#C0C0C0"
      alignItems="center"
      justifyContent="space-between"
    >
      <BombCounter />
      <GameController />
      <Timer />
    </Box>
    <Board />
  </Box>
);
