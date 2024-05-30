'use client'

import { GeistSans } from 'geist/font/sans'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: GeistSans.style.fontFamily,
  },

  palette: {
    primary: {
      main: '#ff6f61',
      contrastText: '#fff',
    },
    secondary: {
      // main: '#04589a',
      main: '#777',
      // contrastText: '#fff',
    },
  },

  shape: { borderRadius: 20 },
})

export default theme
