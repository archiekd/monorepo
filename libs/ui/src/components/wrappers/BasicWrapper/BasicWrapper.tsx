import React, { ReactNode } from "react"

import { Box } from "@mui/material"

type BasicWrapperProps = {
  children: ReactNode
}

const BasicWrapper: React.FC<BasicWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 65px)",
        padding: "5%"
      }}
    >
      {children}
    </Box>
  )
}

export default BasicWrapper
