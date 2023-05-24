import { useSortable } from "@dnd-kit/sortable"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { Box, Stack, useTheme } from "@mui/material"

import { SingleMoveInfo } from "../CreateRoutine"
import { SingleMove } from "./SingleMove"

type Props = {
  id: string
  moves: SingleMoveInfo[]
}

export const ConnectionRoutineMove = ({ moves, id }: Props) => {
  const theme = useTheme()
  const { attributes, listeners, setNodeRef } = useSortable({
    id: id
  })
  return (
    <Box
      border={`2px solid ${theme.palette.primary.dark}`}
      height="150px"
      width="400px"
      borderRadius="5px"
      display="flex"
      alignItems="center"
      padding="5px"
    >
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="90%">
        <Stack direction="column" spacing={2}>
          {moves.map((move) => (
            <SingleMove {...move} key={move.id} />
          ))}
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        height="100%"
        width="10%"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        sx={{
          ":hover": {
            cursor: "grab"
          }
        }}
      >
        <DragIndicatorIcon />
      </Box>
    </Box>
  )
}
