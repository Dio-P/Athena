import styled from "@emotion/styled";
import AllFolders from "./AllFolders";
import ButtonUnit from "./ButtonUnit";
import useAppPartsHelper from "../hooks/useAppPartsHelper";
import useFolderHelper from "../hooks/useFolderHelper";
import useParamsHelper from "../hooks/useParamsHelper";

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
  newPart,
  setNewPart,
  // folderOfNewPart,
  addingNewFolder,
  allPreexistingFolders,
  allNewFolders,
  // folderInfoToState,
  newFolderName,
  newInputTitle,
  onClickingFolder,
  // resetFolderInfo,
  clickingToAddNewFolder
}) => {

  const {
    folderOfNewPart,
    resetFolderInfo,
    setFolderOfNewPart,
    allAppParts,
    setAllAppParts,
    newPartsAdded,
    setNewPartsAdded
  } = useAppPartsHelper();

  const {
    keepExistingParams
  } = useParamsHelper();

  const {
    newlyCreatedFolders,
    setNewlyCreatedFolders,
    clickedFolder,
    setClickedFolder,
    
    newFolderIndexKey,
    onClickingPreExistingFolder
  } = useFolderHelper();

  const addNewFolderAndClear = () => {
    const newFolder = {
      name: clickedFolder,
      id: newFolderIndexKey,
    };
    setFolderOfNewPart(newFolder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: newFolderIndexKey,
    });
  
    keepExistingParams();
  };

  const folderInfoToState = (folder) => {
    console.log("folder info to state from addingFolderBlock");
    setClickedFolder(folder.name);
    setFolderOfNewPart(folder);
    setNewPart({
      ...newPart,
      folderToBeDisplayedIn: folder.id,
    });
    keepExistingParams();
  };

  // const resetFolderInfo = () => {
  //   setFolderOfNewPart("");
  //   keepExistingParams();
  // };

  return (
    <MainAddNewFolderContainer>
      <p> Folder to display new part in</p>
      {!folderOfNewPart ? (
        <AllFolders
          addingNewFolder={addingNewFolder}
          allPreexistingFolders={allPreexistingFolders} 
          allNewFolders={allNewFolders} 
          folderInfoToState={(value) => folderInfoToState(value)}
          newFolderName={newFolderName} 
          addNewFolderAndClear={addNewFolderAndClear} 
          newInputTitle={newInputTitle}
          onClickingFolder={(value) => onClickingPreExistingFolder(value)}
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