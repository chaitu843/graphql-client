import React from 'react';
import './App.css';
import BooksList from '../BooksList/BooksList';
import AddBook from '../AddBook/AddBook';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})
function App() {
  return (
    <ApolloProvider client = {client}>
      <div className="App">
        <h1> Library running on GRAPHQL</h1>
        <BooksList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
