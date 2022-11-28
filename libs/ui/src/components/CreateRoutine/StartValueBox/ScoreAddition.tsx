import React from "react"

import { Box } from "@mui/material"

import { UiTypography } from "../../ui"
import { displayNumWith1Decimal } from "./helper"

type ScoreAdditionProps = {
  score: number
  label: string
  color: string
}

const ScoreAddition: React.FC<ScoreAdditionProps> = ({ score, label, color }) => {
  return (
    <Box display="flex" justifyContent="space-between" padding={1.5}>
      <UiTypography fontWeight={700} color={color}>
        {label}
      </UiTypography>
      <UiTypography fontWeight={700}>{displayNumWith1Decimal(score)}</UiTypography>
    </Box>
  )
}

export default ScoreAddition
