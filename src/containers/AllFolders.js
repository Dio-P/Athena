import DropDown from "../components/DropDown";

const AllFolders = ({ 
  allPreexistingFolders, 
  allNewFolders, 
  folderInfoToState, 
  folderOfNewPart,
}) => {

  return (
        <DropDown
          preexistingData={allPreexistingFolders}
          newData={allNewFolders}
          onClickFunction={folderInfoToState}
          folderOfNewPart={folderOfNewPart}
        />
  )
}

export default AllFolders;