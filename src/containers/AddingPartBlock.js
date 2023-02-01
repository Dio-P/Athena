import styled from "@emotion/styled";
import AddNewPartInput from "./AddNewPartInput";
import AddingFolderBlock from "./AddingFolderBlock";
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

const AddingPartBlock = ({ 
    newPart, 
    setNewPartName, 
    setNewPartGhRepo, 
    setNewPartType,
    folderOfNewPart,
    addingNewFolder,
    allPreexistingFolders,
    newFoldersToBeAddedToAll,
    folderInfoToState,
    clickedFolder,
    addNewFolderAndClear,
    newInputTitle,
    onClickingFolder,
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
                <AddingFolderBlock
                  folderOfNewPart={folderOfNewPart}
                  addingNewFolder={addingNewFolder}
                  allPreexistingFolders={allPreexistingFolders}
                  allNewFolders={newFoldersToBeAddedToAll}
                  folderInfoToState={folderInfoToState}
                  newclickedFolder={clickedFolder}
                  addNewFolderAndClear={addNewFolderAndClear}
                  newInputTitle={newInputTitle}
                  onClickingFolder={onClickingFolder}
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