import { useMemo } from "react"

import { gql } from "@apollo/client"
import { CircularProgress } from "@mui/material"

import { GetRoutineQuery, useGetRoutineQuery, useUpdateRoutineMutation } from "@routine-lab/apollo-api"

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
      formatted_moves
    }
  }

  mutation updateRoutine($routineId: String!, $updatedRoutine: UpdateRoutineInput!) {
    updateRoutine(routineId: $routineId, updatedRoutine: $updatedRoutine) {
      id
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
      const moves = moveIds.map((moveId) => {
        const foundMove = data.getRoutine.moves.find((move) => move.id === moveId)
        return foundMove ? foundMove : null
      })

      const filtered = moves.filter((move): move is GetRoutineQuery["getRoutine"]["moves"][number] => move !== null)

      return filtered
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
              variables: { routineId: data.getRoutine.id, updatedRoutine: { formatted_moves: [...data.getRoutine.formatted_moves, [move]] } }
            })
            refetch()
          }
        } catch (error) {
          console.error(error)
        }
      }}
      routine={routine}
      onLinkSelect={async (index) => {
        try {
          if (data?.getRoutine.formatted_moves) {
            const newFormattedMoves = [...data.getRoutine.formatted_moves]
            newFormattedMoves.splice(index, 2, [data.getRoutine.formatted_moves[index][0], data.getRoutine.formatted_moves[index + 1][0]])
            await updateRoutine({ variables: { routineId: data.getRoutine.id, updatedRoutine: { formatted_moves: newFormattedMoves } } })
            refetch()
          }
        } catch (error) {
          console.error(error)
        }
      }}
    />
  )
}
