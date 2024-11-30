var express = require('express');
var router = express.Router();
var MemberController = require('../../controllers/members.controller');
var Authorization = require('../../auth/authorization');

// Rutas de miembros
router.get('/testmember', function(req, res, next) {
  res.send('Llegaste a la ruta de api/members.routes');
});

router.post('/', Authorization, MemberController.createMember); // Crear un miembro
router.get('/', Authorization, MemberController.getMembers); // Obtener todos los miembros
router.get('/:id', Authorization, MemberController.getMemberById); // Obtener miembro por ID
router.put('/update', Authorization, MemberController.updateMember); // Actualizar miembro
router.delete('/delete', Authorization, MemberController.deleteMember); // Eliminar miembro

module.exports = router;