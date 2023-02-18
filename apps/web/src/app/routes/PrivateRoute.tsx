import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

import { useGetCurrentUserQuery } from "@routine-lab/apollo-api"
import { LoadingScreen, NavigationBar } from "@routine-lab/ui"

type Pages = "home" | "create-move" | "create-routine"

export const PrivateRoute = () => {
  const { data, loading } = useGetCurrentUserQuery()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.pathname, "pages")

  const user = data?.getCurrentUser

  if (loading) return <LoadingScreen />

  return user ? (
    <>
      <NavigationBar onClick={(path) => navigate(`/${path}`)} activeItem={location.pathname as Pages} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  )
}
