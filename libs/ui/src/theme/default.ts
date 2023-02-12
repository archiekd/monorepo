import { ThemeOptions } from "@mui/material"

import TypographyOverrides from "./overrides/TypographyOverrides"
import UiTypographyOverrides, { UiTypographyOverridesProps } from "./overrides/UiTypographyOverrides"
import { primary } from "./palette/primary"
import { secondary } from "./palette/secondary"

declare module "@mui/material/styles" {
  interface Theme {
    uiTypography: UiTypographyOverridesProps
  }

  interface ThemeOptions {
    uiTypography: UiTypographyOverridesProps
  }
}

const defaultOverrides: ThemeOptions = {
  palette: {
    primary: {
      main: primary[600],
      light: primary[100],
      dark: primary[700],
      ...primary
    },
    secondary: {
      main: secondary[800],
      light: secondary[500],
      dark: secondary[900],
      ...secondary
    }
  },
  typography: TypographyOverrides,
  uiTypography: UiTypographyOverrides
}

export const theme: ThemeOptions = {
  ...defaultOverrides,
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#112231", //secondary[800],
          color: "#fff"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700
        },

        containedPrimary: ({ theme }) => ({
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.grey[900]
          }
        }),
        textInherit: ({ theme }) => ({
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05)"
          }
        })
      }
    }
  }
}
