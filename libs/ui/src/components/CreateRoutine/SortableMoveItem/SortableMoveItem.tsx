import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import LinkIcon from "@mui/icons-material/Link"
import { Box, IconButton } from "@mui/material"

import { ConnectionRoutineMove } from "../ConnectionRoutineMove"
import { SingleMoveInfo } from "../CreateRoutine"
import { RoutineMove } from "../RoutineMove"

type Props = {
  id: string
  moves: SingleMoveInfo[]
  shouldShowLinkIcon: boolean
  onLinkSelect?: (index: number) => void
  index: number
}

export const SortableMoveItem = ({ id, moves, shouldShowLinkIcon, onLinkSelect, index }: Props) => {
  const { setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform ? { ...transform, scaleX: 1, scaleY: 1 } : transform),
    transition
  }

  return (
    <Box ref={setNodeRef} style={{ ...style, opacity: isDragging ? 0.4 : 1 }}>
      {moves.length > 1 ? (
        <Box width="100%" display="flex" justifyContent="center">
          <ConnectionRoutineMove moves={moves} id={id} />
        </Box>
      ) : (
        <Box width="100%" display="flex" justifyContent="center">
          <RoutineMove move={moves[0]} id={id} />
        </Box>
      )}
      {shouldShowLinkIcon && !isDragging ? (
        <Box width="100%" display="flex" justifyContent="center">
          <IconButton onClick={() => onLinkSelect?.(index)}>
            <LinkIcon sx={{ transform: "rotate(90deg)" }} />
          </IconButton>
        </Box>
      ) : (
        <Box height="20px" />
      )}
    </Box>
  )
}
