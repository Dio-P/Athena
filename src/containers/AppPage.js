import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import AddNewConnectionBox from "../components/AddNewConnectionBox";
import GenericButtonIcon from "../components/GenericButtonIcon";
import Folder from "../components/Folder";
import useAppWithFolderByIdSearch from "../hooks/queries/useAppWithFolderByIdSearch";

const AppPageContainer = styled.div`
  margin-left: 10px;
`;

const AppPageTitle = styled.h1`
  margin: 0px;
`;

const AddDocButton = styled.button`
  margin: auto;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const AppPage = ({ appIdToDisplay, params }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const {addingNewConnection, team, appId} = Object.fromEntries([...searchParams]);

  // const queryId = useMemo(() => {
  //   console.log("appId in appPage@£", appId);
  //   if (!appIdToDisplay && appId) {
  //     console.log("appId", appId);
  //     return appId;
  //   }
  //   console.log("appIdToDisplay", appIdToDisplay);
  //   return appIdToDisplay;
  // }, [appId, appIdToDisplay]);

  const [appToDisplay, loading, error] = useAppWithFolderByIdSearch(appId);

  useEffect(() => {
    console.log("appToDisplay@@", appToDisplay);
  }, [appToDisplay]);

  const clickingToAddNewConnection = () => {
    if (!addingNewConnection) {
      setSearchParams({ ...params, addingNewConnection: true });
    } else {
      setSearchParams({ team, appId });
    }
  };

  const pickFromRenderingOptions = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return (
        <p>
          I am sad to say that the following error was just reported :
          {JSON.stringify(error)}
        </p>
      );
    }
    if(appToDisplay){
      return <>
      <>
        <AppPageTitle>
          {appToDisplay?.name}
          <AddDocButton onClick={clickingToAddNewConnection}>
            <GenericButtonIcon
              addingButton={true}
              label={
                (addingNewConnection ? "- " : "+ ") + "Add URL"
              }
            />
          </AddDocButton>
        </AppPageTitle>
      </>
      {addingNewConnection && appToDisplay && (
        <AddNewConnectionBox app={appToDisplay} params={params} />
      )}

      {appToDisplay &&
        appToDisplay?.folders?.map((folder) => (
          <Folder
            folderName={folder.name}
            parts={folder.parts}
            appId={appToDisplay.id}
          />
        ))}
    </>
    } 
  }

  return (
    <AppPageContainer>
      {pickFromRenderingOptions()}
    </AppPageContainer>
  );
};

export default AppPage;

// working:
// cannot go the the part page by link, because the part and app name are non existing
// logic updating docs in parts with id array
// would it be any usefull to store in the params the existing state for creating the new doc?
// maybe but is this getting too long?

// add folder section logic
// finish with the Part Icon logic and put everything inside the right folder
// have the folders as page sections but with a way to go there trought a catalog or something
// add filtering options for part icons
// make form popuble on the same page
// from the part make clickable only the title and the link, not the entire button
