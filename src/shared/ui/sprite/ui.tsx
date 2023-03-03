import { Box } from '@/shared/ui/box';
import styled from 'styled-components';
import spriteSrc from './assets/sprites.png';
import { ISprite } from './model';

export type SpriteProps = ISprite;

export const Sprite = styled(Box)<SpriteProps>(
  ({ height, width, x, y }) => `
  display: inline-box;
  width: ${width}px;
  height: ${height}px;
  background-image: url(${spriteSrc});
  background-position: -${x}px -${y}px;
`,
);
