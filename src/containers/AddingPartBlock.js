import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";
import AddNewPartInput from "./AddNewPartInput";
import AddingFolderBlock from "./AddingFolderBlock";
import ButtonUnit from "./ButtonUnit";
import useAppPartsHelper from "../hooks/useAppPartsHelper";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";

const DisplayBox = styled.div`
  margin: 10px;
  position: absolute;
  border: solid black;
  border-radius: 15px;
  background-color: #fffcfa;
  box-shadow: #2b2a28 0.5em 0.5em 0.3em;
  z-index: 1;
  width: 90%;
  height: 30em;
  max-height: 100%;
`;

const TitleButtonWrapper = styled.div`
  display: "flex";
  flex-direction: row;
  margin-left: 12px;
`;

const AddingPartBlock = ({
    // setNewPartName, 
    // setNewPartGhRepo, 
    // setNewPartType,
    folderOfNewPart,
    addingNewFolder,
    allPreexistingFolders,
    newFoldersToBeAddedToAll,
    // folderInfoToState,
    clickedFolder,
    // addNewFolderAndClear,
    // newInputTitle,
    // onClickingFolder,
    resetFolderInfo,
    clickingToAddNewFolder,
}) => {

  const {
    allAppParts,
    setAllAppParts,
    newPartsAdded,
    setNewPartsAdded
  } = useAppPartsHelper();

  const {
    keepExistingParams
  } = useParamsHelper();

  const {
    newlyCreatedFolders,
    setNewlyCreatedFolders,
    setClickedFolder,
    setFolderOfNewPart
  } = useFolderHelper();

  const [newPart, setNewPart] = useState({
    name: "",
    id: uuidv4(),
    ghRepo: "",
    type: "",
    folderToBeDisplayedIn: "",
  });

  const addNewPartAndClear = () => {
    console.log("addNewPartAndClear");
    setNewPartsAdded({
      ...newPartsAdded,
      [newPart.name]: {
        ...newPart,
        folderToBeDisplayedIn:
          folderOfNewPart.id || Object.values(folderOfNewPart)[0].id,
        // I need to create a singly function that is going to turn this and return a single item in both cases
      },
    });
    setNewlyCreatedFolders([...newlyCreatedFolders, folderOfNewPart]); //////////////////////////////////
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
    return (
        <DisplayBox>
                <TitleButtonWrapper>
                  <h3>New Part</h3>
                </TitleButtonWrapper>
                <AddNewPartInput
                  newPart={newPart}
                  setNewPartName={(input) =>
                    setNewPart({ ...newPart, name: input })
                  }
                  setNewPartGhRepo={(input) =>
                    setNewPart({ ...newPart, ghRepo: input })
                  }
                  setNewPartType={(input) =>
                    setNewPart({ ...newPart, type: input })
                  }
                />
                <AddingFolderBlock
                  newPart={newPart}
                  setNewPart={setNewPart}
                  folderOfNewPart={folderOfNewPart}
                  addingNewFolder={addingNewFolder}
                  allPreexistingFolders={allPreexistingFolders}
                  allNewFolders={newFoldersToBeAddedToAll}
                  // folderInfoToState={folderInfoToState}
                  newclickedFolder={clickedFolder}
                  // addNewFolderAndClear={addNewFolderAndClear}
                  newInputTitle={`New Part Name: ${newPart.type}`}
                  // onClickingFolder={onClickingFolder}
                  resetFolderInfo={resetFolderInfo}
                  clickingToAddNewFolder={clickingToAddNewFolder}
                />
                <ButtonUnit
                  onClickFunction={addNewPartAndClear}
                  addingButton={true}
                  label="add this part and start with another"
                />
              </DisplayBox>
    ) 
};

export default AddingPartBlock;