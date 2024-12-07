import React, { useState } from 'react';
import { Button, TextField, Typography,InputAdornment,FormControl, Stack, CssBaseline, Box, FormLabel} from '@mui/material';
import MuiCard from '@mui/material/Card';
import AppTheme from '../components/SignIn/Theme/Apptheme';
import { styled } from '@mui/material/styles';
import { useNavigate} from 'react-router-dom';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: '10vh',
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
}));

const ProyectoForm = (props) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [totalMembers, setTotalMembers] = useState('');
  const [monto, setMonto] = useState(0);
  const [fecha, setFecha] = useState('');

  const navigate = useNavigate();
  

  const handleCreateProject = (event) => {
    event.preventDefault();
    const projectData = {
      name: projectName,
      description: projectDescription,
    };

    console.log('Project Created:', projectData);
    // Hacer la llamada a tu backend para guardar el proyecto
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
          >
            Nuevo Proyecto
          </Typography>
          <Box
            component="form"
            onSubmit={handleCreateProject}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="nombre">Nombre del Proyecto</FormLabel>
              <TextField
                id="nombre"
                name="nombre"
                placeholder="Escriba el nombre del proyecto"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color='primary'
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="descripcion">Descripcion</FormLabel>
              <TextField
                name="descripcion"
                id="descripcion"
                placeholder="Descripcion del proyecto"
                multiline
                required
                maxRows={4}
                fullWidth
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="monto">Monto Total</FormLabel>
              <TextField
                name="monto"
                type="number"
                id="monto"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>, // Signo de dólar
                    inputProps: { min: 0 }, // Esto previene valores negativos
                }}
                required
                fullWidth
                variant="outlined"
                color='primary'
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="fecha">Fecha</FormLabel>
              <TextField
                name="fecha"
                type="date"
                id="fecha"
                required
                fullWidth
                variant="outlined"
                color='primary'
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel >Miembros totales</FormLabel>
              <Box
              sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: 2,
            }}>
                <TextField
                  placeholder="Nombre completo"
                  value={totalMembers}
                  onChange={(e) => setTotalMembers(e.target.value)}
                  fullWidth
                />
                
              </Box>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => navigate('/proyectos')}
            >
              Crear
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
};

export default ProyectoForm;