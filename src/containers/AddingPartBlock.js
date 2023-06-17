import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import GenericButtonIcon from "../components/GenericButtonIcon";
import AddNewPartInput from "./AddNewPartInput";
import AddingFolderBlock from "./AddingFolderBlock";
import useParamsHelper from "../hooks/useParamsHelper";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const ADD_NEW_PART = gql`
  mutation($appId: ID!, $newPart: partInput!, $additionalFolders: [FolderInput]) {
    addNewPart(appID: $appId, newPart: $newPart, additionalFolders: $additionalFolders) {
      name
      id
      ghRepo
      type
      folderToBeDisplayedIn
      appParent
      docs
    }
  }
`;

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
  newFolder,
  setNewFolder,
  // folderDdOpen,
  preexistingFolders,
  // newFoldersToBeAddedToAll,
  clickedFolder,
  setClickedFolder,
  folderBeenCreated,
  setFolderBeenCreated,
  newlyCreatedFolders,
  setNewlyCreatedFolders,
  settingNewPartFolder,
  addNewFolderAndClear,
  newFolderIndexKey,
  // manageDdOpenParam,
}) => {
  const { keepExistingParams, params: {
    appId
  } } = useParamsHelper();
  const[addNewPart, {loading, error , data}] = useMutation(ADD_NEW_PART);

    const [isPartNameWarningOn, setIsPartNameWarningOn] = useState(false);
  const [isFolderWarningOn, setIsFolderWarningOn] = useState(false);

  useEffect(() => {
    if(newPart.name || newFolder){
      setIsPartNameWarningOn(!newPart.name);
      setIsFolderWarningOn(!newFolder);
    }
  }, [newPart?.name, newFolder])
  

  const addNewPartAndClear = () => {
    console.log("inside addNewPartAndClear");
    if(!newPart.name || !newFolder){
      setIsPartNameWarningOn(!newPart.name);
      setIsFolderWarningOn(!newFolder);
      return
    }
    setNewPartsAdded({
      ...newPartsAdded,
      [newPart.name]: {
        ...newPart,
        clicked: true,
        folderToBeDisplayedIn:
          newFolder.id || Object.values(newFolder)[0].id,
      },
    });
    setNewlyCreatedFolders([newlyCreatedFolders, newFolder]); //////////////////////////////////
    // addNewPart({variables:{
      // appID: appId,
    //   newPart: newPartsAdded,
    //   additionalFolders: newlyCreatedFolders,
    // }});
    // move the mutation into a hook to be queried when all is updated
    setNewPart({
      ...newPart,
      name: "",
      ghRepo: "",
      type: "",
    });
    setClickedFolder("");
    setNewFolder("");
    keepExistingParams();
  };

  const resetFolderInfo = () => {
    setNewFolder("");
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
        newFolder={newFolder}
        setNewFolder={setNewFolder}
        // folderDdOpen={folderDdOpen}
        preexistingFolders={preexistingFolders}
        newlyCreatedFolders={newlyCreatedFolders}
        clickedFolder={clickedFolder}
        setClickedFolder={setClickedFolder}
        newInputTitle={`New Part Name: ${newPart.type}`}
        resetFolderInfo={resetFolderInfo}
        folderBeenCreated={folderBeenCreated}
        setFolderBeenCreated={setFolderBeenCreated}
        isFolderWarningOn={isFolderWarningOn}
        settingNewPartFolder={settingNewPartFolder}
        addNewFolderAndClear={addNewFolderAndClear}
        newFolderIndexKey={newFolderIndexKey}

        // manageDdOpenParam={manageDdOpenParam}
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
