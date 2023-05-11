import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import AddNewPartInput from "./AddNewPartInput";
import AddingFolderBlock from "./AddingFolderBlock";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";

const DisplayBox = styled.div`
  margin: 10px;
  position: relevant;
  border: solid black;
  border-radius: 15px;
  background-color: #fffcfa;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;
  z-index: 1;
  width: 90%;
  height: 100%;
`;

const TitleButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 12px;
`;

const AddingPartBlock = ({
  newPartsAdded,
  setNewPartsAdded,
  newPart,
  setNewPart,
  folderOfNewPart,
  setFolderOfNewPart,
  // folderDdOpen,
  allPreexistingFolders,
  newFoldersToBeAddedToAll,
  clickedFolder,
  folderBeenCreated,
  setFolderBeenCreated,
  newlyCreatedFolders,
  setNewlyCreatedFolders,
  folderInfoToState,
  // manageFolderDdOpenParam,
}) => {
  const { keepExistingParams } = useParamsHelper();

  const { setClickedFolder } =
    useFolderHelper();

    const [isPartNameWarningOn, setIsPartNameWarningOn] = useState(false);
  const [isFolderWarningOn, setIsFolderWarningOn] = useState(false);

  useEffect(() => {
    if(newPart.name || folderOfNewPart){
      setIsPartNameWarningOn(!newPart.name);
      setIsFolderWarningOn(!folderOfNewPart);
    }
  }, [newPart?.name, folderOfNewPart])
  

  const addNewPartAndClear = () => {
    if(!newPart.name || !folderOfNewPart){
      setIsPartNameWarningOn(!newPart.name);
      setIsFolderWarningOn(!folderOfNewPart);
      return
    }
    setNewPartsAdded({
      ...newPartsAdded,
      [newPart.name]: {
        ...newPart,
        clicked: true,
        folderToBeDisplayedIn:
          folderOfNewPart.id || Object.values(folderOfNewPart)[0].id,
      },
    });
    setNewlyCreatedFolders([newlyCreatedFolders, folderOfNewPart]); //////////////////////////////////
    setNewPart({
      ...newPart,
      name: "",
      ghRepo: "",
      type: "",
    });
    setClickedFolder("");
    setFolderOfNewPart("");
    keepExistingParams();
  };

  const resetFolderInfo = () => {
    setFolderOfNewPart("");
    keepExistingParams();
  };

  return (
    <DisplayBox>
      <TitleButtonWrapper>
        <h3>New Part</h3>
      </TitleButtonWrapper>
      <AddNewPartInput
        newPart={newPart}
        setNewPartName={(input) => setNewPart({ ...newPart, name: input })}
        isPartNameWarningOn={isPartNameWarningOn}
        setNewPartGhRepo={(input) => setNewPart({ ...newPart, ghRepo: input })}
        setNewPartType={(input) => setNewPart({ ...newPart, type: input })}
      />
      <AddingFolderBlock
        newPart={newPart}
        setNewPart={setNewPart}
        folderOfNewPart={folderOfNewPart}
        setFolderOfNewPart={setFolderOfNewPart}
        // folderDdOpen={folderDdOpen}
        allPreexistingFolders={allPreexistingFolders}
        allNewFolders={newFoldersToBeAddedToAll}
        newclickedFolder={clickedFolder}
        newInputTitle={`New Part Name: ${newPart.type}`}
        resetFolderInfo={resetFolderInfo}
        folderBeenCreated={folderBeenCreated}
        setFolderBeenCreated={setFolderBeenCreated}
        isFolderWarningOn={isFolderWarningOn}
        folderInfoToState={folderInfoToState}
        // manageFolderDdOpenParam={manageFolderDdOpenParam}
      />
      <GenericButtonIcon
        onClickFunction={addNewPartAndClear}
        type="add"
        label="add this part and start with another"
      />
    </DisplayBox>
  );
};

export default AddingPartBlock;
