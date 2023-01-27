import styled from "@emotion/styled";
import AddNewFolderOptions from "../containers/AddNewFolderOptions";
import ButtonUnit from "../containers/ButtonUnit";

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

const AddNewFolderUnit = ({ 
  folderOfNewPart,
  addingNewFolder,
  allPreexistingFolders,
  allNewFolders,
  folderInfoToState,
  newFolderName,
  addNewFolderAndClear,
  newInputTitle,
  setFolderName,
  resetFolderInfo,
  clickingToAddNewFolder
}) => {

  return (
    <MainAddNewFolderContainer>
      <p> Folder to display new part in</p>
      {!folderOfNewPart ? (
        <AddNewFolderOptions
          addingNewFolder={addingNewFolder}
          allPreexistingFolders={allPreexistingFolders} 
          allNewFolders={allNewFolders} 
          folderInfoToState={folderInfoToState} 
          newFolderName={newFolderName} 
          addNewFolderAndClear={addNewFolderAndClear} 
          newInputTitle={newInputTitle}
          setFolderName={setFolderName}
        />
      ) : (
        <ButtonUnit
          onClickFunction={resetFolderInfo}
          addingButton={true}
          buttonTitle={`folder name: ${folderOfNewPart.title} click to edit`}
        />
      )}
      {!folderOfNewPart && (
        <ButtonUnit
          onClickFunction={clickingToAddNewFolder}
          addingButton={true}
          buttonTitle={
            addingNewFolder
              ? "- Back to Existing Folders"
              : "+ Add New Folder"
          }
        />
      )}
  </MainAddNewFolderContainer>
  )
}

export default AddNewFolderUnit;