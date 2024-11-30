const TicketService = require('../services/ticketService'); // Importar el servicio de tickets

// Obtener tickets con paginación
exports.getTickets = async (req, res, next) => {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  try {
    const tickets = await TicketService.getTickets({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: tickets,
      message: "Successfully received tickets",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

//Get Ticket By ID
exports.getTicketById = async (req, res, next) => {
  const ticketId = req.params.id; // El ID del ticket lo recibimos de los parámetros de la URL

  try {
    const ticket = await TicketService.getTicketById(ticketId); // Llamada a tu servicio para obtener el ticket por ID
    if (!ticket) {
      return res.status(404).json({ status: 404, message: 'Ticket not found' });
    }
    return res.status(200).json({ status: 200, data: ticket, message: 'Successfully received ticket' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Crear un nuevo ticket
exports.createTicket = async (req, res, next) => {
  const ticket = {
    ticket_id: req.body.ticket_id,
    project_id: req.body.project_id,
    fecha: req.body.fecha,
    monto: req.body.monto,
    image: req.body.image || null,
  };

  try {
    const createdTicket = await TicketService.createTicket(ticket);
    return res.status(201).json({ createdTicket, message: "Successfully created ticket" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ status: 400, message: "Ticket creation was unsuccessful" });
  }
};

// Actualizar un ticket
exports.updateTicket = async (req, res, next) => {
  const ticket = {
    ticket_id: req.body.ticket_id,
    monto: req.body.monto || null,
    fecha: req.body.fecha || null,
    image: req.body.image || null,
  };

  try {
    const updatedTicket = await TicketService.updateTicket(ticket);
    return res.status(200).json({ status: 200, data: updatedTicket, message: "Successfully updated ticket" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Eliminar un ticket
exports.deleteTicket = async (req, res, next) => {
  const id = req.query.id;

  try {
    const deleted = await TicketService.deleteTicket(id);
    return res.status(200).send("Successfully deleted");
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};