import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';
import './index.css';
import { notesReducer } from './reducers';

const cache = new InMemoryCache({
    dataIdFromObject: object => object.id 
});

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache
})


const store = createStore(notesReducer, applyMiddleware(thunk));

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root'));
