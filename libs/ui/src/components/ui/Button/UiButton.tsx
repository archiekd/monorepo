import { styled } from "@mui/material/styles"
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton"

export interface UiButtonProps extends LoadingButtonProps {
  isSelected?: boolean
}

const StyledButton = styled(LoadingButton)<UiButtonProps>(() => ({}))

export const UiButton = (props: UiButtonProps) => {
  return <StyledButton {...props} />
}
