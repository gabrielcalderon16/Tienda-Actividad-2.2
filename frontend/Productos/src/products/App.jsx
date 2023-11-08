import './App.css'
import { useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { ProductApi } from '../api/api';
import { Navbar } from '../components/Navbar';
import { CardProduct } from '../components/CardProduct';
import { ModalDelete } from '../components/ModalDelete';
import { Modal } from '../components/Modal';
import { useLocation } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function App({logout} ) {

  const newPath = useLocation().pathname;

  //Grupo de hooks useState para manejar el estado de las diferentes variables
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [producto2, setproducto2] = useState(false);
  const [productoDelete, setproductoDelete] = useState(false);
  const [productos, setproductos] = useState([]);
  const [Filter, setFilter] = useState(null);
  const [Categories, setCategories] = useState(['Todos']);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  
// hook que realiza la peticion al cargar la pagina por primera vez
  useEffect(() => {
    getProducts()
    setProductsPerPage(5);
    setFilter('Todos')
  }, [newPath])
  
  //Funcion que realiza la peticion get de los productos
  const getProducts = async () => {
    const resp = await ProductApi.get('/products')
    const data = []
    const categoria = ['Todos']
    if(newPath === '/favorites'){
      resp.data.producto.forEach(product => {
        if(user.favorites.includes(product._id)){
          data.push(product)
          if(!categoria.includes(product.categoria)){
            categoria.push(product.categoria)
          }
        }
      })
      setproductos(data)
      setCategories(categoria)
    }else {
      setproductos(resp.data.producto)
      setCategories(resp.data.categorias)
    }

   }

  //Funcion que abre el modal de eliminar
  const handleClickOpenDelete = ( producto ) => {
    setproductoDelete(producto)
    setOpenModalDelete(true);
  };

   //Funcion que cierra el modal de eliminar
  const handleCloseDelete = () => {
    setOpenModalDelete(false);
  };

  //Funcion que abre el modal en modo agregar
  const handleClickOpen = () => {
    setproducto2(false);
    setOpenModal(true);
  };

  //Funcion que abre el modal en modo editar
  const handleOpenModalEdit = ( producto ) => {
    setproducto2(producto);
    setOpenModal(true);
}

  //Funcion que cierra el modal de crear/editar
  const handleClose = () => {
    setOpenModal(false);
  };

              
  const user = JSON.parse(localStorage.getItem("Usuario"))
  
  //Funcion que realiza el filtro
  const filterProduct = useMemo (() => {
    setCurrentPage(1)
    return typeof Filter == 'string' && Filter.length > 0 && Filter !== 'Todos' && newPath !== '/favorites' ? productos.filter( producto => {
      return producto.categoria.toLocaleLowerCase().includes(Filter.toLocaleLowerCase())
    }) : productos
  }, [productos, Filter]) 


  const favorito = productos.length === 0 ? 
  (<h2 className="text-center">
    No tienes favoritos 😢😢
  </h2>)
  :
  (
    <h3 className="text-center">
          Tus favoritos   <IconButton>
            <FavoriteIcon color="red" sx={{fontSize: 30}} /> 
              </IconButton>
        </h3>
  )

  const renderPagination = () => {
    const pages = Math.ceil(filterProduct.length / productsPerPage);
    return (
      <div className="pagination-bar d-flex gap">

              <IconButton
              onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
              >
                <ChevronLeftIcon 
                color="primary"
                sx={{fontSize: 30}}
                />
              </IconButton>
                <span className="currentPage">{currentPage}</span>
               <IconButton
                  onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pages}
                    >
                <ChevronRightIcon 
                color="primary"
                sx={{fontSize: 30}}
                />
              </IconButton>
      </div>
    );
  };

  const productsToShow = filterProduct.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);


  return (
    <>
        <Navbar logout={logout}/>
      <div className="container mt-4">
     {   newPath === '/favorites' ? 
      favorito
      : 
     <div className="row mt-2">
            {/* Campo en el cual se captura el valor del filtrado */}
          <TextField
          select
          label="Filtra por categoria."
          defaultValue="Todos"
          onChange={(e) => {
            setFilter(e.target.value)
          }}
          >
          {Categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </div> }
        <div className="row rows-cols-1 row-cols-md-3 gap d-flex justify-content-center flex-wrap mt-4">
            {/* Iteracion para mostrar la cantidad de productos */}
          {
                productsToShow.map( (product) => {
                  if(user.role !== 'ADMIN' && product.cantidad === 0){
                    return  
                 }else {
                  return ( 
                    <CardProduct key={product._id} user={user} handleClickOpenDelete={handleClickOpenDelete} handleOpenModalEdit={handleOpenModalEdit} product={product}/>
                  )
                 }
                }
                )
           }
          </div>
      </div>
      
            {/* Boton para habilitar el modal de crear nuevo producto */}

            {
              user.role == 'ADMIN' ?       
              <IconButton
              size='large'
              sx={{color: 'white',
              backgroundColor:'black',
              ':hover': {backgroundColor:'black', opacity:0.7}, 
              position:'fixed', 
              right:50, 
              bottom:50 }}
              onClick={handleClickOpen}
              >
                <AddOutlined 
                color="primary"
                sx={{fontSize: 30}}
                />
              </IconButton>
              :
              <></>
            }

         <div className="container d-flex justify-content-center mt-4">
            {renderPagination()}
          </div>
 

            {/* Modal de editar o crear */}
        <Modal openModal={openModal} handleClose={handleClose} producto2={producto2} getProducts={getProducts}/>
            {/* Modal de eliminar */}
        <ModalDelete openModalDelete={openModalDelete} handleCloseDelete={handleCloseDelete} productoDelete={productoDelete} getProducts={getProducts}/>

    </>
  )
}

export default App
