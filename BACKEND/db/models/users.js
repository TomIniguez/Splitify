const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new mongoose.Schema({
  user_id: String,
  mail: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  nombre: String,
  apellido: String,
  image: String,
});

userSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', userSchema)

module.exports = User;