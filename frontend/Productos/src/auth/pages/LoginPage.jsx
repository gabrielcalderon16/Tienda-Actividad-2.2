import {Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { ProductApi } from "../../api/api"
import { useForm } from "../../hooks/useForm"
import { AuthLayout } from "../layout/AuthLayout"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const formLogin = {
  email:'',
  password:''
}

export const LoginPage = ({loginFun}) => {


  const { email, password, onInputChange, formState:Formlogin } = useForm(formLogin)


  const onSubmit = async(event) => {
    event.preventDefault()

    const resp = await ProductApi.post(`/login`, Formlogin)
    .then(resp =>{
      localStorage.setItem('Token', resp.data.token)
      localStorage.setItem('Usuario', JSON.stringify(resp.data.usuario))
      MySwal.fire({
        title: 'Login',
        text: 'Inicio de sesion correcto',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
      loginFun()
    } )
    .catch(error => 
      MySwal.fire({
        icon: 'error',
        title: 'Ups...',
        text: error.response.data.msg,
        confirmButtonText: 'Ok',
      })
      );
  }


  return (
        <AuthLayout title="Login">
        
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
              <Grid container>

                <Grid item xs={12}  sx={{mt:2}}>
                  <TextField label="Correo" type="email" placeholder="correo@google.com" name="email"  value={email} onChange={onInputChange} fullWidth/>
                </Grid>

                <Grid item xs={12} sx={{mt:2}} >
                  <TextField label="Contraseña" type="password" placeholder="Contraseña" name="password" value={password} onChange={onInputChange}  fullWidth/>
                </Grid>

                <Grid container spacing={2} sx={{mb:2, mt:1}}>

                {/* <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none'}>

                    <Alert severity="error">
                      { errorMessage }
                    </Alert>

                </Grid> */}

                  <Grid item xs={12} sm={6}>
                    <Button
                     type="submit"
                     variant="contained" 
                     fullWidth>
                    <Typography >
                      Login
                    </Typography>
                      
                    </Button>
                  </Grid>

                  <Grid container direction="row" justifyContent='end'>
                    <Link component={ RouterLink} color='inherit' to="/auth/register">
                      Crear una cuenta
                    </Link>
                  </Grid>
                </Grid>

              </Grid>
          </form>
        </AuthLayout>
    )
}
