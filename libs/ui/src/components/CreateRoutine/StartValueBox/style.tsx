import { Box, styled } from "@mui/material"

export const StartValueWrapper = styled(Box)`
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows[11]};
  border-radius: 5px;
  min-width: 400px;
  padding-top: 12px;
`
