import { useState, useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import AddNewConnectionBlock from "../components/AddNewConnectionBlock";
import useParamsHelper from "../hooks/useParamsHelper";
import { addClickedKeyToPreexParts } from "../helpers/AddNewConnectionBlockHelper";

const AddNewConnectionBlockWrapper = styled.div`
  z-index: 1;
`;



const AddConnectionStateManager = ({
  appToDisplay,
  loading,
  error,
  addingNewConnection,
  newPart,
  setNewPart,
  preexistingFolders,
  newFolder,
  setNewFolder,
  folderBeenCreated,
  setFolderBeenCreated,
  newlyCreatedFolders,
  setNewlyCreatedFolders,
  settingNewPartFolder,
  addNewFolderAndClear,
  clickedFolder,
  setClickedFolder,
  newFolderIndexKey,
 }) => {
  const { keepExistingParams, params: { appId, }, manageDdOpenParam } = useParamsHelper();
  // const id = useMemo(() => appId, [appId])
  // const [appToDisplay, loading, error] = useAppByIdSearch(id, !!addingNewConnection);
  // now there is a query in the previous appPage that gets exactly the same object. This may be redundant if all else works.
  const preexistingParts = useMemo(
    () => addClickedKeyToPreexParts(appToDisplay.parts),
    [appToDisplay]
  );
  // const preexistingFolders = useMemo(() => appToDisplay && appToDisplay.folder, [appToDisplay])

  const [url, setUrl] = useState("");
  const [newPartsAdded, setNewPartsAdded] = useState("");
  const [dbPartsWithClickedKey, setDbPartsWithClickedKey] = useState([]);

  useEffect(() => {
    if(preexistingParts){
      setDbPartsWithClickedKey(preexistingParts);
    }
  }, [preexistingParts]);

  useEffect(() => {
    console.log("newPartsAdded@@@", newPartsAdded);
  }, [newPartsAdded]);

  const onClickingRefresh = () => {
    setUrl("");
    setNewPartsAdded("");
    setDbPartsWithClickedKey(appToDisplay.parts || []);
    setNewPart(DEFAULT_NEW_PART);
    setNewFolder("");
    keepExistingParams();
  }

  console.log("newPartsAdded last thing before", newPartsAdded);


  const renderedView = () => {
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
    if (appToDisplay) {
      return (
        <AddNewConnectionBlockWrapper>
          <AddNewConnectionBlock
            appToDisplay={appToDisplay}
            url={url}
            setUrl={setUrl}
            newPartsAdded={newPartsAdded}
            setNewPartsAdded={setNewPartsAdded}
            dbPartsWithClickedKey={dbPartsWithClickedKey}
            setDbPartsWithClickedKey={setDbPartsWithClickedKey}
            newPart={newPart}
            setNewPart={setNewPart}
            newFolder={newFolder}
            setNewFolder={setNewFolder}
            onClickingRefresh={onClickingRefresh}
            preexistingFolders={preexistingFolders}
            newlyCreatedFolders={newlyCreatedFolders}
            setNewlyCreatedFolders={setNewlyCreatedFolders}
            folderBeenCreated={folderBeenCreated}
            setFolderBeenCreated={setFolderBeenCreated}
            settingNewPartFolder={settingNewPartFolder}
            addNewFolderAndClear={addNewFolderAndClear}
            clickedFolder={clickedFolder}
            setClickedFolder={setClickedFolder}
            newFolderIndexKey={newFolderIndexKey}
          />
        </AddNewConnectionBlockWrapper>
      )
    }
  }

  return (
    addingNewConnection && (
      renderedView()
    )
  )
};

export default AddConnectionStateManager;