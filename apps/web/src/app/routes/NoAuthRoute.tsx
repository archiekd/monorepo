import { Navigate, Outlet } from "react-router-dom"

import { useGetCurrentUserQuery } from "@routine-lab/apollo-api"
import { LoadingScreen } from "@routine-lab/ui"

const NoAuthRoute = () => {
  const { data, loading } = useGetCurrentUserQuery()

  if (loading) return <LoadingScreen />

  return data?.getCurrentUser ? <Navigate to="/" /> : <Outlet />
}

export default NoAuthRoute
