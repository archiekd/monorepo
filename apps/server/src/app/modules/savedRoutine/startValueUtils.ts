import { round } from "lodash"

import { Move } from "../../models/Move"
import { FormattedMovesType } from "../../models/SavedRoutine"
import { StartValueResponse } from "./types"

export const calculateFloorStartValue = (formatted_moves: FormattedMovesType[], moves: Move[]): StartValueResponse => {
  const routineMoves = formatted_moves
    .map((move) => move.moves)
    .flat()
    .map((element) => {
      const found = moves.find((move) => move.id === element)
      return found
    })

  const length = routineMoves.length

  let eScore = 0

  if (length === 0) eScore = 0
  if (length < 3) eScore = 2.0
  if (length < 5) eScore = 4.0
  if (length < 7) eScore = 6.0
  if (length > 7) eScore = 10.0

  const elementTotal = round(
    routineMoves
      .sort((a, b) => b.pointValue() - a.pointValue())
      .slice(0, 10)
      .reduce((acc: number, move: Move) => {
        return acc + move.pointValue()
      }, 0),
    1
  )

  let requirmentsTotal = 0

  if (
    routineMoves.some(async (move) => {
      const copGroup = await move.copGroup
      return copGroup.group === 1
    })
  )
    requirmentsTotal += 0.5
  if (
    routineMoves.some(async (move) => {
      const copGroup = await move.copGroup
      return copGroup.group === 2
    })
  )
    requirmentsTotal += 0.5
  if (
    routineMoves.some(async (move) => {
      const copGroup = await move.copGroup
      return copGroup.group === 3
    })
  )
    requirmentsTotal += 0.5

  const lastMovePointValue = routineMoves[routineMoves.length - 1].pointValue()
  if (lastMovePointValue === 0.3) requirmentsTotal += 0.3
  if (lastMovePointValue > 0.3) requirmentsTotal += 0.5
  if (!routineMoves.some((move) => move.isDoubleRotation === true)) {
    requirmentsTotal -= 0.3
  }

  const total = eScore + elementTotal + requirmentsTotal

  return { eScore, dScore: { moveTotal: elementTotal, requirements: requirmentsTotal, connections: 1 }, total }
}

export const calculatePommelStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}

export const calculateRingsStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}

export const calculateVaultStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}

export const calculatePBarsStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}

export const calculateHBarStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}
