import {
  Route,
  Routes,
  Outlet,
  useNavigate
} from "react-router-dom";
import Header from "./containers/Header";
import AllDepartmentsBox from "./containers/AllDepartmentsBox";
import SingleAppPage from "./containers/SingleAppPage";
import SinglePartPage from "./containers/SinglePartPage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// the above needs to go when the info is in the db

function App() {

  const DEFAULT_DEPARTMENT = {
    name: "dpub",
    apps: [
      {
        name: "optimo",
        folders: [
          {
            title: "general documentation",
            id: 0
           },
          {
           title: "client",
           id: 1
          },
          {
           title: "server",
           id: 2
          },
         ],
        parts: [
          {
            name: "general documentation",
            type: "documentation",
            id: uuidv4(),
            ghRepo: "www.someGitHubLink.com",
            folderToBeDisplayedIn: "0",
          },
          {
            name: "published postgres",
            type: "data base",
            id: uuidv4(),
            ghRepo: "www.someGitHubLink.com",
            folderToBeDisplayedIn: "1",
          }
        ],
        docs: [
          {
            title: "Some Doc1",
            url: "https://someLink.com",
            source: "Confluence",
            lastModified: "someDate",
            concerningPart: ["some part id"],
            flags: {
              isLinkUpToDate: true,
              // requestAction: [
              //   {
              //     date: "some date",
              //     userRequesting: "userId",
              //     typeOfAction: "some action type",
              //     comments: "some coments",
              //     userRequested: "userId"
              //   }
              // ]
            }
          },
          {
            title: "Some Doc2",
            url: "https://someLink.com",
            source: "Confluence",
            lastModified: "someDate",
            concerningParts: ["some part id"],
            flags: {
              isLinkUpToDate: true,
              // requestAction: [
              //   {
              //     date: "some date",
              //     userRequesting: "userId",
              //     typeOfAction: "some action type",
              //     comments: "some coments",
              //     userRequested: "userId"
              //   }
              // ]
            }
          }
        ],
      },
      {
        name: "tipo",
        folders: [
          {
            title: "general documentation",
            id: 0
           },
          {
           title: "client",
           id: 1
          },
          {
           title: "server",
           id: 2
          },
         ],
        parts: [
          {
            name: "general documentation",
            id: "someid1",
            type: "documentation",
            ghRepo: "www.someGitHubLink.com",
            folderToBeDisplayedIn: "0",
          },
          {
            name: "published postgres",
            id: "somePartId2",
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
        <Route path="/appPage/:appName" element={<SingleAppPage/>}/> 
        <Route path="/:partName" element={<SinglePartPage/>}/> 
      </Routes>
      
      
    </div>
  );
}

export default App;
