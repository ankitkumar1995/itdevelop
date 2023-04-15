import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: relayStylePagination(),
        pages: relayStylePagination(),
        projects: relayStylePagination(),
      },
    },
  },
});
const client = new ApolloClient({
  uri: 'https://wordpress.missionstartupkarnataka.org/graphql/',
  cache: new InMemoryCache(),
});

export default client;
