import { Route, Routes, Navigate } from "react-router-dom"
import App from "../App"
import { Perfil } from "../perfil"
import { Usuarios } from "../Usuarios"

export const AppRoutes = ({logout}) => {
  return (
        <Routes>
            <Route path="/*" element={<Navigate to="/dashboard"/>}/>
            <Route path="/favorites" element={<App logout={logout}/>}/>
            <Route path="/dashboard" element={<App logout={logout}/>}/>
            <Route path="/perfil" element={<Perfil logout={logout}/>}/>
            <Route path="/usuarios" element={<Usuarios logout={logout}/>}/>
        </Routes>
    )
}
