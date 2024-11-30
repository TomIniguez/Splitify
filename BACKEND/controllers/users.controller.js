const UserService = require('../services/userService'); // Importar el servicio de usuario

// Obtener usuarios con paginación
exports.getUsers = async (req, res, next) => {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  try {
    const users = await UserService.getUsers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: users,
      message: "Successfully received users",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Obtener usuario por correo
exports.getUsersByMail = async (req, res, next) => {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  const filtro = { mail: req.query.mail }; // Filtro por email

  try {
    const users = await UserService.getUsers(filtro, page, limit);
    return res.status(200).json({
      status: 200,
      data: users,
      message: "Successfully received user by email",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res, next) => {
  const user = {
    name: req.body.name,
    mail: req.body.mail,
    username: req.body.username,
    password: req.body.password, // Contraseña para encriptar
    image: req.body.image || null,
  };

  try {
    const createdUser = await UserService.createUser(user);
    return res.status(201).json({ createdUser, message: "Successfully created user" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, message: "User creation was unsuccessful" });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, message: "id must be present" });
  }

  const user = {
    name: req.body.name || null,
    mail: req.body.mail || null,
    username: req.body.username || null,
    password: req.body.password || null,
    image: req.body.image || null,
  };

  try {
    const updatedUser = await UserService.updateUser(user);
    return res.status(200).json({ status: 200, data: updatedUser, message: "Successfully updated user" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Eliminar un usuario
exports.removeUser = async (req, res, next) => {
  const id = req.body.id;

  try {
    const deleted = await UserService.deleteUser(id);
    return res.status(200).send("Successfully deleted");
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res, next) => {
  const user = {
    mail: req.body.mail,
    password: req.body.password,
  };

  try {
    const loginUser = await UserService.loginUser(user);
    if (loginUser === 0) {
      return res.status(400).json({ message: "Incorrect password" });
    } else {
      return res.status(201).json({ loginUser, message: "Successfully logged in" });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Invalid username or password" });
  }
};