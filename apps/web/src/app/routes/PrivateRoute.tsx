import { Navigate, Outlet, useNavigate } from "react-router-dom"

import { useGetCurrentUserQuery } from "@routine-lab/apollo-api"
import { LoadingScreen, NavigationBar } from "@routine-lab/ui"

type Pages = "home" | "create-move" | "create-routine"

export const PrivateRoute = () => {
  const { data, loading } = useGetCurrentUserQuery()
  const navigate = useNavigate()
  const page = window.location.pathname.slice(1) as Pages

  console.log(page, "pages")

  const user = data?.getCurrentUser

  if (loading) return <LoadingScreen />

  return user ? (
    <>
      <NavigationBar onClick={(path) => navigate(`/${path}`)} activeItem={page} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  )
}
