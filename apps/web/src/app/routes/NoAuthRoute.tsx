import { Navigate, Outlet } from "react-router-dom"

import { useGetCurrentUserQuery } from "@monorepo/apollo-api"
import { LoadingScreen } from "@monorepo/ui"

const NoAuthRoute = () => {
  const { data, loading } = useGetCurrentUserQuery()

  if (loading) return <LoadingScreen />

  return data?.getCurrentUser ? <Navigate to="/" /> : <Outlet />
}

export default NoAuthRoute
