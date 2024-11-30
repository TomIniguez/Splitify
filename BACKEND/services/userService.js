const User = require('../db/models/users'); // Modelo de Usuario
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener usuarios con paginación
exports.getUsers = async function (query, page, limit) {
  const options = {
    page: page || 1,
    limit: limit || 10,
  };

  try {
    const users = await User.paginate(query, options); // Paginar usuarios
    return users;
  } catch (e) {
    console.error('Error al paginar usuarios:', e);
    throw Error('Error mientras se paginaban los usuarios.');
  }
};

// Crear un nuevo usuario
exports.createUser = async function (user) {
  const hashedPassword = bcrypt.hashSync(user.password, 8);

  const newUser = new User({
    user_id: user.user_id,
    mail: user.mail,
    username: user.username,
    password: hashedPassword,
    nombre: user.nombre,
    apellido: user.apellido,
    image: user.image || null,
    date: new Date(),
  });

  try {
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.SECRET, // Llave secreta para el token
      { expiresIn: 86400 } // Expira en 24 horas
    );
    return { token, user: savedUser };
  } catch (e) {
    console.error('Error al crear usuario:', e);
    throw Error('Error mientras se creaba el usuario.');
  }
};

// Actualizar un usuario
exports.updateUser = async function (user) {
  try {
    const oldUser = await User.findOne({ user_id: user.user_id });
    if (!oldUser) {
      return false;
    }

    const hashedPassword = user.password ? bcrypt.hashSync(user.password, 8) : oldUser.password;

    // Actualizar los datos del usuario
    oldUser.mail = user.mail || oldUser.mail;
    oldUser.username = user.username || oldUser.username;
    oldUser.password = hashedPassword;
    oldUser.nombre = user.nombre || oldUser.nombre;
    oldUser.apellido = user.apellido || oldUser.apellido;
    oldUser.image = user.image || oldUser.image;

    const updatedUser = await oldUser.save();
    return updatedUser;
  } catch (e) {
    console.error('Error al actualizar usuario:', e);
    throw Error('Error mientras se actualizaba el usuario.');
  }
};

// Eliminar un usuario
exports.deleteUser = async function (id) {
  try {
    const deleted = await User.deleteOne({ _id: id });
    if (deleted.deletedCount === 0) {
      throw Error('No se pudo eliminar el usuario.');
    }
    return deleted;
  } catch (e) {
    console.error('Error al eliminar usuario:', e);
    throw Error('Error mientras se eliminaba el usuario.');
  }
};

// Iniciar sesión
exports.loginUser = async function (user) {
  try {
    const _details = await User.findOne({ mail: user.mail });
    if (!_details) {
      throw Error('Usuario no encontrado.');
    }

    const passwordIsValid = bcrypt.compareSync(user.password, _details.password);
    if (!passwordIsValid) {
      return { auth: false, token: null };
    }

    const token = jwt.sign(
      { id: _details._id },
      process.env.SECRET,
      { expiresIn: 86400 }
    );

    return { auth: true, token, user: _details };
  } catch (e) {
    console.error('Error al iniciar sesión:', e);
    throw Error('Error mientras se iniciaba sesión.');
  }
};