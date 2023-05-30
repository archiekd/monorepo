import { useSortable } from "@dnd-kit/sortable"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import LinkOffIcon from "@mui/icons-material/LinkOff"
import { Box, IconButton, Stack, useTheme } from "@mui/material"

import { SingleMoveInfo } from "../CreateRoutine"
import { SingleMove } from "./SingleMove"

type Props = {
  id: string
  moves: SingleMoveInfo[]
  onUnlinkSelect?: (index: number) => void
}

export const ConnectionRoutineMove = ({ moves, id, onUnlinkSelect }: Props) => {
  const theme = useTheme()
  const {
    attributes,
    listeners,
    setNodeRef,
    index: routineIndex
  } = useSortable({
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
        <Stack direction="column">
          {moves.map((move, index) => (
            <>
              <SingleMove {...move} key={move.id} />
              {index === 0 && (
                <IconButton onClick={() => onUnlinkSelect?.(routineIndex)} sx={{ margin: 0, padding: 0, width: "20px", alignSelf: "center" }}>
                  <LinkOffIcon sx={{ transform: "rotate(90deg)" }} />
                </IconButton>
              )}
            </>
          ))}
        </Stack>
      </Box>
      <IconButton ref={setNodeRef} {...attributes} {...listeners}>
        <DragIndicatorIcon />
      </IconButton>
    </Box>
  )
}
