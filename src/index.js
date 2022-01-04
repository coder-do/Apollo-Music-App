import { ThemeProvider } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';
import client from './graphql/client';

ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root')
);