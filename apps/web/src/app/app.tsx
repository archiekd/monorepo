import styled from "styled-components"

import { gql } from "@apollo/client"
import { useGetMoveQuery } from "@monorepo/apollo-api"
import { UiButton } from "@monorepo/ui"

import NxWelcome from "./nx-welcome"

const StyledApp = styled.div`
  // Your style here
`

gql`
  query getMove($id: String!) {
    getMove(id: $id) {
      id
      description
    }
  }
`

export function App() {
  const { data } = useGetMoveQuery({ variables: { id: "6b98788b-d09d-461a-b5a4-5a21d228a694" } })
  console.log("data", data)
  return (
    <StyledApp>
      <UiButton>Hello</UiButton>
      <NxWelcome title="web" />
    </StyledApp>
  )
}

export default App
