import { useState } from "react"
import { useParams } from "react-router-dom"

import { gql } from "@apollo/client"

import { useGetApparatusMovesLazyQuery } from "@routine-lab/apollo-api"
import { CreateRoutineForm, MoveListDrawer } from "@routine-lab/ui"

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
  routine: any[]
}

export const RoutinePageController = ({ onSelect, routine = [] }: Props) => {
  const { onOpen, onClose, isOpen } = useActionsState()
  const { apparatus } = useParams()

  const [getMoves, { data, loading }] = useGetApparatusMovesLazyQuery()
  return (
    <>
      <CreateRoutineForm
        title={apparatus || ""}
        startValue={startValue}
        addMove={() => {
          getMoves({
            variables: {
              name: apparatus || ""
            }
          })
          onOpen()
        }}
        routine={routine}
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
              name: apparatus || "",
              searchInput: input
            }
          })
        }
      />
    </>
  )
}
