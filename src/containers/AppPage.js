import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

const AppPage = ({ appIdToDisplay }) => {
  // const location = useLocation();
  // const app = location.state;

  const [thisApp, setThisApp] = useState("");
  const [addNewConnectionBoxIsOpen, setAddNewConnectionBoxIsOpen] =
    useState(false);
  const [app, setApp] = useState(undefined);
  const params = useValuesFromUrlParams();
  const queryId = () => {
    console.log("appIdToDisplay in appPage@£", appIdToDisplay);
    if(!appIdToDisplay && params?.appId){
      return params.appId
    }
    return appIdToDisplay;
  }
  
  const [appToDisplay, loading, error] = useAppByIdSearch(queryId());
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

  useEffect(()=>{
    console.log("thisApp", thisApp);

  },[thisApp])

  const putPartIdToUpdatedFolder = (folderId) => {
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
    return updatedFolders;
  };

  const findPartsDocs = (id) => {
    const appDocs = appToDisplay.properties?.docs?.filter((doc) => {
      return doc.concerningParts.includes(id);
    });
    // const appDocsIds = appDocs.map((doc)=>(
    //   doc.id
    // ))
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
  };

  const name = useCapitaliseFirstLetter(app?.name || "loading");
  return (
    <AppPageContainer>
      <>
        <>
          <AppPageTitle>
            {name}
            <AddDocButton onClick={clickingToAddNewConnection}>
              <ButtonIcon
                addingButton={true}
                buttonTitle={
                  (addNewConnectionBoxIsOpen ? "- " : "+ ") + "Add URL"
                }
              />
            </AddDocButton>
          </AppPageTitle>
        </>
        {addNewConnectionBoxIsOpen && <AddNewConnectionBox app={thisApp} />}

        {thisApp &&
          thisApp?.folders?.map((folder) => (
            <Folder folderName={folder.title} parts={folder.parts} />
          ))}
      </>
    </AppPageContainer>
  );
};

export default AppPage;

// working:
// logic updating docs in parts with id array

// add folder section logic
// finish with the Part Icon logic and put everything inside the right folder
// have the folders as page sections but with a way to go there trought a catalog or something
// add filtering options for part icons
// make form popuble on the same page
// from the part make clickable only the title and the link, not the entire button
