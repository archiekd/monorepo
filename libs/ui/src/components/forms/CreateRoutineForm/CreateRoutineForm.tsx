import React from "react"

import { Box } from "@mui/material"
import { startCase } from "lodash"

import { StartValueBox, StartValueBoxProps } from "../../CreateRoutine"
import { UiButton, UiTypography } from "../../ui"

type CreateRoutineFormProps = {
  addMove: () => void
  title: string
  startValue: StartValueBoxProps
}

export const CreateRoutineForm: React.FC<CreateRoutineFormProps> = ({ addMove, title, startValue }) => {
  return (
    <Box display="flex" justifyContent="space-evenly" height="100%" alignItems="center">
      <Box sx={{ background: "pink" }} height="70vh" width="40vw">
        <UiButton onClick={addMove}>Move</UiButton>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-evenly" height="70vh">
        <UiTypography fontWeight="900" size="5xl">
          {startCase(title)}
        </UiTypography>
        <StartValueBox {...startValue} />
      </Box>
    </Box>
  )
}
