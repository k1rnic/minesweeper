import { startGameModel } from '@/features/start-game';
import { Box } from '@/shared/ui/box';

import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import { MineSweeper } from '@/widgets/minesweeper';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
`;

export const App = () => {
  useEffect(() => {
    startGameModel.start();
  }, []);

  return (
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
        <Box display="inline-flex" flexDirection="column" bg="#BDBDBD" p={2}>
          <MineSweeper />
        </Box>
      </Box>
    </>
  );
};
