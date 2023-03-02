import { BombCounter } from '@/entities/board';
import { GameStatusButton } from '@/entities/game';
import { Timer } from '@/entities/timer';
import { Box } from '@/shared/ui/box';

export const GamePanel = () => (
  <Box
    p={2}
    display="flex"
    bg="#C0C0C0"
    alignItems="center"
    justifyContent="space-between"
  >
    <BombCounter />
    <GameStatusButton />
    <Timer />
  </Box>
);
