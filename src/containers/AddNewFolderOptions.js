import AddNewFolderInputContainer from "./AddNewFolderInputContainer";
import PopulateButtonUnits from "./PopulateButtonUnits";

const AddNewFolderOptions = ({ 
  addingNewFolder, 
  allPreexistingFolders, 
  allNewFolders, 
  folderInfoToState, 
  newFolderName, 
  addNewFolderAndClear, 
  inputTitle, 
  inputOnChangeFunction 
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
        inputTitle={inputTitle}
        inputOnChangeFunction={inputOnChangeFunction}
      />
    )
  )
}

export default AddNewFolderOptions;