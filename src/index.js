import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
} from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const athenaDbUri = "http://localhost:5051/graphql"

const client = new ApolloClient({
  link: new HttpLink({
    uri: athenaDbUri,
  }),
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// next: create an apolo client and connect all that needs to be connected
