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

const AppPage = () => {
  let [searchParams] = useSearchParams();
  const { addingNewConnection, appId, team } = Object.fromEntries([...searchParams]);

  useEffect(() => {
    console.log("appId&&&&", appId); 
  }, [appId])
  const [appToDisplay, loading, error] = useAppByIdSearch(appId, true);
  const { 
    manageAddingNewConnectionParam,
    manageEditingAppParam, 
    params: {
      editingApp
    } 
  } = useParamsHelper();
  
  const [appByFoldersMutation, setAppByFoldersMutation] = useState(undefined);
  const [editPopUpIsOpen, setEditPopUpIsOpen] = useState(false);

  const preexistingFolders = useMemo(() => appToDisplay && appToDisplay.folders, [appToDisplay])
  
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
  
  const { clickedFolder, setClickedFolder, newFolderIndexKey } = useFolderHelper( preexistingFolders, newlyCreatedFolders);
  // console.log("newFolderIndexKey", newFolderIndexKey);

 
  // under this we need the preexisting folder so all this should move somewhere
  // with knowledge of the app
  const { manageDdOpenParam } = useParamsHelper();

  // const onClickingPreExistingFolder = (value) => {
  //   setClickedFolder(value);
  //   keepExistingParams();


  // }

  const folderInfoToState = (folder) => {
    // console.log("inside folderInfoToState", folder);
    setClickedFolder(folder.name);
    // setNewFolder(folder); ///this is maybe necessary!!!!!!!! 
    // setNewPart({
    //   ...newPart,
    //   folderToBeDisplayedIn: folder.id,
    // });
    // manageDdOpenParam();
  };

  const settingNewPartFolder = (folder) => {
    folderInfoToState(folder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: folder.id,
    });
    manageDdOpenParam();
  }

  const updatingPartFolder = (folder, part) => {
    folderInfoToState(folder);
    setUpdatedPart({
      ...part,
      folderToBeDisplayedIn: folder.id,
    });
    manageDdOpenParam();
  }

  const addNewFolderAndClear = () => {
    // console.log("inside add new folder and clear");
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
    manageDdOpenParam();
  };

  useEffect(() => {

    appToDisplay && (
      setAppByFoldersMutation(createAppByFolders(appToDisplay))
    )
  }, [appToDisplay]);

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
              onClickFunction={manageEditingAppParam}
            />
          </TitleContainer>
            <GenericButtonIcon
              onClickFunction={manageAddingNewConnectionParam}
              type="add"
              label={(addingNewConnection ? "- " : "+ ") + "Add Doc"}
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
            clickedFolder={clickedFolder}
            setClickedFolder={setClickedFolder}
            newFolderIndexKey={newFolderIndexKey}
          />

          <div>
            {appByFoldersMutation &&
              appByFoldersMutation?.folders?.map((folder, index) => (
                <Folder
                  key={index}
                  folderName={folder.name}
                  parts={folder.parts}
                  appId={appByFoldersMutation.id}
                  preexistingFolders={preexistingFolders}
                  newlyCreatedFolders={newlyCreatedFolders}
                  updatingPartFolder={updatingPartFolder}
                  newFolder={newFolder}
                  addNewFolderAndClear={addNewFolderAndClear}
                  folderBeenCreated={folderBeenCreated}
                  setFolderBeenCreated={setFolderBeenCreated}
                  setNewFolder={setNewFolder}
                />
              ))}
          </div>
          <PopUp
            ComponentToDisplay={EditApp}
            setIsPopUpOpen={manageEditingAppParam}
            // onClickFunction={}
            app={appToDisplay}
            isPopUpOpen={editingApp}
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
