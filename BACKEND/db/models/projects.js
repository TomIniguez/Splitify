const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const projectSchema = new mongoose.Schema({
  project_id: String,
  user_id: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: String,
});

projectSchema.plugin(mongoosePaginate)
const Project = mongoose.model('Project', projectSchema)

module.exports = Project;