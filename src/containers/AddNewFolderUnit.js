import styled from "@emotion/styled";
import ButtonUnit from "./ButtonUnit";
import AddNewFolderInputContainer from "./AddNewFolderInputContainer";

const AddNewFolderUnit = ({ 
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
        {allPreexistingFolders.map((folder) => (
          <ButtonUnit
            onClickFunction={() => folderInfoToState(folder)}
            folder={folder.title}
          />
        ))}
        {allNewFolders.map((folder) => (
          <ButtonUnit
            onClickFunction={() => folderInfoToState(folder)}
            folder={folder.title}
          />
        ))}
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

export default AddNewFolderUnit;