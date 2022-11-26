import { forwardRef } from "react"

import { FormControlLabel, Radio, RadioGroup, RadioGroupProps, RadioProps } from "@mui/material"

export interface UiRadioGroupProps extends RadioGroupProps {
  radioProps?: RadioProps
  options: { value: string; label: string }[]
}

export const UiRadioGroup = forwardRef(({ options, radioProps, ...props }: UiRadioGroupProps) => {
  return (
    <RadioGroup aria-labelledby={`radio-group`} name="radio-buttons-group" {...props}>
      {options.map(({ label, value }) => (
        <FormControlLabel key={value} value={value} control={<Radio {...radioProps} />} label={label} />
      ))}
    </RadioGroup>
  )
})
