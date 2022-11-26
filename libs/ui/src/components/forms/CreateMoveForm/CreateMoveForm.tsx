import { yupResolver } from "@hookform/resolvers/yup"
import { Stack } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { UiButton, UiTypography } from "../../ui"
import { UiRadioGroup } from "../../ui/RadioGroup"
import { UiTextField } from "../../ui/TextField"
import { UiToggle } from "../../ui/Toggle"
import { LoginFormWrapper } from "../LoginForm/style"
import { FormValues, schema } from "./schema"

// import { LoginFormWrapper } from "./style"

interface Props {
  onSubmit: SubmitHandler<FormValues>
}

const radioGroupApparatus = [
  { value: "floor", label: "Floor" },
  { value: "pommel", label: "Pommels" },
  { value: "rings", label: "Rings" },
  { value: "vault", label: "Vault" },
  { value: "highBar", label: "High Bar" },
  { value: "parallelBars", label: "Parallel Bars" }
]

const radioGroupValue = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C" },
  { value: "d", label: "D" },
  { value: "e", label: "E" },
  { value: "f", label: "F" }
]

export const CreateMoveForm = ({ onSubmit }: Props) => {
  // FIXME: handle errors properly
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      value: "a",
      doubleRotation: false,
      apparatus: "floor"
    }
  })

  return (
    <LoginFormWrapper>
      <UiTypography variant="h5" sx={{ marginBottom: "20px" }}>
        Create Move
      </UiTypography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width="100%">
          <Controller
            name="name"
            control={control}
            render={({ field }) => <UiTextField placeholder="Name" {...field} fullWidth sx={{ width: "50%" }} />}
          />
          <Controller name="description" control={control} render={({ field }) => <UiTextField placeholder="Description" {...field} fullWidth />} />
          <UiTypography>Value</UiTypography>
          <Controller name="value" control={control} render={({ field }) => <UiRadioGroup options={radioGroupValue} row {...field} />} />
          <UiTypography>Double Rotation?</UiTypography>
          <UiToggle />
          <UiTypography>Value</UiTypography>
          <Controller name="value" control={control} render={({ field }) => <UiRadioGroup options={radioGroupApparatus} row {...field} />} />
          <UiButton loading={isSubmitting} variant="contained" type="submit">
            Save
          </UiButton>
        </Stack>
      </form>
    </LoginFormWrapper>
  )
}
