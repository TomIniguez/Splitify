import React, { useState } from 'react';
import { Card, CardMedia, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, Link } from 'react-router-dom';

const Ticket = () => {
  // Datos de ejemplo para la tabla con múltiples proyectos
  const projectsData = [
    {
      nombre: 'Salida',
      descripcion: 'Cena con amigos en Parrilla Coreana',
      fecha: '14/07/2024',
      integrantes: ['Juan', 'María', 'Carlos'],
      porcentajes: [20, 30, 50],
      montos: [100, 150, 250],
      total: 500,
      imageUrl: '/images/ticketSalida.png'
    },
    {
      nombre: 'Vacaciones',
      descripcion: 'Viaje a la playa',
      fecha: '21/08/2024',
      integrantes: ['Ana', 'Luis', 'Fernando'],
      porcentajes: [40, 35, 25],
      montos: [200, 175, 125],
      total: 500,
      imageUrl: '/images/ticketVacaciones.png'
    }
  ];

  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState(projectsData[0]); // Guarda el proyecto actual

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleProjectClick = (project) => {
    setCurrentProject(project); // Cambia el proyecto actual
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Título del proyecto */}
      <Typography 
        variant="h4" 
        sx={{ textAlign: 'left', marginBottom: '20px' }} // Alinea a la izquierda y agrega margen inferior
      >
        Mendoza
      </Typography>

      <Button component={Link} 
        to="/ticketform"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onClick={() => navigate('/ticketform')}
        style={{
          position: 'fixed',    // Posición fija
          bottom: '20px',       // A 20px del borde inferior
          right: '20px',        // A 20px del borde derecho
          zIndex: 1000          // Asegura que el botón esté por encima de otros elementos
        }}
      >
        Subir Ticket
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>

      {/* Imagen del ticket */}
      <Card style={{ display:'flex', height: '450px', width: '500px', margin: '20px auto' }}>
        <CardMedia
          component="img"
          height="100%"
          width="100%"
          image={currentProject.imageUrl} // Muestra la imagen actual
          alt="Ticket de compra"
        />
      </Card>

      {/* Tabla de gastos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tickets</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Integrantes</TableCell>
              <TableCell>Porcentaje</TableCell>
              <TableCell>Monto Particular</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectsData.map((project, index) => (
              <TableRow key={index}>
                <TableCell
                  onClick={() => handleProjectClick(project)} 
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                >
                {project.nombre}
                </TableCell>
                <TableCell>{project.descripcion}</TableCell>
                <TableCell>{project.fecha}</TableCell>
                <TableCell>
                  {project.integrantes.map((integrante, i) => (
                    <div key={i}>{integrante}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {project.porcentajes.map((porcentaje, i) => (
                    <div key={i}>{porcentaje}%</div>
                  ))}
                </TableCell>
                <TableCell>
                  {project.montos.map((monto, i) => (
                    <div key={i}>${monto}</div>
                  ))}
                </TableCell>
                <TableCell>${project.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Ticket;
