import { useMediaQuery, useTheme } from "@mui/material"

export const useBreakpoints = () => {
  const theme = useTheme()
  console.log('theme.breakpoints.up("sm")', theme.breakpoints.up("sm"))
  return {
    isSmUp: useMediaQuery(theme.breakpoints.up("sm"))
  }
}
