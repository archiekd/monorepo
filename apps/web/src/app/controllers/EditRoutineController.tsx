import { useMemo } from "react"

import { gql } from "@apollo/client"
import { CircularProgress } from "@mui/material"
import { cloneDeep } from "lodash"
import { v4 as uuid4 } from "uuid"

import { GetRoutineQuery, useGetRoutineQuery, useUpdateRoutineMutation } from "@routine-lab/apollo-api"
import { MoveInfo } from "@routine-lab/ui"

import { RoutinePageController } from "./RoutinePageController"

gql`
  query getRoutine($routineId: String!) {
    getRoutine(routineId: $routineId) {
      id
      name
      moves {
        id
        namedAfter
        letterValue
        description
        pointValue
      }
      formatted_moves {
        id
        moves
      }
    }
  }

  mutation updateRoutine($routineId: String!, $updatedRoutine: UpdateRoutineInput!) {
    updateRoutine(routineId: $routineId, updatedRoutine: $updatedRoutine) {
      id
      formatted_moves {
        id
        moves
      }
    }
  }
`

type Props = {
  apparatusName: string
  routineId: string
}

export const EditRoutineController = ({ routineId, apparatusName }: Props) => {
  const { data, loading, refetch } = useGetRoutineQuery({
    variables: {
      routineId: routineId
    }
  })

  const [updateRoutine] = useUpdateRoutineMutation()

  const routine = useMemo(() => {
    if (!data) return []
    return data.getRoutine.formatted_moves.map((moveIds) => {
      const moves = moveIds.moves.map((moveId) => {
        const foundMove = data.getRoutine.moves.find((move) => move.id === moveId)
        return foundMove ? foundMove : null
      })

      const filtered = moves.filter((move): move is GetRoutineQuery["getRoutine"]["moves"][number] => move !== null)

      return { ...moveIds, moves: filtered }
    })
  }, [data])

  if (loading) return <CircularProgress />

  return (
    <RoutinePageController
      apparatusName={apparatusName}
      onSelect={async (move) => {
        try {
          if (data?.getRoutine.id) {
            await updateRoutine({
              variables: {
                routineId: data.getRoutine.id,
                updatedRoutine: { formatted_moves: [...data.getRoutine.formatted_moves, { id: uuid4(), moves: [move] }] }
              }
            })
            refetch()
          }
        } catch (error) {
          console.error(error)
        }
      }}
      routine={routine}
      onLinkSelect={async (index) => {
        console.log("index", index)
        try {
          if (data?.getRoutine.formatted_moves) {
            const newFormattedMoves = cloneDeep(data.getRoutine.formatted_moves)

            newFormattedMoves[index].moves = [...newFormattedMoves[index].moves, ...newFormattedMoves[index + 1].moves]
            newFormattedMoves.splice(index + 1, 1)

            await updateRoutine({ variables: { routineId: data.getRoutine.id, updatedRoutine: { formatted_moves: newFormattedMoves } } })
            refetch()
          }
        } catch (error) {
          console.error(error)
        }
      }}
      onReorder={async (formattedMoves: MoveInfo[]) => {
        console.log("formattedMoves", formattedMoves)
        try {
          if (data?.getRoutine.id) {
            const formattedMovesUpdatedOrder = formattedMoves.map((moves) => {
              const moveIds = moves.moves.map((move) => move.id)
              return { id: moves.id, moves: moveIds }
            })
            await updateRoutine({
              variables: { routineId: data.getRoutine.id, updatedRoutine: { formatted_moves: formattedMovesUpdatedOrder } },
              optimisticResponse: {
                updateRoutine: {
                  id: data.getRoutine.id,
                  formatted_moves: formattedMovesUpdatedOrder
                }
              }
            })
            refetch()
          }
        } catch (error) {
          console.error(error)
        }
      }}
    />
  )
}
