import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import "./LandingPage.css"


function LandingPage() {
  return (
    <Box
      className="background"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: 'white', // Cambiar el color del texto a blanco
        paddingTop: '-300px', // Añadir padding para subir el contenido
      }}
    >
      {/* Añadir formas circulares */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <Container maxWidth="md">
        <Typography
          variant="h1"
          align="center"
          gutterBottom
          sx={{
            fontSize: '4rem', // Aumentar el tamaño del texto
            fontWeight: 'bold',
            marginBottom: '1rem',
            paddingTop:'-300px',
          }}
        >
          Splitify
        </Typography>
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontSize: '1.5rem', // Aumentar el tamaño del texto del subtítulo
            maxWidth: '80%', // Limitar el ancho del subtítulo
            margin: '0 auto', // Centrar el subtítulo horizontalmente
          }}
        >
          Con Splitify vas a poder subir todos tus tickets de salidas, eventos o gastos y poder dividir los mismos entre varios amigos de manera fácil y rápida
        </Typography>
      </Container>
    </Box>
  );
}

export default LandingPage;




