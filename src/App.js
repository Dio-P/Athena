import {
  Route,
  Routes,
  Outlet,
  useNavigate
} from "react-router-dom";
import Header from "./containers/Header";
import AllDepartmentsBox from "./containers/AllDepartmentsBox";
import AppPage from "./components/AppPage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// the above needs to go when the info is in the db

function App() {

  const DEFAULT_DEPARTMENT = {
    name: "dpub",
    apps: [
      {
        name: "optimo",
        folders: {
          0: {
            title: "general documentation",
            id: 0
           },
          1: {
           title: "client",
           id: 1
          },
          2: {
           title: "server",
           id: 2
          },
        },
        parts: [
          {
            name: "general documentation",
            type: "documentation",
            partId: uuidv4(),
            ghRepo: "www.someGitHubLink.com",
            folderToBeDisplayedIn: "0",
          },
          {
            name: "published postgres",
            type: "data base",
            partId: uuidv4(),
            ghRepo: "www.someGitHubLink.com",
            folderToBeDisplayedIn: "1",
          }
        ],
        docs: [],
      },
      {
        name: "tipo",
        folders: {
          0: {
            title: "general documentation",
            id: 0
           },
          1: {
           title: "client",
           id: 1
          },
          2: {
           title: "server",
           id: 2
          },
        },
        parts: [
          {
            name: "general documentation",
            partId: "somePartId1",
            type: "documentation",
            ghRepo: "www.someGitHubLink.com",
            folderToBeDisplayedIn: "0",
          },
          {
            name: "published postgres",
            partId: "somePartId2",
            type: "data base",
            ghRepo: "www.someGitHubLink.com",
            folderToBeDisplayedIn: "1",
          }
        ],
        docs: [],
      },
    ]
  }

  const [alldepartments, setAllDepartments] = useState(DEFAULT_DEPARTMENT);

  useEffect(() => {
    setAllDepartments(DEFAULT_DEPARTMENT)
  }, [])

  return (
    <div className="">
      <h1>Athena</h1>
      <Header/>
      <Routes>
        <Route path="/" element={<AllDepartmentsBox alldepartments={alldepartments} />}/>
        <Route path="/appPage/:appName" element={<AppPage/>}/> 
      </Routes>
      
      
    </div>
  );
}

export default App;
