import { round } from "lodash"
import { Authorized, FieldResolver, Int, Resolver, Root } from "type-graphql"
import { Service } from "typedi"

import { ApparatusName } from "../../models/Apparatus"
import { Move } from "../../models/Move"
import { FormattedMovesType, SavedRoutine } from "../../models/SavedRoutine"
import { StartValueResponse } from "./types"

const calculateFloorStartValue = (formatted_moves: FormattedMovesType[], moves: Move[]): StartValueResponse => {
  const routineMoves = formatted_moves
    .map((move) => move.moves)
    .map((routineMoves) => {
      return routineMoves.map((individualMove) => {
        const found = moves.find((move) => move.id === individualMove)
        return found
      })
    })

  const allRoutineMoves = routineMoves.flat()

  const length = allRoutineMoves.length

  let eScore = 0

  if (length === 0) eScore = 0
  else if (length < 3) eScore = 2.0
  else if (length < 5) eScore = 4.0
  else if (length < 7) eScore = 6.0
  else eScore = 10.0

  const elementTotal = round(
    allRoutineMoves
      .sort((a, b) => b.pointValue() - a.pointValue())
      .slice(0, 10)
      .reduce((acc: number, move: Move) => {
        console.log("move.pointValue()", move.pointValue(), typeof move.pointValue() === "number")
        return acc + move.pointValue()
      }, 0),
    1
  )

  let requirmentsTotal = 0

  if (
    allRoutineMoves.some(async (move) => {
      const copGroup = await move.copGroup
      return copGroup.group === 1
    })
  )
    requirmentsTotal += 0.5
  if (
    allRoutineMoves.some(async (move) => {
      const copGroup = await move.copGroup
      return copGroup.group === 2
    })
  )
    requirmentsTotal += 0.5
  if (
    allRoutineMoves.some(async (move) => {
      const copGroup = await move.copGroup
      return copGroup.group === 3
    })
  )
    requirmentsTotal += 0.5

  const lastMovePointValue = allRoutineMoves[allRoutineMoves.length - 1].pointValue()
  if (lastMovePointValue === 0.3) requirmentsTotal += 0.3
  if (lastMovePointValue > 0.3) requirmentsTotal += 0.5
  if (!allRoutineMoves.some((move) => move.isDoubleRotation === true)) {
    requirmentsTotal -= 0.3
  }

  let connections = 0

  routineMoves.forEach((moves) => {
    if (moves.length === 1) return
    moves.sort((a, b) => a.pointValue() - b.pointValue())
    if (moves[0].pointValue() > 0.1 && moves[0].pointValue() < 0.4 && moves[1].pointValue() > 0.3) connections += 0.1
    if (moves[0].pointValue() > 0.3 && moves[1].pointValue() > 0.3) connections += 0.2
  })

  const total = eScore + elementTotal + requirmentsTotal

  return { eScore, dScore: { moveTotal: elementTotal, requirements: requirmentsTotal, connections }, total }
}

const calculatePommelStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}

const calculateRingsStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}

const calculateVaultStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}

const calculatePBarsStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}

const calculateHBarStartValue = (moveValues: number[]): StartValueResponse => {
  return { eScore: 1, dScore: { moveTotal: 1, requirements: 1, connections: 1 }, total: 1 }
}

@Service()
@Resolver((of) => SavedRoutine)
export class ProjectColumnFieldResolver {
  @Authorized()
  @FieldResolver(() => StartValueResponse, { nullable: false })
  async getStartValue(@Root() savedRoutine: SavedRoutine) {
    const apparatus = ApparatusName.FLOOR // savedRoutine.apparatus

    const moves = await savedRoutine.moves

    if (apparatus === "floor") return calculateFloorStartValue(savedRoutine.formatted_moves, moves)
    if (apparatus === "pommel") return calculatePommelStartValue([1])
    if (apparatus === "rings") return calculateRingsStartValue([1])
    if (apparatus === "vault") return calculateVaultStartValue([1])
    if (apparatus === "pbars") return calculatePBarsStartValue([1])
    if (apparatus === "hbar") return calculateHBarStartValue([1])
  }
}

// const startValue = {
//   eScore: 10,
//   dScore: {
//     movesScore: 2.3,
//     requirements: 2.5,
//     connections: 0.1
//   },
//   totalStart: 14.9
// }
