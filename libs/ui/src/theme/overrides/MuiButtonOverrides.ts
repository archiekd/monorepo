import {Components} from "@mui/material"

const MuiButtonOverrides: Components["MuiButton"] = {
  styleOverrides: {
    root: {
      borderRadius: 4,
      fontWeight: 700
    }
  }
}

export default MuiButtonOverrides
