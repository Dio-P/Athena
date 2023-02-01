import AddNewFolderInputContainer from "./AddNewFolderInputContainer";
import PopulateButtonUnits from "./PopulateButtonUnits";

const AllFolders = ({ 
  addingNewFolder, 
  allPreexistingFolders, 
  allNewFolders, 
  folderInfoToState, 
  newFolderName, 
  addNewFolderAndClear, 
  newInputTitle, 
  onClickingFolder 
}) => {

  return (
    !addingNewFolder ? (
      <>
        <PopulateButtonUnits 
          data={allPreexistingFolders}
          onClickFunction={folderInfoToState}
        />
        <PopulateButtonUnits 
          data={allNewFolders}
          onClickFunction={folderInfoToState}
        />
      </>
    ) : (
      <AddNewFolderInputContainer
        newFolderName={newFolderName}
        addNewFolderAndClear={addNewFolderAndClear}
        newInputTitle={newInputTitle}
        onClickingFolder={onClickingFolder}
      />
    )
  )
}

export default AllFolders;