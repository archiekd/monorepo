import { useMemo, useState } from "react"

import { Active, closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Box, IconButton, useTheme } from "@mui/material"

import { TestSortableItem } from "./TestSortableItem"

export const TestSortable = () => {
  const theme = useTheme()

  const [active, setActive] = useState<Active | null>(null)
  const [items, setItems] = useState([
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
    { id: "13" }
  ])
  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <Box sx={{ background: theme.palette.grey[100] }} height="70vh" width="40vw" display="flex" flexDirection="column" box-shadow={theme.shadows[11]}>
      <Box height="85%" padding="20px" overflow="scroll" display="flex" flexDirection="column" alignItems="center">
        <DndContext
          sensors={sensors}
          onDragStart={({ active }) => {
            setActive(active)
          }}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (over && active.id !== over?.id) {
              const activeIndex = items.findIndex((item) => item.id === active.id)
              const overIndex = items.findIndex((item) => item.id === over.id)

              setItems(arrayMove(items, activeIndex, overIndex))
            }
            setActive(null)
          }}
          onDragCancel={() => {
            setActive(null)
          }}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <TestSortableItem key={item.id} id={item.id} />
            ))}
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  )
}
