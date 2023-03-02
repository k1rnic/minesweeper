import { Box } from '@/shared/ui/box';
import { Sprite } from '@/shared/ui/sprite';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { $elapsed } from './model';

const NUM_SPRITES_W = 13;
const NUM_SPRITES_H = 23;
const NUM_SPRITES_Y = 0;

const NUM_COUNT = 9;

const getSpritesX = (num: number) => {
  const offset = NUM_SPRITES_W + 1;

  return num === 0 ? offset * NUM_COUNT : offset * (num - 1);
};

export const Timer = () => {
  const time = useStore($elapsed);
  const [units, setUnits] = useState(0);
  const [dozens, setDozens] = useState(0);
  const [hundreds, setHundreds] = useState(0);

  useEffect(() => {
    setUnits(time % 10);
    setDozens(Math.floor((time % 100) / 10));
    setHundreds(Math.floor((time % 1000) / 100));
  }, [time]);

  return (
    <Box display="inline-flex">
      <Sprite
        x={getSpritesX(hundreds)}
        y={NUM_SPRITES_Y}
        width={NUM_SPRITES_W}
        height={NUM_SPRITES_H}
      />
      <Sprite
        x={getSpritesX(dozens)}
        y={NUM_SPRITES_Y}
        width={NUM_SPRITES_W}
        height={NUM_SPRITES_H}
      />
      <Sprite
        x={getSpritesX(units)}
        y={NUM_SPRITES_Y}
        width={NUM_SPRITES_W}
        height={NUM_SPRITES_H}
      />
    </Box>
  );
};
