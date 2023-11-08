import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ProductApi } from '../api/api'
import { useForm } from '../hooks/useForm'
import { Grid } from '@mui/material';

const MySwal = withReactContent(Swal)

const formData = {
  nombre:'',
  apellido:'',
  email:'',
  direccion:'',
  telefono:0
}

const FormValidations = {
    nombre: [( value ) => value.length > 0, 'El nombre es obligatorio'],
    apellido: [( value ) => value.length > 0, 'El apellido es obligatorio'],
    email: [( value ) => value.includes('@'), 'El correo debe tener un @'],
  };
  

export const ModalEdit = ({openModal, handleClose, user , getUsers}) => {

    const [FormSubmitted, setFormSubmitted] = useState(false)


  const { nombre, apellido, email, direccion, telefono ,  nombreValid, apellidoValid,
    emailValid, onInputChange, formState:FormRegister,
    formStateValid:FormEditUserValid, onResetForm } = useForm (user ? user : formData, FormValidations)

    const onSubmit= async (event) => {
        event.preventDefault(); 
        setFormSubmitted(true)
  
        if(!FormEditUserValid) return
        const resp = await ProductApi.put(`/usuarios/${user.uid}`, FormRegister)
            .then(resp => {
                close()
                getUsers()
                MySwal.fire({
                    title: 'Editar usuario',
                    text: 'Edicion realizada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                  })
            })
            .catch(
                error => {
              setFormSubmitted(false)
                    MySwal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: error.response.data.msg,
                        confirmButtonText: 'Ok',
                      })
                }
            )
    }

    const onCLose = ()=> {
        return true
      }

      const close = () => {
        handleClose()
        onResetForm()
        setFormSubmitted(false)
      }

  return (
    <>
     <Dialog open={openModal} onClose={onCLose}>
         <DialogTitle>
          Editar usuario
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
            Edita la información del usuario seleccionado
            </DialogContentText>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Nombre" type="text" placeholder="Nombre" value={nombre} name="nombre" error={!!nombreValid && FormSubmitted } helperText={ !!nombreValid && FormSubmitted  ? nombreValid : ''} onChange={onInputChange} fullWidth/>
                </Grid>

                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Apellido" type="text" placeholder="Apellido" value={apellido} name="apellido" error={!!apellidoValid && FormSubmitted } helperText={ !!apellidoValid && FormSubmitted  ? apellidoValid : ''} onChange={onInputChange} fullWidth/>
                </Grid>

                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Correo" type="email" placeholder="correo@google.com" value={email} name="email" onChange={onInputChange} error={!!emailValid && FormSubmitted  } helperText={!!emailValid && FormSubmitted  ? emailValid : ''} fullWidth/>
                </Grid>

                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Direccion" type="direccion" placeholder="direccion" value={direccion} name="direccion" onChange={onInputChange} fullWidth/>
                </Grid>

                <Grid item xs={12}  sx={{mt:2}}>
                <TextField label="Telefono" type="telefono" placeholder="telefono" value={telefono} name="telefono" onChange={onInputChange} fullWidth/>
                </Grid>
            </Grid>
            </form>
         </DialogContent>

            <DialogActions>
          <Button onClick={close}>Cancelar</Button>
          <Button onClick={onSubmit} >Guardar</Button>
        </DialogActions>
        </Dialog>
    </>
  )
}
