import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Routes,
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
import SinglePartPage from './containers/SinglePartPage';

const athenaDbUri = "http://localhost:5051/graphql"

const client = new ApolloClient({
  link: new HttpLink({
    uri: athenaDbUri,
  }),
  cache: new InMemoryCache(({
    addTypename: false
  })),
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" 
      element={<App/>}
        loader={(obj) => {
          console.log("obj['*']", obj);
        }}
        action={({ params }) => {}}
      />
      <Route path="/:appName/:partName"
      element={<SinglePartPage/>}
      loader={({params}) => {
        console.log("params['*']", params);
      }}
      /> 
    </>
  )
);
// Route for optimo doc page

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <RouterProvider router={router}/>
      </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
