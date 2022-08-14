import styled from "styled-components"
import { gql } from "@apollo/client"
import NxWelcome from "./nx-welcome"
import { useGetMoveQuery } from "@monorepo/apollo-api"

const StyledApp = styled.div`
  // Your style here
`

gql`
  query getMove($id: String!) {
    getMove(id: $id) {
      id
      name
    }
  }
`

export function App() {
  const { data } = useGetMoveQuery({ variables: { id: "6b98788b-d09d-461a-b5a4-5a21d228a694" } })
  console.log("data", data)
  return (
    <StyledApp>
      <NxWelcome title="web" />
    </StyledApp>
  )
}

export default App
