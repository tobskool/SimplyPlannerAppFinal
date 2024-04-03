import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Replace with your actual GraphQL API endpoint
const API_URI = 'http://localhost:4000/graphql';  

// Configure a network link to your GraphQL endpoint
const httpLink = new HttpLink({
  uri: API_URI 
});

// Authentication (If needed)
const authLink = setContext((_, { headers }) => {
  // Retrieve an authorization token, e.g., from localStorage
  const token = localStorage.getItem('authToken'); 

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Add token if available
    },
  };
});

// Initialize the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine links for auth and network
  cache: new InMemoryCache(),
});

export default client;
