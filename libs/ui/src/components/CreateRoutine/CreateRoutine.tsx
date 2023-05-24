import { useMemo, useState } from "react"

import {
  Active,
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import LinkIcon from "@mui/icons-material/Link"
import { Box, IconButton, Stack, useTheme } from "@mui/material"

import { ConnectionRoutineMove } from "./ConnectionRoutineMove"
import { RoutineMove } from "./RoutineMove"
import { SortableMoveItem } from "./SortableMoveItem"

export type SingleMoveInfo = {
  id: string
  letterValue: string
  description: string
  pointValue: number
}

export type MoveInfo = {
  id: string
  moves: SingleMoveInfo[]
}

type Props = {
  routine: MoveInfo[]
  addMove: () => void
  onLinkSelect?: (index: number) => void
  onReorder?: (routine: MoveInfo[]) => void
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
}

export const CreateRoutine = ({ routine, addMove, onLinkSelect, onReorder }: Props) => {
  const [active, setActive] = useState<Active | null>(null)

  const theme = useTheme()
  const activeItem = useMemo(() => routine.find((item) => item.id === active?.id), [active, routine])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <Box sx={{ background: theme.palette.grey[100] }} height="70vh" width="40vw" display="flex" flexDirection="column" box-shadow={theme.shadows[11]}>
      <Box height="85%" padding="20px" overflow="scroll">
        <DndContext
          sensors={sensors}
          onDragStart={({ active }) => {
            setActive(active)
          }}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (over && active.id !== over?.id) {
              const activeIndex = routine.findIndex((item) => item.id === active.id)
              const overIndex = routine.findIndex((item) => item.id === over.id)

              onReorder && onReorder(arrayMove(routine, activeIndex, overIndex))
            }
            setActive(null)
          }}
          onDragCancel={() => {
            setActive(null)
          }}
        >
          <SortableContext items={routine.map((moves) => moves.id)} strategy={verticalListSortingStrategy}>
            {routine.map(({ moves, id }, index) => {
              const lastMove = index === routine.length - 1
              const shouldShowLinkIcon =
                !lastMove && routine[index].moves.length === 1 && index + 1 < routine.length && routine[index + 1].moves.length === 1

              return (
                <SortableMoveItem key={id} id={id} moves={moves} shouldShowLinkIcon={shouldShowLinkIcon} index={index} onLinkSelect={onLinkSelect} />
              )
            })}
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimationConfig}>
            {activeItem ? (
              <SortableMoveItem key={activeItem.id} id={activeItem.id} moves={activeItem.moves} shouldShowLinkIcon={false} index={1} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" height="15%">
        <IconButton aria-label="delete" size="small" onClick={addMove}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
