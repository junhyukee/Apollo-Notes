import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';
import './index.css';


const cache = new InMemoryCache({
    dataIdFromObject: object => object.id 
});

const link = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: 'include',
});

const client = new ApolloClient({
    link,
    cache
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root'));
