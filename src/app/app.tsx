import { Box } from '@/shared/ui/box';

import { createGlobalStyle } from 'styled-components';

import { MineSweeper } from '@/widgets/minesweeper';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
`;

export const App = () => (
  <>
    <GlobalStyle />
    <Box
      display="flex"
      height="100vh"
      width="100vw"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <MineSweeper />
    </Box>
  </>
);
