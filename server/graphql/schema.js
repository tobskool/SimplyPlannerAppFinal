const { gql } = require('apollo-server');

const typeDefs = gql`
    type Todo {
      _id: ID!
      task: String!
      completed: Boolean!
    }

    type Query {
      todos: [Todo!]!
    }

    type Mutation {
      createTodo(task: String!): Todo!
      updateTodo(id: ID!, task: String, completed: Boolean): Todo!
      DELETE_TODO(id: ID!): Boolean!
    }
`;

module.exports = typeDefs;