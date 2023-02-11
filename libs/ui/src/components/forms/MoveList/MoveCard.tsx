import React from "react"

import { Box, Typography } from "@mui/material"

import { UiButton } from "../../ui"

type MoveCardProps = {
  id: string
  description: string
  value: string
  pointValue: number
  onClick: (id: string) => void
}

const MoveCard: React.FC<MoveCardProps> = ({ id, description, value, pointValue, onClick }) => {
  return (
    <UiButton
      onClick={() => onClick(id)}
      sx={{ border: "solid 4px grey", height: "80px", width: "240px", borderRadius: "5px", display: "flex", padding: 0 }}
    >
      <Box display="flex" flexDirection="column" justifyContent="center" sx={{ borderRight: "solid 4px grey", height: "100%", width: "20%" }}>
        <Typography fontWeight={800} color="black">
          {value}
        </Typography>
        <Typography fontWeight={800} color="black">
          {pointValue}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ height: "100%", width: "80%", padding: "10px" }}>
        <Typography fontWeight={600} color="black">
          {description}
        </Typography>
      </Box>
    </UiButton>
  )
}

export default MoveCard
