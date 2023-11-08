import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { ProductApi } from "../../api/api"
import { useForm } from "../../hooks/useForm"
import { AuthLayout } from "../layout/AuthLayout"


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const formData = {
  nombre:'',
  apellido:'',
  email:'',
  password:'',
  passwordConfirm:'',
  
}

const FormValidations = {
  nombre: [( value ) => value.length > 0, 'El nombre es obligatorio'],
  apellido: [( value ) => value.length > 0, 'El apellido es obligatorio'],
  email: [( value ) => value.includes('@'), 'El correo debe tener un @'],
  password: [( value ) => value.length >= 6, 'La contraseña debe tener una longitud de 6 caracteres'],
}

export const RegisterPage = ({loginFun}) => {


  const [FormSubmitted, setFormSubmitted] = useState(false)


  const { nombre, apellido, email, password, passwordConfirm , nombreValid, apellidoValid,
    emailValid, passwordValid, passwordConfirmValid, onInputChange, formState:FormRegister,
    formStateValid:FormRegisterValid } = useForm(formData, FormValidations)


    // const { status, errorMessage } = useSelector(state => state.Auth)
    // const dispatch = useDispatch()
    // const isCheckingAuthentication = useMemo( () => status === 'checking', [status] )

    // console.log(errorMessage)


  const onSubmit= async (event) => {
      event.preventDefault(); 
      setFormSubmitted(true)

      if(!FormRegisterValid) return
      const resp = await ProductApi.post(`/usuarios`, FormRegister)
      if(!resp.data.ok){
        //Si ocurre algun error
        setFormSubmitted(false)
        MySwal.fire({
          icon: 'error',
          title: 'Ups...',
          text: resp.data.msg,
          confirmButtonText: 'Ok',
        })
      } else {
        localStorage.setItem('Token', resp.data.token)
        localStorage.setItem('Usuario', JSON.stringify(resp.data.usuario))
        MySwal.fire({
          title: 'Registro',
          text: 'Registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        })
        loginFun()
      }
      // if(isCheckingAuthentication) return
      
  }




  return (
    <AuthLayout title="Crea una cuenta">
    <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
      <Grid container>

        <Grid item xs={12}  sx={{mt:2}}>
          <TextField label="Nombre" type="text" placeholder="Nombre" value={nombre} name="nombre" error={!!nombreValid && FormSubmitted} helperText={ !!nombreValid && FormSubmitted ? nombreValid : ''} onChange={onInputChange} fullWidth/>
        </Grid>

        <Grid item xs={12}  sx={{mt:2}}>
          <TextField label="Apellido" type="text" placeholder="Apellido" value={apellido} name="apellido" error={!!apellidoValid && FormSubmitted} helperText={ !!apellidoValid && FormSubmitted ? apellidoValid : ''} onChange={onInputChange} fullWidth/>
        </Grid>

        <Grid item xs={12}  sx={{mt:2}}>
          <TextField label="Correo" type="email" placeholder="correo@google.com" value={email} name="email" onChange={onInputChange} error={!!emailValid && FormSubmitted } helperText={!!emailValid && FormSubmitted ? emailValid : ''} fullWidth/>
        </Grid>

        <Grid item xs={12} sx={{mt:2}} >
          <TextField label="Contraseña" type="password" placeholder="Contraseña" value={password} name="password" onChange={onInputChange} error={!!passwordValid && FormSubmitted} helperText={!!passwordValid && FormSubmitted ? passwordValid : ''}  fullWidth/>
        </Grid>

        <Grid item xs={12} sx={{mt:2}} >
          <TextField label="Confirmar contraseña" type="password" placeholder="Confirmar contraseña" value={passwordConfirm} name="passwordConfirm" onChange={onInputChange} error={passwordConfirm !== password && FormSubmitted} helperText={passwordConfirm !== password  && FormSubmitted ? "Las contraseñas no son iguales" : ""}  fullWidth/>
        </Grid>

        <Grid container spacing={2} sx={{mb:2, mt:1}}>

          <Grid item xs={12} >
            <Button type="submit" variant="contained"  fullWidth>
            <Typography >
              Crear cuenta
            </Typography>
              
            </Button>
          </Grid>

          <Grid container direction="row" justifyContent='end'>
            <Typography sx={{mr:1}}>
            ¿Ya tienes cuenta?
            </Typography>
            <Link component={ RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </Grid>

      </Grid>
  </form>
</AuthLayout>
  )
}
