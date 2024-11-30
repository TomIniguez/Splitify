import React, { useState } from 'react';
import { Button, TextField, Typography,IconButton,Snackbar,InputAdornment, Alert,FormControl, Stack, CssBaseline, Box, FormLabel, List, ListItem, ListItemText} from '@mui/material';
import MuiCard from '@mui/material/Card';
import { Add, Delete } from '@mui/icons-material';
import AppTheme from '../components/SignIn/Theme/Apptheme';
import { styled } from '@mui/material/styles';
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

const TicketForm = (props) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [member, setMember] = useState('');
  const [members, setMembers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [fileName, setFileName] = useState('');
  const [monto, setMonto] = useState(0);
  const [fecha, setFecha] = useState('');
  

  const handleAddMember = () => {
    if (member.trim()) {
      setMembers([...members, member]);
      setMember('');
    }
  };

  const handleDeleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const validateInputs = () => {
    return members.length > 0;

  }

  const handleCreateProject = (event) => {
    event.preventDefault();
    const projectData = {
      name: projectName,
      description: projectDescription,
      members
    };

    console.log('Project Created:', projectData);
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
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
          >
            Ticket Nuevo
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
              <FormLabel htmlFor="nombre">Nombre Ticket</FormLabel>
              <TextField
                id="nombre"
                name="nombre"
                placeholder="Escriba el nombre del ticket"
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
                placeholder="Descripcion del ticket"
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
              <FormLabel >Miembros</FormLabel>
              <Box
              sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: 2,
            }}>
                <TextField
                  placeholder="Nombre completo"
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                  fullWidth
                />
                <IconButton onClick={handleAddMember} color="primary">
                  <Add />
                </IconButton>
              </Box>
            </FormControl>
            <List>
              {members.map((member, index) => (
                <ListItem key={index}>
                  <ListItemText primary={member} />
                  
                    <IconButton edge="end" onClick={() => handleDeleteMember(index)}>
                      <Delete />
                    </IconButton>
                  
                </ListItem>
              ))}
            </List>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Crear
            </Button>
          </Box>
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
          El ticket se creó exitosamente
        </Alert>
      </Snackbar>
    </AppTheme>
  );
};

export default TicketForm;
