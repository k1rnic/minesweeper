import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';

export type BoxProps = LayoutProps &
  ColorProps &
  SpaceProps &
  BorderProps &
  PositionProps &
  FlexboxProps &
  GridProps;

export const Box = styled.div<BoxProps>`
  ${grid}
  ${layout}
  ${space}
  ${color}
  ${border}
  ${position}
  ${flexbox}
`;
