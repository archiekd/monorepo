import { yupResolver } from "@hookform/resolvers/yup"
import { Stack } from "@mui/material"
import { ApparatusName, CopGroup, MoveValue } from "apps/web/src/generated/types"
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
  { value: "FLOOR", label: "Floor" },
  { value: "POMMEL", label: "Pommels" },
  { value: "RINGS", label: "Rings" },
  { value: "VAULT", label: "Vault" },
  { value: "HIGH_BAR", label: "High Bar" },
  { value: "PARALLEL_BARS", label: "Parallel Bars" }
]

const radioGroupValue = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" }
]

const copGroup = [
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" }
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
      value: MoveValue.A,
      doubleRotation: false,
      apparatus: ApparatusName.Floor,
      group: CopGroup.I
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
          <UiTypography>Apparatus</UiTypography>
          <Controller name="apparatus" control={control} render={({ field }) => <UiRadioGroup options={radioGroupApparatus} row {...field} />} />
          <UiTypography>Element Group</UiTypography>
          <Controller name="group" control={control} render={({ field }) => <UiRadioGroup options={copGroup} row {...field} />} />
          <UiButton loading={isSubmitting} variant="contained" type="submit">
            Save
          </UiButton>
        </Stack>
      </form>
    </LoginFormWrapper>
  )
}
