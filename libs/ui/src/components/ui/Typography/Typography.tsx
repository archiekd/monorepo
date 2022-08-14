import { Typography, TypographyProps } from "@mui/material"
import { styled } from "@mui/material/styles"

import { UiTypographyFontLineHeight, UiTypographyFontSizes, UiTypographyFontWeights } from "../../../theme/overrides/UiTypographyOverrides"

export interface UiTypographyProps extends Omit<TypographyProps, "lineHeight"> {
  weight?: UiTypographyFontWeights
  size?: UiTypographyFontSizes
  lHeight?: UiTypographyFontLineHeight
  customColor?: string
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "lHeight" && prop !== "customColor"
})<UiTypographyProps>(({ theme, size, weight, lHeight, customColor }) => ({
  fontSize: size && theme.uiTypography.fontSize[size],
  fontWeight: weight && theme.uiTypography.fontWeight[weight],
  lineHeight: lHeight && theme.uiTypography.lineHeight[lHeight],
  color: customColor && customColor
}))

export const UiTypography = (props: UiTypographyProps) => {
  return <StyledTypography {...props} />
}
