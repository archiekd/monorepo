import { gql } from "@apollo/client"

import { useGetCurrentUserLazyQuery, useLoginMutation } from "@routine-lab/apollo-api"
import { LoginForm } from "@routine-lab/ui"

gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...CurrentUser
    }
  }
`

const LoginFormController = () => {
  const [login] = useLoginMutation()
  const [getCurrentUser] = useGetCurrentUserLazyQuery()

  return (
    <LoginForm
      onSubmit={async (values) => {
        await login({ variables: { email: values.email, password: values.password } })
        getCurrentUser()
      }}
    />
  )
}

export default LoginFormController
