/* eslint-disable @typescript-eslint/no-empty-function */
import { gql } from "@apollo/client"

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
  return <RoutinePageController apparatusName={apparatusName} onSelect={async (move) => {}} routine={[]} />
}
