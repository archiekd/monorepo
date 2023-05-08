import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Box } from "@mui/material"

import { ConnectionRoutineMove } from "../ConnectionRoutineMove"
import { SingleMoveInfo } from "../CreateRoutine"
import { RoutineMove } from "../RoutineMove"

type Props = {
  id: string
  moves: SingleMoveInfo[]
  onLinkSelect?: (index: number) => void
}

export const SortableMoveItem = ({ id, moves, onLinkSelect }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform ? { ...transform, scaleX: 1, scaleY: 1 } : transform),
    transition
  }

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {moves.length > 1 ? (
        <Box width="100%" display="flex" justifyContent="center">
          <ConnectionRoutineMove moves={moves} id={id} />
        </Box>
      ) : (
        <Box width="100%" display="flex" justifyContent="center">
          <RoutineMove move={moves[0]} id={id} />
        </Box>
      )}
    </Box>
  )
}
