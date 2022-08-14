import { gql } from "@apollo/client"

gql`
  fragment DefaultMoveValues on Move {
    id
    description
  }
`
