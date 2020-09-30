import { createMuiTheme } from '@material-ui/core';
import { purple, green, red } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
  },
});
