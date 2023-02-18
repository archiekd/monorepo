import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { gql } from "@apollo/client"

import { useGetApparatusMovesLazyQuery } from "@routine-lab/apollo-api"
import { CreateRoutineForm, MoveListDrawer } from "@routine-lab/ui"

interface Props {
  apparatusName: string
}

const startValue = {
  eScore: 10,
  dScore: {
    movesScore: 2.3,
    requirements: 2.5,
    connections: 0.1
  },
  totalStart: 14.9
}

gql`
  query getApparatusMoves($name: String!, $searchInput: String) {
    getApparatusMoves(name: $name, searchInput: $searchInput) {
      id
      description
      letterValue
      pointValue
    }
  }
`

const CreateRoutinePageController = ({ apparatusName }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const [getMoves, { data, loading }] = useGetApparatusMovesLazyQuery()

  return (
    <>
      <CreateRoutineForm
        title={apparatusName}
        startValue={startValue}
        addMove={() => {
          getMoves({
            variables: {
              name: apparatusName
            }
          })
          setIsOpen(true)
        }}
      />
      <MoveListDrawer
        isOpen={isOpen}
        loading={loading}
        onClose={() => setIsOpen(false)}
        onSelect={(move) => {
          console.log({ move })
        }}
        moves={data?.getApparatusMoves || []}
        onSearch={(input) =>
          getMoves({
            variables: {
              name: apparatusName,
              searchInput: input
            }
          })
        }
      />
    </>
  )
}

export default CreateRoutinePageController
