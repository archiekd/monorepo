import React from "react"

import { Box, BoxProps, Input, InputProps, SxProps } from "@mui/material"
import { styled, Theme } from "@mui/material/styles"

interface UiTextFieldProps extends InputProps {
  sx?: SxProps<Theme>
  inputSx?: SxProps<Theme>
  type?: "number" | "text" | "password"
}

const TextFieldBox = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: 4,
  height: 36,
  backgroundColor: theme.palette.grey[200],
  display: "flex",
  alignItems: "center",
  paddingLeft: 16,
  paddingRight: 8,
  "& input[type=number]::-webkit-inner-spin-button": {
    opacity: 1,
    "&.button": {
      color: "red"
    }
  }
}))

export const UiTextField = (props: UiTextFieldProps) => {
  const { sx, inputSx, disableUnderline = true, type = "text", ...restProps } = props

  return (
    <TextFieldBox sx={sx}>
      <Input {...restProps} disableUnderline={disableUnderline} sx={inputSx} type={type} />
    </TextFieldBox>
  )
}
