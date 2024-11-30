import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div
      style={{ width: 250 }}
      role="presentation"
    >
      <List>
        <ListItem button>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button component={Link} to="/ticket">
          <ListItemText primary="Mis Proyectos" />
        </ListItem>
        <ListItem button component={Link} to="/customizacion">
          <ListItemText primary="Configuración" />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
