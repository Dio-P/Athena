import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import AddNewConnectionBox from "../components/AddNewConnectionBox";
import ButtonIcon from "../components/ButtonIcon";
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
  const [addNewConnectionBoxIsOpen, setAddNewConnectionBoxIsOpen] =
    useState(false);

  let [searchParams, setSearchParams] = useSearchParams();
  const {addingNewConnection} = Object.fromEntries([...searchParams]);

  const queryId = useMemo(() => {
    console.log("appIdToDisplay in appPage@£", appIdToDisplay);
    if (!appIdToDisplay && params?.appId) {
      console.log("params?.appId", params?.appId);
      return params.appId;
    }
    console.log("appIdToDisplay", appIdToDisplay);
    return appIdToDisplay;
  }, [params, appIdToDisplay]);

  const [appToDisplay, loading, error] = useAppWithFolderByIdSearch(queryId);

  useEffect(() => {
    console.log("appToDisplay", appToDisplay);
  }, [appToDisplay]);

  const clickingToAddNewConnection = () => {
    setAddNewConnectionBoxIsOpen(!addNewConnectionBoxIsOpen);
    const { team, appId, addingNewConnection } = params;
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
            <ButtonIcon
              addingButton={true}
              buttonTitle={
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
            folderName={folder.title}
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
