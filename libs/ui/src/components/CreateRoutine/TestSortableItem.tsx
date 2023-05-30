import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Box } from "@mui/material"

type Props = {
  id: string
}

export const TestSortableItem = ({ id }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform ? { ...transform, scaleX: 1, scaleY: 1 } : transform),
    transition
  }

  console.log("transform", transform)
  return (
    <Box
      width="300px"
      minHeight={Number(id) % 2 ? "50px" : "100px"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      border="2px solid green"
      marginBottom="5px"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {id}
    </Box>
  )
}
