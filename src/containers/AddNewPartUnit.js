import styled from "@emotion/styled";
import AddNewPartInput from "./AddNewPartInput";
import AddNewFolderUnit from "./AddNewFolderUnit";
import ButtonUnit from "./ButtonUnit";

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

const AddNewPartUnit = ({ 
    newPart, 
    setNewPartName, 
    setNewPartGhRepo, 
    setNewPartType,
    folderOfNewPart,
    addingNewFolder,
    allPreexistingFolders,
    newFoldersToBeAddedToAll,
    folderInfoToState,
    folderName,
    addNewFolderAndClear,
    newInputTitle,
    setFolderName,
    resetFolderInfo,
    clickingToAddNewFolder,
    addNewPartAndClear
}) => {
    return (
        <DisplayBox>
                <TitleButtonWrapper>
                  <h3>New Part</h3>
                </TitleButtonWrapper>
                <AddNewPartInput
                  newPart={newPart}
                  setNewPartName={setNewPartName}
                  setNewPartGhRepo={setNewPartGhRepo}
                  setNewPartType={setNewPartType}
                />
                <AddNewFolderUnit
                  folderOfNewPart={folderOfNewPart}
                  addingNewFolder={addingNewFolder}
                  allPreexistingFolders={allPreexistingFolders}
                  allNewFolders={newFoldersToBeAddedToAll}
                  folderInfoToState={folderInfoToState}
                  newFolderName={folderName}
                  addNewFolderAndClear={addNewFolderAndClear}
                  newInputTitle={newInputTitle}
                  setFolderName={setFolderName}
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

export default AddNewPartUnit;