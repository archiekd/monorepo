import { gql } from "@apollo/client"

import { useGetApparatusMovesLazyQuery } from "@routine-lab/apollo-api"
import { CreateRoutineForm, MoveInfo, MoveListDrawer } from "@routine-lab/ui"

import { useActionsState } from "../hooks/useActionsState"

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

const startValue = {
  eScore: 10,
  dScore: {
    movesScore: 2.3,
    requirements: 2.5,
    connections: 0.1
  },
  totalStart: 14.9
}

type Props = {
  onSelect: (move: string) => Promise<void>
  routine: MoveInfo[]
  apparatusName: string
  onLinkSelect?: (index: number) => void
  onReorder?: (routine: MoveInfo[]) => void
}

export const RoutinePageController = ({ onSelect, routine = [], apparatusName, onLinkSelect, onReorder }: Props) => {
  const { onOpen, onClose, isOpen } = useActionsState()

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
          onOpen()
        }}
        routine={routine}
        onLinkSelect={onLinkSelect}
        onReorder={onReorder}
      />
      <MoveListDrawer
        isOpen={isOpen}
        loading={loading}
        onClose={onClose}
        onSelect={(move) => {
          onSelect(move)
          onClose()
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
