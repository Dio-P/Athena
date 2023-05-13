import { useState, useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import AddNewConnectionBlock from "../components/AddNewConnectionBlock";
import useAppByIdSearch from "../hooks/queries/useAppByIdSearch";
import useParamsHelper from "../hooks/useParamsHelper";
import useFolderHelper from "../hooks/useFolderHelper";
import { addClickedKeyToPreexParts } from "../helpers/AddNewConnectionBlockHelper";
;
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
  folderOfNewPart,
  setFolderOfNewPart,
  folderBeenCreated,
  setFolderBeenCreated,
  newlyCreatedFolders,
  setNewlyCreatedFolders,
  folderInfoToState,
  addNewFolderAndClear
 }) => {
  // const { setClickedFolder } = useFolderHelper();
  const { keepExistingParams, params: { appId, }, manageFolderDdOpenParam } = useParamsHelper();
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

  const onClickingRefresh = () => {
    setUrl("");
    setNewPartsAdded("");
    setDbPartsWithClickedKey(appToDisplay.parts || []);
    setNewPart(DEFAULT_NEW_PART);
    setFolderOfNewPart("");
    keepExistingParams();
  }

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
            folderOfNewPart={folderOfNewPart}
            setFolderOfNewPart={setFolderOfNewPart}
            onClickingRefresh={onClickingRefresh}
            preexistingFolders={preexistingFolders}
            newlyCreatedFolders={newlyCreatedFolders}
            setNewlyCreatedFolders={setNewlyCreatedFolders}
            folderBeenCreated={folderBeenCreated}
            setFolderBeenCreated={setFolderBeenCreated}
            folderInfoToState={folderInfoToState}
            addNewFolderAndClear={addNewFolderAndClear}

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