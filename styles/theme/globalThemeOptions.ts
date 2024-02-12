'use client'
import { Theme, ThemeOptions, createTheme } from '@mui/material/styles'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

const globalThemeOptions: ThemeOptions = {
  palette: {
    common: {
      black: '#2E2E2E',
      white: '#FFFFFF',
    },
    primary: {
      main: '#2D3190',
      dark: '#151639',
      light: '#1976D2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#04A450',
      dark: '#00632F',
      light: '#04A450',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#7E0A0A',
    },
    warning: {
      main: '#EB9500',
    },
    info: {
      main: '#ADD2FF',
    },
    success: {
      main: '#2CFFA7',
      dark: '#C2F499',
    },
    background: {
      default: '#F1F1F1',
      paper: '#FFFFFF',
    },
    mode: 'light',
  },
  typography: {
    fontFamily: [
      poppins.style.fontFamily,
      'MontserratVariable',
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
}

export const globalTheme: Theme = createTheme(globalThemeOptions)
