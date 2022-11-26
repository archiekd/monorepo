import { FormControlLabel, FormGroup, Switch, SwitchProps } from "@mui/material"

export interface UiToggleProps extends SwitchProps {
  label?: string
  labelPlacement?: "bottom" | "top" | "end" | "start"
}

export const UiToggle = ({ label, labelPlacement, ...props }: UiToggleProps) => {
  return (
    <FormGroup>
      <FormControlLabel labelPlacement={labelPlacement} control={<Switch {...props} />} label={label} />
    </FormGroup>
  )
}
