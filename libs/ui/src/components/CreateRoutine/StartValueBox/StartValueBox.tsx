import React from "react"

import { Box, useTheme } from "@mui/material"

import { UiTypography } from "../../ui"
import { displayNumWith1Decimal } from "./helper"
import ScoreAddition from "./ScoreAddition"
import { StartValueWrapper } from "./style"

export type StartValueBoxProps =
  | {
      eScore?: number
      dScore?: {
        requirements: number
        connections: number
        moveTotal: number
      }
      total?: number
    }
  | undefined

export const StartValueBox = (props: StartValueBoxProps) => {
  const theme = useTheme()
  return (
    <StartValueWrapper>
      <ScoreAddition label="E Score - " score={props?.eScore} color="black" />
      <ScoreAddition label="Move total - " score={props?.dScore?.moveTotal} color="#dc5687" />
      <ScoreAddition label="Requirements - " score={props?.dScore?.requirements} color="#56dc68" />
      <ScoreAddition label="Connections - " score={props?.dScore?.connections} color="#dcab56" />
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
          {displayNumWith1Decimal(props?.total)}
        </UiTypography>
      </Box>
    </StartValueWrapper>
  )
}
