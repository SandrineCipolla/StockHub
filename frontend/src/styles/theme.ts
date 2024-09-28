import { createTheme } from "@mui/material";

declare module '@mui/material/styles/createPalette' {
    interface PaletteOptions {
        customColor?: {
            main: string;
            contrastText?: string;
        };
    }
}
const berryTheme = createTheme({
    palette: {
        primary: {
            main: '#5b21b6',
        },
        secondary: {
            main: '#7e57c2',
        },
        customColor: {
            main: '#A855F7',
            contrastText: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

export default berryTheme;