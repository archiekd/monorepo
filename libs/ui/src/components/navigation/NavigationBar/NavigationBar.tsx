import { useState } from "react"

import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Box, Container, Divider, IconButton, Menu, MenuItem, Stack, Toolbar, useTheme } from "@mui/material"
import { startCase } from "lodash"

import { useBreakpoints } from "../../../hooks/useBreakpoints"
import { UiTypography } from "../../ui"
import { NavigationBarButton } from "./NavigationBarButton"

const pages = ["home", "create-move", "create-routine"] as const
type Pages = typeof pages[number]

const humanise = (value: string) => {
  return startCase(value)
}

export interface NavigationBarProps {
  onClick: (value: Pages) => void
  activeItem: Pages
}

export const NavigationBar = ({ onClick, activeItem }: NavigationBarProps) => {
  const theme = useTheme()
  const { isSmUp } = useBreakpoints()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack direction="row" sx={{ flex: 1, gap: 1 }} justifyContent="end" id="navigation-bar-buttons">
            {isSmUp ? (
              pages.map((page) => (
                <NavigationBarButton key={page} onClick={() => onClick(page)} isActive={page === activeItem}>
                  {humanise(page)}
                </NavigationBarButton>
              ))
            ) : (
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <UiTypography textAlign="center">{humanise(page)}</UiTypography>
                    </MenuItem>
                  ))}
                  <Divider />
                </Menu>
              </Box>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
