import { useParsedNumber } from '@/shared/lib/parse-number';
import { Box } from '@/shared/ui/box';
import { Sprite, useSprite } from '@/shared/ui/sprite';

const NUM_COUNT = 10;

const shiftedNum = (num: number) => (num === 0 ? NUM_COUNT : num);

export type ScoreBoardProps = {
  value: number;
};

export const ScoreBoard = ({ value }: ScoreBoardProps) => {
  const { units, dozens, hundreds } = useParsedNumber(value);

  const unitsSprite = useSprite(1, shiftedNum(units));
  const dozensSprite = useSprite(1, shiftedNum(dozens));
  const hundredsSprite = useSprite(1, shiftedNum(hundreds));

  return (
    <Box display="inline-flex">
      <Sprite {...hundredsSprite} />
      <Sprite {...dozensSprite} />
      <Sprite {...unitsSprite} />
    </Box>
  );
};
