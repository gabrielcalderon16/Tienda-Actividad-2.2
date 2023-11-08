import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react"
import { ProductApi } from '../api/api';

export const CardProduct = ( { handleClickOpenDelete, handleOpenModalEdit, product, user } ) => {

  const [isFavorite, setIsFavorite] = useState(user.favorites.includes(product._id));

  
  const favorite= async () => {
    if (isFavorite) {
      user.favorites = user.favorites.filter(fav => fav !== product._id);
    } else {
      user.favorites.push(product._id);
    }
    setIsFavorite(!isFavorite);
    localStorage.setItem('Usuario' , JSON.stringify(user));
    const resp = await ProductApi.put(`/usuarios/${user.uid}`, user)
  };

  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column'}}>
      <img  style={{ height: 140 }} src={product.img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {product.nombre}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
        Categoria: {product.categoria}
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary">
        Descripción: {product.descripcion}
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary">
        Cant. Disponible: {product.cantidad}
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary">
        Precio: ${product.precio}
        </Typography>
      </CardContent>
      <CardActions sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
      {
          user.role === 'ADMIN' ?  
          <>
          <IconButton onClick={() => handleOpenModalEdit(product)}>
          <EditRoundedIcon color="primary" sx={{fontSize: 30}}/>
          </IconButton>
          <IconButton onClick={() => handleClickOpenDelete(product)}>
          <DeleteRoundedIcon    color="primary" sx={{fontSize: 30}}/>
          </IconButton>
          </>
         : 
         <IconButton  onClick={favorite} >
          {isFavorite ? <FavoriteIcon color="red" sx={{fontSize: 30}} /> : <FavoriteBorderIcon color="red" sx={{fontSize: 30}} />}
          </IconButton>
       }

       </CardActions>
    </Card>
  );
};