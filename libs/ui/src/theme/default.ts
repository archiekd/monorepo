import { ThemeOptions } from "@mui/material"

import TypographyOverrides from "./overrides/TypographyOverrides"
import UiTypographyOverrides, { UiTypographyOverridesProps } from "./overrides/UiTypographyOverrides"

declare module "@mui/material/styles" {
  interface Theme {
    uiTypography: UiTypographyOverridesProps
  }

  interface ThemeOptions {
    uiTypography: UiTypographyOverridesProps
  }
}

const defaultOverrides: ThemeOptions = {
  typography: TypographyOverrides,
  uiTypography: UiTypographyOverrides
}

export const theme: ThemeOptions = {
  ...defaultOverrides
}
