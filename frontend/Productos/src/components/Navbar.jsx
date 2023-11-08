import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import "./Navbar.css"
import { useNavigate } from "react-router-dom";

export const Navbar = ({logout}) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('Usuario'))

  return (
    <AppBar position="static">
        <Toolbar>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <div className="Container-nav d-flex gap flex-wrap">
                    <Typography variant='h6' noWrap component='div' className="white pointer me-2 "  onClick={() => navigate("/dashboard")}>
                              Productos
                              </Typography>
                              {
                                  user.role === 'USER' ? 
                                  <>
                                    <Typography variant='h6' noWrap component='div' className="white pointer" onClick={() => navigate("/favorites")}>
                                    Favoritos
                                    </Typography>
                                    <Typography variant='h6' noWrap component='div' className="white pointer me-2"  onClick={() => navigate("/perfil")}>
                                    Perfil
                                    </Typography>
                                  </>
                                  :
                                  <>
                                    <Typography variant='h6' noWrap component='div' className="white pointer me-2"  onClick={() => navigate("/usuarios")}>
                                     Usuarios
                                    </Typography></>
                              }
                              
                    </div>
                    <Typography variant='h6' noWrap component='div' className="white pointer" onClick={logout}>
                    Logout
                    </Typography>
                </Grid>
        </Toolbar>
    </AppBar>
  );
};