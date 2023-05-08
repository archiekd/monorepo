import { useSortable } from "@dnd-kit/sortable"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { Box, useTheme } from "@mui/material"

import { UiTypography } from "../../ui"
import { SingleMoveInfo } from "../CreateRoutine"

type Props = {
  id: string
  move: SingleMoveInfo
}

export const RoutineMove = ({ move, id }: Props) => {
  const theme = useTheme()
  const { attributes, listeners, setNodeRef } = useSortable({
    id: id
  })

  return (
    <Box
      border={`2px solid ${theme.palette.primary.dark}`}
      height="50px"
      width="400px"
      borderRadius="5px"
      display="flex"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRight={`2px solid ${theme.palette.primary.dark}`}
        height="100%"
        width="15%"
      >
        <UiTypography weight="bold" color={theme.palette.primary.dark}>
          {move.letterValue}
        </UiTypography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" padding="10px">
        <UiTypography size="lg">
          {move.description} - {move.pointValue}
        </UiTypography>
        <DragIndicatorIcon color="inherit" />
      </Box>
    </Box>
  )
}
