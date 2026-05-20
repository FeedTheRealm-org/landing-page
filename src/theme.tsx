import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6',
    },
    secondary: {
      main: '#6ae4ff',
    },
    background: {
      default: '#0a0a12',
      paper: '#141320',
    },
    text: {
      primary: '#f8f5ff',
      secondary: '#b8b0d6',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;
