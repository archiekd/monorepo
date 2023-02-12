import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton"
import { styled } from "@mui/material/styles"

export interface UiButtonProps extends LoadingButtonProps {
  isSelected?: boolean
  target?: string
  rounded?: boolean
}

const StyledButton = styled(LoadingButton, { shouldForwardProp: (prop) => prop !== "rounded" })<UiButtonProps>(({ rounded, isSelected, theme }) => ({
  ...(rounded && { borderRadius: "100px" }),
  ...(isSelected && { backgroundColor: theme.palette.grey[800] })
}))

export const UiButton = (props: UiButtonProps) => {
  return <StyledButton {...props} />
}
