import { Box } from "@mui/material"

import { UiButton, UiTypography } from "../ui"

type Props = { onSelect: (apparatus: string) => void }

const apparatusDictionary = {
  floor: "Floor",
  pommel: "Pommel",
  rings: "Rings",
  vault: "Vault",
  "parallel-bars": "Parallel Bars",
  "high-bar": "High Bar"
}

export const ApparatusPicker = ({ onSelect }: Props) => {
  return (
    <Box display="flex" flexDirection="column" width="50%">
      <UiTypography fontWeight={900} variant="h2">
        Create a routine
      </UiTypography>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" marginBottom="10px">
        {Object.entries(apparatusDictionary).map(
          (value): JSX.Element => (
            <UiButton variant="contained" sx={{ minWidth: "300px", marginY: "10px" }} onClick={() => onSelect(value[0])}>
              {value[1]}
            </UiButton>
          )
        )}
      </Box>
    </Box>
  )
}
