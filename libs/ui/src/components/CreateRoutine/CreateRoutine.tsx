import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import LinkIcon from "@mui/icons-material/Link"
import { Box, IconButton, useTheme } from "@mui/material"

import { ConnectionRoutineMove } from "./ConnectionRoutineMove"
import { RoutineMove } from "./RoutineMove"

export type SingleMoveInfo = {
  letterValue: string
  description: string
  pointValue: number
}

type Props = {
  routine: Array<SingleMoveInfo[]>
  addMove: () => void
}

export const CreateRoutine = ({ routine, addMove }: Props) => {
  const theme = useTheme()

  return (
    <Box sx={{ background: theme.palette.grey[100] }} height="70vh" width="40vw" display="flex" flexDirection="column" box-shadow={theme.shadows[11]}>
      <Box height="85%" padding="20px" overflow="scroll">
        {routine.map((moves, index) => {
          const firstMove = { ...moves[0] }
          return (
            <>
              {moves.length > 1 ? (
                <Box width="100%" display="flex" justifyContent="center">
                  <ConnectionRoutineMove moves={moves} />
                </Box>
              ) : (
                <Box width="100%" display="flex" justifyContent="center">
                  <RoutineMove {...firstMove} />
                </Box>
              )}
              {index !== routine.length - 1 ? (
                <Box width="100%" display="flex" justifyContent="center">
                  <IconButton>
                    <LinkIcon sx={{ transform: "rotate(90deg)" }} />
                  </IconButton>
                </Box>
              ) : null}
            </>
          )
        })}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" height="15%">
        <IconButton aria-label="delete" size="small" onClick={addMove}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
