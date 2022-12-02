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

function App() {

  const DEFAULT_DEPARTMENT = {
    name: "dpub",
    apps: [
      {
        name: "optimo",
        foldersToDisplay: [
          { 0: "general"},
          { 1: "client"},
          { 2: "server"},
        ],
        includesParts: [
          {
            name: "general documentation",
            type: "documentation",
            RepoLink: ["www.someGitHubLink.com"],
            folderToBeDisplayedIn: "0",
          },
          {
            name: "published postgres",
            type: "data base",
            RepoLink: ["www.someGitHubLink.com"],
            folderToBeDisplayedIn: "1",
          }
        ],
        docs: [],
      },
      {
        name: "tipo",
        foldersToDisplay: [
          { 0: "general"},
          { 1: "client"},
          { 2: "server"},
        ],
        includesParts: [
          {
            name: "general documentation",
            partId: "somePartId1",
            type: "documentation",
            RepoLink: ["www.someGitHubLink.com"],
            folderToBeDisplayedIn: "0",
          },
          {
            name: "published postgres",
            partId: "somePartId2",
            type: "data base",
            RepoLink: ["www.someGitHubLink.com"],
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
