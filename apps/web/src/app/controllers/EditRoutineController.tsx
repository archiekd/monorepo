/* eslint-disable @typescript-eslint/no-empty-function */
import { gql } from "@apollo/client"
import { CircularProgress } from "@mui/material"

import { useGetRoutineQuery } from "@routine-lab/apollo-api"

import { RoutinePageController } from "./RoutinePageController"

gql`
  query getRoutine($routineId: String!) {
    getRoutine(routineId: $routineId) {
      id
      name
      moves {
        id
        namedAfter
      }
      formatted_moves
    }
  }
`

type Props = {
  apparatusName: string
  routineId: string
}

export const EditRoutineController = ({ routineId, apparatusName }: Props) => {
  const { data, loading } = useGetRoutineQuery({
    variables: {
      routineId: routineId
    }
  })

  console.log("data", data)
  if (loading) return <CircularProgress />
  return <RoutinePageController apparatusName={apparatusName} onSelect={async (move) => {}} routine={[]} />
}
