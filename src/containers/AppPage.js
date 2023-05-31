import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import AddNewConnectionBlock from "../components/AddNewConnectionBlock";
import GenericButtonIcon from "../components/GenericButtonIcon";
import Folder from "../components/Folder";
import useAppByIdSearch from "../hooks/queries/useAppByIdSearch";
import useAppWithFolderByIdSearch from "../hooks/queries/useAppWithFolderByIdSearch";
import useParamsHelper from "../hooks/useParamsHelper";
import AddConnectionStateManager from "./AddNewConnectionStateManager";
import capitaliseFirstLetters from "../helpers/capitaliseFirstLetters";
import { editIcon } from "../helpers/svgIcons";
import PopUp from "../components/PopUp";
import EditApp from "../popUpComponents/EditApp";
import { createAppByFolders } from "../helpers/updateDbDocsLogic";
import useFolderHelper from "../hooks/useFolderHelper";
import { v4 as uuidv4 } from "uuid";


const AppPageContainer = styled.div`
  margin-left: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px;

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

const AppPage = () => {
  let [searchParams] = useSearchParams();
  const { addingNewConnection, appId, team } = Object.fromEntries([...searchParams]);
  const id = useMemo(() => appId, [appId]) //N

  // const [appToDisplay, loading, error] = useAppWithFolderByIdSearch(appId);
  const [appToDisplay, loading, error] = useAppByIdSearch(appId, true);
  const { manageAddingNewConnectionParam } = useParamsHelper();
  
  const [appByFoldersMutation, setAppByFoldersMutation] = useState(undefined);
  const [editPopUpIsOpen, setEditPopUpIsOpen] = useState(false);

  console.log("appToDisplay in appPage", appToDisplay);
  const preexistingFolders = useMemo(() => appToDisplay && appToDisplay.folders, [appToDisplay])
  console.log("preexistingFolders@@", preexistingFolders);

  useEffect(() => {
    console.log("preexistingFolders@@@", preexistingFolders);
  }, [preexistingFolders]);
  
  const DEFAULT_NEW_PART = {
    name: "",
    id: uuidv4(),
    ghRepo: "",
    type: "",
    folderToBeDisplayedIn: "",
    teams:[team],
  };
  
  
  const [newPart, setNewPart] = useState(DEFAULT_NEW_PART);
  const [updatedPart, setUpdatedPart] = useState(undefined);
  
  const [newFolder, setNewFolder] = useState("");
  const [folderBeenCreated, setFolderBeenCreated] = useState("");
  const [newlyCreatedFolders, setNewlyCreatedFolders] = useState([]);

  console.log("preexistingFolders@", preexistingFolders);
  console.log("newlyCreatedFolders", newlyCreatedFolders);
  
  const { setClickedFolder, newFolderIndexKey } = useFolderHelper( preexistingFolders, newlyCreatedFolders);
  console.log("newFolderIndexKey", newFolderIndexKey);

 
  // under this we need the preexisting folder so all this should move somewhere
  // with knowledge of the app
  // const { setClickedFolder, newFolderIndexKey } = useFolderHelper(,newlyCreatedFolders);
  const { manageFolderDdOpenParam } = useParamsHelper();

  const folderInfoToState = (folder) => {
    console.log("inside folderInfoToState", folder);
    setClickedFolder(folder.name);
    setNewFolder(folder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: folder.id,
    });
    manageFolderDdOpenParam();
  };

  const settingNewPartFolder = (folder) => {
    folderInfoToState(folder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: folder.id,
    });
    manageFolderDdOpenParam();
  }

  const updatingPartFolder = (folder, part) => {
    console.log("folder!@!", folder);
    console.log("part!@!", part);
    folderInfoToState(folder);
    setUpdatedPart({
      ...part,
      folderToBeDisplayedIn: folder.id,
    });
    manageFolderDdOpenParam();
  }

  const addNewFolderAndClear = () => {
    console.log("inside add new folder and clear");
    const newFolder = {
      name: folderBeenCreated,
      id: newFolderIndexKey,
    };
    console.log("newFolder", newFolder);
    setNewFolder(newFolder);
    // setNewPart({
    //   ...newPart,
    //   folderToBeDisplayedIn: newFolderIndexKey,
    // });

    // // setIsPopUpOpen(false);
    // setClickedFolder(folderBeenCreated);
    manageFolderDdOpenParam();
  };

 

  // to be deleted
  useEffect(() => {
    console.log("newFolder@@", newFolder);
     
  }, [newFolder])

  useEffect(() => {
    console.log("updatedPart@@", updatedPart);
     
  }, [updatedPart])

  useEffect(() => {
    console.log("newPart@@", newPart);
     
  }, [newPart])

  useEffect(() => {
    console.log("appToDisplay", appToDisplay)

    appToDisplay && (
      setAppByFoldersMutation(createAppByFolders(appToDisplay))
    )
  }, [appToDisplay]);

  // const clickingEditApp = () => {
  //   return (
  //     <h1>Test</h1>
  //   ) 
  // }

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
    if (appByFoldersMutation) {
      return (
        <>
          <TitleContainer>
            {capitaliseFirstLetters(appByFoldersMutation?.name)}
            <GenericButtonIcon
              icon={editIcon}
              type="small"
              onClickFunction={()=>setEditPopUpIsOpen(!editPopUpIsOpen)}
            />
          </TitleContainer>
            <GenericButtonIcon
              onClickFunction={manageAddingNewConnectionParam}
              type="add"
              label={(addingNewConnection ? "- " : "+ ") + "Add URL"}
            />

          <AddConnectionStateManager
            appToDisplay={appToDisplay}
            loading={loading}
            error={error}
            addingNewConnection={addingNewConnection}
            newPart={newPart}
            setNewPart={setNewPart}
            preexistingFolders={preexistingFolders}
            newFolder={newFolder}
            setNewFolder={setNewFolder}
            folderBeenCreated={folderBeenCreated}
            setFolderBeenCreated={setFolderBeenCreated}
            newlyCreatedFolders={newlyCreatedFolders}
            setNewlyCreatedFolders={setNewlyCreatedFolders}
            settingNewPartFolder={settingNewPartFolder}
            addNewFolderAndClear={addNewFolderAndClear}

            // appToDisplay={appToDisplay}
          />

          <div>
            {appByFoldersMutation &&
              appByFoldersMutation?.folders?.map((folder, index) => (
                <Folder
                  key={index}
                  folderName={folder.name}
                  parts={folder.parts}
                  appId={appByFoldersMutation.id}
                  // folders={appToDisplay.folders}
                  preexistingFolders={preexistingFolders}
                  newlyCreatedFolders={newlyCreatedFolders}
                  updatingPartFolder={updatingPartFolder}
                  newFolder={newFolder}
                  addNewFolderAndClear={addNewFolderAndClear}
                  folderBeenCreated={folderBeenCreated}
                  setFolderBeenCreated={setFolderBeenCreated}
                  setNewFolder={setNewFolder}
                  // updateApp={updateApp}
                  // setEditedPart={setEditedPart}
                  // editPartData={editPartData} 
                  // editPartLoading={editPartLoading} 
                  // editPartError={editPartError}
                  // editPartOpen={editPartOpen}
                  // setEditPartOpen={setEditPartOpen}
                />
              ))}
          </div>
          <PopUp
            ComponentToDisplay={EditApp}
            setIsPopUpOpen={setEditPopUpIsOpen}
            // onClickFunction={}
            app={appToDisplay}
            isPopUpOpen={editPopUpIsOpen}
          />
        </>
      );
    }
  };

  return <AppPageContainer>{pickFromRenderingOptions()}</AppPageContainer>;
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
