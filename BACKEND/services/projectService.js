const Project = require('../db/models/projects'); // Modelo de Proyecto

// Obtener proyectos con paginación
exports.getProjects = async function (query, page, limit) {
  const options = {
    page: page || 1,
    limit: limit || 10,
  };

  try {
    const projects = await Project.paginate(query, options); // Paginar proyectos
    return projects;
  } catch (e) {
    console.error('Error al paginar proyectos:', e);
    throw Error('Error mientras se paginaban los proyectos.');
  }
};

exports.getProjectById = async (projectId) => {
  try {
    // Encuentra el proyecto por su ID
    const project = await Project.findById(projectId);  // Usando mongoose si es que estás trabajando con MongoDB

    return project;  // Retorna el proyecto si se encuentra
  } catch (e) {
    throw new Error('Error fetching project');
  }
};

// Crear un nuevo proyecto
exports.createProject = async function (project) {
  const newProject = new Project({
    project_id: project.project_id,
    user_id: project.user_id,
    nombre: project.nombre,
    descripcion: project.descripcion || null,
  });

  try {
    const savedProject = await newProject.save();
    return savedProject;
  } catch (e) {
    console.error('Error al crear proyecto:', e);
    throw Error('Error mientras se creaba el proyecto.');
  }
};

// Actualizar un proyecto
exports.updateProject = async function (project) {
  try {
    const oldProject = await Project.findOne({ project_id: project.project_id });
    if (!oldProject) {
      return false;
    }

    oldProject.nombre = project.nombre || oldProject.nombre;
    oldProject.descripcion = project.descripcion || oldProject.descripcion;

    const updatedProject = await oldProject.save();
    return updatedProject;
  } catch (e) {
    console.error('Error al actualizar proyecto:', e);
    throw Error('Error mientras se actualizaba el proyecto.');
  }
};

// Eliminar un proyecto
exports.deleteProject = async function (id) {
  try {
    const deleted = await Project.deleteOne({ _id: id });
    if (deleted.deletedCount === 0) {
      throw Error('No se pudo eliminar el proyecto.');
    }
    return deleted;
  } catch (e) {
    console.error('Error al eliminar proyecto:', e);
    throw Error('Error mientras se eliminaba el proyecto.');
  }
};