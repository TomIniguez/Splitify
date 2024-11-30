const express = require('express');
const router = express.Router();

// Importar las rutas correctas
const userRoutes = require('./api/users.routes');
const projectRoutes = require('./api/projects.routes');
const ticketRoutes = require('./api/tickets.routes');
const memberRoutes = require('./api/members.routes');

// Usar las rutas importadas en las rutas correspondientes
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tickets', ticketRoutes);
router.use('/members', memberRoutes);

module.exports = router;