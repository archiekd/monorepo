import React from "react"

import { Box } from "@mui/material"

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
  return (
    <StartValueWrapper>
      <ScoreAddition label="Base - " score={base} color="black" />
      <ScoreAddition label="D score - " score={dScore} color="purple" />
      <ScoreAddition label="Requirements - " score={requirements} color="green" />
      {connections ? <ScoreAddition label="Connections - " score={connections} color="orange" /> : null}
      <Box
        sx={{ backgroundColor: "lightblue", height: "60px" }}
        borderRadius="5px"
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
