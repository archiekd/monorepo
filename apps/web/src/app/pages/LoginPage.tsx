import { AuthWrapper } from "@routine-lab/ui"

import LoginFormController from "../controllers/LoginFormController"

const LoginPage = () => {
  return (
    <AuthWrapper>
      <LoginFormController />
    </AuthWrapper>
  )
}

export default LoginPage
