import { Route, Routes } from "react-router-dom"

import LoginPage from "../pages/LoginPage"
import NoAuthRoute from "./NoAuthRoute"
import { PrivateRoute } from "./PrivateRoute"

const Router = () => {
  return (
    <Routes>
      <Route element={<NoAuthRoute />}>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Route>
      <Route element={<PrivateRoute />}>{/* <Route path="/" element={<HomePage />} /> */}</Route>
    </Routes>
  )
}

export default Router
