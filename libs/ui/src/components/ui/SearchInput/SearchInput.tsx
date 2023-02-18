import React, { ChangeEvent } from "react"

import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment } from "@mui/material"

import { UiTextField } from "../TextField"

type SearchInputProps = {
  searchIcon: boolean
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ searchIcon = false, onChange }) => {
  return (
    <UiTextField
      startAdornment={
        searchIcon ? (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ) : null
      }
      inputSx={{ svg: { marginRight: "5px" } }}
      placeholder="Search for a move"
      onChange={onChange}
    ></UiTextField>
  )
}

export default SearchInput
