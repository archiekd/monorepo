import { ReactNode } from "react"

import { Box } from "@mui/material"

interface Props {
  children: ReactNode
}

export const GeneralWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        height: "100vh",
        marginTop: "5%"
      }}
    >
      {children}
    </Box>
  )
}
