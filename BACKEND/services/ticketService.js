const Ticket = require('../db/models/tickets'); // Modelo de Ticket

// Obtener tickets con paginación
exports.getTickets = async function (query, page, limit) {
  const options = {
    page: page || 1,
    limit: limit || 10,
  };

  try {
    const tickets = await Ticket.paginate(query, options); // Paginar tickets
    return tickets;
  } catch (e) {
    console.error('Error al paginar tickets:', e);
    throw Error('Error mientras se paginaban los tickets.');
  }
};

//Get Ticket by ID
exports.getTicketById = async (ticketId) => {
  try {
    const ticket = await Ticket.findById(ticketId); // Usamos `findById` de Mongoose
    return ticket;
  } catch (e) {
    throw new Error('Error fetching ticket by ID: ' + e.message);
  }
};

// Crear un nuevo ticket
exports.createTicket = async function (ticket) {
  const newTicket = new Ticket({
    ticket_id: ticket.ticket_id,
    project_id: ticket.project_id,
    fecha: ticket.fecha,
    monto: ticket.monto,
    image: ticket.image || null,
  });

  try {
    const savedTicket = await newTicket.save();
    return savedTicket;
  } catch (e) {
    console.error('Error al crear ticket:', e);
    throw Error('Error mientras se creaba el ticket.');
  }
};

// Actualizar un ticket
exports.updateTicket = async function (ticket) {
  try {
    const oldTicket = await Ticket.findOne({ ticket_id: ticket.ticket_id });
    if (!oldTicket) {
      return false;
    }

    oldTicket.monto = ticket.monto || oldTicket.monto;
    oldTicket.fecha = ticket.fecha || oldTicket.fecha;
    oldTicket.image = ticket.image || oldTicket.image;

    const updatedTicket = await oldTicket.save();
    return updatedTicket;
  } catch (e) {
    console.error('Error al actualizar ticket:', e);
    throw Error('Error mientras se actualizaba el ticket.');
  }
};

// Eliminar un ticket
exports.deleteTicket = async function (id) {
  try {
    const deleted = await Ticket.deleteOne({ _id: id });
    if (deleted.deletedCount === 0) {
      throw Error('No se pudo eliminar el ticket.');
    }
    return deleted;
  } catch (e) {
    console.error('Error al eliminar ticket:', e);
    throw Error('Error mientras se eliminaba el ticket.');
  }
};