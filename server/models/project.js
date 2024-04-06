const mongoose = require('mongoose');
const { Schema } = mongoose; // You can destructure for cleaner code

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true // Optionally trim whitespace
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,  
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo',
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
