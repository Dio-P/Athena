import DropDown from "../components/DropDown";

const AllFolders = ({ 
  allPreexistingFolders, 
  allNewFolders, 
  folderInfoToState, 
  folderOfNewPart,
}) => {

  return (
      <>
        <DropDown
          preexistingFolders={allPreexistingFolders}
          newFolders={allNewFolders}
          onClickFunction={folderInfoToState}
          folderOfNewPart={folderOfNewPart}
        />
      </>
  )
}

export default AllFolders;