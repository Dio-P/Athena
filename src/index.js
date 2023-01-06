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

import AppPage from './containers/AppPage';
import TeamsBox from './containers/TeamsBox';
import Header from './containers/Header';

const athenaDbUri = "http://localhost:5051/graphql"

const client = new ApolloClient({
  link: new HttpLink({
    uri: athenaDbUri,
  }),
  cache: new InMemoryCache(({
    addTypename: false
  })),
});

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     // <Routes>
//     <>
//       <h1>Athena</h1>
//       <Header/>
//       <Route path="/*" 
//       element={<TeamsBox 
//         // defaultDepartment={DEFAULT_DEPARTMENT}
//         // alldepartments={alldepartments}///to be changed when queries working properly
//         // params={params}
//         />}
//         loader={(obj) => {
//           console.log("obj['*']", obj); // "one/two"
//         }}
//         action={({ params }) => {}}
//       />
//       <Route path="/?team=:team&appId=:appId" element={<AppPage appId={"appId"}/>}/> 
//     </>
//   )
// );


const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <RouterProvider router={router}> */}
//       <ApolloProvider client={client}>
//         <RouterProvider router={router}/>
//         {/* <App /> */}
//       </ApolloProvider>
//     {/* </RouterProvider> */}
//   </React.StrictMode>
// );

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// next: create an apolo client and connect all that needs to be connected
