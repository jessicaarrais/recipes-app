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

// primary?: PaletteColorOptions;
// secondary?: PaletteColorOptions;
// error?: PaletteColorOptions;
// warning?: PaletteColorOptions;
// info?: PaletteColorOptions;
// success?: PaletteColorOptions;
// type?: PaletteType;
// tonalOffset?: PaletteTonalOffset;
// contrastThreshold?: number;
// common?: Partial<CommonColors>;
// grey?: ColorPartial;
// text?: Partial<TypeText>;
// divider?: string;
// action?: Partial<TypeAction>;
// background?: Partial<TypeBackground>;
// getContrastText?: (background: string) => string;
