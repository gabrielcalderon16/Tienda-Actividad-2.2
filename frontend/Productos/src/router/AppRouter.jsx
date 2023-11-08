import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { CheckingAuth } from "../components/checkingAuth/CheckingAuth"
import { AppRoutes } from "../products/routes/AuthRoutes"
import { useLocation } from 'react-router-dom';


export const AppRouter = () => {

  const newPath = useLocation().pathname;


    const [Login, setLogin] = useState(false)
    const [checking, setChecking] = useState(false)

    useEffect(() => {
    setChecking(true)

    setTimeout( () => {
        setChecking(true)
        const loggedIn = localStorage.getItem("Token")
        if(loggedIn) {
            setLogin(true)
            setChecking(false)
          } else {
              setLogin(false)
              setChecking(false)
          }
    },
        2000
    )
    
    }, [Login])

    useEffect(() => {

        setChecking(true)
     
        setTimeout(
            () => {
                setChecking(false)
            },
            500
        )
       

    }, [newPath])
    

    const logout = () => {
        setChecking(true)
        localStorage.removeItem("Token")
        localStorage.removeItem("Usuario")
        setLogin(false)
        setChecking(false)
    }

    const loginFun = () => {
        setLogin(true)
    }

    if( checking ) {
        return < CheckingAuth />
      }
     
     return(
           <Routes >
               {
                  Login  ? <Route  path="/*" element={<AppRoutes logout= {logout} />}/> : <Route path="/auth/*" element={<AuthRoutes loginFun={loginFun}/>}/>
               }
   
                   <Route  path="/*" element={<Navigate to='/auth/login'/>}/>
           </Routes>
           )
   }
   