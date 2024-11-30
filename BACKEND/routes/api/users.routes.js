var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');

// Rutas de los usuarios
router.get('/', function(req, res, next) {
  res.send('Llegaste a la ruta de api/user.routes');
});

router.post('/registration', UserController.createUser); // Crear un nuevo usuario
router.post('/login', UserController.loginUser); // Iniciar sesión
router.get('/users', Authorization, UserController.getUsers); // Obtener usuarios con paginación
router.get('/userByMail', Authorization, UserController.getUsersByMail); // Obtener usuario por mail
router.put('/update', Authorization, UserController.updateUser); // Actualizar usuario
router.delete('/delete', Authorization, UserController.removeUser); // Eliminar usuario

module.exports = router;