import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ProductApi } from '../api/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const ModalDelete = ({ openModalDelete, handleCloseDelete, productoDelete, getProducts }) => {

  //Funcion que elimina el producto
  const deleteProduct = async () => {
    const resp = await ProductApi.delete(`/products/${productoDelete._id}`)
    if(!resp.data.ok){
      //Si ocurre algun error
      MySwal.fire({
        icon: 'error',
        title: 'Ups...',
        text: resp.data.msg,
        confirmButtonText: 'Ok',
      })
    } else {
      //Si Se elimina correctamente
     handleCloseDelete()
     getProducts()
      MySwal.fire({
        title: 'Eliminado correctamente',
        text: resp.data.msg,
        icon: 'success',
        confirmButtonText: 'Ok',
      })
    }
  }

  //Funcion que evita que el modal se cierre al dar click fuera de el
  const onCLose = ()=> {
    return true
  }

  return (
    <div>
      <Dialog open={openModalDelete} onClose={onCLose}>
        <DialogTitle>Eliminar producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estas seguro de eliminarlo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button onClick={deleteProduct}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}