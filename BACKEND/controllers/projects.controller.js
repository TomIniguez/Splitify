const ProjectService = require('../services/projectService'); // Importar el servicio de proyectos

// Obtener proyectos con paginación
exports.getProjects = async (req, res, next) => {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  try {
    const projects = await ProjectService.getProjects({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: projects,
      message: "Successfully received projects",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Obtener un proyecto por ID
exports.getProjectById = async (req, res, next) => {
  const projectId = req.params.id;  // Accedemos al parámetro de la URL

  try {
    // Suponiendo que tienes un servicio que te permite obtener un proyecto por ID
    const project = await ProjectService.getProjectById(projectId); 

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      status: 200,
      data: project,
      message: "Project retrieved successfully",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};


// Crear un nuevo proyecto
exports.createProject = async (req, res, next) => {
  const project = {
    project_id: req.body.project_id,
    user_id: req.body.user_id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion || null,
  };

  try {
    const createdProject = await ProjectService.createProject(project);
    return res.status(201).json({ createdProject, message: "Successfully created project" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, message: "Project creation was unsuccessful" });
  }
};

// Actualizar un proyecto
exports.updateProject = async (req, res, next) => {
  const project = {
    project_id: req.body.project_id,
    nombre: req.body.nombre || null,
    descripcion: req.body.descripcion || null,
  };

  try {
    const updatedProject = await ProjectService.updateProject(project);
    return res.status(200).json({ status: 200, data: updatedProject, message: "Successfully updated project" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Eliminar un proyecto
exports.deleteProject = async (req, res, next) => {
  const id = req.body.id;

  try {
    const deleted = await ProjectService.deleteProject(id);
    return res.status(200).send("Successfully deleted");
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};