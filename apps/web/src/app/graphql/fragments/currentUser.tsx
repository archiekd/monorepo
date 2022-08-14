import { gql } from "@apollo/client"

gql`
  fragment CurrentUser on User {
    id
    email
  }
`
