import { useEffect } from "react";
import PopulateButtons from "./PopulateButtons";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import useParamsHelper from "../hooks/useParamsHelper";
import AppPage from "./AppPage";
import styled from "@emotion/styled";
import styleVariables from "../styleVariables";

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

const AppsBox = ({ 
  teamApps, 
  teamName,
  newPart,
  setNewPart,
  folderOfNewPart,
  setFolderOfNewPart,
  folderBeenCreated,
  setFolderBeenCreated,
  newlyCreatedFolders,
  setNewlyCreatedFolders,
  folderInfoToState,
  addNewFolderAndClear
}) => {
  const { 
    manageAppIdParam, 
    params: {
      appId
    }
  } = useParamsHelper();
  
  return (
    <DepartmAppsBoxContainer>
      <StyledButton onClick={manageAppIdParam}>
        <DepAppBoxPageTitle>
          {capitaliseFirstLetters(teamName)}
        </DepAppBoxPageTitle>
      </StyledButton>

      {(teamApps &&
        !appId) &&
        <PopulateButtons
          data={teamApps}
          onClickFunction={(singleApp) => manageAppIdParam(singleApp)}
        />
      }
      {appId && 
        <AppPage 
          appIdToDisplay={appId}
          newPart={newPart}
          setNewPart={setNewPart}
          folderOfNewPart={folderOfNewPart}
          setFolderOfNewPart={setFolderOfNewPart}
          folderBeenCreated={folderBeenCreated}
          setFolderBeenCreated={setFolderBeenCreated}
          newlyCreatedFolders={newlyCreatedFolders}
          setNewlyCreatedFolders={setNewlyCreatedFolders}
          folderInfoToState={folderInfoToState}
          addNewFolderAndClear={addNewFolderAndClear}

        />
      }
    </DepartmAppsBoxContainer>
  );
};

export default AppsBox;
