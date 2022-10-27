import { Navigate, Route, Routes } from "react-router-dom"

import ForgotPasswordPage from "../pages/ForgotPasswordPage"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import NoAuthRoute from "./NoAuthRoute"
import { PrivateRoute } from "./PrivateRoute"

const Router = () => {
  return (
    <Routes>
      <Route element={<NoAuthRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route element={<PrivateRoute />}><Route path="/" element={<HomePage />} /></Route>
      <Route path="*" element={<Navigate to="/login" />}></Route>
    </Routes>
  )
}

export default Router
