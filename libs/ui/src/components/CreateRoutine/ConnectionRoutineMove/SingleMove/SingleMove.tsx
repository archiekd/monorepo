import { Box, useTheme } from "@mui/material"

import { UiTypography } from "../../../ui"
import { SingleMoveInfo } from "../../CreateRoutine"

interface Props extends SingleMoveInfo {}

export const SingleMove = ({ moveDescription, letterValue, pointValue }: Props) => {
  const theme = useTheme()
  return (
    <Box border={`2px solid ${theme.palette.primary.dark}`} height="50px" width="330px" borderRadius="5px" display="flex">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRight={`2px solid ${theme.palette.primary.dark}`}
        height="100%"
        width="15%"
      >
        <UiTypography weight="bold" color={theme.palette.primary.dark}>
          {letterValue}
        </UiTypography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" padding="10px">
        <UiTypography size="md">
          {moveDescription} - {pointValue}
        </UiTypography>
      </Box>
    </Box>
  )
}
