import React, { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { Convertor } from './features/currency/view';

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          backgroundImage: `url(https://img.freepik.com/free-photo/dollar-banknotes-frame_1150-6686.jpg?w=2000&t=st=1711893578~exp=1711894178~hmac=7d861706f5de5878a73d6d2eb5aeb9265807e45787591266562706595d824cbb)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '100vh'
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <Convertor />
        </Container>
      </Box>
    </Fragment>
  );
}

export default App;
