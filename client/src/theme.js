import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F8C8DC',
        },
        secondary: {
            main: '#F8C8DC',
            accent: '#F4C095',
        },
        error: {
            main: '#D72638',
        },
        info: {
            main: '#5DADE2',
        },
        success: {
            main: '#F8C8DC',
        },
        background: {
            main: '#FFF5E1',
        },
        text: {
            primary: '#6D214F',
            secondary: '#B5838D',
        },
    },
    typography: {
        fontFamily: "'Lora', serif",
        h1: { fontFamily: "'Playfair Display', serif" },
        h2: { fontFamily: "'Playfair Display', serif" },
        h3: { fontFamily: "'Playfair Display', serif" },
        h4: { fontFamily: "'Playfair Display', serif" },
        h5: { fontFamily: "'Playfair Display', serif" },
        h6: { fontFamily: "'Playfair Display', serif" },
    },
});

export default theme;