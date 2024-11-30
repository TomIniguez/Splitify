var express = require('express');
var router = express.Router();
var ProjectController = require('../../controllers/projects.controller');
var Authorization = require('../../auth/authorization');

// Rutas de proyectos
router.get('/testproject', function(req, res, next) {
  res.send('Llegaste a la ruta de api/projects.routes');
});

router.post('/', Authorization, ProjectController.createProject); // Crear un proyecto
router.get('/', Authorization, ProjectController.getProjects); // Obtener todos los proyectos
router.get('/:id', Authorization, ProjectController.getProjectById); // Obtener proyecto por ID
router.put('/:id', Authorization, ProjectController.updateProject); // Actualizar proyecto
router.delete('/:id', Authorization, ProjectController.deleteProject); // Eliminar proyecto

module.exports = router;