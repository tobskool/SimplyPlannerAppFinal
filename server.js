const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
// ... import your environment variables

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await mongoose.connect(process.env.MONGODB_URI, { 
    // ... connection options - mongodb+srv://tfayemi9:Vv1MJ7GcLR70TKQW@simplyplannerapp.fp8axpv.mongodb.net/?retryWrites=true&w=majority&appName=SimplyPlannerApp
  });

  server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
};

startServer();