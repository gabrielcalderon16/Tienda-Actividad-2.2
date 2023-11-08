import { Box, TextField } from '@mui/material'
import { Navbar } from '../components/Navbar'
import './perfil.css'
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { IconButton } from "@mui/material"
import { useState } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useForm } from '../hooks/useForm';
import { ProductApi } from '../api/api';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const MySwal = withReactContent(Swal)

let formData = {
  nombre:'',
  apellido:'',
  email:'',
  telefono:0,
  direccion: '',
 
}

const FormValidations = {
  nombre: [( value ) => value.length > 0, 'El nombre es obligatorio'],
  apellido: [( value ) => value.length > 0, 'La apellido es obligatorio'],
  email: [( value ) => value.includes('@'), 'El email no es valido'],
}

let user = JSON.parse(localStorage.getItem('Usuario'))

export const Perfil = ({logout}) => {


  const navigate = useNavigate();
  


    //Hook personalizado encargado del manejo del formulario
    const { nombre, apellido, email, telefono, direccion ,nombreValid, 
      telefonoValid, apellidoValid, emailValid, direccionValid,  onInputChange, formState:FormUser,
      formStateValid:FormUserValid, onResetForm } = useForm(user ? user : formData, FormValidations)
  
      const [FormSubmitted, setFormSubmitted] = useState(false)
      const [isSave, setisSave] = useState(false)
      useEffect(() => {
        user = JSON.parse(localStorage.getItem('Usuario'))
      
      }, [FormSubmitted])

      const onSubmit= async (event) => {
        event.preventDefault(); 
        setFormSubmitted(true)
        if(!FormUserValid) return
        const resp = await ProductApi.put(`/usuarios/${user.uid}`, FormUser)
        .then( resp => {
          setFormSubmitted(false)
          MySwal.fire({
            title: 'Guardado correctamente',
            text: resp.data.msg,
            icon: 'success',
            confirmButtonText: 'Ok',
          })
          localStorage.setItem( 'Usuario' , JSON.stringify(resp.data.usuario))
          onResetForm()
          navigate("/dashboard")
        }
       
        )
        .catch(
          error => {
            MySwal.fire({
              icon: 'error',
              title: 'Ups...',
              text: error.response.data.msg,
              confirmButtonText: 'Ok',
            })
           }
        )
      }


  return (
   <>
       <Navbar logout={logout}/>
    <Box 
      className="container"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <h1 className="text-center"> { user.nombre } </h1>

      <div className="container d-flex flex-column animate__animated animate__fadeIn animate__faster">
            <TextField
              id="outlined-required"
              label="Nombre"
              disabled={!isSave}
              value={nombre} 
              name="nombre" 
              error={!!nombreValid && FormSubmitted} 
              helperText={nombreValid} 
              onChange={onInputChange} 
            />
    
               <TextField
              id="outlined-required"
              disabled={!isSave}
              value={apellido} 
              name="apellido" 
              error={!!apellidoValid && FormSubmitted} 
              helperText={apellidoValid} 
              onChange={onInputChange} 
            />

            <TextField
              id="outlined-password-input"
              label="Email"
              value={email} 
              name="email" 
              error={!!emailValid && FormSubmitted} 
              helperText={emailValid} 
              onChange={onInputChange}
              disabled={!isSave}

            />
            <TextField
              id="outlined-read-only-input"
              label="Telefono"
              type='Number'
              disabled={!isSave}
              value={telefono} 
              name="telefono" 
              error={!!telefonoValid && FormSubmitted} 
              helperText={telefonoValid} 
              onChange={onInputChange} 

            />
            <TextField
              id="outlined-number"
              label="Direccion"
              type="text"
              disabled={!isSave}
              value={direccion} 
              name="direccion" 
              error={!!direccionValid && FormSubmitted} 
              helperText={direccionValid} 
              onChange={onInputChange} 
            />
         </div>
      <div className='d-flex justify-content-center'>
      {
          isSave ?
          <IconButton onClick={onSubmit} >
            <SaveAsIcon color="primary" sx={{fontSize: 30}} />
          </IconButton>
          : 
          <IconButton  onClick={() => setisSave(!isSave)} >
          <EditIcon color="primary" sx={{fontSize: 30}} />  
          </IconButton> 
          }
      </div>
    </Box>

   </>
  )
}


