import AddNewFolderInputContainer from "./AddNewFolderInputContainer";
import PopulateButtonUnits from "./PopulateButtonUnits";

const AddNewFolderOptions = ({ 
  addingNewFolder, 
  allPreexistingFolders, 
  allNewFolders, 
  folderInfoToState, 
  newFolderName, 
  addNewFolderAndClear, 
  newInputTitle, 
  setFolderName 
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
        setFolderName={setFolderName}
      />
    )
  )
}

export default AddNewFolderOptions;