const { UserInputError } = require('apollo-server'); 

const Todo = require('../models/todo');
const Project = require('../models/project');
const User = require('../models/user');

const resolvers = {
  Query: {
    todos: async (_, { projectId }) => {
      const project = await Project.findById(projectId);

      if (!project) {
        throw new UserInputError('Project not found');
      }

      return await Todo.find({ project: projectId });
    },
    projects: async () => await Project.find(),
  },

  Mutation: {
    createTodo: async (_, { task, projectId }) => {
      const project = await Project.findById(projectId);

      if (!project) {
        throw new UserInputError('Project not found');
      }

      const todo = new Todo({ task, project: projectId });
      await todo.save();
      return todo;
    },

    updateTodo: async (_, { id, task, completed }) => {
      const todo = await Todo.findByIdAndUpdate(id, { task, completed }, { new: true });
      if (!todo) {
        throw new UserInputError('Todo not found');
      }
      return todo;
    },

    DELETE_TODO: async (_, { id }) => {
      const todo = await Todo.findByIdAndDelete(id); 
      if (!todo) {
        throw new UserInputError('Todo not found');
      }
      return true
    },

    createUser: async (_, { username, email }) => {
      const existingUser = await User.findOne({ email }); 
      if (existingUser) {
        throw new UserInputError('A user with this email already exists');
      } 
      
      const user = new User({ username, email });
      await user.save();
      return user;
    },
  },

  // Relationships - Resolving Nested Data
  Project: {
    todos: async (parent) => await Todo.find({ project: parent._id }),
  },  
};

module.exports = resolvers;