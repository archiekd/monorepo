import { Box } from "@mui/material"
import { startCase } from "lodash"

import { CreateRoutine, MoveInfo, StartValueBox, StartValueBoxProps } from "../../CreateRoutine"
import { UiTypography } from "../../ui"

type CreateRoutineFormProps = {
  addMove: () => void
  title: string
  startValue?: StartValueBoxProps
  routine: MoveInfo[]
  onLinkSelect?: (index: number) => void
  onUnlinkSelect?: (index: number) => void
  onReorder?: (routine: MoveInfo[]) => void
  routineName?: string
}

export const CreateRoutineForm: React.FC<CreateRoutineFormProps> = ({
  addMove,
  title,
  startValue,
  routine,
  onLinkSelect,
  onReorder,
  routineName,
  onUnlinkSelect
}) => {
  return (
    <Box display="flex" justifyContent="space-evenly" height="100%" alignItems="center">
      <CreateRoutine
        addMove={addMove}
        routine={routine}
        onLinkSelect={onLinkSelect}
        onReorder={onReorder}
        routineName={routineName}
        onUnlinkSelect={onUnlinkSelect}
      />
      <Box display="flex" flexDirection="column" justifyContent="space-evenly" height="70vh">
        <UiTypography fontWeight="900" size="5xl">
          {startCase(title)}
        </UiTypography>
        <StartValueBox {...startValue} />
      </Box>
    </Box>
  )
}
