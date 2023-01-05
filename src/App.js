import {
  Route,
  Routes,
  Outlet,
  useSearchParams,
  useNavigate
} from "react-router-dom";
import Header from "./containers/Header";
import TeamsBox from "./containers/TeamsBox";
import AppPage from "./containers/AppPage";
import SinglePartPage from "./containers/SinglePartPage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useValuesFromUrlParams from "./hooks/useValuesFromUrlParams";
// the above needs to go when the info is in the db
import Test from "./components/Test";
function App() {

  const mockPartId1 = uuidv4()
  const mockPartId2 = uuidv4()

  const DEFAULT_DEPARTMENT = "DPub";

  const MOCK_DATA = {
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
            id: mockPartId1,
            ghRepo: "www.someGitHubLink.com",
            folderToBeDisplayedIn: "0",
          },
          {
            name: "published postgres",
            type: "data base",
            id: mockPartId2,
            ghRepo: "www.someGitHubLink.com",
            folderToBeDisplayedIn: "1",
          }
        ],
        properties:{
          docs: [
              {
                title: "Some Doc1",
                id: "someDocId",
                url: "https://someLink.com",
                source: "Confluence",
                lastModified: "someDate",
                concerningParts: [mockPartId1],
                flags: {
                  isLinkUpToDate: true,
                }
              },
              {
                title: "Some Doc2",
                id: "someDocId",
                url: "https://someLink.com",
                source: "Confluence",
                lastModified: "someDate",
                concerningParts: [mockPartId2, mockPartId1],
                interactions: {
                  isLinkUpToDate: true,
                  comments: [
                    {
                      text: "some coment",
                      type: "requestOrSimpleComment",
                      user: "someUserId",
                      date: "someDate",
                      flag: ["add another flag", "add another flag"],
                      openRequest: {
                        type: "type of request",
                        requestFrom: "otherUserId"
                      }
                    }
                  ]
                }
              }
            ],
          // initials: [],
          // technologies: []
        }
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
        properties:{
          docs: [
              {
                title: "Some Doc1",
                id: "someDocId",
                url: "https://someLink.com",
                source: "Confluence",
                lastModified: "someDate",
                concerningParts: [mockPartId1],
                interactions: {
                  isLinkUpToDate: true,
                  comments: [
                    {
                      text: "some coment",
                      type: "requestOrSimpleComment",
                      user: "someUserId",
                      date: "someDate",
                      flag: ["add another flag", "add another flag"],
                      openRequest: {
                        type: "type of request",
                        requestFrom: "otherUserId"
                      }
                    }
                  ]
                }
              },
              {
                title: "Some Doc2",
                id: "someDocId",
                url: "https://someLink.com",
                source: "Confluence",
                lastModified: "someDate",
                concerningParts: [mockPartId2, mockPartId1],
                interactions: {
                  isLinkUpToDate: true,
                  comments: [
                    {
                      text: "some coment",
                      type: "requestOrSimpleComment",
                      user: "someUserId",
                      date: "someDate",
                      flag: ["add another flag", "add another flag"],
                      openRequest: {
                        type: "type of request",
                        requestFrom: "otherUserId"
                      }
                    }
                  ]
                }
              }
            ],
          // initials: [],
          // technologies: []
        }
      },
    ]
  }

  const [alldepartments, setAllDepartments] = useState(MOCK_DATA);
  let [searchParams, setSearchParams] = useSearchParams();
  const [teamParam, appIdParam] = useValuesFromUrlParams()


  // useEffect(() => {
  //   setAllDepartments(MOCK_DATA)
  // }, []);
  // useEffect(() => {
  //   gettingParamsValues()
  // }, []);
  const params = Object.fromEntries([...searchParams]);

  // const gettingParamsValues = () => {
  //   console.log("inside getting params values");
  //   const paramValuesFromTeamsBox = Object.fromEntries([...searchParams]);
  //   console.log("paramValuesFromApp!@£", paramValuesFromTeamsBox);
  //   console.log("teamParam, appIdParam", teamParam, appIdParam);
  //   setSearchParams(paramValuesFromTeamsBox);
  // }


  return (
    <div className="">
      <h1>Athena</h1>
      <Header/>
      <Routes>
        <Route path="/" element={<TeamsBox 
          defaultDepartment={DEFAULT_DEPARTMENT}
          alldepartments={alldepartments}///to be changed when queries working properly
          // params={params}
          />}/>
        <Route path="/?team=:team&appId=:appId" element={<AppPage appId={"appId"}/>}/> 
        {/* <Route path="/:team/:appId" element={<AppPage appId={"appId"}/>}/>  */}
        {/* http://localhost:3000/DPub/63ad884923b0804c5a2ce94d */}
        <Route path="/:team/:appId/:partId" element={<Test appIdToDisplay={params.appId}/>}/> 
      </Routes>
      
      
    </div>
  );
}

export default App;
