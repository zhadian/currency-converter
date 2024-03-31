import React, { ReactNode } from 'react';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';

export interface MuiTheme extends ThemeOptions {
  icons?: any;
}

export interface MuiProviderProps {
  children: ReactNode;
  theme: MuiTheme;
}

export const MuiProvider: React.FC<MuiProviderProps> = ({
  children,
  theme
}) => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
