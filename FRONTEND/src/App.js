import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Proyectos from './pages/Proyectos';
import ProyectoForm from './pages/ProyectoForm';
import TicketForm from './pages/TicketForm';
import Ticket from './pages/Ticket';
import Customizacion from './pages/Customizacion';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/proyectoform" element={<ProyectoForm />} />
        <Route path="/ticketform" element={<TicketForm />} /> 
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/customizacion" element={<Customizacion />} /> 
      </Routes>
    </Router>
  );
}

export default App;