import React from "react"

import { Box } from "@mui/material"
import { startCase } from "lodash"

import { CreateRoutine, SingleMoveInfo, StartValueBox, StartValueBoxProps } from "../../CreateRoutine"
import { UiButton, UiTypography } from "../../ui"

type CreateRoutineFormProps = {
  addMove: () => void
  title: string
  startValue: StartValueBoxProps
  routine: Array<SingleMoveInfo[] | SingleMoveInfo>
}

export const CreateRoutineForm: React.FC<CreateRoutineFormProps> = ({ addMove, title, startValue, routine }) => {
  return (
    <Box display="flex" justifyContent="space-evenly" height="100%" alignItems="center">
      <CreateRoutine addMove={addMove} routine={routine} />
      <Box display="flex" flexDirection="column" justifyContent="space-evenly" height="70vh">
        <UiTypography fontWeight="900" size="5xl">
          {startCase(title)}
        </UiTypography>
        <StartValueBox {...startValue} />
      </Box>
    </Box>
  )
}
