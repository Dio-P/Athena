import styled from "@emotion/styled";
import AllFolders from "./AllFolders";
import ButtonUnit from "./ButtonUnit";

const MainAddNewFolderContainer = styled.div`
  text-align: center;
  margin-top: 4px;
  border: solid black;
  border-radius: 10px;
  padding: 1px 2px;
  width: 95%;
  min-height: 20px;
  margin: 1em;
`;

const AddingFolderBlock = ({ 
  folderOfNewPart,
  addingNewFolder,
  allPreexistingFolders,
  allNewFolders,
  folderInfoToState,
  newFolderName,
  addNewFolderAndClear,
  newInputTitle,
  onClickingFolder,
  resetFolderInfo,
  clickingToAddNewFolder
}) => {

  return (
    <MainAddNewFolderContainer>
      <p> Folder to display new part in</p>
      {!folderOfNewPart ? (
        <AllFolders
          addingNewFolder={addingNewFolder}
          allPreexistingFolders={allPreexistingFolders} 
          allNewFolders={allNewFolders} 
          folderInfoToState={folderInfoToState} 
          newFolderName={newFolderName} 
          addNewFolderAndClear={addNewFolderAndClear} 
          newInputTitle={newInputTitle}
          onClickingFolder={onClickingFolder}
        />
      ) : (
        <ButtonUnit
          onClickFunction={resetFolderInfo}
          addingButton={true}
          label={`folder name: ${folderOfNewPart.title} click to edit`}
        />
      )}
      {!folderOfNewPart && (
        <ButtonUnit
          onClickFunction={clickingToAddNewFolder}
          addingButton={true}
          label={
            addingNewFolder
              ? "- Back to Existing Folders"
              : "+ Add New Folder"
          }
        />
      )}
  </MainAddNewFolderContainer>
  )
}

export default AddingFolderBlock;