import { useState } from "react"

import { gql } from "@apollo/client"
import { useGetMoveQuery } from "@monorepo/apollo-api"
import { UiButton } from "@monorepo/ui"
import styled from "styled-components"

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
  const [test, setTest] = useState(false)
  const { data } = useGetMoveQuery({ variables: { id: "6b98788b-d09d-461a-b5a4-5a21d228a694" } })
  console.log("data", data)
  return (
    <StyledApp>
      <UiButton>Hello</UiButton>
    </StyledApp>
  )
}

export default App
