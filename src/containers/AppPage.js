import React, { useEffect, useState, params, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import useCapitaliseFirstLetter from "../hooks/useCapitaliseFirstLetter";
import AddNewConnectionBox from "../components/AddNewConnectionBox";
import PartIcon from "../components/PartIcon";
import ButtonIcon from "../components/ButtonIcon";
import FolderContainer from "./FolderContainer";
import Folder from "../components/Folder";
import useAppByIdSearch from "../hooks/queries/useAppByIdSearch";
import useValuesFromUrlParams from "../hooks/useValuesFromUrlParams";

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

const PartsContainer = styled.div`
  display: flex;
`;

const AppPage = ({ appIdToDisplay, params }) => {
  const [thisApp, setThisApp] = useState(undefined);
  const [addNewConnectionBoxIsOpen, setAddNewConnectionBoxIsOpen] =
    useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const queryId = useMemo(() => {
    console.log("appIdToDisplay in appPage@£", appIdToDisplay);
    if (!appIdToDisplay && params?.appId) {
      console.log("params?.appId", params?.appId);
      return params.appId;
    }
    console.log("appIdToDisplay", appIdToDisplay);
    return appIdToDisplay;
  }, [params, appIdToDisplay]);

  const [appToDisplay, loading, error] = useAppByIdSearch(queryId);

  // appIdToDisplay || params?.appId

  // useEffect(() => {
  //   console.log("app on mount", app);
  //   if(!appIdToDisplay && params?.appId){
  //     setApp
  //   }
  // }, []);
  useEffect(() => {
    console.log("app in app page", appToDisplay);
    if (appToDisplay) {
      console.log("about to set the app");
      setThisApp({
        ...appToDisplay,
        folders: updateFolders(appToDisplay),
      });
    }
  }, [appToDisplay]);

  // useEffect(() => {
  //   console.log("appToDisplay#@#@##@", appToDisplay);
  //   setApp(appToDisplay);
  // }, [appToDisplay]);

  useEffect(() => {
    console.log("thisApp", thisApp);
  }, [thisApp]);

  const putPartIdToUpdatedFolder = (folderId) => {
    // console.log("folderId£££", folderId);
    const folderParts = appToDisplay.parts.filter(
      (part) => part.folderToBeDisplayedIn === folderId
    );
    const updatedFolderParts = folderParts.map((part) => ({
      ...part,
      docs: findPartsDocs(`${part.id}`),
    }));
    // const partIdsArray = folderParts.map((part)=>(part.id))
    // return partIdsArray;
    return updatedFolderParts;
  };

  const updateFolders = (appToDisplay) => {
    const updatedFolders = appToDisplay.folders.map((folder) => ({
      ...folder,
      parts: putPartIdToUpdatedFolder(`${folder.id}`),
    }));
    // console.log("updatedFolders$$$", updatedFolders);
    return updatedFolders;
  };

  const findPartsDocs = (id) => {
    console.log("id@££", id);
    console.log("appToDisplayForDocs££", appToDisplay);
    const appDocs = appToDisplay.properties.docs.filter((doc) => {
      console.log("doc.concerningParts£££", doc.concerningParts);
      return doc.concerningParts.includes(id);
    });
    // const appDocsIds = appDocs.map((doc)=>(
    //   doc.id
    // ))
    // console.log("appDocs$$$", appDocs);
    return appDocs;
  };

  // const updateParts = () => {
  //   const updatedParts = app.parts.map((part)=>(
  //     {...part, docs: findPartsDocs(`${part.id}`)}
  //   ))
  //   return updatedParts;
  // }

  const clickingToAddNewConnection = () => {
    setAddNewConnectionBoxIsOpen(!addNewConnectionBoxIsOpen);
    const { team, appId, addingNewConnection } = params;
    if (!addingNewConnection) {
      setSearchParams({ ...params, addingNewConnection: true });
    } else {
      setSearchParams({ team, appId });
    }
  };

  return (
    <AppPageContainer>
      <>
        <>
          <AppPageTitle>
            {thisApp?.name}
            <AddDocButton onClick={clickingToAddNewConnection}>
              <ButtonIcon
                addingButton={true}
                buttonTitle={
                  (params?.addingNewConnection ? "- " : "+ ") + "Add URL"
                }
              />
            </AddDocButton>
          </AppPageTitle>
        </>
        {params?.addingNewConnection && thisApp && (
          <AddNewConnectionBox app={thisApp} params={params} />
        )}

        {thisApp &&
          thisApp?.folders?.map((folder) => (
            <Folder
              folderName={folder.title}
              parts={folder.parts}
              appId={thisApp.id}
            />
          ))}
      </>
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
