var express = require('express');
var router = express.Router();
var TicketController = require('../../controllers/tickets.controller');
var Authorization = require('../../auth/authorization');

// Rutas de tickets
router.get('/testticket', function(req, res, next) {
  res.send('Llegaste a la ruta de api/tickets.routes');
});

router.post('/', Authorization, TicketController.createTicket); // Crear un ticket
router.get('/', Authorization, TicketController.getTickets); // Obtener todos los tickets
router.get('/:id', Authorization, TicketController.getTicketById); // Obtener ticket por ID
router.put('/:id', Authorization, TicketController.updateTicket); // Actualizar ticket
router.delete('/', Authorization, TicketController.deleteTicket); // Eliminar ticket

module.exports = router;