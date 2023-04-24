import { useNavigate } from "react-router-dom"

import { gql } from "@apollo/client"

import { useCreateRoutineMutation } from "@routine-lab/apollo-api"

import { RoutinePageController } from "./RoutinePageController"

interface Props {
  apparatusName: string
}

gql`
  mutation createRoutine($moveId: String!, $routineName: String) {
    createRoutine(moveId: $moveId, routineName: $routineName) {
      id
    }
  }
`

const CreateRoutineController = ({ apparatusName }: Props) => {
  const [createRoutine] = useCreateRoutineMutation()
  const navigate = useNavigate()

  return (
    <RoutinePageController
      onSelect={async (move) => {
        const response = await createRoutine({
          variables: {
            moveId: move
          }
        })
        navigate(`/routine/${apparatusName}/${response.data?.createRoutine.id}`)
      }}
      routine={[]}
    />
  )
}

export default CreateRoutineController
