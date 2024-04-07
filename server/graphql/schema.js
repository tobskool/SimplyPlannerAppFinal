const { gql } = require('apollo-server');

const typeDefs = gql`

    type User {
      _id: ID!
      username: String!
      email: String!
      projects: [Project!]! 
    }

    type Query {
      todos(where: TodoWhereInput): [Todo!]! 
      projects: [Project!]! 
    }

    type Project {
      _id: ID!
      name: String!
      description: String 
      dueDate: Date
      todos: [Todo!]! 
      owner: User!
    }

    type Mutation {
      createTodo(task: String!): Todo!
      updateTodo(id: ID!, task: String, completed: Boolean): Todo!
      DELETE_TODO(id: ID!): Boolean!
    }

    type Todo {
      _id: ID!
      task: String!
      completed: Boolean!
      dueDate: Date 
      urgency: Int 
      project: Project! 
    }
  
    type Project {
      _id: ID!
      name: String!
      description: String 
      dueDate: Date
      todos: [Todo!]! 
      owner: User!
    }
  
    input TodoWhereInput {
      projectId: ID 
    }
`;
