import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://mpjk0plp9.lp.gql.zone/graphql',
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
