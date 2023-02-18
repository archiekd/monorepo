import { Navigate, Outlet } from "react-router-dom"

import { useGetCurrentUserQuery } from "@routine-lab/apollo-api"
import { LoadingScreen } from "@routine-lab/ui"

import { NavigationController } from "../controllers/NavigationController"

type Pages = "home" | "create-move" | "create-routine"

export const PrivateRoute = () => {
  const { data, loading } = useGetCurrentUserQuery()

  const user = data?.getCurrentUser

  if (loading) return <LoadingScreen />

  return user ? (
    <>
      <NavigationController />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  )
}
