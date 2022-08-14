import { ApolloClient, ApolloLink, from, HttpLink } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { cache } from "./schema"

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // process?.env?.["REACT_APP_API_URL"] + "/graphql",
  credentials: "include"
})

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key: "__typename" | unknown, value: unknown) => (key === "__typename" ? undefined : value)
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename)
  }
  return forward(operation).map((data) => {
    return data
  })
})

const errorLink = onError((error) => {
  const authErrors = (error.graphQLErrors || []).filter(({ extensions = {} }) => extensions["code"] === "UNAUTHENTICATED")

  if (authErrors.length > 0) {
    error = {
      ...error,
      response: {
        ...error.response,
        errors: undefined
      }
    }
  }
})

export const client = new ApolloClient({
  cache,
  link: from([cleanTypeName, errorLink, httpLink])
})
