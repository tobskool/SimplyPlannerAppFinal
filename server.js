const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
// ... import your environment variables

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await mongoose.connect(process.env.MONGODB_URI, { 
    // ... connection options
  });

  server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
};

startServer();