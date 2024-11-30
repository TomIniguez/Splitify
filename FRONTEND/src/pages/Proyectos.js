import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../components/SignIn/Theme/Apptheme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: '10vh',
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
}));

export default function Proyectos(props) {
  const navigate = useNavigate();

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
      <Button
        component={Link}
        to="/proyectoform"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onClick={() => navigate('/proyectoform')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        Subir Proyecto
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>

      <SignInContainer>
        <Grid container spacing={3} justifyContent="center">
          {/* Tarjeta 1 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined" onClick={() => navigate('/ticket')}>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  width: '100%',
                  fontSize: 'clamp(1.8rem, 5vw, 2.15rem)',
                }}
              >
                Mendoza
              </Typography>
              <Typography
                component="body1"
                variant="body1"
                sx={{ width: '100%', fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}
              >
                27/08/2024
              </Typography>
              <Typography
                component="body1"
                variant="body1"
                sx={{
                  width: '100%',
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                  color: 'grey.700',
                }}
              >
                Monto Total: $1000
              </Typography>
              <Typography
                component="body1"
                variant="body1"
                sx={{
                  width: '100%',
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                  color: 'grey.700',
                }}
              >
                Miembros: 6
              </Typography>
            </Card>
          </Grid>

          {/* Tarjeta 2 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined">
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(1.8rem, 5vw, 2.15rem)' }}
              >
                Proyecto 2
              </Typography>
              <Typography
                component="h1"
                variant="h5"
                sx={{ width: '100%', fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}
              >
                Nombre del Proyecto 2
              </Typography>
            </Card>
          </Grid>

          {/* Tarjeta 3 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined">
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(1.8rem, 5vw, 2.15rem)' }}
              >
                Proyecto 3
              </Typography>
              <Typography
                component="h1"
                variant="h5"
                sx={{ width: '100%', fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}
              >
                Nombre del Proyecto 3
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </SignInContainer>
    </AppTheme>
  );
}
