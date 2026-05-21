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
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    textTransform: 'none',
                    fontWeight: 700,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'linear-gradient(140deg, rgba(29, 25, 44, 0.95), rgba(16, 14, 24, 0.98))',
                    border: '1px solid rgba(42, 38, 64, 1)',
                },
            },
        },
    },
});

export default theme;
