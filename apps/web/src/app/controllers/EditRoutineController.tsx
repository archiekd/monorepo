/* eslint-disable @typescript-eslint/no-empty-function */
import { useMemo } from "react"

import { gql } from "@apollo/client"
import { CircularProgress } from "@mui/material"

import { useGetRoutineQuery, useUpdateRoutineMutation } from "@routine-lab/apollo-api"

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
      return moveIds.map((moveId) => {
        return data.getRoutine.moves.find((move) => move.id === moveId)
      })
    })
  }, [data])

  console.log({ routine })

  if (loading) return <CircularProgress />

  return (
    <RoutinePageController
      apparatusName={apparatusName}
      onSelect={async (move) => {
        try {
          if (data?.getRoutine.id) {
            await updateRoutine({ variables: { routineId: data.getRoutine.id, updatedRoutine: { move } } })
            refetch()
          }
        } catch (error) {
          console.error(error)
        }
      }}
      routine={routine}
    />
  )
}
