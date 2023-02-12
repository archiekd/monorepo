import { ReactElement, ReactNode } from "react"

import { useTheme } from "@mui/material"

import { UiButton } from "../../../ui"

interface Props {
  isActive: boolean
  icon?: ReactElement
  children: ReactNode
  onClick: () => void
}

export const NavigationBarButton = ({ icon, isActive, children, onClick }: Props) => {
  const theme = useTheme()

  const activeStyle = { backgroundColor: theme.palette.primary.light, color: theme.palette.grey[900] }
  return (
    <UiButton
      variant={isActive ? "contained" : undefined}
      startIcon={icon}
      onClick={onClick}
      rounded
      color={isActive ? "primary" : "inherit"}
      sx={{ ...(!isActive && { "&:hover": activeStyle }), padding: "6px 16px" }}
    >
      {children}
    </UiButton>
  )
}
