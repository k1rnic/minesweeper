import { css } from 'styled-components';

const inner = css`
  border: 4px solid;
  border-color: grey white white grey;
`;
const outer = css`
  border: 4px solid;
  border-color: white grey grey white;
`;

export const shadows = { inner, outer };
