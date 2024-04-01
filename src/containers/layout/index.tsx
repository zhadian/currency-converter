import React, { Fragment } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { Convertor } from '../../features';
import { themes } from '../../themes';

export const LayoutContainer = () => {
  const { rootTheme, containerTheme } = themes;
  return (
    <Fragment>
      <CssBaseline />
      <Box {...rootTheme}>
        <Container {...containerTheme}>
          <Convertor />
        </Container>
      </Box>
    </Fragment>
  );
};
