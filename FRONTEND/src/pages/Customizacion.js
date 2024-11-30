import React, { useState } from 'react';
import { Button, TextField, CardMedia,Snackbar, Alert,FormControl, Stack, CssBaseline, Box, FormLabel, Typography} from '@mui/material';
import MuiCard from '@mui/material/Card';
import AppTheme from '../components/SignIn/Theme/Apptheme';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


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

const Customizacion = (props) => {
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {

  }

  const logOut = () => {
    localStorage.setItem('logged',false)
    navigate('/');
    window.location.reload();
  }

  const updateUser = (event) => {
    event.preventDefault();
    const userData = {
      name: userName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
    };

    console.log('Usuario actualizado', userData);
    setOpenSnackbar(true); // Abre el Snackbar
    // Hacer la llamada a tu backend para guardar el proyecto
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
        <CardMedia
          component="img"
          height="flex"
          image="/images/Foto.jpg"
          alt="Foto de Perfil"
        />
          <Box
            component="form"
            onSubmit={updateUser}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
          <FormControl>
              <Button
                component = 'label'
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                
              >
                Subir Imagen
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => setFileName(event.target.files[0]['name'])}
                  multiple
                />
              </Button>
              <Typography
                variant="body1"
                sx={{ width: '100%', paddingTop: '7px' }}
              >
                {fileName}
              </Typography>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nombre">Nombre Completo</FormLabel>
              <TextField
                id="nombre"
                name="nombre"
                placeholder="Nombre Completo"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color='primary'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="apellido">Apellidos</FormLabel>
              <TextField
                id="apellido"
                name="apellido"
                placeholder="Apellidos"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color='primary'
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="descripcion">Email</FormLabel>
              <TextField
                name="descripcion"
                placeholder="example@email.com"
                type="descripcion"
                id="descripcion"
                required
                fullWidth
                variant="outlined"
                color='primary'
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
            <FormLabel htmlFor="new_password">Nueva Contraseña</FormLabel>
              <TextField
                id="new_password"
                name="new_password"
                placeholder="*********"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color='primary'
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Actualizar Perfil
            </Button>
          </Box>
          <Button
              type="log out"
              fullWidth
              variant="contained"
              onClick={logOut}
            >
              Cerrar sesion
            </Button>
        </Card>
      </SignInContainer>
       {/* Snackbar para notificación de éxito */}
       <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Perfil actualizado
        </Alert>
      </Snackbar>
    </AppTheme>
  );
};

export default Customizacion;