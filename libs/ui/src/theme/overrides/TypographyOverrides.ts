import { TypographyOptions } from "@mui/material/styles/createTypography"

const TypographyOverrides: TypographyOptions = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 14,
  body1: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "150%"
  },
  body2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "143%"
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "175%"
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: "157%"
  },
  caption: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "166%"
  },
  overline: {
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "266%",
    textTransform: "uppercase"
  },
  h1: {
    fontSize: 96,
    fontWeight: 300,
    lineHeight: "116.7%"
  },
  h2: {
    fontSize: 60,
    fontWeight: 300,
    lineHeight: "120%"
  },
  h3: {
    fontSize: 48,
    fontWeight: 400,
    lineHeight: "116.7%"
  },
  h4: {
    fontSize: 48,
    fontWeight: 400,
    lineHeight: "116.7%"
  },
  h5: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: "133.4%"
  },
  h6: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: "160%"
  },
  button: {
    textTransform: "none"
  }
}

export default TypographyOverrides
