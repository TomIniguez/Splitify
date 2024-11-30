const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const memberSchema = new mongoose.Schema({
  member_id: String,
  name: { type: String, required: true },
  ticket_id: { type: String, required: true },
  monto: Number,
  paid: { type: Boolean, default: false },
});

memberSchema.plugin(mongoosePaginate)
const Member = mongoose.model('Member', memberSchema)

module.exports = Member;