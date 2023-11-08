import { Navbar } from '../components/Navbar'
import './Usuarios.css'

import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { IconButton } from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { ProductApi } from '../api/api';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ModalEdit } from './ModalEdit';

const MySwal = withReactContent(Swal)


export const Usuarios = ({logout}) => {
    const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [user, setuser] = useState(false);

  useEffect(() => {
        getUsers()
      }, []);


      const getUsers = async () => {
        const resp = await ProductApi.get('/usuarios')
        .then( resp => {
        setData(resp.data.usuarios);
        })
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

      const handleEdit = (item) => {
        setuser(item)
        setOpenModal(true);
      };

      const handleClose = () => {
        setOpenModal(false);
      };
    
    
      const handleDelete = (uid) => {
        MySwal.fire({
            title: "Quieres eliminar este usuario?",
            showCancelButton: true,
            cancelButtonText:'Cancelar',
            confirmButtonText: "Eliminar",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteFun(uid)
            } 
          });
      };

      const deleteFun = async(uid) => {
        const resp = await ProductApi.delete(`/usuarios/${uid}`)
       .then(resp => {
           MySwal.fire("Eliminado!", "", "success");
       })
       getUsers()
       .catch(error => {
        MySwal.fire({
            icon: 'error',
            title: 'Ups...',
            text: error.response.data.msg,
            confirmButtonText: 'Ok',
          })
       })
      }

  return (
    <>
         <Navbar logout={logout}/>
         <div className="conte">
                 <Table>
                    <TableBody>
                         <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Telefono</TableCell>
                            <TableCell>Acciones</TableCell>
                         </TableRow>
                        {data.map((item) => (
                        <TableRow key={item.uid}>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.apellido}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.direccion}</TableCell>
                            <TableCell>{item.telefono}</TableCell>
                            <TableCell>
                            <IconButton onClick={() => handleEdit(item)}>
                                <EditOutlined />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(item.uid)}>
                                <DeleteOutlined />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
         </div>

        <ModalEdit openModal={openModal} handleClose={handleClose} user={user} getUsers={getUsers}/>

    </>
  )
}
