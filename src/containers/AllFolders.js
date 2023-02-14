import AddNewFolderInputContainer from "./AddNewFolderInputContainer";
import PopulateButtonUnits from "./PopulateButtonUnits";
import DropDown from "../components/DropDown";
import useParamsHelper from "../hooks/useParamsHelper";

const AllFolders = ({ 
  allPreexistingFolders, 
  allNewFolders, 
  folderInfoToState, 
  newFolderName, 
  addNewFolderAndClear, 
  newInputTitle, 
  onClickingFolder,
  clickingToAddNewFolder,
  folderOfNewPart,
}) => {

  const {
    params: {
      addingNewFolder
    }
  } = useParamsHelper();

  return (
    !addingNewFolder ? (
      <>
        <DropDown
          preexistingFolders={allPreexistingFolders}
          newFolders={allNewFolders}
          onClickFunction={folderInfoToState}
          clickingToAddNewFolder={clickingToAddNewFolder}
          folderOfNewPart={folderOfNewPart}
        />
        {/* <PopulateButtonUnits 
          data={allPreexistingFolders}
          onClickFunction={folderInfoToState}
        />
        <PopulateButtonUnits 
          data={allNewFolders}
          onClickFunction={folderInfoToState}
        /> */}
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