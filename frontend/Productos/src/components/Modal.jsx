import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "../hooks/useForm"
import { useState } from 'react';
import { ProductApi } from '../api/api';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

let formData = {
  nombre:'',
  descripcion:'',
  precio:0,
  cantidad:0,
  img: '',
  categoria: ''
}

const FormValidations = {
  nombre: [( value ) => value.length > 0, 'El nombre es obligatorio'],
  descripcion: [( value ) => value.length > 0, 'La descripcion es obligatorio'],
  precio: [( value ) => value > 0, 'El precio es obligatorio'],
  img: [( value ) => value.length > 0, 'La imagen es obligatoria'],
  categoria: [( value ) => value.length > 0, 'La categoria es obligatoria'],
}


export const Modal = ({ openModal, handleClose, producto2, getProducts }) => {

  //Hook personalizado encargado del manejo del formulario
  const { nombre, descripcion, precio, cantidad, img, categoria , nombreValid, 
    descripcionValid, precioValid, imgValid, categoriaValid, onInputChange, formState:FormProduct,
    formStateValid:FormProductValid, onResetForm } = useForm(producto2 ? producto2 : formData, FormValidations)

  //Funcion que evita que el modal se cierre al dar click fuera de el
    const onCLose = ()=> {
      return true
    }

    // variable que me permite ver el estado del formulario si intento ser enviado, o no
  const [FormSubmitted, setFormSubmitted] = useState(false)
  
    //funcion que cierra el modal
  const close = () => {
    handleClose()
    onResetForm()
    setFormSubmitted(false)
  }

    //funcion que guarda o edita el producto
  const onSubmit= async (event) => {
    event.preventDefault(); 
    setFormSubmitted(true)
    if(!FormProductValid) return

    if(producto2){
      //Editar produto
      const resp = await ProductApi.put(`/products/${producto2._id}`, FormProduct)
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
        //Guardado correctamente
        close()
        getProducts()
        MySwal.fire({
          title: 'Guardado correctamente',
          text: resp.data.msg,
          icon: 'success',
          confirmButtonText: 'Ok',
        })
      }
    }else {
      //Guardar nuevo producto
      const resp = await ProductApi.post(`/products`, FormProduct)
      .then(resp => {
        close()
        getProducts()
        MySwal.fire({
          title: 'Guardado correctamente',
          text: resp.data.msg,
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
    )}}

  return (
    <div>
      <Dialog open={openModal} onClose={onCLose}>
        <DialogTitle>
          { !producto2 ? "Agregar producto" : "Editar producto"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          { !producto2 ? "Completa los datos del nuevo producto" : "Edita los datos del producto seleccionado"}
          </DialogContentText>
          <form className="animate__animated animate__fadeIn animate__faster">
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={nombre} 
            name="nombre" 
            error={!!nombreValid && FormSubmitted} 
            helperText={nombreValid} 
            onChange={onInputChange} 
          />
            <TextField
            autoFocus
            margin="dense"
            id="Categoria"
            label="Categoria"
            type="text"
            fullWidth
            variant="standard"
            value={categoria} 
            name="categoria" 
            error={!!categoriaValid && FormSubmitted} 
            helperText={categoriaValid} 
            onChange={onInputChange} 
          />
          <TextField
            autoFocus
            margin="dense"
            id="descripcion"
            label="Agrega una descipcion"
            type="text"
            fullWidth
            variant="standard"
            value={descripcion} 
            name="descripcion" 
            error={!!descripcionValid && FormSubmitted} 
            helperText={descripcionValid} 
            onChange={onInputChange} 
          />
          <TextField
            autoFocus
            margin="dense"
            id="Precio"
            label="Precio"
            type="number"
            fullWidth
            variant="standard"
            value={precio} 
            name="precio" 
            error={!!precioValid && FormSubmitted} 
            helperText={precioValid} 
            onChange={onInputChange} 
          />
          <TextField
            autoFocus
            margin="dense"
            id="Cantidad"
            label="Cantidad"
            type="number"
            fullWidth
            variant="standard"
            value={cantidad} 
            name="cantidad" 
            onChange={onInputChange} 
          />
           <TextField
            autoFocus
            margin="dense"
            id="Url"
            label="Url de la imagen"
            type="text"
            fullWidth
            variant="standard"
            value={img} 
            name="img" 
            error={!!imgValid && FormSubmitted} 
            helperText={imgValid} 
            onChange={onInputChange} 
          />
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancelar</Button>
          <Button onClick={onSubmit} >Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  }