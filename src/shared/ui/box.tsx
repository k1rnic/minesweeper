import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
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
  FlexboxProps;

export const Box = styled.div<BoxProps>`
  ${layout}
  ${space}
  ${color}
  ${border}
  ${position}
  ${flexbox}
`;
