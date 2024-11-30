const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const ticketSchema = new mongoose.Schema({
  ticket_id: String,
  project_id: { type: String, required: true },
  fecha: { type: Date, required: true },
  monto: Number,
  image: String,
});

ticketSchema.plugin(mongoosePaginate)
const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket;