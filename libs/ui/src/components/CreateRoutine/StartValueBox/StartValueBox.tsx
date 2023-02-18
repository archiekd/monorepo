import React from "react"

import { Box, useTheme } from "@mui/material"

import { UiTypography } from "../../ui"
import { displayNumWith1Decimal } from "./helper"
import ScoreAddition from "./ScoreAddition"
import { StartValueWrapper } from "./style"

export type StartValueBoxProps = {
  base: number
  dScore: number
  requirements: number
  connections: number
  totalStart: number
}

export const StartValueBox: React.FC<StartValueBoxProps> = ({ base, dScore, requirements, connections, totalStart }) => {
  const theme = useTheme()
  return (
    <StartValueWrapper>
      <ScoreAddition label="Base - " score={base} color="black" />
      <ScoreAddition label="D score - " score={dScore} color="#dc5687" />
      <ScoreAddition label="Requirements - " score={requirements} color="#56dc68" />
      <ScoreAddition label="Connections - " score={connections} color="#dcab56" />
      <Box
        sx={{ backgroundColor: theme.palette.primary.light, height: "60px" }}
        borderRadius="0 0 5px 5px"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginTop={1.5}
      >
        <UiTypography fontWeight={900} color="white">
          Total Start:
        </UiTypography>
        <UiTypography fontWeight={900} color="white">
          {displayNumWith1Decimal(totalStart)}
        </UiTypography>
      </Box>
    </StartValueWrapper>
  )
}
