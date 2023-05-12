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
  addingNewConnection,
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
  // const { setClickedFolder } = useFolderHelper();
  const { keepExistingParams, params: { appId, }, manageFolderDdOpenParam } = useParamsHelper();
  const id = useMemo(() => appId, [appId])
  const [appToDisplay, loading, error] = useAppByIdSearch(id, !!addingNewConnection);
  // now there is a query in the previous appPage that gets exactly the same object. This may be redundant if all else works.
  const preexistingParts = useMemo(
    () => addClickedKeyToPreexParts(appToDisplay.parts),
    [appToDisplay]
  );
  const preexistingFolders = useMemo(() => appToDisplay && appToDisplay.folder, [appToDisplay])

  const [url, setUrl] = useState("");
  const [newPartsAdded, setNewPartsAdded] = useState("");
  const [dbPartsWithClickedKey, setDbPartsWithClickedKey] = useState([]);
  // const DEFAULT_NEW_PART = {
  //   name: "",
  //   id: uuidv4(),
  //   ghRepo: "",
  //   type: "",
  //   folderToBeDisplayedIn: "",
  // };
  // const [newPart, setNewPart] = useState(DEFAULT_NEW_PART);
  // const [folderOfNewPart, setFolderOfNewPart] = useState("");
  // const [folderBeenCreated, setFolderBeenCreated] = useState("");
  // const [newlyCreatedFolders, setNewlyCreatedFolders] = useState([]);

  // there is a chance that the below needs to be on the add new connection, synce there is where the add is clicked
  // const { newFolderIndexKey } = useFolderHelper( preexistingFolders, newlyCreatedFolders);


  useEffect(() => {
    if(preexistingParts){
      setDbPartsWithClickedKey(preexistingParts);
    }
  }, [preexistingParts]);

  // useEffect(() => {
  //   dbPartsWithClickedKey && console.log("dbPartsWithClickedKey.length@@", dbPartsWithClickedKey.length); 
  //   if(preexistingParts && dbPartsWithClickedKey?.length === 0){
  //     setDbPartsWithClickedKey(preexistingParts);
  //   }
  // }, [preexistingParts]);

  const onClickingRefresh = () => {
    setUrl("");
    setNewPartsAdded("");
    setDbPartsWithClickedKey(appToDisplay.parts || []);
    setNewPart(DEFAULT_NEW_PART);
    setFolderOfNewPart("");
    keepExistingParams();
  }

  // const folderInfoToState = (folder) => {
  //   setClickedFolder(folder.name);
  //   setFolderOfNewPart(folder);
  //   setNewPart({
  //     ...newPart,
  //     folderToBeDisplayedIn: folder.id,
  //   });
  //   manageFolderDdOpenParam();
  // };

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
            // do I need appToDisplay Down?
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