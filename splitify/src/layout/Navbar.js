import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material'; // Para detectar el tamaño de la pantalla

function Navbar() {
  const [logged, setLogged] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false); // Controla el estado del drawer
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detecta si la pantalla es pequeña

  useEffect(() => {
    const loggedIn = localStorage.getItem('logged') === "true";
    setLogged(loggedIn);
    console.log(loggedIn);
  }, []);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {logged ? (
        <>
          <Button color="inherit" component={Link} to="/proyectos">Mis proyectos</Button>
          <Button color="inherit" component={Link} to="/customizacion">Cuenta</Button>
        </>
      ) : (
        <>
          <Button color="inherit" component={Link} to="/signin">Iniciar sesión</Button>
          <Button color="inherit" component={Link} to="/signup">Registrarse</Button>
        </>
      )}
    </Box>
  );

  const renderMobileMenu = () => (
    <>
      <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}>
        <List>
          {logged ? (
            <>
              <ListItem button component={Link} to="/proyectos" onClick={handleDrawerToggle}>
                <ListItemText primary="Mis proyectos" />
              </ListItem>
              <ListItem button component={Link} to="/customizacion" onClick={handleDrawerToggle}>
                <ListItemText primary="Cuenta" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/signin" onClick={handleDrawerToggle}>
                <ListItemText primary="Iniciar sesión" />
              </ListItem>
              <ListItem button component={Link} to="/signup" onClick={handleDrawerToggle}>
                <ListItemText primary="Registrarse" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Botón del menú a la izquierda */}
          <Button 
            color="inherit" 
            component={Link} to="/"
            sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px' }}
          >
            Splitify
          </Button>

          {/* Menú responsivo: cambia según el tamaño de la pantalla */}
          {isMobile ? renderMobileMenu() : renderDesktopMenu()}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;



