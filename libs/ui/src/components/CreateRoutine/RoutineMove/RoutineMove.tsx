import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { Box, IconButton, useTheme } from "@mui/material"

import { UiTypography } from "../../ui"

type Props = {
  letterValue: string
  moveDescription: string
  pointValue: number
}

export const RoutineMove = ({ moveDescription, letterValue, pointValue }: Props) => {
  const theme = useTheme()
  return (
    <Box border={`2px solid ${theme.palette.primary.dark}`} height="50px" width="400px" borderRadius="5px" display="flex">
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
        <UiTypography size="lg">
          {moveDescription} - {pointValue}
        </UiTypography>
        <DragIndicatorIcon color="inherit" />
      </Box>
    </Box>
  )
}
