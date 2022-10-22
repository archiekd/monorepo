import { Navigate, Outlet } from "react-router-dom"

import { useGetCurrentUserQuery } from "@routine-lab/apollo-api"
import { LoadingScreen } from "@routine-lab/ui"

export const PrivateRoute = () => {
  const { data, loading } = useGetCurrentUserQuery()

  const user = data?.getCurrentUser

  if (loading) return <LoadingScreen />

  return user ? (
    <>
      {/* <NavigationBarController /> */}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  )
}
