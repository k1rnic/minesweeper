import { Box } from '@/shared/ui/box';
import { Sprite } from '@/shared/ui/sprite';

export const Timer = () => {
  return (
    <Box display="inline-flex">
      <Sprite x={126} y={0} width={13} height={23} />
      <Sprite x={126} y={0} width={13} height={23} />
      <Sprite x={126} y={0} width={13} height={23} />
    </Box>
  );
};
