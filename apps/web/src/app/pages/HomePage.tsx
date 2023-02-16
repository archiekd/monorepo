import React from "react"
import { useNavigate } from "react-router-dom"

import { Box } from "@mui/material"

import { GeneralWrapper, UiButton, UiTypography } from "@routine-lab/ui"

const HomePage: React.FC = () => {
  const apparatusDictionary = {
    floor: "Floor",
    pommel: "Pommel",
    rings: "Rings",
    vault: "Vault",
    "parallel-bars": "Parallel Bars",
    "high-bar": "High Bar"
  }
  const navigate = useNavigate()
  return (
    <GeneralWrapper>
      <Box display="flex" flexDirection="column" width="50%">
        <UiTypography fontWeight={900} variant="h2">
          Create a routine
        </UiTypography>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" marginBottom="10px">
          {Object.entries(apparatusDictionary).map(
            (value): JSX.Element => (
              <UiButton variant="contained" sx={{ minWidth: "300px", marginY: "10px" }} onClick={() => navigate(`/create-routine/${value[0]}`)}>
                {value[1]}
              </UiButton>
            )
          )}
        </Box>
      </Box>
    </GeneralWrapper>
  )
}

export default HomePage
