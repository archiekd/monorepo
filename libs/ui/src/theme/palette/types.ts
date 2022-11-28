import { Color } from "@mui/material"

export type PartialColor = Omit<Color, "A100" | "A200" | "A400" | "A700">
