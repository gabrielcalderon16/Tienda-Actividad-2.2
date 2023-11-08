import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1DA7F1',
    },
    secondary: {
      main: '#19857b',
    },
    red:{
      main:'#DC0902'
    },

    error: {
      main: red.A400,
    }
  },
});

export default theme;