import { useEffect, useState } from "react";
import ButtonIcon from "../components/ButtonIcon";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";
import AppPage from "./AppPage";
import styled from "@emotion/styled";
import useAppByIdSearch from "../hooks/queries/useAppByIdSearch";
import { v4 as uuidv4 } from 'uuid';

const mockPartId1 = uuidv4()
const mockPartId2 = uuidv4()
const appMock = {
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
      ]
    }
}
const DepartmAppsBoxContainer = styled.div`
margin-left: 10px;
color: orange;
`;

const DepAppBoxPageTitle = styled.h2`
margin: 0px;
`;

const StyledButton = styled.button`
margin: auto;
background: none;
color: inherit;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;
`;

const AppsBox = ({ department, teamApps, team }) => {
  const [returnToThisPage, setReturnToThisPage] = useState(false);
  const [appIdToDisplay, setAppIdToDisplay] = useState("");
  // const [app, setApp] = useState("");
  const [
    appToDisplay,
    loading,
    error
  ] = useAppByIdSearch(appIdToDisplay)
  // const test= useAppByIdSearch(appIdToDisplay)

  useEffect(() => {
    setAppIdToDisplay(""); 

  }, [])

  useEffect(() => {
    console.log("appToDisplay#@#@##@", appToDisplay);
    // setApp(appToDisplay); 

  }, [appToDisplay])
  useEffect(() => {
    console.log("appIdToDisplay#@#@##@", appIdToDisplay);
  }, [appIdToDisplay])

  const clickingToHere = () => {
    setAppIdToDisplay(""); 
  }

  const clickingButton = (singleApp) => {
    console.log("single app!!!!*&*", singleApp);
    setAppIdToDisplay(singleApp.name)
     
  }
  return (
    <DepartmAppsBoxContainer>
      <div>
        <StyledButton onClick={clickingToHere} >
          <DepAppBoxPageTitle>
            { useCapitaliseFirstLetter(team) }
          </DepAppBoxPageTitle>
        </StyledButton>
      </div>
      <>
        {(teamApps && !appIdToDisplay)
        &&
        teamApps.map((singleApp) => {
          console.log("singleApp", singleApp);
            return (
              <div onClick={()=>setAppIdToDisplay(singleApp.id)} >
                <ButtonIcon app={ singleApp.name }/>
              </div>
            )
        })}
      </>

      {/* {(appIdToDisplay && app)
      &&
        <AppPage app={app}/>
      } */}

    </DepartmAppsBoxContainer>
  )
}

export default AppsBox;

// take depApps and use them to pupulate the buttons
// on click of the button bring the app
  // what will happen if the user goes back ? will the app be deleted from state?
  // is it better to have many small calls or fewer biger ones?