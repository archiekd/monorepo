import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import LinkIcon from "@mui/icons-material/Link"
import { Box, IconButton, useTheme } from "@mui/material"

import { ConnectionRoutineMove } from "./ConnectionRoutineMove"
import { RoutineMove } from "./RoutineMove"

export type SingleMoveInfo = {
  id: string
  letterValue: string
  description: string
  pointValue: number
}

type Props = {
  routine: Array<SingleMoveInfo[]>
  addMove: () => void
  onLinkSelect?: (index: number) => void
}

export const CreateRoutine = ({ routine, addMove, onLinkSelect }: Props) => {
  const theme = useTheme()

  return (
    <Box sx={{ background: theme.palette.grey[100] }} height="70vh" width="40vw" display="flex" flexDirection="column" box-shadow={theme.shadows[11]}>
      <Box height="85%" padding="20px" overflow="scroll">
        {routine.map((moves, index) => {
          const firstMove = { ...moves[0] }
          const lastMove = index === routine.length - 1

          return (
            <Box key={firstMove.id + index}>
              {moves.length > 1 ? (
                <Box width="100%" display="flex" justifyContent="center">
                  <ConnectionRoutineMove moves={moves} />
                </Box>
              ) : (
                <Box width="100%" display="flex" justifyContent="center">
                  <RoutineMove {...firstMove} key={firstMove.id} />
                </Box>
              )}
              {!lastMove && routine[index].length === 1 && index + 1 < routine.length && routine[index + 1].length === 1 ? (
                <Box width="100%" display="flex" justifyContent="center">
                  <IconButton onClick={() => onLinkSelect && onLinkSelect(index)}>
                    <LinkIcon sx={{ transform: "rotate(90deg)" }} />
                  </IconButton>
                </Box>
              ) : (
                <Box height="20px" />
              )}
            </Box>
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
