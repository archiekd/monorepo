import React, { ChangeEvent } from "react"

import { Box, Drawer, Stack } from "@mui/material"

import { UiTypography } from "../ui"
import MoveCard from "../ui/MoveList/MoveCard"
import SearchInput from "../ui/SearchInput/SearchInput"

type MoveListDrawerProps = {
  isOpen: boolean
  onClose: () => void
  loading: boolean
  moves: { id: string; description: string; letterValue: string; pointValue: number }[]
  onSearch: (searchTerm: string) => void
  onSelect: (id: string) => void
}

export const MoveListDrawer: React.FC<MoveListDrawerProps> = ({ isOpen, onClose, moves, onSelect, onSearch }) => {
  // const onSearchDebounced = useDebouncedCallback(onSearch, [onSearch], 200)
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: "20%", minWidth: "300px", padding: "20px" }
      }}
    >
      <Stack direction="column" spacing={3}>
        <UiTypography>Move List</UiTypography>
        <SearchInput searchIcon onChange={(event) => onSearch(event.target.value)} />
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {moves.map((move) => {
            return <MoveCard key={move.id} {...move} onSelect={onSelect} />
          })}
        </Box>
      </Stack>
    </Drawer>
  )
}
