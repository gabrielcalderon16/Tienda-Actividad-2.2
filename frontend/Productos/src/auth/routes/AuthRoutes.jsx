import { Route, Routes, Navigate } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"

export const AuthRoutes = ({loginFun}) => {
  return (
        <Routes>
            <Route path="login" element={<LoginPage loginFun={loginFun}/>}/>
            <Route path="register" element={<RegisterPage loginFun={loginFun}/>}/>
            <Route path="/*" element={<Navigate to="/auth/login"/>}/>
        </Routes>
    )
}
