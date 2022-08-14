export type UiTypographyFontWeights = "regular" | "medium" | "semibold" | "bold" | "extrabold"
export type UiTypographyFontSizes = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "3xl" | "4xl" | "5xl"
export type UiTypographyFontLineHeight = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "3xl" | "4xl" | "5xl"

export interface UiTypographyOverridesProps {
  fontWeight: Record<UiTypographyFontWeights, number>
  fontSize: Record<UiTypographyFontSizes, string>
  lineHeight: Record<UiTypographyFontLineHeight, string>
}

const UiTypographyWeightMap = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800
}

const UiTypographySizeMap = {
  xxs: "9px",
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  xxl: "24px",
  "3xl": "28px",
  "4xl": "32px",
  "5xl": "40px"
}

const UiTypographyLineHeightMap = {
  xxs: "11px",
  xs: "16px",
  sm: "18px",
  md: "20px",
  lg: "22px",
  xl: "30px",
  xxl: "34px",
  "3xl": "39px",
  "4xl": "60px",
  "5xl": "120px"
}

const UiTypographyOverrides: UiTypographyOverridesProps = {
  fontWeight: UiTypographyWeightMap,
  fontSize: UiTypographySizeMap,
  lineHeight: UiTypographyLineHeightMap
}
export default UiTypographyOverrides
