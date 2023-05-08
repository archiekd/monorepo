import { useLocation, useNavigate } from "react-router-dom"

import { NavigationBar } from "@routine-lab/ui"

export const NavigationController = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const activeItem = location.pathname.split("/")[1] ? location.pathname.split("/")[1] : "home"

  return <NavigationBar onClick={(path) => navigate(`/${path}`)} activeItem={activeItem} />
}
