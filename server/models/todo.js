const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
});

module.exports = mongoose.model('Todo', TodoSchema);