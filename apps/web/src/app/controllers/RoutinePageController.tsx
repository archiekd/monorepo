import { gql } from "@apollo/client"

import { useGetApparatusMovesLazyQuery } from "@routine-lab/apollo-api"
import { CreateRoutineForm, MoveInfo, MoveListDrawer, StartValueBoxProps } from "@routine-lab/ui"

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

export type StartValue = {
  eScore: number
  dScore: {
    moveTotal: number
    requirements: number
    connections: number
  }
  totalStart: number
}

type Props = {
  onSelect: (move: string) => Promise<void>
  routine: MoveInfo[]
  apparatusName: string
  onLinkSelect?: (index: number) => void
  onUnlinkSelect?: (index: number) => void
  onReorder?: (routine: MoveInfo[]) => void
  startValue?: StartValueBoxProps
  routineName?: string
}

export const RoutinePageController = ({
  onSelect,
  routine = [],
  apparatusName,
  onLinkSelect,
  onReorder,
  startValue,
  routineName,
  onUnlinkSelect
}: Props) => {
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
        onUnlinkSelect={onUnlinkSelect}
        onReorder={onReorder}
        routineName={routineName}
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
