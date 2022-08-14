import { ReactNode } from "react"

import { Box, useTheme } from "@mui/material"

interface Props {
  children: ReactNode
}

export const AuthWrapper = ({ children }: Props) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.grey[500]
      }}
    >
      {children}
    </Box>
  )
}
