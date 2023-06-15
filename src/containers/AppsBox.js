import PopulateButtons from "./PopulateButtons";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import useParamsHelper from "../hooks/useParamsHelper";
import AppPage from "./AppPage";
import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import { useState } from "react";
import PopUp from "../components/PopUp";
import AddNewApp from "../popUpComponents/AddNewApp";
import { useMutation } from '@apollo/client';
import gql from "graphql-tag";
// import { ObjectID } from "bson";
import { v4 as uuidv4 } from "uuid";




const ADD_NEW_APP = gql`
  mutation ($newApp: AppInput!) {
    addNewApp(newApp: $newApp) {
      name
      id
      type
      gitHubRepo
      briefDescr
      folders {
        name
        id
      }
      parts {
        name
        id
        ghRepo
        type
        folderToBeDisplayedIn
      }
      teams
      properties {
        docs {
          name
          url
          id
          source
          lastModified
          concerningParts
        }
      }
    }
  }
`;

const DepartmAppsBoxContainer = styled.div`
  margin-left: 10px;
  color: "black";
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

const TeamAppsBlock = styled.div`
`;

const AppsBox = ({ 
  teamApps, 
  teamName,
}) => {
  const {
    manageDdOpenParam,
    manageAppIdParam, 
    params: {
      appId
    }
  } = useParamsHelper();
  // const newObjectId = ObjectID()

  const [newApp, setNewApp] = useState( {
    id: uuidv4(), 
    name: "",
    type: "",
    gitHubRepo: "",
    briefDescr: "",
    teams: [teamName],
    // facing: {
    //   user: false,//radio button
    //   audience: false,//radio button
    // },
    folders: [],
    parts: [],
    // connections: [],
    properties: {
      docs: []
    }
  });


const [addNewApp, { loading, error, data }] = useMutation(
  ADD_NEW_APP
);

  const [isAddAppPopupOpen, setIsAddAppPopupOpen] = useState(false);

  const addTeamAndClose = (newTeam) => {
     setNewApp({...newApp, teams: [...newApp.teams, newTeam.name]});
  }

  const removeAdditionalTeam = (team) => {
      const indexOfTeamToRemove = newApp.teams.indexOf(team);
      setNewApp({ ...newApp, teams: newApp.teams.splice(indexOfTeamToRemove -1, 1)})
  }

  const addAppAndCLose = () => {
    console.log("newApp*$$$", newApp);
    addNewApp({
      variables: { newApp : newApp },
    }) 
  }
  
  return (
    <DepartmAppsBoxContainer>
      <StyledButton onClick={manageAppIdParam}>
        <DepAppBoxPageTitle>
          {capitaliseFirstLetters(teamName)}
        </DepAppBoxPageTitle>
      </StyledButton>

      {(teamApps &&
        !appId) &&
        <TeamAppsBlock>
          <GenericButtonIcon
            type="add"
            label="+ Add App"
            onClickFunction={() => setIsAddAppPopupOpen(!isAddAppPopupOpen)}
          />
          <PopulateButtons
            data={teamApps}
            onClickFunction={(singleApp) => manageAppIdParam(singleApp)}
          />
        </TeamAppsBlock>
      }
      {appId && 
        <AppPage/>
      }
      {isAddAppPopupOpen &&
        <PopUp
          ComponentToDisplay={AddNewApp}
          isPopUpOpen={isAddAppPopupOpen}
          setIsPopUpOpen={setIsAddAppPopupOpen}
          newApp={newApp}
          setNewApp={setNewApp}
          onClickDDOption={addTeamAndClose}
          removeAdditionalTeam={removeAdditionalTeam}
          onClickFunction={addAppAndCLose}
        />
      }
    </DepartmAppsBoxContainer>
  );
};

export default AppsBox;
