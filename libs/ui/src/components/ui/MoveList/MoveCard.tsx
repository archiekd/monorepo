import React from "react"

import { Box, Typography } from "@mui/material"

import { Move } from "@routine-lab/apollo-api"

import { UiButton } from "../Button"

type MoveCardProps = {
  id: string
  description: string
  letterValue: string
  pointValue: number
  onSelect: (id: string) => void
}

const MoveCard: React.FC<MoveCardProps> = ({ id, description, letterValue, pointValue, onSelect }) => {
  return (
    <UiButton
      onClick={() => onSelect}
      sx={{ border: "solid 4px grey", height: "80px", width: "240px", borderRadius: "5px", display: "flex", padding: 0 }}
    >
      <Box display="flex" flexDirection="column" justifyContent="center" sx={{ borderRight: "solid 4px grey", height: "100%", width: "20%" }}>
        <Typography fontWeight={800} color="black">
          {letterValue}
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
