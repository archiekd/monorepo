import { yupResolver } from "@hookform/resolvers/yup"
import { Stack } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { UiButton, UiTypography } from "../../ui"
import { UiTextField } from "../../ui/TextField"
import { FormValues, schema } from "./schema"
import { LoginFormWrapper } from "./style"

interface Props {
  onSubmit: SubmitHandler<FormValues>
  handleRegisterClick: () => void
  handleForgotPasswordClick: () => void
}

export const LoginForm = ({ onSubmit, handleForgotPasswordClick, handleRegisterClick }: Props) => {
  // FIXME: handle errors properly
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  return (
    <LoginFormWrapper>
      <UiTypography variant="h5" sx={{ marginBottom: "20px" }}>
        Login
      </UiTypography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width="100%">
          <Controller
            name="email"
            control={control}
            render={({ field }) => <UiTextField placeholder="Email" {...field} autoComplete="username" fullWidth sx={{ width: "100%" }} />}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => <UiTextField type="password" placeholder="Password" {...field} autoComplete="password" fullWidth />}
          />
          <UiButton loading={isSubmitting} variant="contained" type="submit">
            Login
          </UiButton>
        </Stack>
      </form>
      <Stack direction="row">
        <UiButton onClick={handleForgotPasswordClick}>Forgot password?</UiButton>
        <UiButton onClick={handleRegisterClick}>Register</UiButton>
      </Stack>
    </LoginFormWrapper>
  )
}
