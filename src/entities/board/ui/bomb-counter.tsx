import { Box } from '@/shared/ui/box';
import { Sprite } from '@/shared/ui/sprite';

const NUM_SPRITES_Y = 0;
const NUM_SPRITES_H = 23;
const NUM_SPRITES_W = 13;

export const BombCounter = () => {
  return (
    <Box display="inline-flex">
      <Sprite
        x={126}
        y={NUM_SPRITES_Y}
        width={NUM_SPRITES_W}
        height={NUM_SPRITES_H}
      />
      <Sprite
        x={126}
        y={NUM_SPRITES_Y}
        width={NUM_SPRITES_W}
        height={NUM_SPRITES_H}
      />
      <Sprite
        x={126}
        y={NUM_SPRITES_Y}
        width={NUM_SPRITES_W}
        height={NUM_SPRITES_H}
      />
    </Box>
  );
};
